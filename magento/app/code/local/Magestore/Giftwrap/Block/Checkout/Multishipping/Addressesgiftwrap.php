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
class Magestore_Giftwrap_Block_Checkout_Multishipping_Addressesgiftwrap extends Mage_Checkout_Block_Multishipping_Shipping
{
    /**
     * @return mixed
     */
    protected function _prepareLayout() {
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
    public function getBlockGiftwrapHtml() {
        return $this->getBlockHtml('giftwrap.giftwrap');
    }

    /**
     * @return mixed
     */
    public function getCheckout() {
        return Mage::getSingleton('checkout/type_multishipping');
    }

    /**
     * @return mixed
     */
    public function getAddresses() {
        return $this->getCheckout()->getQuote()->getAllShippingAddresses();
    }

    /**
     * @return int
     */
    public function getAddressCount() {
        $count = $this->getData('address_count');
        if (is_null($count)) {
            $count = count($this->getAddresses());
            $this->setData('address_count', $count);
        }
        return $count;
    }

    /**
     * @param $address
     * @return mixed
     */
    public function getAddressItems($address) {
        $items = array();
        foreach ($address->getAllItems() as $item) {
            if ($item->getParentItemId()) {
                continue;
            }
            $item->setQuoteItem($this->getCheckout()->getQuote()->getItemById($item->getQuoteItemId()));
            $items[] = $item;
        }
        $itemsFilter = new Varien_Filter_Object_Grid();
        $itemsFilter->addFilter(new Varien_Filter_Sprintf('%d'), 'qty');
        return $itemsFilter->filter($items);
    }

    /**
     * @param $address
     * @return mixed
     */
    public function getAddressShippingMethod($address) {
        return $address->getShippingMethod();
    }

    /**
     * @param $address
     * @return mixed
     */
    public function getShippingRates($address) {
        $groups = $address->getGroupedAllShippingRates();
        return $groups;
    }

    /**
     * @param $carrierCode
     * @return mixed
     */
    public function getCarrierName($carrierCode) {
        if ($name = Mage::getStoreConfig('carriers/' . $carrierCode . '/title')) {
            return $name;
        }
        return $carrierCode;
    }

    /**
     * @param $address
     * @return mixed
     */
    public function getAddressEditUrl($address) {
        return $this->getUrl('*/multishipping_address/editShipping', array('id' => $address->getCustomerAddressId()));
    }

    /**
     * @return mixed
     */
    public function getItemsEditUrl() {
        return $this->getUrl('*/*/backToAddresses');
    }

    /**
     * @return mixed
     */
    public function getPostActionUrl() {
        return $this->getUrl('checkout/multishipping/addressesPost', array('continue' => '1'));
    }

    /**
     * @return mixed
     */
    public function getBackUrl() {
        return $this->getUrl('giftwrap/multishipping/backtoaddresses');
    }

    /**
     * @param $address
     * @param $price
     * @param $flag
     * @return mixed
     */
    public function getShippingPrice($address, $price, $flag) {
        return $address->getQuote()->getStore()->convertPrice($this->helper('tax')->getShippingPrice($price, $flag, $address), true);
    }

    /**
     * @param null $address_id
     * @return mixed
     */
    public function getGiftboxCollection($address_id = null) {
        $quote = Mage::getSingleton('checkout/cart')->getQuote();
        if ($address_id == null) {
            $collection = Mage::getModel('giftwrap/selection')->getCollection()
                ->addFieldToFilter('quote_id', $quote->getId());
        }
        if ($address_id != null) {
            $collection = Mage::getModel('giftwrap/selection')->getCollection()
                ->addFieldToFilter('quote_id', $quote->getId())
                ->addFieldToFilter('addressgift_id', $address_id);
        }
        return $collection;
    }

}