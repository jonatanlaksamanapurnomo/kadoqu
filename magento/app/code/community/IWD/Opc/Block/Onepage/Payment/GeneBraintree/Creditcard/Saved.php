<?php

class IWD_Opc_Block_Onepage_Payment_GeneBraintree_Creditcard_Saved extends Gene_Braintree_Block_Creditcard_Saved
{
    protected function _construct()
    {
        parent::_construct();
        if (Mage::helper('iwd_opc')->isCheckoutPage()) {
            $this->setTemplate('iwd/opc/onepage/payment/gene/braintree/creditcard/saved.phtml');
        }
    }
}