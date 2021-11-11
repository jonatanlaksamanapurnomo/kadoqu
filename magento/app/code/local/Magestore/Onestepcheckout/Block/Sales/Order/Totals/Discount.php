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
 * @package     Magestore_Onestepcheckout
 * @copyright   Copyright (c) 2017 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 */

/**
 * Class Magestore_Onestepcheckout_Block_Sales_Order_Totals_Discount
 */
class Magestore_Onestepcheckout_Block_Sales_Order_Totals_Discount extends Mage_Sales_Block_Order_Totals
{

    /**
     *
     */
    public function initTotals()
    {
        // var_dump($this->discountAmount());
        if ($this->discountAmount() != 0) {
            $total = new Varien_Object();
            $total->setCode('onestepcheckoutdiscount');
            $total->setValue(-$this->discountAmount());
            $total->setBaseValue(-$this->baseDiscountAmout());
            $total->setLabel('Discount(Admin)');
            $parent = $this->getParentBlock();
            $parent->addTotal($total, 'subtotal');
        }
    }

    /**
     * @return mixed
     */
    public function discountAmount()
    {
        $order = $this->getParentBlock()->getOrder();
        // $order->setData('onestepcheckout_discount_amount',123)->save();
        // var_dump($order->getData());
        $discountAmount = $order->getOnestepcheckoutDiscountAmount();
        return $discountAmount;
    }

    /**
     * @return float|int
     */
    public function baseDiscountAmout()
    {
        $order = $this->getParentBlock()->getOrder();
        $discountAmount = $order->getOnestepcheckoutDiscountAmount();
        $orderCurrencyCode = $order->getOrderCurrency()->getCurrencyCode();
        $baseCurrencyCode = Mage::app()->getStore()->getBaseCurrencyCode();
        if ($baseCurrencyCode != $currentCurrencyCode) {
            $allowedCurrencies = Mage::getModel('directory/currency')->getConfigAllowCurrencies();
            $rates = Mage::getModel('directory/currency')->getCurrencyRates($baseCurrencyCode, array_values($allowedCurrencies));
            return $discountAmount / $rates[$orderCurrencyCode];
        } else {
            return $discountAmount;
        }
    }

}
