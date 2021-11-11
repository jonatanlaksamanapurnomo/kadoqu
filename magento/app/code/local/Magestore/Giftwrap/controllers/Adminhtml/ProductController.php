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
 * @package     Magestore_Giftwrap
 * @module    Giftwrap
 * @author      Magestore Developer
 *
 * @copyright   Copyright (c) 2016 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 *
 */
class Magestore_Giftwrap_Adminhtml_ProductController extends Mage_Adminhtml_Controller_Action
{
    /**
     * @return $this
     */
    protected function _initAction() {
        $this->loadLayout()
            ->_setActiveMenu('catalog/giftwrap')
            ->_addBreadcrumb(Mage::helper('giftwrap')->__('Manage Wrappable Products'),
                Mage::helper('giftwrap')->__('Manage Wrappable Products'));
        return $this;
    }

    /**
     *
     */
    public function indexAction() {
        if (!Mage::helper('magenotification')->checkLicenseKeyAdminController($this)) {
            return;
        }
        $this->_initAction()
            ->renderLayout();
    }

    /**
     *
     */
    public function productgridAction() {
        $this->loadLayout();
        $this->getResponse()->setBody(
            $this->getLayout()->createBlock('giftwrap/adminhtml_product_grid')->toHtml()
        );
    }

    /**
     *
     */
    public function enableAction() {
        $storeId = $this->getRequest()->getParam('store', 0);
        $productIds = $this->getRequest()->getParam('product');
        try {
            Mage::getSingleton('catalog/product_action')->updateAttributes($productIds, array('giftwrap' => Magestore_Giftwrap_Model_Giftwrap::STATUS_ENABLED), $storeId);
            $this->_getSession()->addSuccess(
                $this->__('%d product(s) were successfully enabled for wrapping.', count($productIds))
            );
        } catch (Exception $ex) {
            Mage::getSingleton('core/session')->addError($ex->getMessage());
        }
        $this->_redirect('*/*/');
    }

    /**
     *
     */
    public function disableAction() {
        $productIds = $this->getRequest()->getParam('product');
        $giftwrap = Magestore_Giftwrap_Model_Giftwrap::STATUS_DISABLED;
        $storeId = $this->getRequest()->getParam('store', 0);
        try {
            Mage::getSingleton('catalog/product_action')->updateAttributes($productIds, array('giftwrap' => $giftwrap), $storeId);
            $this->_getSession()->addSuccess(
                $this->__('%d product(s) were successfully disabled for wrapping.', count($productIds))
            );
        } catch (Exception $ex) {
            Mage::getSingleton('core/session')->addError($ex->getMessage());
        }
        $this->_redirect('*/*/');
    }

    /**
     * @return bool
     */
    protected function _isAllowed() {
        return true;
    }

}