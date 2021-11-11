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
 * GgLogin Index Controller
 *
 * @category    Magegiant
 * @package     Magegiant_GgLogin
 * @author      Magegiant Developer
 */
class Magegiant_GgLogin_IndexController extends Mage_Core_Controller_Front_Action
{
    /**
     * process login action
     *
     * @return bool|mixed|void
     */
    public function loginAction()
    {
        if (!$this->getAuthorizedToken()) {
            $token = $this->getAuthorization();
        } else {
            $token = $this->getAuthorizedToken();
        }

        return $token;
    }

    /**
     * process user action
     */
    public function callbackAction()
    {
        $gglogin = Mage::getModel('gglogin/gglogin');
        $oauth2  = new Google_Oauth2Service($gglogin);
        $code    = $this->getRequest()->getParam('code');
        if (!$code) {
            Mage::getSingleton('core/session')->addError('Login failed as you have not granted access.');
            $this->_appendJs("<script type=\"text/javascript\">try{window.opener.location.reload(true);}catch(e){window.opener.location.href=\"" . Mage::getBaseUrl() . "\"} window.close();</script>");
        }
        $gglogin->authenticate($code);
        $client = $oauth2->userinfo->get();

        $user              = array();
        $email             = $client['email'];
        $name              = $client['name'];
        $arrName           = explode(' ', $name, 2);
        $user['firstname'] = $arrName[0];
        $user['lastname']  = $arrName[1];
        $user['email']     = $email;

        //get website_id and sote_id of each stores
        $store_id   = Mage::app()->getStore()->getStoreId(); //add
        $website_id = Mage::app()->getStore()->getWebsiteId(); //add

        $customer = Mage::helper('sociallogin')->getCustomerByEmail($user['email'], $website_id); //add edition
        if (!$customer || !$customer->getId()) {
            //Login multisite
            $customer = Mage::helper('sociallogin')->createCustomerMultiWebsite($user, $website_id, $store_id);
            if (Mage::helper('gglogin')->getGgConfig('is_send_password_to_customer')) {
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
        $this->_appendJs("<script type=\"text/javascript\">try{window.opener.location.href=\"" . $this->_loginPostRedirect() . "\";}catch(e){window.opener.location.reload(true);} window.close();</script>");
        //$this->_redirectUrl(Mage::helper('customer')->getDashboardUrl());
    }

    protected function _appendJs($string)
    {
        $this->loadLayout();
        $layout = Mage::app()->getLayout();
        $block  = $layout->createBlock('core/text');
        $block->setText(
            $string
        );
        $this->getLayout()->getBlock('head')->append($block);
        $this->renderLayout();
    }

    // if exit access token
    public function getAuthorizedToken()
    {
        $token = false;
        if (!is_null(Mage::getSingleton('core/session')->getAccessToken())) {
            $token = unserialize(Mage::getSingleton('core/session')->getAccessToken());
        }

        return $token;
    }

    // if not exit access token
    public function getAuthorization()
    {
        $scope   = array(
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        );
        $gglogin = Mage::getModel('gglogin/gglogin');
        $gglogin->setScopes($scope);
        $gglogin->authenticate();
        $authUrl = $gglogin->createAuthUrl();
        header('Localtion: ' . $authUrl);
        die(0);
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