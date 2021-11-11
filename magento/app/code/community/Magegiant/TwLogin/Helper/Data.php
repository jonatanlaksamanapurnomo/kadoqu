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
 * @package     MageGiant_TwLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * TwLogin Helper
 *
 * @category    MageGiant
 * @package     MageGiant_TwLogin
 * @author      MageGiant Developer
 */
class Magegiant_TwLogin_Helper_Data extends Mage_Core_Helper_Abstract
{

    const XML_PATH_TWITTER        = 'sociallogin/tw/';
    const XML_PATH_TWITTER_ENABLE = 'sociallogin/tw/enable';

    /**
     * get twitter api config
     *
     * @param type $code
     * @param type $store
     * @return type
     */
    function getTwConfig($code, $store = null)
    {
        if (!$store)
            $store = Mage::app()->getStore()->getId();

        return Mage::getStoreConfig(self::XML_PATH_TWITTER . $code, $store);
    }

    /**
     * check twitter login is enabled
     *
     * @param mixed $store
     * @return boolean
     */
    public function isEnabled($store = null)
    {
        return Mage::getStoreConfigFlag(self::XML_PATH_TWITTER_ENABLE, $store);
    }

    /**
     * get Twitter sort order
     * @return type
     */
    public function getSortOrder()
    {
        return $this->getTwConfig('sort_order');
    }

    /**
     * @return Mage_Core_Block_Abstract
     */
    public function getTwButton()
    {
        return Mage::getBlockSingleton('twlogin/twlogin');
    }


}