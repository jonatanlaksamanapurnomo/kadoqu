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
class Magestore_Giftwrap_Block_Giftbox extends Mage_Core_Block_Template
{

    /**
     * @return mixed
     */
    public function _prepareLayout() {
        return parent::_prepareLayout();
    }

    /**
     * @return array
     */
    public function getAllPapers() {
        $papers = Mage::getModel('giftwrap/giftwrap')
            ->getCollection()
            ->addFieldToFilter(
                'store_id', Mage::app()->getStore()->getId())
            ->addFieldToFilter('status', 1);
        $list = array();
        foreach ($papers as $paper) {
            $list[] = $paper;
        }
        return $list;
    }

    /**
     * @return mixed
     */
    public function getAllGiftcards() {
        $gifcards = Mage::getModel('giftwrap/giftcard')->getCollection()
            ->addFieldToFilter(
                'store_id', Mage::app()->getStore()
                ->getId())
            ->addFieldToFilter('status', 1);
        return $gifcards;
    }

    /**
     * @return mixed
     */
    public function getGiftboxCollection() {
        $quote = Mage::getSingleton('checkout/cart')->getQuote();
        $collection = Mage::getModel('giftwrap/selection')->getCollection()
            ->addFieldToFilter('quote_id', $quote->getId());
        $selection_ids = array();
        if (count($collection) && !Mage::helper('customer')->isLoggedIn()) {
            foreach ($collection as $value) {
                $selection_ids[] = $value->getId();
            }
            $cache = array();

            $items = $quote->getItemsCollection();
            foreach ($items as $item) {
                $productId = $item->getProduct()->getId();
                $cache[$item->getId()] = $productId;
            }
            $object = new Varien_Object();
            $object->setData('item_list', $cache);
            Mage::getModel('core/session')->setData('cache', $cache);
            Mage::getModel('core/session')->setData('quote_giftwrap', $quote->getId());
        }
        return $collection;
    }

    /**
     * @param $order
     * @return array
     */
    public function getGiftboxInOrder($order) {

        $itemcollection = $order->getItemsCollection();
        $itemGiftvoucherRenderer = $this->getLayout()->getBlock('items')->getItemRenderer('giftvoucher');
        $itemDefaultRenderer = $this->getLayout()->getBlock('items')->getItemRenderer();
        $item_ids = array();
        if ($itemGiftvoucherRenderer->getItem()) {
            $itemGiftvoucher = $itemGiftvoucherRenderer->getItem();
            if ($itemGiftvoucher->getOrderItemId()) {
                $item_ids[] = $itemGiftvoucher->getOrderItemId();
            } else {
                $item_ids[] = $itemGiftvoucher->getId();
            }
        }
        if ($itemDefaultRenderer->getItem()) {
            $itemDefault = $itemDefaultRenderer->getItem();
            if ($itemDefault->getOrderItemId()) {
                $item_ids[] = $itemDefault->getOrderItemId();
            } else {
                $item_ids[] = $itemDefault->getId();
            }
        }
        $lastItem = $itemcollection->getLastItem();
        if ($lastItem->getParentItemId()) {
            $lastId = $lastItem->getParentItemId();
        } else {
            $lastId = $lastItem->getId();
        }

        if (count($item_ids)) {
            if (!in_array($lastId, $item_ids)) {
                return array();
            }
        }

        $quoteId = $order->getQuoteId();
        $orderAddress = Mage::getModel('sales/order_address')->getCollection()
            ->addFieldToFilter('parent_id', $order->getId())
            ->addAttributeToSort('entity_id', 'DESC');

        foreach ($orderAddress as $address) {
            $addressCutomer = $address->getData('customer_address_id');
            break;
        }
        $giftwrapCollection = array();
        if ($quoteId) {
            $giftwrapCollection = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId($quoteId, null, null, $addressCutomer);
        }
        return $giftwrapCollection;
    }

    /**
     * @return mixed
     */
    protected function _beforeToHtml() {
        if (!Mage::helper('magenotification')->checkLicenseKey('Giftwrap')) {
            $this->setTemplate(null);
        }
        return parent::_beforeToHtml();
    }

}