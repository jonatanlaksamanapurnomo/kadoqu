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
 * @package     MageGiant_TwLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Twlogin Model
 *
 * @category    MageGiant
 * @package     MageGiant_TwLogin
 * @author      MageGiant Developer
 */
class Magegiant_TwLogin_Model_Twlogin extends Zend_Oauth_Consumer
{
    protected $_options = null;
    public function __construct(){
        $this->_config = new Zend_Oauth_Config;
        $this->_options = array(
            'consumerKey'       => Mage::helper('twlogin')->getTwConfig('consumer_key'),
            'consumerSecret'    => Mage::helper('twlogin')->getTwConfig('consumer_secret'),
            'signatureMethod'   => 'HMAC-SHA1',
            'version'           => '1.0',
            'requestTokenUrl'   => 'https://api.twitter.com/oauth/request_token',
            'accessTokenUrl'    => 'https://api.twitter.com/oauth/access_token',
            'authorizeUrl'      => 'https://api.twitter.com/oauth/authorize'
        );
        $this->_config->setOptions($this->_options);
    }

    public function setCallbackUrl($url){
        $this->_config->setCallbackUrl($url);
    }
}