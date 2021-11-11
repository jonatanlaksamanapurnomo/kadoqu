<?php
/**
 * Magestore
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magestore.com license that is
 * available through the world-wide-web at this URL:
 * http://www.magestore.com/license-agreement.html
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Magestore
 * @package     Magestore_Onestepcheckout
 * @copyright   Copyright (c) 2017 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 */

/**
 * Class Magestore_Onestepcheckout_Block_Onestepcheckout
 */
class Magestore_Onestepcheckout_Block_Onestepcheckout extends Mage_Checkout_Block_Onepage_Abstract {

    /**
     * @var array|mixed
     */
    var $configData = array();

    /* Start: Modified by Daniel - improve OSC load speed */

    /**
     * Magestore_Onestepcheckout_Block_Onestepcheckout constructor.
     */
    public function __construct() {
        $quote = $this->getOnepage()->getQuote();
        $shipping = $quote->getShippingAddress();
        $billing = $quote->getBillingAddress();
        $this->configData = $this->_getConfigData();
        if (!$shipping->getCountryId()) {
            if ($this->isCustomerLoggedIn() && !$billing) {
                $this->_setAddress();
            } else {
                $this->_setDefaultBillingAddress($billing, $this->configData);
                $this->_setDefaultShippingAddress($shipping, $this->configData);
            }
        }
        $this->_setDefaultShippingMethod();
        $this->_setDefaultPaymentMethod();
    }

    /* End: Modified by Daniel - improve OSC load speed */

    /**
     *
     */
    protected function _setAddress() {
        $billing_address = $this->getOnepage()->getQuote()->getBillingAddress();
        $shipping_address = $this->getOnepage()->getQuote()->getShippingAddress();
        $postcode = $shipping_address->getPostcode();
        if (!$postcode) {
            $primary = $this->getQuote()->getCustomer()->getPrimaryShippingAddress();
            if ($primary) {
                $postcode = $primary->getPostcode();
            }
            if (!$postcode || $postcode == '') {
                $postcode = $billing_address->getPostcode();
            }
        }
        $shipping_address->setPostcode($postcode)->setCollectShippingRates(true)->save();
    }

    /**
     *
     */
    protected function _setDefaultShippingMethod() {
        $shipping_address = $this->getOnepage()->getQuote()->getShippingAddress();
        if (!$shipping_address->getShippingMethod()) {
            //set default shipping method
            $default_shipping_method = $this->configData['default_shipping'];
            if ($default_shipping_method) {
                try {
                    $shipping_address->setShippingMethod($default_shipping_method);
                } catch (Exception $e) {
                    // ignore error
                }
            } else {
                // if no default shipping method and only one shipping method is available, set it as default
                if ($method = $this->hasOnlyOneShippingMethod()) {
                    try {
                        $shipping_address->setShippingMethod($method);
                    } catch (Exception $e) {
                        // ignore error
                    }
                }
            }
        }
        $this->getOnePage()->getQuote()->collectTotals()->save();
    }

    /*
     * set default payment method
     */

    /**
     *
     */
    protected function _setDefaultPaymentMethod() {
        $paymentMethod = $this->getOnepage()->getQuote()->getPayment()->getMethod();
        if (!$paymentMethod || $paymentMethod == '') {
            $default_payment_method = $this->configData['default_payment'];
            if ($default_payment_method != '') {
                $payment = array('method' => $default_payment_method);
                try {
                    Mage::helper('onestepcheckout')->savePaymentMethod($payment);
                } catch (Exception $e) {
                    // ignore error
                }
            } else {
                
            }
        }
    }

    /*
     * check if only one shipping method is enabled
     */

    /**
     * @return bool|mixed
     */
    public function hasOnlyOneShippingMethod() {
        $rates = $this->getOnepage()->getQuote()->getShippingAddress()->getShippingRatesCollection();
        $rateCodes = array();
        foreach ($rates as $rate) {
            if (!in_array($rate->getCode(), $rateCodes)) {
                $rateCodes[] = $rate->getCode();
            }
        }
        if (count($rateCodes) == 1) {
            return $rateCodes[0];
        }
        return false;
    }

    /**
     * @return mixed
     */
    protected function _getConfigData() {
        return Mage::helper('onestepcheckout')->getConfigData();
    }

    /**
     * @return mixed
     */
    public function getCheckoutTitle() {
        return $this->configData['checkout_title'];
    }

    /**
     * @param $type
     * @return mixed
     */
    public function getCountryHtmlSelect($type) {
        if ($type == 'billing') {
            $address = $this->getQuote()->getBillingAddress();
        } else {
            $address = $this->getQuote()->getShippingAddress();
        }

        $countryId = $address->getCountryId();
        if (is_null($countryId)) {
            $countryId = Mage::getStoreConfig('onestepcheckout/general/country_id', Mage::app()->getStore(true)->getId());
        }
        $select = $this->getLayout()->createBlock('core/html_select')
                ->setName($type . '[country_id]')
                ->setId($type . ':country_id')
                ->setTitle(Mage::helper('onestepcheckout')->__('Country'))
                ->setClass('validate-select')
                ->setValue($countryId)
                ->setOptions($this->getCountryOptions())
                ->setExtraParams('style="width:135px"');
        return $select->getHtml();
    }

    /**
     * @return string
     */
    public function getCity() {
        $city = $this->getAddress()->getCity();
        $primary = $this->getQuote()->getCustomer()->getPrimaryBillingAddress();
        if (empty($city) && $this->_isLoggedIn() && $primary) {
            return $this->getQuote()->getCustomer()->getPrimaryBillingAddress()->getCity();
        }
        return $city;
    }

    /**
     * @return string
     */
    public function getCompany() {
        $company = $this->getAddress()->getCompany();
        $primary = $this->getQuote()->getCustomer()->getPrimaryBillingAddress();
        if (empty($company) && $this->_isLoggedIn() && $primary) {
            return $this->getQuote()->getCustomer()->getPrimaryBillingAddress()->getCompany();
        }
        return $company;
    }

    /**
     * @param $field_name
     * @return mixed
     */
    public function getCustomerData($field_name) {
        if ($this->isCustomerLoggedIn()) {
            $customer = Mage::getSingleton('customer/session')->getCustomer();
        } else {
            $customer = null;
        }
        $value = $this->getBillingAddress()->getData($field_name);
        if ($customer == null) {
            return $value;
        } else {
            if ($value != null || $value == '') {
                return $customer->getData($field_name);
            } else {
                return $value;
            }
        }
    }

    /**
     * @return Mage_Sales_Model_Quote_Address
     */
    public function getBillingAddress() {
        return $this->getQuote()->getBillingAddress();
    }

    /**
     * @return false|Mage_Core_Model_Abstract|Mage_Sales_Model_Quote_Address
     */
    public function getShippingAddress() {
        if (!$this->isCustomerLoggedIn()) {
            return $this->getQuote()->getShippingAddress();
        } else {
            return Mage::getModel('sales/quote_address');
        }
    }

    /**
     * @param $field_name
     * @return bool
     */
    public function isAjaxBillingField($field_name) {
        $fields = explode(',', $this->configData['ajax_fields']);
        if (in_array($field_name, $fields)) {
            return true;
        }
        return false;
    }

    /**
     * @return bool
     */
    public function isShowShippingAddress() {
        if ($this->getOnepage()->getQuote()->isVirtual()) {
            return false;
        }
        if ($this->configData['show_shipping_address']) {
            return true;
        }
        return false;
    }

    /**
     * @return mixed
     */
    public function isCustomerLoggedIn() {
        return Mage::getSingleton('customer/session')->isLoggedIn();
    }

    /* Start: Modified by Daniel - improve OSC load speed */

    /**
     * @param $shipping
     * @param $configData
     */
    private function _setDefaultShippingAddress($shipping, $configData) {
        if ($shipping->getCountryId() == '' && isset($configData['country_id']) && $configData['country_id'] != '')
            $shipping->setCountryId($this->configData['country_id']);
        if ($shipping->getRegionId() == '' && isset($configData['region_id']) && $configData['region_id'] != '')
            $shipping->setRegionId($this->configData['region_id']);
        if ($shipping->getRegion() == '' && isset($configData['region_id']) && $configData['region_id'] != '')
            $shipping->setRegion($this->configData['region_id']);
        if ($shipping->getPostcode() == '' && isset($configData['postcode']) && $configData['postcode'] != '')
            $shipping->setPostcode($this->configData['postcode']);
        if ($shipping->getCity() == '' && isset($configData['city']) && $configData['city'] != '')
            $shipping->setCity($this->configData['city']);
    }

    /**
     * @param $billing
     * @param $configData
     */
    private function _setDefaultBillingAddress($billing, $configData) {
        if ($billing->getCountryId() == '' && isset($configData['country_id']) && $configData['country_id'] != '')
            $billing->setCountryId($this->configData['country_id']);
        if ($billing->getRegionId() == '' && isset($configData['region_id']) && $configData['region_id'] != '')
            $billing->setRegionId($this->configData['region_id']);
        if ($billing->getRegion() == '' && isset($configData['region_id']) && $configData['region_id'] != '')
            $billing->setRegion($this->configData['region_id']);
        if ($billing->getPostcode() == '' && isset($configData['postcode']) && $configData['postcode'] != '')
            $billing->setPostcode($this->configData['postcode']);
        if ($billing->getCity() == '' && isset($configData['city']) && $configData['city'] != '')
            $billing->setCity($this->configData['city']);
    }

    /* End: Modified by Daniel - improve OSC load speed */

    /**
     * @return Mage_Core_Model_Abstract
     */
    public function getOnepage() {
        return Mage::getSingleton('checkout/type_onepage');
    }

    /**
     * @return bool
     */
    public function isShowLoginLink() {
        if ($this->configData['show_login_link']) {
            return true;
        }
        return false;
    }

    /**
     * @return bool
     */
    public function isShowRegisterLink() {
        if ($this->configData['enable_registration']) {
            return true;
        }
        return false;
    }

    /**
     * @return string
     */
    public function getCheckoutUrl() {
        return $this->getUrl('onestepcheckout/index/saveOrder', array('_secure' => true));
    }

    /**
     * @return false|Mage_Core_Model_Abstract|Mage_Sales_Model_Quote_Address
     */
    public function getAddress() {
        if ($this->isCustomerLoggedIn()) {
            $customerAddressId = Mage::getSingleton('customer/session')->getCustomer()->getDefaultBilling();
            if ($customerAddressId) {
                $billing = Mage::getModel('customer/address')->load($customerAddressId);
            } else {
                $billing = $this->getQuote()->getBillingAddress();
            }
            if (!$billing->getCustomerAddressId()) {
                $customer = Mage::getSingleton('customer/session')->getCustomer();
                $default_address = $customer->getDefaultBillingAddress();
                if ($default_address) {
                    if ($default_address->getId()) {
                        if ($default_address->getPrefix()) {
                            $billing->setPrefix($default_address->getPrefix());
                        }
                        if ($default_address->getData('firstname')) {
                            $billing->setData('firstname', $default_address->getData('firstname'));
                        }
                        if ($default_address->getData('middlename')) {
                            $billing->setData('middlename', $default_address->getData('middlename'));
                        }if ($default_address->getData('lastname')) {
                            $billing->setData('lastname', $default_address->getData('lastname'));
                        }if ($default_address->getData('suffix')) {
                            $billing->setData('suffix', $default_address->getData('suffix'));
                        }if ($default_address->getData('company')) {
                            $billing->setData('company', $default_address->getData('company'));
                        }if ($default_address->getData('street')) {
                            $billing->setData('street', $default_address->getData('street'));
                        }if ($default_address->getData('city')) {
                            $billing->setData('city', $default_address->getData('city'));
                        }if ($default_address->getData('region')) {
                            $billing->setData('region', $default_address->getData('region'));
                        }if ($default_address->getData('region_id')) {
                            $billing->setData('region_id', $default_address->getData('region_id'));
                        }if ($default_address->getData('postcode')) {
                            $billing->setData('postcode', $default_address->getData('postcode'));
                        }if ($default_address->getData('country_id')) {
                            $billing->setData('country_id', $default_address->getData('country_id'));
                        }if ($default_address->getData('telephone')) {
                            $billing->setData('telephone', $default_address->getData('telephone'));
                        }if ($default_address->getData('fax')) {
                            $billing->setData('fax', $default_address->getData('fax'));
                        }
                        $billing->setCustomerAddressId($default_address->getId())
                                ->save();
                    }
                } else {
                    return $billing;
                }
            }
            return $billing;
        } else {
            return Mage::getModel('sales/quote_address');
        }
    }

    /**
     * @param $type
     * @return string
     */
    public function getAddressesHtmlSelect($type) {
        if ($this->isCustomerLoggedIn()) {
            $options = array();
            foreach ($this->getCustomer()->getAddresses() as $address) {
                $options[] = array(
                    'value' => $address->getId(),
                    'label' => $address->format('oneline')
                );
            }
            $addressId = $this->getAddress()->getId();
            $shippingAddressId = Mage::getSingleton('customer/session')->getCustomer()->getDefaultShipping();
            if ($shippingAddressId != $addressId && $type == 'shipping') {
                $addressId = $shippingAddressId;
            }
            if (empty($addressId)) {
                if ($type == 'billing') {
                    $address = $this->getCustomer()->getPrimaryBillingAddress();
                } else {
                    $address = $this->getCustomer()->getPrimaryShippingAddress();
                }
                if ($address) {
                    $addressId = $address->getId();
                }
            }
            $select = $this->getLayout()->createBlock('core/html_select')
                    ->setName($type . '_address_id')
                    ->setId($type . '-address-select')
                    ->setClass('address-select')
                    ->setExtraParams('style="width:350px"')
                    ->setValue($addressId)
                    ->setOptions($options);
            $select->addOption('', Mage::helper('checkout')->__('New Address'));
            return $select->getHtml();
        }
        return '';
    }

    /**
     * @return bool
     */
    public function isVirtual() {
        return $this->getQuote()->isVirtual();
    }

    /**
     * @return bool|mixed
     */
    public function _getDefaultShippingMethod() {
        $_helper = Mage::helper('onestepcheckout');
        $_config = $_helper->getConfigData();
        if ($_config['default_shipping'] != '') {
            return $_config['default_shipping'];
        } else {
            $check_single = $this->_checkSingleShippingMethod();
            if ($check_single) {
                return $check_single;
            }
        }
    }

    /**
     * @return bool|mixed
     */
    protected function _checkSingleShippingMethod() {
        $rates = $this->getOnepage()->getQuote()->getShippingAddress()->getShippingRatesCollection();
        $rateCodes = array();
        foreach ($rates as $rate) {
            if (!in_array($rate->getCode(), $rateCodes)) {
                $rateCodes[] = $rate->getCode();
            }
        }
        if (count($rateCodes) == 1) {
            return $rateCodes[0];
        }
        return false;
    }

    /**
     * @param $type
     * @return mixed
     */
    public function getCountryHtmlSelectBackend($type) {
        if ($type == 'billing') {
            $address = $this->getQuote()->getBillingAddress();
        } else {
            $address = $this->getQuote()->getShippingAddress();
        }

        $countryId = $address->getCountryId();
        if (is_null($countryId)) {
            $countryId = Mage::getStoreConfig('onestepcheckout/general/country_id', Mage::app()->getStore(true)->getId());
        }
        $select = $this->getLayout()->createBlock('core/html_select')
                ->setName('order[' . $type . '_address][country_id]')
                ->setId('order-' . $type . '_address_country_id')
                ->setTitle(Mage::helper('onestepcheckout')->__('Country'))
                ->setClass('validate-select')
                ->setValue($countryId)
                ->setOptions($this->getCountryOptions())
                ->setExtraParams('style="width:135px"');
        return $select->getHtml();
    }

    /**
     * @return Mage_Core_Helper_Abstract
     */
    public function getOscHelper() {
        return Mage::helper('onestepcheckout');
    }

/*
    Get google map API key from configuration
*/
    /**
     * @return mixed
     */
    public function getGoogleMapApiKey()
    {
        $storeId = Mage::app()->getStore()->getStoreId();
        return Mage::getStoreConfig('onestepcheckout/general/api_key',$storeId);
    }

    /**
     * @return bool
     */
    public function enableDeliverySecurityCode()
    {
        $storeId = Mage::app()->getStore()->getStoreId();
        return (Mage::getStoreConfig('onestepcheckout/general/is_enable_security_code',$storeId))?true:false;
    }

    /**
     * @param $number
     * @return bool
     */
    public function isEnableHour($number){
        $number = floatval($number);
        $storeId = Mage::app()->getStore()->getStoreId();
        $hours = Mage::getStoreConfig('onestepcheckout/general/disable_hour',$storeId);
        if(!empty($hours)){
            $hours = explode(",",$hours);
            if(count($hours) > 0){
                foreach ($hours as $hour){
                    $range = explode("-",$hour);
                    if(count($range) > 1){
                        if($range[0] <= $number && $range[1] >= $number){
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    /**
     * @return mixed
     */
    public function getDisableDayJson(){
        $storeId = Mage::app()->getStore()->getStoreId();
        $days = Mage::getStoreConfig('onestepcheckout/general/disable_day',$storeId);
        if(isset($days)){
            $days = explode(",",$days);
            return Zend_Json::encode($days);
        }
        return Zend_Json::encode(array());
    }

    /**
     * Get form key
     *
     * @return string
     */
    public function getFormKey()
    {
        return Mage::getSingleton('core/session')->getFormKey();
    }
}
