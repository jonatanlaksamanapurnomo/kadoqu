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
 * @package     MageGiant_LiveLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * LiveLogin Helper
 *
 * @category    MageGiant
 * @package     MageGiant_LiveLogin
 * @author      MageGiant Developer
 */
class Magegiant_LiveLogin_Helper_Data extends Mage_Core_Helper_Abstract
{

    const XML_PATH_LIVE        = 'sociallogin/live/';
    const XML_PATH_LIVE_ENABLE = 'sociallogin/live/enable';

    /**
     * get facebook api config
     *
     * @param type $code
     * @param type $store
     * @return type
     */
    function getLiveConfig($code, $store = null)
    {
        if (!$store)
            $store = Mage::app()->getStore()->getId();

        return Mage::getStoreConfig(self::XML_PATH_LIVE . $code, $store);
    }

    /**
     * check facebook login is enabled
     *
     * @param mixed $store
     * @return boolean
     */
    public function isEnabled($store = null)
    {
        return Mage::getStoreConfigFlag(self::XML_PATH_LIVE_ENABLE, $store);
    }

    /**
     * get live button sort order
     *
     * @return type
     */
    public function getSortOrder()
    {
        return $this->getLiveConfig('sort_order');
    }

    /**
     * get live button
     *
     * @return image html
     */
    public function getLiveButton()
    {
        return Mage::getBlockSingleton('livelogin/livelogin');
    }

    /**
     * get Authenticat url live
     *
     * @return string url
     */
    public function getAuthUrlLive()
    {
        $isSecure = Mage::getStoreConfig('web/secure/use_in_frontend');

        return $this->_getUrl('livelogin/index/callback', array('_secure' => $isSecure, 'auth' => 1));
    }

}