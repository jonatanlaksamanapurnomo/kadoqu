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

class Magestore_Giftwrap_Block_Adminhtml_Sales_Order_Creditmemo_New_Giftwrap extends Mage_Adminhtml_Block_Template {

    /**
     *
     */
    public function _construct() {
        parent::_construct();
        $this->setTemplate('giftwrap/sales/order/creditmemo/new/giftwrap.phtml');
    }

    /**
     * @return mixed
     */
    public function getTabLabel() {
        return Mage::helper('giftwrap')->__('Gift Wrap Information');
    }

    /**
     * @return mixed
     */
    public function getTabTitle() {
        return Mage::helper('sales')->__('Gift Wrap Information');
    }

    /**
     * @return bool
     */
    public function canShowTab() {
        return true;
    }

    /**
     * @return bool
     */
    public function isHidden() {
        return false;
    }

    /**
     * @return mixed
     */
    public function getOrder() {
        if (Mage::registry('current_order'))
            return Mage::registry('current_order');
        else {
            $order_id = Mage::app()->getRequest()->getParam('order_id');
            $order = Mage::getModel('sales/order')->load($order_id);
            return $order;
        }
    }

    /**
     * @param null $orderId
     * @return array|void
     */
    public function getOrderItemGiftwrap($orderId = null) {
        if (!$orderId) {
            $order_id = Mage::app()->getRequest()->getParam('order_id');
        } else {
            $order_id = $orderId;
        }
        $invoice_id = Mage::app()->getRequest()->getParam('invoice_id');
        $shipment_id = Mage::app()->getRequest()->getParam('shipment_id');
        $creditmemo_id = Mage::app()->getRequest()->getParam('creditmemo_id');
        if ($order_id) {
            $order = Mage::getModel('sales/order')->load($order_id);
        } else if ($invoice_id) {
            $order = Mage::getModel('sales/order_invoice')->load($invoice_id)->getOrder();
        } else if ($shipment_id) {
            $order = Mage::getModel('sales/order_shipment')->load($shipment_id)->getOrder();
        } else if ($creditmemo_id) {
            $order = Mage::getModel('sales/order_creditmemo')->load($creditmemo_id)->getOrder();
        }
        $itemcollection = $order->getItemsCollection()
        ;

        //$item = $this->getParentBlock()->getItem();
        $lastItem = $itemcollection->getLastItem();
        if ($lastItem->getParentItemId()) {
            $lastId = $lastItem->getParentItemId();
        } else {
            $lastId = $lastItem->getId();
        }
       
        if ($lastId != $this->getParentBlock()->getItem()->getId()) {
            return array();
        }
        if (!$order->getId()) {
            $order = $this->getOrder();
        }
        $quoteId = $order->getQuoteId();
        $orderAddress = Mage::getModel('sales/order_address')->getCollection()
                ->addFieldToFilter('parent_id', $order->getId())
                ->addAttributeToSort('entity_id', 'DESC');
        ;
        foreach ($orderAddress as $address) {
            $addressCutomer = $address->getData('customer_address_id');
            break;
        }
        $giftwrapCollection = array();
        if ($quoteId) {
            $giftwrapCollection = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId($quoteId, null, null, $addressCutomer);
            /* if (count($giftwrapCollection) == 1 && $giftwrapCollection[0]['itemId'] == 0) {
              return $this->getAllGiftwrapItemInCart();
              } */
        }

        return $giftwrapCollection;
    }

    /**
     * @return bool
     */
    public function isGiftwrapAll() {
        $quoteId = $this->getOrder()->getQuoteId();
        if ($quoteId) {
            $giftwrapCollection = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId($quoteId);
            if (count($giftwrapCollection) == 1 && $giftwrapCollection[0]['itemId'] == 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * @return mixed
     */
    public function getAllGiftwrapItemInCart() {
        $quoteId = $this->getOrder()->getQuoteId();
        $selections = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId($quoteId);
        return $selections;
    }

    /**
     * @param $productId
     * @return mixed
     */
    public function getProduct($productId) {
        return Mage::getModel('catalog/product')->load($productId);
    }

    /**
     * @param $styleId
     * @return mixed
     */
    public function getGiftwrapStyleName($styleId) {
        return $this->getStyle($styleId)->getTitle();
    }

    /**
     * @param $giftcardId
     * @return mixed
     */
    public function getGiftcardName($giftcardId) {
        return $this->getGiftcard($giftcardId)->getName();
    }

    /**
     * @param $styleId
     * @return mixed
     */
    public function getGiftwrapStyleImage($styleId) {
        return $this->getStyle($styleId)->getImage();
    }

    /**
     * @param $giftcardId
     * @return mixed
     */
    public function getGiftcardImage($giftcardId) {
        return $this->getGiftcard($giftcardId)->getImage();
    }

    /**
     * @param $styleId
     * @return mixed
     */
    public function getStyle($styleId) {
        return Mage::getModel('giftwrap/giftwrap')->load($styleId);
    }

    /**
     * @param $giftcardId
     * @return mixed
     */
    public function getGiftcard($giftcardId) {
        return Mage::getModel('giftwrap/giftcard')->load($giftcardId);
    }

}
