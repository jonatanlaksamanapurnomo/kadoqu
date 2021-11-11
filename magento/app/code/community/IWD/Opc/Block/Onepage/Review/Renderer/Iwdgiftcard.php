<?php

class IWD_Opc_Block_Onepage_Review_Renderer_Iwdgiftcard extends Mage_Checkout_Block_Total_Default
{

    protected $_template = 'iwd/opc/onepage/review/totals/giftcard.phtml';

    public function getAmount()
    {
        return $this->helper('iwd_opc')->formatPrice($this->getTotal()->getValue(), false);
    }

    protected function _toHtml()
    {
        if (!Mage::helper('iwd_giftcardaccount')->isEnable()) {
            return '';
        }

        return parent::_toHtml();
    }
}
