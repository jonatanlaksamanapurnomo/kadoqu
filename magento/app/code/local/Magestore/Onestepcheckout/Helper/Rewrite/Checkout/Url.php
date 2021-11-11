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
 * Class Magestore_Onestepcheckout_Helper_Rewrite_Checkout_Url
 */
class Magestore_Onestepcheckout_Helper_Rewrite_Checkout_Url extends Mage_Checkout_Helper_Url
{

    /**
     * @return string
     */
    public function getCheckoutUrl()
    {
        if (Mage::helper('onestepcheckout')->enabledOnestepcheckout() 
                && Mage::helper('core')->isModuleOutputEnabled('Magestore_Onestepcheckout'))
            return Mage::getUrl('onestepcheckout/index', array('_secure' => true));
        else
            return $this->_getUrl('checkout/onepage');
    }

}
