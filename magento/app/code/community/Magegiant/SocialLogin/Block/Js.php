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
class Magegiant_SocialLogin_Block_Js extends Magegiant_SocialLogin_Block_Abstract
{


    public function __construct()
    {
        /*Set before callback url*/
//        $session = Mage::getSingleton('customer/session');
//        if (!$session->isLoggedIn()) {
//            $session->setBeforeAuthUrl(Mage::helper('core/url')->getCurrentUrl());
//        }
        parent::__construct();
    }

    public function getLoginBlock()
    {
        return Mage::helper('core')->jsonEncode($this->getChildHtml('sociallogin.popup'));
    }

}
