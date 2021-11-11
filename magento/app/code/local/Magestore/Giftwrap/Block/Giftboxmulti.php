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
class Magestore_Giftwrap_Block_Giftboxmulti extends Mage_Core_Block_Template
{
    /**
     * @return mixed
     */
    public function _prepareLayout() {
        return parent::_prepareLayout();
    }


    /**
     * @return mixed
     */
    public function getAddresses() {
        return $this->getCheckout()->getQuote()->getAllShippingAddresses();
    }

    /**
     * @return mixed
     */
    public function getAddress_id() {
        return $this->getRequest()->getParam('id');
    }

    /**
     * @param $order
     * @return array|void
     */
    public function getGiftboxInOrder($order) {
        $itemcollection = $order->getItemsCollection();
        $itemGiftvoucherRenderer = $this->getLayout()->getBlock('items')->getItemRenderer('giftvoucher');
        $itemDefaultRenderer = $this->getLayout()->getBlock('items')->getItemRenderer();
        $item_ids = array();
        if ($itemGiftvoucherRenderer->getItem()) {
            $itemGiftvoucher = $itemGiftvoucherRenderer->getItem();
            $item_ids[] = $itemGiftvoucher->getId();
        }
        if ($itemDefaultRenderer->getItem()) {
            $itemDefault = $itemDefaultRenderer->getItem();
            $item_ids[] = $itemDefault->getId();
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
        $orderAddress = Mage::getModel('sales/order_address')->getCollection()
            ->addFieldToFilter('parent_id', $order_id)
            ->addAttributeToSort('entity_id', 'DESC');;
        foreach ($orderAddress as $address) {
            $addressCutomer = $address->getData('customer_address_id');
            break;
            $giftwrapCollection = array();
            if ($quoteId) {
                $giftwrapCollection = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId($quoteId, null, null, $addressCutomer);
            }
            return $giftwrapCollection;
        }
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