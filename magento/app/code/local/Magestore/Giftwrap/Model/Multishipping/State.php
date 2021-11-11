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
 * @package     Magestore_Giftwrap
 * @module    Giftwrap
 * @author      Magestore Developer
 *
 * @copyright   Copyright (c) 2016 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 *
 */

/**
 * Multishipping checkout state model
 *
 * @category   Mage
 * @package    Mage_Checkout
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class Magestore_Giftwrap_Model_Multishipping_State extends Mage_Checkout_Model_Type_Multishipping_State
{
    const STEP_SELECT_ADDRESSES = 'multishipping_addresses';
    const STEP_SHIPPING = 'multishipping_shipping';
    const STEP_BILLING = 'multishipping_billing';
    const STEP_OVERVIEW = 'multishipping_overview';
    const STEP_SUCCESS = 'multishipping_success';
    const STEP_SHIPPING_WIFTWRAP = 'multishipping_wiftwrap';
    /**
     * Allow steps array
     *
     * @var array
     */
    protected $_steps;

    /**
     * Checkout model
     *
     * @var Mage_Checkout_Model_Type_Multishipping
     */
    protected $_checkout;

    /**
     * Magestore_Giftwrap_Model_Multishipping_State constructor.
     */
    public function __construct() {
        parent::__construct();
        $this->_steps = array(
            self::STEP_SELECT_ADDRESSES => new Varien_Object(array(
                'label' => Mage::helper('checkout')->__('Select Addressess')
            )),

            self::STEP_SHIPPING_WIFTWRAP => new Varien_Object(array(
                'label' => Mage::helper('checkout')->__('Select Gift Box')
            )),

            self::STEP_SHIPPING => new Varien_Object(array(
                'label' => Mage::helper('checkout')->__('Shipping Information')
            )),
            self::STEP_BILLING => new Varien_Object(array(
                'label' => Mage::helper('checkout')->__('Billing Information')
            )),
            self::STEP_OVERVIEW => new Varien_Object(array(
                'label' => Mage::helper('checkout')->__('Place Order')
            )),
            self::STEP_SUCCESS => new Varien_Object(array(
                'label' => Mage::helper('checkout')->__('Order Success')
            )),
        );

        foreach ($this->_steps as $step) {
            $step->setIsComplete(false);
        }

        $this->_checkout = Mage::getSingleton('checkout/type_multishipping');
        $this->_steps[$this->getActiveStep()]->setIsActive(true);
    }

    /**
     * Retrieve checkout model
     *
     * @return Mage_Checkout_Model_Type_Multishipping
     */
    public function getCheckout() {
        return $this->_checkout;
    }

    /**
     * Retrieve available checkout steps
     *
     * @return array
     */
    public function getSteps() {
        return $this->_steps;
    }

    /**
     * Retrieve active step code
     *
     * @return string
     */
    public function getActiveStep() {
        $step = $this->getCheckoutSession()->getCheckoutState();
        if (isset($this->_steps[$step])) {
            return $step;
        }
        return self::STEP_SELECT_ADDRESSES;
    }

    /**
     * @param $step
     * @return $this
     */
    public function setActiveStep($step) {
        if (isset($this->_steps[$step])) {
            $this->getCheckoutSession()->setCheckoutState($step);
        } else {
            $this->getCheckoutSession()->setCheckoutState(self::STEP_SELECT_ADDRESSES);
        }

        // Fix active step changing
        if (!$this->_steps[$step]->getIsActive()) {
            foreach ($this->getSteps() as $stepObject) {
                $stepObject->unsIsActive();
            }
            $this->_steps[$step]->setIsActive(true);
        }
        return $this;
    }

    /**
     * Mark step as completed
     *
     * @param string $step
     * @return Mage_Checkout_Model_Type_Multishipping_State
     */
    public function setCompleteStep($step) {
        if (isset($this->_steps[$step])) {
            $this->getCheckoutSession()->setStepData($step, 'is_complete', true);
        }
        return $this;
    }

    /**
     * Retrieve step complete status
     *
     * @param string $step
     * @return bool
     */
    public function getCompleteStep($step) {
        if (isset($this->_steps[$step])) {
            return $this->getCheckoutSession()->getStepData($step, 'is_complete');
        }
        return false;
    }

    /**
     * Unset complete status from step
     *
     * @param string $step
     * @return Mage_Checkout_Model_Type_Multishipping_State
     */
    public function unsCompleteStep($step) {
        if (isset($this->_steps[$step])) {
            $this->getCheckoutSession()->setStepData($step, 'is_complete', false);
        }
        return $this;
    }

    /**
     *
     */
    public function canSelectAddresses() {

    }

    /**
     *
     */
    public function canInputShipping() {

    }

    /**
     *
     */
    public function canSeeOverview() {

    }

    /**
     *
     */
    public function canSuccess() {

    }

    /**
     * Retrieve checkout session
     *
     * @return Mage_Checkout_Model_Session
     */
    public function getCheckoutSession() {
        return Mage::getSingleton('checkout/session');
    }
}
