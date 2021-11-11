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
 * @package     Magegiant_GgLogin
 * @copyright   Copyright (c) 2014 Magegiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Gglogin Block
 *
 * @category    Magegiant
 * @package     Magegiant_GgLogin
 * @author      Magegiant Developer
 */
class Magegiant_GgLogin_Block_Gglogin extends Magegiant_SocialLogin_Block_Abstract implements Magegiant_SocialLogin_Block_Interface
{
    public function __construct()
    {
        parent::__construct();
        $this->setTemplate('magegiant/sociallogin/gglogin/gglogin.phtml');
    }

    /**
     * @return string
     */
    public function getButtonImage()
    {
        $baseUrl   = Mage::helper('sociallogin')->getSocialImgUrl();
        $imgConfig = Mage::helper('gglogin')->getGgConfig('gg_image') ? Mage::helper('gglogin')->getGgConfig('gg_image') : 'default/gg.png';

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
        return $this->getUrl('gglogin/index/login');
    }

    /**
     * get label for button
     *
     * @return mixed
     */
    public function getButtonLabel()
    {
        // TODO: Implement getButtonLabel() method.
        return Mage::helper('gglogin')->getGgConfig('gg_image_label');
    }
}