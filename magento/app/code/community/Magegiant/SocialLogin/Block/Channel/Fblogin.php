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
 * @package     Magegiant_SocialLogin
 * @copyright   Copyright (c) 2014 Magegiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Sociallogin Block
 *
 * @category    Magegiant
 * @package     Magegiant_SocialLogin
 * @author      Magegiant Developer
 */
class Magegiant_SocialLogin_Block_Channel_Fblogin extends Magegiant_SocialLogin_Block_Abstract implements Magegiant_SocialLogin_Block_Interface
{
    protected $_fb;

    public function __construct()
    {
        parent::__construct();
        $this->setTemplate('magegiant/sociallogin/fblogin/fblogin.phtml');
        $this->_fb = Mage::getSingleton('sociallogin/channel_fb');
    }

    /**
     * get button image
     *
     * @return button|string
     */
    public function getButtonImage()
    {
        $baseUrl   = Mage::helper('sociallogin')->getSocialImgUrl();
        $imgConfig = Mage::helper('sociallogin/fb')->getFbConfig('fb_image')?Mage::helper('sociallogin/fb')->getFbConfig('fb_image'):'default/fb.png';

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
        return $this->_fb->getFbLoginUrl();
    }

    /**
     * get label for button
     *
     * @return mixed
     */
    public function getButtonLabel()
    {
        // TODO: Implement getButtonLabel() method.
        return Mage::helper('sociallogin/fb')->getFbConfig('fb_image_label');
    }
}
