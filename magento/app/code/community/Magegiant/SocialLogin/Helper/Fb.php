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
 * @package     MageGiant_SocialLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * SocialLogin Helper
 *
 * @category    MageGiant
 * @package     MageGiant_SocialLogin
 * @author      MageGiant Developer
 */
class Magegiant_SocialLogin_Helper_Fb extends Mage_Core_Helper_Abstract
{
    const XML_PATH_FACEBOOK        = 'sociallogin/fb/';
    const XML_PATH_FACEBOOK_ENABLE = 'sociallogin/fb/enable';

    /**
     * get facebook api config
     *
     * @param type $code
     * @param type $store
     * @return type
     */
    function getFbConfig($code, $store = null)
    {
        if (!$store)
            $store = Mage::app()->getStore()->getId();

        return Mage::getStoreConfig(self::XML_PATH_FACEBOOK . $code, $store);
    }

    /**
     * check facebook login is enabled
     *
     * @param mixed $store
     * @return boolean
     */
    public function isEnabled($store = null)
    {
        return Mage::getStoreConfigFlag(self::XML_PATH_FACEBOOK_ENABLE, $store);
    }
    /**
     * get authen url
     *
     * @return type
     */
    public function getAuthUrl()
    {
        $isSecure = Mage::getStoreConfig('web/secure/use_in_frontend');

        return Mage::getUrl('sociallogin/fblogin/callback', array('_secure' => $isSecure, 'auth' => 1));
    }
}
