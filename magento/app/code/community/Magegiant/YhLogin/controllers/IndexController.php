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
 * YhLogin Index Controller
 *
 * @category    Magegiant
 * @package     Magegiant_YhLogin
 * @author      Magegiant Developer
 */
class Magegiant_YhLogin_IndexController extends Mage_Core_Controller_Front_Action
{
    // url to login
    public function loginAction()
    {
        $yalogin    = Mage::getModel('yhlogin/yhlogin');
        $hasSession = $yalogin->hasSession();
        if ($hasSession == false) {
            $authUrl = $yalogin->getAuthUrl();
            $this->_redirectUrl($authUrl);
        } else {
            $session     = $yalogin->getSession();
            $userSession = $session->getSessionedUser();
            $profile     = $userSession->loadProfile();
            $emails      = $profile->emails;
            $user        = array();
            foreach ($emails as $email) {
                if ($email->primary == 1) {
                    $user['email'] = $email->handle;
                }
            }
            if (!isset($user['email']) OR empty($user['email'])) {
                Mage::getSingleton('customer/session')->addError('Cannot get Yahoo email. Please check Yahoo API permission.');
                $this->_appendJs("<script type=\"text/javascript\">try{window.opener.location.href=\"" . Mage::getBaseUrl(true) . "\";}catch(e){window.opener.location.reload(true);} window.close();</script>");
                return;
            }

            $user['firstname'] = $profile->givenName;
            $user['lastname']  = $profile->familyName;

            $store_id   = Mage::app()->getStore()->getStoreId();
            $website_id = Mage::app()->getStore()->getWebsiteId();

            $customer = Mage::helper('sociallogin')->getCustomerByEmail($user['email'], $website_id);
            if (!$customer || !$customer->getId()) {
                $customer = Mage::helper('sociallogin')->createCustomerMultiWebsite($user, $website_id, $store_id);
                if (Mage::getStoreConfig('sociallogin/yalogin/is_send_password_to_customer')) {
                    $customer->sendPasswordReminderEmail();
                }
            }
            if ($customer->getConfirmation()) {
                try {
                    $customer->setConfirmation(null);
                    $customer->save();
                } catch (Exception $e) {
                }
            }
            Mage::getSingleton('customer/session')->setCustomerAsLoggedIn($customer);
            $this->_appendJs("<script type=\"text/javascript\">try{window.opener.location.href=\"" . $this->_loginPostRedirect() . "\";}catch(e){window.opener.location.reload(true);} window.close();</script>");
            return;
        }

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

    public function callbackAction()
    {
        $this->_forward($this->loginAction());
    }


}