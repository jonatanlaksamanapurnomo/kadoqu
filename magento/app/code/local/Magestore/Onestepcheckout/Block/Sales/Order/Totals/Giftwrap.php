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
 * Class Magestore_Onestepcheckout_Block_Sales_Order_Totals_Giftwrap
 */
class Magestore_Onestepcheckout_Block_Sales_Order_Totals_Giftwrap extends Mage_Sales_Block_Order_Totals
{

    /**
     *
     */
    public function initTotals()
    {
        if ($this->giftwrapAmount() > 0) {
            $total = new Varien_Object();
            $total->setCode('giftwrap');
            $total->setValue($this->giftwrapAmount());
            $total->setBaseValue($this->baseGiftwrapAmout());
            $total->setLabel('Gift wrap');
            $parent = $this->getParentBlock();
            $parent->addTotal($total, 'subtotal');
        }
    }

    /**
     * @return mixed
     */
    public function giftwrapAmount()
    {
        $order = $this->getParentBlock()->getOrder();
        $giftwrapAmount = $order->getOnestepcheckoutGiftwrapAmount();
        return $giftwrapAmount;
    }

    /**
     * @return float|int
     */
    public function baseGiftwrapAmout()
    {
        $order = $this->getParentBlock()->getOrder();
        $giftwrapAmount = $order->getOnestepcheckoutGiftwrapAmount();
        $orderCurrencyCode = $order->getOrderCurrency()->getCurrencyCode();
        $baseCurrencyCode = Mage::app()->getStore()->getBaseCurrencyCode();
        if ($baseCurrencyCode != $orderCurrencyCode) {
            $allowedCurrencies = Mage::getModel('directory/currency')->getConfigAllowCurrencies();
            $rates = Mage::getModel('directory/currency')->getCurrencyRates($baseCurrencyCode, array_values($allowedCurrencies));
            return $giftwrapAmount / $rates[$orderCurrencyCode];
        } else {
            return $giftwrapAmount;
        }
    }

}
