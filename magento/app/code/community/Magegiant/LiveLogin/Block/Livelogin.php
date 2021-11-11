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
 * @package     Magegiant_LiveLogin
 * @copyright   Copyright (c) 2014 Magegiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Livelogin Block
 *
 * @category    Magegiant
 * @package     Magegiant_LiveLogin
 * @author      Magegiant Developer
 */
class Magegiant_LiveLogin_Block_Livelogin extends Magegiant_SocialLogin_Block_Abstract implements Magegiant_SocialLogin_Block_Interface
{
    public function __construct()
    {
        parent::__construct();
        $this->setTemplate('magegiant/sociallogin/livelogin/livelogin.phtml');
    }

    /**
     * get google login url
     *
     * @return string
     */
    public function getLoginUrl()
    {
        return Mage::getModel('livelogin/livelogin')->getUrlAuthorCode();
    }

    /**
     * @return string
     */
    public function getButtonImage()
    {
        $baseUrl   = Mage::helper('sociallogin')->getSocialImgUrl();
        $imgConfig = Mage::helper('livelogin')->getLiveConfig('live_image') ? Mage::helper('livelogin')->getLiveConfig('live_image'):'default/live.png';

        return $baseUrl . $imgConfig;
    }

    /**
     * get label for button
     *
     * @return mixed
     */
    public function getButtonLabel()
    {
        // TODO: Implement getButtonLabel() method.
        return Mage::helper('livelogin')->getLiveConfig('live_image_label');
    }
}