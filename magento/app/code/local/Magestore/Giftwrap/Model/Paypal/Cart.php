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
class Magestore_Giftwrap_Model_Paypal_Cart extends Mage_Paypal_Model_Cart
{
    /**
     *
     */
    const TOTAL_GIFTWRAP = 'giftwrap';
    const TOTAL_GIFTWRAP_TAX = 'giftwrap_tax';

    /**
     *
     */
    public function _render() {
        if (!$this->_shouldRender) {
            return;
        }
        $giftwrap = 0;
        $giftwrapTax = 0;
        if (Mage::getModel('core/session')->getData('giftwrap_amount') > 0) {
            $giftwrap = Mage::getModel('core/session')->getData('giftwrap_amount');
        }
        if (Mage::getStoreConfig('giftwrap/calculation/active', Mage::app()->getStore(true)->getId())) {
            $percent = Mage::getStoreConfig('giftwrap/tax/percent', Mage::app()->getStore(true)->getId());
            if ($percent) {
                $giftwrapTax = floatval($percent) * floatval($giftwrap) / 100;
            }
        }
        $this->_items = array();
        foreach ($this->_salesEntity->getAllItems() as $item) {
            if (!$item->getParentItem()) {
                $this->_addRegularItem($item);
            }
        }
        end($this->_items);
        $lastRegularItemKey = key($this->_items);

        // regular totals
        if ($this->_salesEntity instanceof Mage_Sales_Model_Order) {
            $shippingDescription = $this->_salesEntity->getShippingDescription();
            $this->_totals = array(
                self::TOTAL_SUBTOTAL => $this->_salesEntity->getBaseSubtotal(),
                self::TOTAL_TAX => $this->_salesEntity->getBaseTaxAmount(),
                self::TOTAL_SHIPPING => $this->_salesEntity->getBaseShippingAmount(),
                self::TOTAL_DISCOUNT => abs($this->_salesEntity->getBaseDiscountAmount()),
                self::TOTAL_GIFTWRAP => $giftwrap,
                self::TOTAL_GIFTWRAP_TAX => $giftwrapTax,
            );
            $this->_applyHiddenTaxWorkaround($this->_salesEntity);
        } else {
            $address = $this->_salesEntity->getIsVirtual() ?
                $this->_salesEntity->getBillingAddress() : $this->_salesEntity->getShippingAddress();
            $shippingDescription = $address->getShippingDescription();
            $this->_totals = array(
                self::TOTAL_SUBTOTAL => $this->_salesEntity->getBaseSubtotal(),
                self::TOTAL_TAX => $address->getBaseTaxAmount(),
                self::TOTAL_SHIPPING => $address->getBaseShippingAmount(),
                self::TOTAL_DISCOUNT => abs($address->getBaseDiscountAmount()),
                self::TOTAL_GIFTWRAP => $giftwrap,
                self::TOTAL_GIFTWRAP_TAX => $giftwrapTax,
            );
            $this->_applyHiddenTaxWorkaround($address);
        }
        $originalDiscount = $this->_totals[self::TOTAL_DISCOUNT];

        // arbitrary items, total modifications
        Mage::dispatchEvent('paypal_prepare_line_items', array('paypal_cart' => $this));

        // distinguish original discount among the others
        if ($originalDiscount > 0.0001 && isset($this->_totalLineItemDescriptions[self::TOTAL_DISCOUNT])) {
            $this->_totalLineItemDescriptions[self::TOTAL_DISCOUNT][] = Mage::helper('sales')->__('Discount (%s)', Mage::app()->getStore()->convertPrice($originalDiscount, true, false));
        }

        // discount, shipping as items
        if ($this->_isDiscountAsItem && $this->_totals[self::TOTAL_DISCOUNT]) {
            $this->addItem(Mage::helper('paypal')->__('Discount'), 1, -1.00 * $this->_totals[self::TOTAL_DISCOUNT],
                $this->_renderTotalLineItemDescriptions(self::TOTAL_DISCOUNT)
            );
        }
        if ($this->_isShippingAsItem && (float)$this->_totals[self::TOTAL_SHIPPING]) {
            $this->addItem(Mage::helper('paypal')->__('Shipping'), 1, (float)$this->_totals[self::TOTAL_SHIPPING],
                $this->_renderTotalLineItemDescriptions(self::TOTAL_SHIPPING, $shippingDescription)
            );
        }

        if ($giftwrap > 0) {
            $this->addItem(Mage::helper('paypal')->__('Giftwrap'), 1, (float)$giftwrap,
                $this->_renderTotalLineItemDescriptions(self::TOTAL_GIFTWRAP, 'Giftwrap')
            );
        }

        if ($giftwrapTax > 0) {
            $this->addItem(Mage::helper('paypal')->__('Giftwrap Tax'), 1, (float)$giftwrapTax,
                $this->_renderTotalLineItemDescriptions(self::TOTAL_GIFTWRAP_TAX, 'Giftwrap Tax')
            );
        }
        // compound non-regular items into subtotal
        foreach ($this->_items as $key => $item) {
            if ($key > $lastRegularItemKey && $item->getAmount() != 0) {
                $this->_totals[self::TOTAL_SUBTOTAL] += $item->getAmount();
            }
        }
        $this->_validate();
        $this->_shouldRender = false;
    }

    /**
     * @param $salesEntity
     */
    private function _applyHiddenTaxWorkaround($salesEntity) {
        $this->_totals[self::TOTAL_TAX] += (float)$salesEntity->getBaseHiddenTaxAmount();
        $this->_totals[self::TOTAL_TAX] += (float)$salesEntity->getBaseShippingHiddenTaxAmount();
    }
}