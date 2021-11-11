<?php

class IWD_Opc_Block_Onepage_Review_Renderer_Storecredit extends Mage_Checkout_Block_Total_Default
{

    protected $_template = 'iwd/opc/onepage/review/totals/storecredit.phtml';

    public function getStoreCreditPrice()
    {
        return $this->helper('iwd_opc')->formatPrice($this->getTotal()->getValue(), false);
    }
}
