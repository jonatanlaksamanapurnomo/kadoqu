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
class Magestore_Giftwrap_Model_Paypal_Standard extends Mage_Paypal_Model_Standard
{
    /**
     * @return mixed
     */
    public function getStandardCheckoutFormFields() {
        $orderIncrementId = $this->getCheckout()->getLastRealOrderId();
        $order = Mage::getModel('sales/order')->loadByIncrementId($orderIncrementId);
        $api = Mage::getModel('paypal/api_standard')->setConfigObject($this->getConfig());
        $api->setOrderId($orderIncrementId)
            ->setCurrencyCode($order->getBaseCurrencyCode())
            ->setOrder($order)
            ->setNotifyUrl(Mage::getUrl('paypal/ipn/'))
            ->setReturnUrl(Mage::getUrl('paypal/standard/success'))
            ->setCancelUrl(Mage::getUrl('paypal/standard/cancel'));

        // export address
        $isOrderVirtual = $order->getIsVirtual();
        $address = $isOrderVirtual ? $order->getBillingAddress() : $order->getShippingAddress();
        if ($isOrderVirtual) {
            $api->setNoShipping(true);
        } elseif ($address->validate()) {
            $api->setAddress($address);
        }

        // add cart totals and line items
        $api->setPaypalCart(Mage::getModel('paypal/cart', array($order)))
            ->setIsLineItemsEnabled($this->_config->lineItemsEnabled);
        if (!$this->_config->lineItemsEnabled) {
            $api->setCartSummary($this->_getAggregatedCartSummary());
        }

        $result = $api->getStandardCheckoutRequest();
        if ($order->getGiftwrapAmount() > 0) {
            $result['amount'] -= $result['shipping'] + $result['tax'] + $result['discount_amount'];
            $result['amount'] += $order->getGiftwrapAmount();
            if ($order->getGiftwrapTax() > 0) {
                $result['amount'] += $order->getGiftwrapTax();
            }
        }
        $result['amount'] = (string)$result['amount'];
        return $result;
    }
}