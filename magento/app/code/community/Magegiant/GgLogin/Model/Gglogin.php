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
 * @package     MageGiant_GgLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Gglogin Model
 * 
 * @category    MageGiant
 * @package     MageGiant_GgLogin
 * @author      MageGiant Developer
 */
require_once Mage::getBaseDir('base').DS.'lib'.DS.'Magegiant'.DS.'Oauth2'.DS.'service'.DS.'Google_ServiceResource.php';
require_once Mage::getBaseDir('base').DS.'lib'.DS.'Magegiant'.DS.'Oauth2'.DS.'service'.DS.'Google_Service.php';
require_once Mage::getBaseDir('base').DS.'lib'.DS.'Magegiant'.DS.'Oauth2'.DS.'service'.DS.'Google_Model.php';
require_once Mage::getBaseDir('base').DS.'lib'.DS.'Magegiant'.DS.'Oauth2'.DS.'contrib'.DS.'Google_Oauth2Service.php';
require_once Mage::getBaseDir('base').DS.'lib'.DS.'Magegiant'.DS.'Oauth2'.DS.'Google_Client.php';
class Magegiant_GgLogin_Model_Gglogin extends Google_Client
{
    protected $_config;
    public function __construct(){
        $this->_config = new Google_Client();
        $this->_config->setClientId(Mage::helper('gglogin')->getGgConfig('consumer_key'));
        $this->_config->setClientSecret(Mage::helper('gglogin')->getGgConfig('consumer_secret'));
        $this->_config->setRedirectUri(Mage::getUrl('gglogin/index/callback'));
    }
    public function getConfig(){
        return $this->_config;
    }
}