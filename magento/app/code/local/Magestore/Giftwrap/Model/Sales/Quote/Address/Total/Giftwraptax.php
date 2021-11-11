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

class Magestore_Giftwrap_Model_Sales_Quote_Address_Total_Giftwraptax extends Mage_Sales_Model_Quote_Address_Total_Abstract {

    /**
     * @param Mage_Sales_Model_Quote_Address $address
     * @return $this|void
     */
    public function collect(Mage_Sales_Model_Quote_Address $address) {
        $active = Mage::helper('giftwrap')->enableGiftwrap();
        if (!$active) {
            return $this;
        }
        if (Mage::app()->getStore()->isAdmin()) {
            return $this;
        }
        $quote = $address->getQuote();
        $items = $quote->getAllItems();
        if (!count($items)) {
            return $this;
        }
        if (!Mage::getStoreConfig('giftwrap/calculation/tax', Mage::app()->getStore(true)->getId())) {
            return $this;
        }
        $items = $this->_getAddressItems($address);
        $request = Mage::getSingleton('tax/calculation')->getRateRequest(
                $address, $address->getQuote()->getBillingAddress(), $address->getQuote()->getCustomerTaxClassId(), $this->_store
        );
        $giftwrapTax = 0;
        foreach ($items as $item) {
            if ($item->getParentItem()) {
                continue;
            }
            if ($item->getHasChildren() && $item->isChildrenCalculated()) {
                foreach ($item->getChildren() as $child) {
                    $request->setProductClassId($child->getProduct()->getTaxClassId());
                }
            } else {
                $request->setProductClassId($item->getProduct()->getTaxClassId());
            }
            $quoteItemId = $item->getItemId();
            $selectionItem = Mage::getResourceModel('giftwrap/selectionitem_collection')->addFieldToFilter('item_id', $quoteItemId)->getFirstItem();
            $selectionItemId = $selectionItem->getSelectionId();
            $rate = Mage::getSingleton('tax/calculation')->getRate($request);
            if (isset($selectionItemId)) {
                $giftwrapId = Mage::getResourceModel('giftwrap/selection_collection')
                                ->addFieldToFilter('id', $selectionItemId)
                                ->getFirstItem()->getStyleId();
                if ($giftwrapId) {
                    if ($selectionItem->getCalculateOnItem() == '1')
                        $giftwrapPrice = Mage::getResourceModel('giftwrap/giftwrap_collection')->addFieldToFilter('giftwrap_id', $giftwrapId)->getFirstItem()->getPrice() * $item->getQty();
                    else
                        $giftwrapPrice = Mage::getResourceModel('giftwrap/giftwrap_collection')->addFieldToFilter('giftwrap_id', $giftwrapId)->getFirstItem()->getPrice();
                }
                $giftcardId = Mage::getResourceModel('giftwrap/selection_collection')->addFieldToFilter('id', $selectionItemId)->getFirstItem()->getGiftcardId();
                if ($giftcardId) {
                    if ($selectionItem->getCalculateOnItem() == '1')
                        $giftcardPrice = Mage::getResourceModel('giftwrap/giftcard_collection')->addFieldToFilter('giftcard_id', $giftcardId)->getFirstItem()->getPrice() * $item->getQty();
                    else
                        $giftcardPrice = Mage::getResourceModel('giftwrap/giftcard_collection')->addFieldToFilter('giftcard_id', $giftcardId)->getFirstItem()->getPrice();
                }
                $giftwrapAmountItem = $giftwrapPrice + $giftcardPrice;
                $giftwrapTaxItem = $giftwrapAmountItem * $rate / 100;
                $item->setGiftwrapTax($giftwrapTaxItem);              
                 $giftwrapTax += $giftwrapTaxItem;
            }
        }
        Mage::getModel('core/session')->setData('giftwrap_rate', $rate);
        $address->setGiftwrapTax($giftwrapTax);
        $address->setBaseGiftwrapTax(0);
        Mage::getModel('core/session')->setData('giftwrap_tax', $giftwrapTax);
        $address->setGrandTotal($address->getGrandTotal() + $giftwrapTax);
        $address->setBaseGrandTotal($address->getBaseGrandTotal() + $giftwrapTax);

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
        $amount = $address->getGiftwrapTax();
        $title = Mage::helper('sales')->__('Gift Wrap Tax');
        if ($amount != 0) {
            $address->addTotal(array(
                'code' => $this->getCode(),
                'title' => $title,
                'value' => $amount
            ));
        }
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCheckoutSession() {
        return Mage::getSingleton('checkout/session');
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
