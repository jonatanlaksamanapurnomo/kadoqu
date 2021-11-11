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
 * @package     MageGiant_LiveLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Livelogin Model
 *
 * @category    MageGiant
 * @package     MageGiant_LiveLogin
 * @author      MageGiant Developer
 */
class Magegiant_LiveLogin_Model_Livelogin extends Mage_Core_Model_Abstract
{
    public function newLive()
    {
        require_once Mage::getBaseDir('base') . DS . 'lib' . DS . 'Magegiant' . DS . 'Author' . DS . 'OAuth2Client.php';
        try {
            $live                = new OAuth2Client(
                Mage::helper('livelogin')->getLiveConfig('consumer_key'),
                Mage::helper('livelogin')->getLiveConfig('consumer_secret'),
                Mage::helper('livelogin')->getAuthUrlLive()
            );
            $live->api_base_url  = "https://apis.live.net/v5.0/";
            $live->authorize_url = "https://login.live.com/oauth20_authorize.srf";
            $live->token_url     = "https://login.live.com/oauth20_token.srf";
            $live->out           = "https://login.live.com/oauth20_logout.srf";

            return $live;
        }
        catch(Exception $e){
        }

    }

    /**
     * get Authen Window Live login code
     *
     * @return string
     */
    public function getUrlAuthorCode()
    {
        $live = $this->newLive();
        return $live->authorizeUrl();
    }
}