<?php

class IWD_Opc_Block_Onepage_Payment_Centinel_Logo extends Mage_Centinel_Block_Logo
{

    protected function _construct()
    {
        parent::_construct();
        if (Mage::helper('iwd_opc')->isCheckoutPage()) {
            $this->setTemplate('iwd/opc/onepage/payment/centinel/logo.phtml');
        }
    }
}
