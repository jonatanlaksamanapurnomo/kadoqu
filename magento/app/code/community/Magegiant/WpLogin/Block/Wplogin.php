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
 * @package     Magegiant_WpLogin
 * @copyright   Copyright (c) 2014 Magegiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Wplogin Block
 *
 * @category    Magegiant
 * @package     Magegiant_WpLogin
 * @author      Magegiant Developer
 */
class Magegiant_WpLogin_Block_Wplogin extends Magegiant_SocialLogin_Block_Abstract implements Magegiant_SocialLogin_Block_Interface
{
    public function __construct()
    {
        parent::__construct();
        $this->setTemplate('magegiant/sociallogin/wplogin/wplogin.phtml');
    }

    /**
     * get image for social login
     *
     * @return button url
     */
    public function getButtonImage()
    {
        // TODO: Implement getButtonImage() method.
        $baseUrl   = Mage::helper('sociallogin')->getSocialImgUrl();
        $imgConfig = Mage::helper('wplogin')->getWpConfig('wp_image') ? Mage::helper('wplogin')->getWpConfig('wp_image') : 'default/wp.png';

        return $baseUrl . $imgConfig;
    }


    /**
     * get social url
     *
     * @return return social url
     */
    public function getLoginUrl()
    {
        return $this->getUrl('wplogin/index/login');
    }

    public function getAlLoginUrl()
    {
        return $this->getUrl('wplogin/index/setBlogName');
    }

    public function getCheckName()
    {
        return $this->getUrl('wplogin/index/setBlock');
    }

    public function getEnterName()
    {
        return 'ENTER YOUR BLOG NAME';
    }

    public function getName()
    {
        return 'Name';
    }

    /**
     * get label for button
     *
     * @return mixed
     */
    public function getButtonLabel()
    {
        // TODO: Implement getButtonLabel() method.
        return Mage::helper('wplogin')->getWpConfig('wp_image_label');
    }
}