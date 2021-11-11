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
 * @package     Magegiant_YhLogin
 * @copyright   Copyright (c) 2014 Magegiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Yhlogin Block
 *
 * @category    Magegiant
 * @package     Magegiant_YhLogin
 * @author      Magegiant Developer
 */
class Magegiant_YhLogin_Block_Yhlogin extends Magegiant_SocialLogin_Block_Abstract implements Magegiant_SocialLogin_Block_Interface
{
    public function __construct()
    {
        parent::__construct();
        $this->setTemplate('magegiant/sociallogin/yhlogin/yhlogin.phtml');
    }
    /**
     * @return string
     */
    public function getButtonImage()
    {
        $baseUrl   = Mage::helper('sociallogin')->getSocialImgUrl();
        $imgConfig = Mage::helper('yhlogin')->getYhConfig('yh_image')?Mage::helper('yhlogin')->getYhConfig('yh_image'):'default/yh.png';

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
        return $this->getUrl('yhlogin/index/login');
    }

    /**
     * get label for button
     *
     * @return mixed
     */
    public function getButtonLabel()
    {

        // TODO: Implement getButtonLabel() method.
        return Mage::helper('yhlogin')->getYhConfig('yh_image_label');
    }
}