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

class Magestore_Giftwrap_Block_Adminhtml_Sales_Order_View_Tab_Giftwrap extends Mage_Adminhtml_Block_Template implements Mage_Adminhtml_Block_Widget_Tab_Interface {

    /**
     *
     */
    public function _construct() {
        parent::_construct();
        $this->setTemplate('giftwrap/sales/order/view/tab/giftwrap.phtml');
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
        return Mage::registry('current_order');
    }

    /**
     * @param null $orderId
     * @return array
     */
    public function getOrderItemGiftwrap($orderId = null) {
//        $order_id = Mage::app()->getRequest()->getParam('order_id');
//        $invoice_id = Mage::app()->getRequest()->getParam('invoice_id');
        if (!$orderId) {
            $order = $this->getOrder();
        } else {
            $order = Mage::getModel('sales/order')->load($orderId);
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
     * @return array
     */
    public function getInvoiceItemGiftwrap() {
        $invoice_id = Mage::app()->getRequest()->getParam('invoice_id');
        $invoiceItems = Mage::getModel('sales/order_invoice_item')->getCollection()
                ->addFieldToFilter('parent_id', $invoice_id);
        $giftwrapCollection = array();
        foreach ($invoiceItems as $item) {
            $orderItemId = $item->getOrderItemId();
            $quoteItemId = Mage::getModel('sales/order_item')->getCollection()
                            ->addFieldToFilter('item_id', $orderItemId)->getFirstItem()->getQuoteItemId();
            $selectionId = Mage::getModel('giftwrap/selectionitem')->getCollection()
                            ->addFieldToFilter('item_id', $quoteItemId)->getFirstItem()->getSelectionId();
            if(Mage::getModel('giftwrap/selection')->load($selectionId)->getInvoiceId() == $invoice_id){
                $giftwrapCollection[] = Mage::getModel('giftwrap/selection')->load($selectionId);
            }
        }

        return $giftwrapCollection;
    }

    /**
     * @return array
     */
    public function getCreditmemoItemGiftwrap() {
        $creditmemo_id = Mage::app()->getRequest()->getParam('creditmemo_id');
        $creditmemoItems = Mage::getModel('sales/order_creditmemo_item')->getCollection()
                ->addFieldToFilter('parent_id', $creditmemo_id);
        $giftwrapCollection = array();
        foreach ($creditmemoItems as $item) {
            $orderItemId = $item->getOrderItemId();
            $quoteItemId = Mage::getModel('sales/order_item')->getCollection()
                            ->addFieldToFilter('item_id', $orderItemId)->getFirstItem()->getQuoteItemId();
            $selectionId = Mage::getModel('giftwrap/selectionitem')->getCollection()
                            ->addFieldToFilter('item_id', $quoteItemId)->getFirstItem()->getSelectionId();
            if(Mage::getModel('giftwrap/selection')->load($selectionId)->getCreditmemoId() == $creditmemo_id){
                $giftwrapCollection[] = Mage::getModel('giftwrap/selection')->load($selectionId);
            }
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
     * @param $quoteId
     * @return mixed
     */
    public function getAllGiftwrapItemInCart($quoteId) {
        //$quoteId = $this->getOrder()->getQuoteId();
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