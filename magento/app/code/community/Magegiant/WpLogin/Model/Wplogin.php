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
 * @package     MageGiant_WpLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Wplogin Model
 *
 * @category    MageGiant
 * @package     MageGiant_WpLogin
 * @author      MageGiant Developer
 */
class Magegiant_WpLogin_Model_Wplogin extends Mage_Core_Model_Abstract
{
    /**
     * init Wordpess Library
     *
     * @return LightOpenID I
     */
    public function newWp()
    {
        try {
            require_once Mage::getBaseDir('base') . DS . 'lib' . DS . 'Magegiant' . DS . 'OpenId' . DS . 'openid.php';
        } catch (Exception $e) {
        }

        $openid = new LightOpenID(Mage::getUrl());

        return $openid;
    }

    /**
     * get wordpress login url
     *
     * @param $name_blog
     * @return null
     */
    public function getWpLoginUrl($name_blog)
    {
        $wp_id = $this->newWp();
        $wp    = $this->setWpIdlogin($wp_id, $name_blog);
        try {
            $loginUrl = $wp->authUrl();

            return $loginUrl;
        } catch (Exception $e) {
            return null;
        }
    }

    /**
     * set WordPress Id
     *
     * @param $openid
     * @param $name_blog
     * @return mixed
     */
    public function setWpIdlogin($openid, $name_blog)
    {

        $openid->identity = 'http://' . $name_blog . '.wordpress.com';
        $openid->required = array(
            'namePerson/first',
            'namePerson/last',
            'namePerson/friendly',
            'contact/email',
        );

        $openid->returnUrl = Mage::getUrl('wplogin/index/callback');

        return $openid;
    }
}