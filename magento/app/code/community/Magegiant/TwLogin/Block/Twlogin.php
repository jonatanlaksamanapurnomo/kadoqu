<?php
/**
 * Magegiant
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the magegiant.com license that is
 * available through the world-wide-web at this URL:
 * http://magegiant.com/license-agreement/
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Magegiant
 * @package     Magegiant_TwLogin
 * @copyright   Copyright (c) 2014 Magegiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Twlogin Block
 *
 * @category    Magegiant
 * @package     Magegiant_TwLogin
 * @author      Magegiant Developer
 */
class Magegiant_TwLogin_Block_Twlogin extends Mage_Core_Block_Template implements Magegiant_SocialLogin_Block_Interface
{
    public function __construct()
    {
        parent::__construct();
        $this->setTemplate('magegiant/sociallogin/twlogin/twlogin.phtml');
    }

    /**
     * @return mixed set Callbacl Url
     */
    public function setBackUrl()
    {
        $currentUrl = Mage::helper('core/url')->getCurrentUrl();
        Mage::getSingleton('core/session')->setBackUrl($currentUrl);

        return $currentUrl;
    }

    /**
     * @return string
     */
    public function getButtonImage()
    {
        $baseUrl   = Mage::helper('sociallogin')->getSocialImgUrl();
        $imgConfig = Mage::helper('twlogin')->getTwConfig('tw_image')?Mage::helper('twlogin')->getTwConfig('tw_image'):'default/tw.png';
        return $baseUrl . $imgConfig;
    }

    /**
     * get social url
     *
     * @return return social url
     */
    public function getLoginUrl()
    {
        // TODO: Implement getLoginUrl() method.
        return $this->getUrl('twlogin/index/login');
    }

    /**
     * get label for button
     *
     * @return mixed
     */
    public function getButtonLabel()
    {
        // TODO: Implement getButtonLabel() method.
        return Mage::helper('twlogin')->getTwConfig('tw_image_label');
    }
}