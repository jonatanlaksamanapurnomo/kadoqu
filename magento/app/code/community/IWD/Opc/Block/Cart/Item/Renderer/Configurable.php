<?php

class IWD_Opc_Block_Cart_Item_Renderer_Configurable extends Mage_Checkout_Block_Cart_Item_Renderer_Configurable
{

    public function isOnCheckoutPage()
    {
        return parent::isOnCheckoutPage() || $this->helper('iwd_opc')->isCheckoutPage();
    }
}