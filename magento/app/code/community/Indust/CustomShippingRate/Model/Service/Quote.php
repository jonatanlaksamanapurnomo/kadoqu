<?php
/**
 * Admin Custom Shipping Rate
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to jeffk@industrialtechware.com so we can send you a copy immediately.
 *
 * @category   Indust
 * @package    Indust_CustomShippingRate
 * @author     Jeff Kieke <jeffk@industrialtechware.com>
 * @copyright  Copyright (c) 2010, Jeff Kieke
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Quote submit service model
 */
class Indust_CustomShippingRate_Model_Service_Quote extends Mage_Sales_Model_Service_Quote
{
    protected $_code    = 'customshippingrate';

    /**
     * Validate quote data before converting to order
     *
     * @return Mage_Sales_Model_Service_Quote
     */
    protected function _validate()
    {
        $helper = Mage::helper('sales');
        if (!$this->getQuote()->isVirtual()) {
            $address = $this->getQuote()->getShippingAddress();
            $addressValidation = $address->validate();
            if ($addressValidation !== true) {
                Mage::throwException(
                    $helper->__('Please check shipping address information. %s', implode(' ', $addressValidation))
                );
            }
            $method= $address->getShippingMethod();
            $rate  = $address->getShippingRateByCode($method);
            if (!$this->getQuote()->isVirtual() && (!$method || !$rate) && ($method != $this->_code)) {
                Mage::throwException($helper->__('Please specify shipping method.'));
            }
        }

        $addressValidation = $this->getQuote()->getBillingAddress()->validate();
        if ($addressValidation !== true) {
            Mage::throwException(
                $helper->__('Please check billing address information. %s', implode(' ', $addressValidation))
            );
        }

        if (!($this->getQuote()->getPayment()->getMethod())) {
            Mage::throwException($helper->__('Please select valid payment method.'));
        }
        return $this;
    }

}
