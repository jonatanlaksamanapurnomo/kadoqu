<?php
/**
 * Magestore
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magestore.com license that is
 * available through the world-wide-web at this URL:
 * http://www.magestore.com/license-agreement.html
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Magestore
 * @package     Magestore_Onestepcheckout
 * @copyright   Copyright (c) 2017 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 */

/**
 * Class Magestore_Onestepcheckout_Model_Observer
 */
class Magestore_Onestepcheckout_Model_Observer
{
    /**
     * init checkout
     * if one step checkout is enabled, redirect checkout page to onestepcheckout
     * otherwise, redirect to checkout/onepage
     * @param $observer
     */
    public function initController($observer)
    {
        if (Mage::helper('onestepcheckout')->enabledOnestepcheckout()) {
            $redirect = Mage::getUrl('onestepcheckout/index', array('_secure' => true));
            $response = $observer->getControllerAction()->getResponse();
            $response->setRedirect($redirect)->sendResponse();
            $response->sendHeadersAndExit();
        }
    }

    /**
     * process event after added item to cart
     * @param $observer
     */
    public function initCartController($observer)
    {
        if (Mage::helper('onestepcheckout')->enabledOnestepcheckout()) {
            if (Mage::getStoreConfig('onestepcheckout/general/redirect_to_checkout') 
                    && Mage::getStoreConfig('onestepcheckout/general/active')) {
                $message = Mage::helper('onestepcheckout')->__('%s was added to your shopping cart.', Mage::helper('core')->escapeHtml($observer->getProduct()->getName()));
                Mage::getSingleton('checkout/session')->addSuccess($message);
                $redirect = Mage::getUrl('onestepcheckout/index', array('_secure' => true));
                $response = $observer->getEvent()->getResponse();
                $response->setRedirect($redirect)->sendResponse();
                $response->sendHeadersAndExit();
            }
        }
    }

    /**
     * @param $observer
     */
    public function controllerActionPredispatchCheckoutCartIndex($observer)
    {
        if (Mage::helper('onestepcheckout')->enabledOnestepcheckout()) {
            if (Mage::getModel('checkout/session')->getData('redirectOnestepcheckout')) {
                $observer->getControllerAction()->_redirect('onestepcheckout/index', array('_secure' => true));
                Mage::getModel('checkout/session')->setData('redirectOnestepcheckout', false);
                $smessages = Mage::getSingleton('checkout/session')->getMessages()->getItems();
                if (count($smessages)) {
                    $output = array();
                    foreach ($smessages as $smessage) {
                        $output[] = $smessage->getText();
                    }
                    Mage::getModel('checkout/session')->setData('paymentMessages', serialize($output));
                }
            }
        }
    }

    /**
     * 
     * @param type $observer
     */
    public function controllerActionPredispatchIcepayProcessingResult($observer)
    {
        if (Mage::helper('onestepcheckout')->enabledOnestepcheckout()) {
            $status = $observer->getControllerAction()->getRequest()->getParam('Status');
            if ($status == 'ERR') {
                Mage::getModel('checkout/session')->setData('redirectOnestepcheckout', true);
            } else {
                Mage::getSingleton('core/session')->setData('ic_quoteid', null);
            }
        }
    }

    /**
     * 
     * @param type $observer
     */
    public function controllerActionPredispatchWirecardCheckoutPageProcessingCheckresponse($observer)
    {
        if (Mage::helper('onestepcheckout')->enabledOnestepcheckout()) {
            $session = Mage::getSingleton('checkout/session');
            $order = Mage::getModel('sales/order');
            $order->load($session->getLastOrderId());
            if ($order->isCanceled()) {
                Mage::getModel('checkout/session')->setData('redirectOnestepcheckout', true);
            }
        }
    }

    /**
     * @param $observer
     */
    public function controllerActionPredispatchOnestepcheckoutIndex($observer)
    {
        if (Mage::helper('onestepcheckout')->enabledOnestepcheckout()) {
            $smessages = unserialize(Mage::getModel('checkout/session')->getData('paymentMessages'));
            if (is_array($smessages)) {
                foreach ($smessages as $smessage) {
                    Mage::getSingleton('checkout/session')->addError($smessage);
                }
            }
            Mage::getModel('checkout/session')->setData('paymentMessages', null);
        }
    }

    /**
     *
     * Field Position change event
     * @param $observer
     */
    public function changeFieldPosition($observer)
    {
        if ($observer->getEvent()->getStore()) {
            $scope = 'stores';
            $scopeId = (int) Mage::getConfig()->getNode('stores/' . $observer->getEvent()->getStore() . '/system/store/id');
        } elseif ($observer->getEvent()->getWebsite()) {
            $scope = 'websites';
            $scopeId = (int) Mage::getConfig()->getNode('websites/' . $observer->getEvent()->getWebsite() . '/system/website/id');
        } else {
            $scope = 'default';
            $scopeId = 0;
        }

        $groups = Mage::app()->getRequest()->getPost('groups');
        $fieldPositions = $groups['field_position_management']['fields'];

        $deleteTransaction = Mage::getModel('core/resource_transaction');
        /* @var $deleteTransaction Mage_Core_Model_Resource_Transaction */
        $saveTransaction = Mage::getModel('core/resource_transaction');
        /* @var $saveTransaction Mage_Core_Model_Resource_Transaction */
        $deleteCustomTransaction = Mage::getModel('core/resource_transaction');
        /* @var $deleteTransaction Mage_Core_Model_Resource_Transaction */
        $saveCustomTransaction = Mage::getModel('core/resource_transaction');
        /* @var $saveTransaction Mage_Core_Model_Resource_Transaction */
        if (is_array($fieldPositions)) {
            foreach ($fieldPositions as $row => $data) {
                if (isset($data['value']) && $data['value'] != null) {
                    $value = $data['value'];
                } else {
                    $value = null;
                }
                $dataObject = Mage::getModel('onestepcheckout/config');
                $positionPath = 'onestepcheckout/field_position_management/' . $row;
                $dataObject
                        ->setScope($scope)
                        ->setScopeId($scopeId)
                        ->setPath($positionPath)
                        ->setValue($value);
                $oldPath = Mage::getModel('onestepcheckout/config')->getCollection()
                        ->addFieldToFilter('scope', $scope)
                        ->addFieldToFilter('scope_id', $scopeId)
                        ->addFieldToFilter('path', $positionPath)
                        ->getFirstItem();
                if ($oldPath) {
                    $dataObject->setConfigId($oldPath->getConfigId());
                }
                $inherit = !empty($data['inherit']);
                if (!$inherit) {
                    $saveTransaction->addObject($dataObject);
                } else {
                    $deleteTransaction->addObject($dataObject);
                }
            }
        }
        //save style 
        $fieldStyles = $groups['style_management']['fields'];
        $style = $fieldStyles['style'];
        $styleValue = (isset($style['value'])) ? $style['value'] : "";
        $styleDataObject = Mage::getModel('onestepcheckout/config');
        $stylePath = 'onestepcheckout/style_management/style';
        $oldStylePath = Mage::getModel('onestepcheckout/config')->getCollection()
                ->addFieldToFilter('scope', $scope)
                ->addFieldToFilter('scope_id', $scopeId)
                ->addFieldToFilter('path', $stylePath)
                ->getFirstItem();
        $styleDataObject
                ->setScope($scope)
                ->setScopeId($scopeId)
                ->setPath($stylePath)
                ->setValue($styleValue);

        if ($oldStylePath) {
            $styleDataObject->setConfigId($oldStylePath->getConfigId());
        }
        $styleInherit = !empty($style['inherit']);
        if ((isset($style['value']) && $style['value'] == 'custom') || isset($style['custom']) || isset($style['inherit'])) {
            $customValue = $style['custom'];
            $customDataObject = Mage::getModel('onestepcheckout/config');
            $customPath = 'onestepcheckout/style_management/custom';
            $oldCustomPath = Mage::getModel('onestepcheckout/config')->getCollection()
                    ->addFieldToFilter('scope', $scope)
                    ->addFieldToFilter('scope_id', $scopeId)
                    ->addFieldToFilter('path', $customPath)
                    ->getFirstItem();
            $customDataObject
                    ->setScope($scope)
                    ->setScopeId($scopeId)
                    ->setPath($customPath)
                    ->setValue($customValue);
            if ($oldCustomPath) {
                $customDataObject->setConfigId($oldCustomPath->getConfigId());
            }
            if (!$styleInherit) {
                $saveCustomTransaction->addObject($customDataObject);
            } else {
                $deleteCustomTransaction->addObject($customDataObject);
            }
        }
        if (!$styleInherit) {
            $saveTransaction->addObject($styleDataObject);
        } else {
            $deleteTransaction->addObject($styleDataObject);
        }

        $deleteTransaction->delete();
        $saveTransaction->save();
        $deleteCustomTransaction->delete();
        $saveCustomTransaction->save();

        /* button */
        $deleteButtonTransaction = Mage::getModel('core/resource_transaction');
        $saveButtonTransaction = Mage::getModel('core/resource_transaction');
        $deleteCustomButtonTransaction = Mage::getModel('core/resource_transaction');
        $saveCustomButtonTransaction = Mage::getModel('core/resource_transaction');

        $button = $fieldStyles['button'];
        $buttonValue = (isset($button['value'])) ? $button['value'] : '';
        $buttonDataObject = Mage::getModel('onestepcheckout/config');
        $buttonPath = 'onestepcheckout/style_management/button';
        $oldButtonPath = Mage::getModel('onestepcheckout/config')->getCollection()
                ->addFieldToFilter('scope', $scope)
                ->addFieldToFilter('scope_id', $scopeId)
                ->addFieldToFilter('path', $buttonPath)
                ->getFirstItem();
        $buttonDataObject
                ->setScope($scope)
                ->setScopeId($scopeId)
                ->setPath($buttonPath)
                ->setValue($buttonValue);

        if ($oldButtonPath) {
            $buttonDataObject->setConfigId($oldButtonPath->getConfigId());
        }
        $buttonInherit = !empty($button['inherit']);
        if ((isset($button['value']) && $button['value'] == 'custombutton') || isset($button['custombutton']) || isset($button['inherit'])) {
            $customButtonValue = $button['custombutton'];
            $customButtonDataObject = Mage::getModel('onestepcheckout/config');
            $customButtonPath = 'onestepcheckout/style_management/custombutton';
            $oldCustomButtonPath = Mage::getModel('onestepcheckout/config')->getCollection()
                    ->addFieldToFilter('scope', $scope)
                    ->addFieldToFilter('scope_id', $scopeId)
                    ->addFieldToFilter('path', $customButtonPath)
                    ->getFirstItem();
            $customButtonDataObject
                    ->setScope($scope)
                    ->setScopeId($scopeId)
                    ->setPath($customButtonPath)
                    ->setValue($customButtonValue);
            if ($oldCustomButtonPath) {
                $customButtonDataObject->setConfigId($oldCustomButtonPath->getConfigId());
            }
            if (!$buttonInherit) {
                $saveCustomButtonTransaction->addObject($customButtonDataObject);
            } else {
                $deleteCustomButtonTransaction->addObject($customButtonDataObject);
            }
        }
        if (!$buttonInherit) {
            $saveButtonTransaction->addObject($buttonDataObject);
        } else {
            $deleteButtonTransaction->addObject($buttonDataObject);
        }
        $deleteButtonTransaction->delete();
        $saveButtonTransaction->save();
        $deleteCustomButtonTransaction->delete();
        $saveCustomButtonTransaction->save();
    }

    /**
     *
     * notify admin after order is placed
     * @param $observer
     */
    public function notifyAdmin($observer)
    {
        $helper = Mage::helper('onestepcheckout');
        if ($helper->enableNotifyAdmin()) {
            $_order = $observer->getEvent()->getOrder();
            $translate = Mage::getSingleton('core/translate');
            $translate->setTranslateInline(false);
            $paymentBlock = Mage::helper('payment')->getInfoBlock($_order->getPayment())
                    ->setIsSecureMode(true);
            $paymentBlock->getMethod()->setStore($_order->getStore()->getId());
            $mailTemplate = Mage::getModel('core/email_template');
            $template = Mage::getStoreConfig('onestepcheckout/order_notification/template', $_order->getStoreId());
            $sendTo = array();
            $email_array = $helper->getEmailArray();
            if (!empty($email_array)) {
                foreach ($email_array as $email) {
                    $sendTo[] = array('email' => trim($email),
                        'name' => '');
                }
            }
            foreach ($sendTo as $recipient) {
                $result = $mailTemplate->setDesignConfig(array('area' => 'frontend', 'store' => $_order->getStoreId()))
                        ->sendTransactional(
                        $template, Mage::getStoreConfig('sales_email/order/identity', $_order->getStoreId()), $recipient['email'], $recipient['name'], array(
                    'order' => $_order,
                    'billing' => $_order->getBillingAddress(),
                    'payment_html' => $paymentBlock->toHtml(),
                        )
                );
            }
            $translate->setTranslateInline(true);
        }
    }

    /**
     * process event order_place_after
     * @param $observers
     */
    public function orderPlaceAfter($observers)
    {
        $giftwrap = $this->_getSession()->getData('onestepcheckout_giftwrap');
        $giftwrapAmount = $this->_getSession()->getData('onestepcheckout_giftwrap_amount');
        if ($giftwrap || $giftwrapAmount) {
            $this->_getSession()->unsetData('onestepcheckout_giftwrap');
            $this->_getSession()->unsetData('onestepcheckout_giftwrap_amount');
        }
        $order = $observers->getEvent()->getOrder();
        
        /* prepare additional data to save */
        Mage::helper('onestepcheckout')->prepareSaveOrder();

        /* save OSC comment */
        $this->_saveCustomComment($order);

        /* save survey */
        $this->_saveSurvey($order);

        /* save delivery information */
        $this->_saveDeliveryInfo($order);
        
        $order->save();
    }

    /**
     * @param $observer
     */
    public function preventClearQuote($observer)
    {
        if (Mage::helper('onestepcheckout')->enabledOnestepcheckout()) {
            $quote = Mage::getSingleton('checkout/session')->getQuote();
            $quote->setCustomerId(null);
        }
    }
    
    /**
     * observe before view order detail event
     * 
     * @param type $observer
     */
    public function loadOrderAdditionalData($observer)
    {
        $controller = $observer->getEvent()->getData('controller_action');
        $orderId = $controller->getRequest()->getParam('order_id');
        $order = Mage::getModel('sales/order')->load($orderId);
        
        /* add missing delivery information to order */
        $delivery = Mage::getModel('onestepcheckout/delivery')->getCollection()
                            ->addFieldToFilter('order_id', $orderId)
                            ->getFirstItem();
        
        $this->_helper()->addDeliveryToOrder($delivery, $order, true);
        
        /* add missing survey information to order */
        $survey = Mage::getModel('onestepcheckout/survey')->getCollection()
                            ->addFieldToFilter('order_id', $orderId)
                            ->getFirstItem();      
        
        $this->_helper()->addSurveyToOrder($survey, $order, true);
        
        $order->save();
    }

    /**
     * 
     * @return Mage_Checkout_Model_Session
     */
    protected function _getSession()
    {
        return Mage::getSingleton('checkout/session');
    }

    /**
     * Save customer comment to order
     * 
     * @param Mage_Sales_Model_Order $order
     */
    protected function _saveCustomComment($order)
    {
        if ($customerComment = $this->_getSession()->getOSCCM()) {
            try {
                $customerComment = Mage::helper('onestepcheckout')->__('Customer comment') . ': ' . $customerComment;
                $history = Mage::getModel('sales/order_status_history')
                        ->setStatus($order->getStatus())
                        ->setComment($customerComment)
                        ->setIsVisibleOnFront(1)
                        ->setEntityName(Mage_Sales_Model_Order::HISTORY_ENTITY_NAME);
                $order->addStatusHistory($history);
            } catch (Exception $e) {
                Mage::log($e->getMessage(), null, 'magestore_onestepcheckout.log');
            }
            $this->_getSession()->setOSCCM(null);
        }
    }

    /**
     * Save customer comment to order
     * 
     * @param Mage_Sales_Model_Order $order
     */
    protected function _saveSurvey($order)
    {
        $session = $this->_getSession();
        $orderId = $order->getId();
        $surveyQuestion = $session->getData('survey_question');
        $surveyAnswer = $session->getData('survey_answer');
        $survey = Mage::getModel('onestepcheckout/survey');
        if ($surveyAnswer) {
            try {
                $survey->setData('question', $surveyQuestion)
                        ->setData('answer', $surveyAnswer)
                        ->setData('order_id', $orderId)
                        ->save();
                
                $this->_helper()->addSurveyToOrder($survey, $order, true);
                
            } catch (Exception $e) {
                Mage::log($e->getMessage(), null, 'magestore_onestepcheckout.log');
            }
            $session->unsetData('survey_question');
            $session->unsetData('survey_answer');
        }
    }

    /**
     * Save customer comment to order
     * 
     * @param Mage_Sales_Model_Order $order
     */
    protected function _saveDeliveryInfo($order)
    {
        $session = $this->_getSession();
        $deliveryDateTime = $session->getData('delivery_date_time');
        $deliverySecurityCode = $session->getData('delivery_security_code');
        $delivery = Mage::getModel('onestepcheckout/delivery');
        if ($deliveryDateTime || $deliverySecurityCode) {
            try {
                $delivery->setData('delivery_time_date', $deliveryDateTime)
                        ->setData('delivery_security_code', $deliverySecurityCode)
                        ->setData('order_id', $order->getId())
                        ->save();
                
                $this->_helper()->addDeliveryToOrder($delivery, $order, true);
                
            } catch (Exception $e) {
                Mage::log($e->getMessage(), null, 'magestore_onestepcheckout.log');
            }
            $session->unsetData('delivery_date_time');
            $session->unsetData('delivery_security_code');
        }
    }
    
    /**
     * 
     * @return Magestore_Onestepcheckout_Helper_Data
     */
    protected function _helper()
    {
        return Mage::helper('onestepcheckout');
    }

}
