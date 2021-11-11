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
 * SocialLogin Helper
 *
 * @category    MageGiant
 * @package     MageGiant_SocialLogin
 * @author      MageGiant Developer
 */
class Magegiant_SocialLogin_Helper_Data extends Mage_Core_Helper_Abstract
{

    const XML_PATH_GENERAL_ENABLE = 'sociallogin/general/enable';
    const XML_PATH_GENERAL        = 'sociallogin/general/';

    /**
     * check social login system is enabled
     *
     * @param mixed $store
     * @return boolean
     */
    public function isEnabled($store = null)
    {
        return Mage::getStoreConfigFlag(self::XML_PATH_GENERAL_ENABLE, $store);
    }

    /**
     * get general config
     *
     * @param type $code
     * @param type $store
     * @return type
     */
    function getGeneralConfig($code, $store = null)
    {
        if (!$store)
            $store = Mage::app()->getStore()->getId();

        return Mage::getStoreConfig(self::XML_PATH_GENERAL . $code, $store);
    }

    /**
     * get position config
     *
     * @return array
     */
    public function getPosition()
    {
        return explode(',', $this->getGeneralConfig('position'));
    }

    /**
     * get customer by email
     *
     * @param type $email
     * @param type $website_id
     * @return type
     */
    public function getCustomerByEmail($email, $website_id)
    {
        $collection = Mage::getModel('customer/customer')->getCollection()
            ->addFieldToFilter('email', $email);
        if (Mage::getStoreConfig('customer/account_share/scope')) {
            $collection->addFieldToFilter('website_id', $website_id);
        }

        return $collection->getFirstItem();
    }

    /**
     * create customer
     *
     * @param type $data
     * @return type
     */
    public function createCustomer($data)
    {
        $customer = Mage::getModel('customer/customer')
            ->setFirstname($data['firstname'])
            ->setLastname($data['lastname'])
            ->setEmail($data['email']);

        $newPassword = $customer->generatePassword();
        $customer->setPassword($newPassword);
        try {
            $customer->save();
        } catch (Exception $e) {

        }

        return $customer;
    }

    /**
     * create customer for multistore
     *
     * @param type $data
     * @param type $website_id
     * @param type $store_id
     * @return type
     */
    public function createCustomerMultiWebsite($data, $website_id, $store_id)
    {
        $customer = Mage::getModel('customer/customer')->setId(null);
        $customer->setFirstname($data['firstname'])
            ->setLastname($data['lastname'])
            ->setEmail($data['email'])
            ->setWebsiteId($website_id)
            ->setStoreId($store_id)
            ->save();
        $newPassword = $customer->generatePassword();
        $customer->setPassword($newPassword);
        try {
            $customer->save();
            Mage::dispatchEvent('sociallogin_customer_register_success', array(
                'customer' => $customer
        ));
        } catch (Exception $e) {

        }

        return $customer;
    }


    /**
     * get login url
     *
     * @return type
     */
    public function getLoginUrl()
    {
        $isSecure = Mage::getStoreConfig('web/secure/use_in_frontend');

        return $this->_getUrl('customer/account/login', array('_secure' => $isSecure));
    }

    /**
     * get customer edit account url
     *
     * @return type
     */
    public function getEditUrl()
    {
        $isSecure = Mage::getStoreConfig('web/secure/use_in_frontend');

        return $this->_getUrl('customer/account/edit', array('_secure' => $isSecure));
    }

    /**
     * get social img url
     *
     * @return string
     */
    public function getSocialImgUrl()
    {
        return Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . 'sociallogin/img/';
    }

    public function mappingColor($color)
    {
        if ($color == 'orange')
            return '#F39801';
        if ($color == 'green')
            return '#B6CE5E';
        if ($color == 'black')
            return '#4D4D4D';
        if ($color == 'blue')
            return '#3398CC';
        if ($color == 'darkblue')
            return '#004BA0';
        if ($color == 'pink')
            return '#E13B91';
        if ($color == 'red')
            return '#E10E03';
        if ($color == 'violet')
            return '#B962d5';

        return $color;
    }

    /**
     * get social style config
     *
     * @param null $storeId
     * @return string
     */
    public function getStyleColor($storeId = null)
    {
        $styleColor = $this->getGeneralConfig('style_color', $storeId);
        $styleColor = $this->mappingColor($styleColor);
        if ($styleColor == 'custom') {
            return '#' . $this->getGeneralConfig('style_custom', $storeId);
        }

        return $styleColor;
    }

}
