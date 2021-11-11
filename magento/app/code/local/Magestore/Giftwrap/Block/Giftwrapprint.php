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

class Magestore_Giftwrap_Block_Giftwrapprint extends Mage_Core_Block_Template {

    /**
     *
     */
    public function _prepareLayout() {
        parent::_prepareLayout();
        $action = $this->getRequest()->getActionName();
        if ($action == 'printInvoice') {
            $this->setTemplate('giftwrap/sales/order/invoice/giftwrapprint.phtml');
        } else if ($action == 'printCreditmemo') {
            $this->setTemplate('giftwrap/sales/order/creditmemo/giftwrapprint.phtml');
        } else {
            $this->setTemplate('giftwrap/sales/order/view/giftwrapprint.phtml');
        }
    }

    /**
     * @return mixed
     */
    public function getGiftwrap() {
        if (!$this->hasData('giftwrap')) {
            $this->setData('giftwrap', Mage::registry('giftwrap'));
        }
        return $this->getData('giftwrap');
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

    /**
     * @return array
     */
    public function getOrderItemGiftwrap() {
        $order_id = Mage::app()->getRequest()->getParam('order_id');
        $order = Mage::getModel('sales/order')->load($order_id);
        $giftboxCollection = Mage::getModel('giftwrap/selection')
                ->getCollection()
                ->addFieldToFilter('order_id', $order_id);
        $itemcollection = $order->getItemsCollection();
        $is_last = true;
        $lastItem = $itemcollection->getLastItem();
        if ($lastItem->getParentItemId()) {
            $lastId = $lastItem->getParentItemId();
        } else {
            $lastId = $lastItem->getId();
        }
        if ($lastId != $this->getParentBlock()->getItem()->getId()) {
            $is_last = false;
        }
        $giftwrapItems = array();
        $hasGiftwrap = false;
        if (count($giftboxCollection) && $is_last) {
            $hasGiftwrap = true;
        }
        if ($hasGiftwrap) {
            foreach ($giftboxCollection as $selection) {
                $giftwrapItems[] = array(
                    'id' => $selection->getId(),
                    'quantity' => $selection->getQty(),
                    'itemId' => $selection->getItemId(),
                    'styleId' => $selection->getStyleId(),
                    'giftcardId' => $selection->getGiftcardId(),
                    'quoteId' => $selection->getQuoteId(),
                    'character' => $selection->getCharacter(),
                    'giftwrap_message' => $selection->getMessage(),
                    'calculate_by_item' => $selection->getCalculateByItem()
                );
            }
        }
        return $giftwrapItems;
    }

    /**
     * @return array
     */
    public function getInvoiceItemGiftwrap() {
        $giftwrapItems = array();
        $invoiceItem = $this->getParentBlock()->getItem();
        $invoice_id = $invoiceItem->getParentId();
        $invoice = Mage::getModel('sales/order_invoice')
                ->load($invoice_id);
        $itemscollection = $invoice->getItemsCollection();
        $lastItem = $itemscollection->getLastItem();
        $hasGiftwrap = true;

        $lastOrderItem = Mage::getModel('sales/order_item')
                ->load($lastItem->getOrderItemId())
        ;
        if ($lastOrderItem->getParentItemId()) {
            $orderItemId = $lastOrderItem->getParentItemId();
        } else {
            $orderItemId = $lastOrderItem->getId();
        }
        $lastId = Mage::getModel('sales/order_invoice_item')
                ->getCollection()
                ->addFieldToFilter('parent_id', $invoice_id)
                ->addFieldToFilter('order_item_id', $orderItemId)
                ->getFirstItem()
                ->getId();

        if ($lastId != $invoiceItem->getId()) {
            $hasGiftwrap = false;
        }
        if ($invoice_id) {
            $giftboxCollection = Mage::getModel('giftwrap/selection')
                    ->getCollection()
                    ->addFieldToFilter('invoice_id', $invoice_id);
        }
        if ($hasGiftwrap && count($giftboxCollection) > 0) {
            foreach ($giftboxCollection as $selection) {
                $giftwrapItems[] = array(
                    'id' => $selection->getId(),
                    'quantity' => $selection->getQty(),
                    'itemId' => $selection->getItemId(),
                    'styleId' => $selection->getStyleId(),
                    'giftcardId' => $selection->getGiftcardId(),
                    'quoteId' => $selection->getQuoteId(),
                    'character' => $selection->getCharacter(),
                    'giftwrap_message' => $selection->getMessage(),
                    'calculate_by_item' => $selection->getCalculateByItem()
                );
            }
        }
        return $giftwrapItems;
    }

    /**
     * @return array
     */
    public function getCreditmemoItemGiftwrap() {
        $giftwrapItems = array();
        $creditmemoItem = $this->getParentBlock()->getItem();
        $creditmemo_id = $creditmemoItem->getParentId();
        $creditmemo = Mage::getModel('sales/order_creditmemo')
                ->load($creditmemo_id);
        $itemscollection = $creditmemo->getItemsCollection();
        $lastItem = $itemscollection->getLastItem();
        $hasGiftwrap = true;

        $lastOrderItem = Mage::getModel('sales/order_item')
                ->load($lastItem->getOrderItemId())
        ;
        if ($lastOrderItem->getParentItemId()) {
            $orderItemId = $lastOrderItem->getParentItemId();
        } else {
            $orderItemId = $lastOrderItem->getId();
        }
        $lastId = Mage::getModel('sales/order_creditmemo_item')
                ->getCollection()
                ->addFieldToFilter('parent_id', $creditmemo_id)
                ->addFieldToFilter('order_item_id', $orderItemId)
                ->getFirstItem()
                ->getId();
        if ($lastId != $creditmemoItem->getId()) {
            $hasGiftwrap = false;
        }
        if ($creditmemo_id) {
            $giftboxCollection = Mage::getModel('giftwrap/selection')
                    ->getCollection()
                    ->addFieldToFilter('creditmemo_id', $creditmemo_id);
        }
        if ($hasGiftwrap && count($giftboxCollection) > 0) {
            foreach ($giftboxCollection as $selection) {
                $giftwrapItems[] = array(
                    'id' => $selection->getId(),
                    'quantity' => $selection->getQty(),
                    'itemId' => $selection->getItemId(),
                    'styleId' => $selection->getStyleId(),
                    'giftcardId' => $selection->getGiftcardId(),
                    'quoteId' => $selection->getQuoteId(),
                    'character' => $selection->getCharacter(),
                    'giftwrap_message' => $selection->getMessage(),
                    'calculate_by_item' => $selection->getCalculateByItem()
                );
            }
        }
        return $giftwrapItems;
    }

}