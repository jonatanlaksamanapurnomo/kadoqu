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
class Magegiant_SocialLogin_Model_Channel_Fb extends Mage_Core_Model_Abstract
{
    /**
     * get facebook user profile
     * @return null|the
     */
    public function getFbUser()
    {
        $facebook = $this->newFb();
        $userId   = $facebook->getUser();
        $fbme     = null;

        if ($userId) {
            try {
                $fbme = $facebook->api('/me');
            } catch (Exception $e) {

            }
        }

        return $fbme;
    }

    /**
     * get facebook url api
     * @return type
     */
    public function getFbLoginUrl()
    {
        $facebook = $this->newFb();
        $loginUrl = $facebook->getLoginUrl(
            array(
                'display'      => 'popup',
                'redirect_uri' => Mage::helper('sociallogin/fb')->getAuthUrl(),
                'scope'        => 'email',
            )
        );

        return $loginUrl;
    }

    /**
     * inital facebook authentication
     * @return \Facebook
     */
    public function newFb()
    {
        $facebook = new Magegiant_Facebook_Authentication(array(
            'appId'  => Mage::helper('sociallogin/fb')->getFbConfig('app_id'),
            'secret' => Mage::helper('sociallogin/fb')->getFbConfig('app_secret'),
            'cookie' => true,
        ));
        return $facebook;
    }

}
