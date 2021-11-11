<?php

class Doku_Myshortcart_Model_Standard extends Mage_Payment_Model_Method_Abstract
{
    protected $_code = 'myshortcart';
	
	protected $_isInitializeNeeded      = true;
	protected $_canUseInternal          = true;
	protected $_canUseForMultishipping  = false;
	
	protected $_formBlockType = 'myshortcart/payment_form_myshortcart';
	
	public function getOrderPlaceRedirectUrl() {
		
		$allowedCurrencies = Mage::getModel('directory/currency')->getConfigAllowCurrencies(); 
		
		if (in_array('IDR', $allowedCurrencies)){
			return Mage::getUrl('myshortcart/payment/sending', array('_secure' => true));
		}
		if (!in_array('IDR', $allowedCurrencies)){
			return Mage::getUrl('myshortcart/payment/noidr');
		}

	}
}

?>
