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
class Magestore_Giftwrap_Model_Sales_Quote_Address_Total_Admingiftwrap extends Mage_Sales_Model_Quote_Address_Total_Abstract
{


    /**
     * @param Mage_Sales_Model_Quote_Address $address
     * @return $this|void
     */
    public function collect(Mage_Sales_Model_Quote_Address $address) {
        $active = Mage::helper('giftwrap')->enableGiftwrap();
        if (!$active) {
            return $this;
        }
        if (!Mage::app()->getStore()->isAdmin()) {
            return $this;
        }
        $items = $address->getAllItems();
        if (!count($items)) {
            return $this;
        }
        $address_id = $address->getId();
        $giftwrapAmount = Mage::helper('giftwrap')->giftwrapAmountAdmin(null, $address_id);
        $address->setGiftwrapAmount($giftwrapAmount);
        $address->setBaseGiftwrapAmount($giftwrapAmount);
        Mage::getModel('core/session')->setData('giftwrap_amount', $giftwrapAmount);

        $address->setGrandTotal($address->getGrandTotal() + $address->getGiftwrapAmount());
        $address->setBaseGrandTotal($address->getBaseGrandTotal() + $address->getGiftwrapAmount());
        return $this;
    }

    /**
     * @param Mage_Sales_Model_Quote_Address $address
     * @return $this|void
     */
    public function fetch(Mage_Sales_Model_Quote_Address $address) {
        $active = Mage::helper('giftwrap')->enableGiftwrap();
        if (!$active) {
            return $this;
        }

        if (!Mage::app()->getStore()->isAdmin()) {
            return $this;
        }

        $amount = Mage::helper('giftwrap')->giftwrapAmountAdmin(null, $address_id);
        $title = Mage::helper('sales')->__('Gift Wrap');

        if ($amount != 0) {
            $address->addTotal(array(
                'code' => 'giftwrap',
                'title' => $title,
                'value' => $amount / 2
            ));
        }
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCheckoutSession() {
        return Mage::getSingleton('adminhtml/session_quote');
    }

    /**
     * @return mixed
     */
    public function getQuote() {
        return $this->getCheckoutSession()->getQuote();
    }

    /**
     * @param $itemId
     * @return string
     */
    public function getProductName($itemId) {
        $item = $this->getQuote()->getItemById($itemId);
        if ($item) {
            return $item->getProduct()->getName();
        } else {
            return '';
        }
    }

}
