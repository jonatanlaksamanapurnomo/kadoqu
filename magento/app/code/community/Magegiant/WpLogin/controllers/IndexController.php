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
 * @package     Magegiant_WpLogin
 * @copyright   Copyright (c) 2014 Magegiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * WpLogin Index Controller
 *
 * @category    Magegiant
 * @package     Magegiant_WpLogin
 * @author      Magegiant Developer
 */
class Magegiant_WpLogin_IndexController extends Mage_Core_Controller_Front_Action
{
    /**
     * getToken and call profile user WordPress
     **/
    public function callbackAction($name_blog)
    {
        $wp          = Mage::getModel('wplogin/wplogin')->newWp();
        $userId      = $wp->mode;
        $coreSession = Mage::getSingleton('core/session');
        if (!$userId) {
            $wp_session = Mage::getModel('wplogin/wplogin')->setWpIdlogin($userId, $name_blog);
            $url        = $wp_session->authUrl();
            echo "<script type='text/javascript'>top.location.href = '$url';</script>";
            exit;
        } else {
            if (!$wp->validate()) {
                $wp_session = Mage::getModel('wplogin/wplogin')->setWpIdlogin($userId, $name_blog);
                $url        = $wp_session->authUrl();
                echo "<script type='text/javascript'>top.location.href = '$url';</script>";
                exit;
            } else {
                $user_info = $wp->getAttributes();
                if (count($user_info)) {
                    $frist_name = $user_info['namePerson/first'];
                    $last_name  = $user_info['namePerson/last'];
                    $email      = $user_info['contact/email'];

                    //get website_id and sote_id of each stores
                    $store_id   = Mage::app()->getStore()->getStoreId();
                    $website_id = Mage::app()->getStore()->getWebsiteId();

                    if (!$frist_name) {
                        if ($user_info['namePerson/friendly']) {
                            $frist_name = $user_info['namePerson/friendly'];
                        } else {
                            $email      = explode("@", $email);
                            $frist_name = $email['0'];
                        }
                    }

                    if (!$last_name) {
                        $last_name = '_wp';
                    }
                    $data     = array('firstname' => $frist_name, 'lastname' => $last_name, 'email' => $user_info['contact/email']);
                    $customer = Mage::helper('wplogin')->getCustomerByEmail($data['email'], $website_id);
                    if (!$customer || !$customer->getId()) {
                        //Login multisite
                        $customer = Mage::helper('wplogin')->createCustomerMultiWebsite($data, $website_id, $store_id);
                        if (Mage::getStoreConfig('wplogin/wplogin/is_send_password_to_customer')) {
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
                } else {
                    $coreSession->addError('Login failed as you have not granted access.');
                    die("<script type=\"text/javascript\">try{window.opener.location.reload(true);}catch(e){window.opener.location.href=\"" . Mage::getBaseUrl() . "\"} window.close();</script>");
                }
            }
        }
    }

    /**
     * set block action
     */
    public function setBlockAction()
    {
        $this->loadLayout();
        $this->renderLayout();
    }

    /**
     * set block name action
     */
    public function setBlogNameAction()
    {
        $data = $this->getRequest()->getPost();
        $name = $data['name'];
        if ($name) {
            $url = Mage::getModel('wplogin/wplogin')->getWpLoginUrl($name);
            $this->_redirectUrl($url);
        } else {
            Mage::getSingleton('core/session')->addError('Please enter Blog name!');
            die("<script type=\"text/javascript\">try{window.opener.location.reload(true);}catch(e){window.opener.location.href=\"" . Mage::getBaseUrl() . "\"} window.close();</script>");
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