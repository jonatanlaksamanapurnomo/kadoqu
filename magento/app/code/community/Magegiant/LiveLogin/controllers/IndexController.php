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
 * LiveLogin Index Controller
 *
 * @category    Magegiant
 * @package     Magegiant_LiveLogin
 * @author      Magegiant Developer
 */
class Magegiant_LiveLogin_IndexController extends Mage_Core_Controller_Front_Action
{
    /**
     * App callBack to this action
     */
    public function callbackAction()
    {
        $isAuth = $this->getRequest()->getParam('auth');
        $code   = $this->getRequest()->getParam('code');
        $live   = Mage::getModel('livelogin/livelogin')->newLive();
        try {
            $live->authenticate($code);
            $user = $live->get("me", $live->param);
        } catch (Exception $e) {
            Mage::getSingleton('core/session')->addError('Login failed as you have not granted access.');
            die("<script type=\"text/javascript\">try{window.opener.location.reload(true);}catch(e){window.opener.location.href=\"" . Mage::getBaseUrl() . "\"} window.close();</script>");
        }
        $first_name = $user->first_name;
        $last_name  = $user->last_name;
        $email      = $user->emails->account;
        //get website_id and sote_id of each stores
        $store_id   = Mage::app()->getStore()->getStoreId(); //add
        $website_id = Mage::app()->getStore()->getWebsiteId(); //add

        if ($isAuth) {
            $data     = array('firstname' => $first_name, 'lastname' => $last_name, 'email' => $email);
            $customer = Mage::helper('sociallogin')->getCustomerByEmail($data['email'], $website_id); //add edtition
            if (!$customer || !$customer->getId()) {
                //Login multisite
                $customer = Mage::helper('sociallogin')->createCustomerMultiWebsite($data, $website_id, $store_id);
                if (Mage::helper('livelogin')->getLiveConfig('livelogin/livelogin/is_send_password_to_customer')) {
                    $customer->sendPasswordReminderEmail();
                }
            }
            // fix confirmation
            if ($customer->getConfirmation()) {
                try {
                    $customer->setConfirmation(null);
                    $customer->save();
                } catch (Exception $e) {
                }
            }
            Mage::getSingleton('customer/session')->setCustomerAsLoggedIn($customer);
            die("<script type=\"text/javascript\">try{window.opener.location.href=\"" . $this->_loginPostRedirect() . "\";}catch(e){window.opener.location.reload(true);} window.close();</script>");
        }
    }

    protected function _loginPostRedirect()
    {
        $session = Mage::getSingleton('customer/session');

        if (!$session->getBeforeAuthUrl() || $session->getBeforeAuthUrl() == Mage::getBaseUrl()) {
            // Set default URL to redirect customer to
            $session->setBeforeAuthUrl(Mage::helper('customer')->getDashboardUrl());

        } else if ($session->getBeforeAuthUrl() == Mage::helper('customer')->getLogoutUrl()) {
            $session->setBeforeAuthUrl(Mage::helper('customer')->getDashboardUrl());
        } else {
            if (!$session->getAfterAuthUrl()) {
                $session->setAfterAuthUrl($session->getBeforeAuthUrl());
            }
            if ($session->isLoggedIn()) {
                $session->setBeforeAuthUrl($session->getAfterAuthUrl(true));
            }
        }

        return $session->getBeforeAuthUrl(true);
    }
}