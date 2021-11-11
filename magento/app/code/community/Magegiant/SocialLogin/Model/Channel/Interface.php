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
 * SocialLogin Observer Model
 * 
 * @category    MageGiant
 * @package     MageGiant_SocialLogin
 * @author      MageGiant Developer
 */
interface Magegiant_SocialLogin_Model_Channel_Interface {

    /**
     * create library to connect social network
     *  @return array
     */
    public function newSocial();

    /**
     * get social login user
     */
    public function getSocialUser();

    /**
     * get social login url
     */
    public function getSocialLoginUrl();
}
