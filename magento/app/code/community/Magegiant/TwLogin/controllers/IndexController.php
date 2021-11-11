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
 * @package     Magegiant_TwLogin
 * @copyright   Copyright (c) 2014 Magegiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * TwLogin Index Controller
 *
 * @category    Magegiant
 * @package     Magegiant_TwLogin
 * @author      Magegiant Developer
 */
class Magegiant_TwLogin_IndexController extends Mage_Core_Controller_Front_Action
{
    /**
     *
     * @return bool|mixed
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
        $twitter      = Mage::getModel('twlogin/twlogin');
        $requestToken = Mage::getSingleton('core/session')->getRequestToken();

        try {
            $token = $twitter->getAccessToken(
                array(
                    'oauth_token'    => $this->getRequest()->getParam('oauth_token'),
                    'oauth_verifier' => $this->getRequest()->getParam('oauth_verifier')
                ),
                unserialize($requestToken)
            );
        } catch (Exception $e) {
            Mage::getSingleton('core/session')->addError($e->getMessage());
            $this->_appendJs("<script type=\"text/javascript\">try{window.opener.location.reload(true);}catch(e){window.opener.location.href=\"" . Mage::getBaseUrl() . "\"} window.close();</script>");

            return;
        }
        $customerId = $this->getCustomerIdByTwitterId($token->user_id);
        if ($customerId) { //login
            $customer = Mage::getModel('customer/customer')->load($customerId);
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
        } else { //add new customer
            $screenName        = (string)$token->screen_name;
            $email             = $screenName . '@twitter.com';
            $user['firstname'] = $screenName;
            $user['lastname']  = $screenName;
            $user['email']     = $email;

            $store_id   = Mage::app()->getStore()->getStoreId();
            $website_id = Mage::app()->getStore()->getWebsiteId();
            $customer   = Mage::helper('sociallogin')->getCustomerByEmail($user['email'], $website_id);
            if (!$customer OR !$customer->getId()) {
                $customer = Mage::helper('sociallogin')->createCustomerMultiWebsite($user, $website_id, $store_id);
            }
            if ($customer->getConfirmation()) {
                try {
                    $customer->setConfirmation(null);
                    $customer->save();
                } catch (Exception $e) {
                }
            }

            $this->setAuthorCustomer($token->user_id, $customer->getId());
            Mage::getSingleton('customer/session')->setCustomerAsLoggedIn($customer);
            Mage::getSingleton('core/session')->setCustomerIdSocialLogin($token->user_id);

            if (Mage::helper('twlogin')->getTwConfig('is_send_password_to_customer')) {
                $customer->sendPasswordReminderEmail();
            }

            $nextUrl = Mage::helper('sociallogin')->getEditUrl();
            Mage::getSingleton('core/session')->addNotice('Update your contact details.');
            $this->_appendJs("<script>window.close();window.opener.location = '$nextUrl';</script>");

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

    /**
     * get cutomer by id
     *
     * @param $token ->user_id
     * @return null
     */
    public function getCustomerIdByTwitterId($customerId)
    {
        $user = Mage::getModel('twlogin/customer')
            ->getCollection()
            ->addFieldToFilter('twitter_id', $customerId)
            ->getFirstItem();
        if ($user AND $user->getId())
            return $user->getCustomerId();
        else
            return null;
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
        $twitter = Mage::getModel('twlogin/twlogin');
        /* @var $twitter Twitter_Model_Consumer */
        $twitter->setCallbackUrl(Mage::getUrl('twlogin/index/callback', array('_secure' => true)));
        if (!is_null($this->getRequest()->getParam('oauth_token')) && !is_null($this->getRequest()->getParam('oauth_verifier'))) {
            $oauth_data = array(
                'oauth_token' => $this->_getRequest()->getParam('oauth_token'),
                'oauth_verifier' => $this->_getRequest()->getParam('oauth_verifier')
            );
            try {
                $token = $twitter->getAccessToken($oauth_data, unserialize(Mage::getSingleton('core/session')->getRequestToken()));
                Mage::getSingleton('core/session')->setAccessToken(serialize($token));
            } catch (Exception $e) {
                echo $e->getMessage();
            }
            $twitter->redirect();
        } else {
            try {
                $token = $twitter->getRequestToken();


            } catch (Exception $e) {
                echo $e->getMessage();
            }
            Mage::getSingleton('core/session')->setRequestToken(serialize($token));
            $twitter->redirect();
        }

        return $token;
    }

    /**
     * input:
     *
     * @mpId
     * @customerid
     **/
    public function setAuthorCustomer($twId, $customerId)
    {
        $model = Mage::getModel('twlogin/customer');
        $model->setData('twitter_id', $twId);
        $model->setData('customer_id', $customerId);
        try {
            $model->save();
        } catch (Exception $e) {
        }

        return;
    }

    /**
     * return @collectin in model customer
     **/
    public function getCustomer($id)
    {
        $collection = Mage::getModel('customer/customer')->load($id);

        return $collection;
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