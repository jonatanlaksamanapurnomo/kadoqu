<?php
/**
 * MageGiant
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the MageGiant.com license that is
 * available through the world-wide-web at this URL:
 * http://magegiant.com/license-agreement/
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    MageGiant
 * @package     MageGiant_YhLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * YhLogin Helper
 *
 * @category    MageGiant
 * @package     MageGiant_YhLogin
 * @author      MageGiant Developer
 */
class Magegiant_YhLogin_Helper_Data extends Mage_Core_Helper_Abstract
{

    const XML_PATH_YAHOO        = 'sociallogin/yh/';
    const XML_PATH_YAHOO_ENABLE = 'sociallogin/yh/enable';

    /**
     * get facebook api config
     *
     * @param type $code
     * @param type $store
     * @return type
     */
    function getYhConfig($code, $store = null)
    {
        if (!$store)
            $store = Mage::app()->getStore()->getId();

        return Mage::getStoreConfig(self::XML_PATH_YAHOO . $code, $store);
    }

    /**
     * check facebook login is enabled
     *
     * @param mixed $store
     * @return boolean
     */
    public function isEnabled($store = null)
    {
        return Mage::getStoreConfigFlag(self::XML_PATH_YAHOO_ENABLE, $store);
    }

    public function getSortOrder()
    {
        return $this->getYhConfig('sort_order');
    }

    public function getYhButton()
    {
        return Mage::app()->getLayout()->createBlock('yhlogin/yhlogin');
    }
}