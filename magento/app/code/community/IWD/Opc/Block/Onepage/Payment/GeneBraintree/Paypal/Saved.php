<?php

class IWD_Opc_Block_Onepage_Payment_GeneBraintree_Paypal_Saved extends Gene_Braintree_Block_Paypal_Saved
{

    protected function _construct()
    {
        parent::_construct();
        if (Mage::helper('iwd_opc')->isCheckoutPage()) {
            $this->setTemplate('iwd/opc/onepage/payment/gene/braintree/paypal/saved.phtml');
        }
    }
}