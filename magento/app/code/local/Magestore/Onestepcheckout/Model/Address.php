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
 * Class Magestore_Onestepcheckout_Model_Address
 */
class Magestore_Onestepcheckout_Model_Address extends Mage_Sales_Model_Quote_Address
{

    /**
     * @return array|bool
     */
    public function validate()
    {
        if (Mage::helper('onestepcheckout')->enabledOnestepcheckout()) {
            $errors = array();
            $helper = Mage::helper('customer');
            $this->implodeStreetAddress();
            if (!Zend_Validate::is($this->getFirstname(), 'NotEmpty')) {
                $errors[] = $helper->__('Please enter the first name.');
            }

            if (!Zend_Validate::is($this->getLastname(), 'NotEmpty')) {
                $errors[] = $helper->__('Please enter the last name.');
            }

            if (!Zend_Validate::is($this->getStreet(1), 'NotEmpty')) {
                $errors[] = $helper->__('Please enter the street.');
            }
        } else {
            return parent::validate();
        }
    }

}
