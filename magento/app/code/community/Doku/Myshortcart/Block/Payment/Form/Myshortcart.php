<?php

class Doku_Myshortcart_Block_Payment_Form_Myshortcart extends Mage_Payment_Block_Form
{
    
     protected function _construct()
  
    {
        
		$mark = Mage::getConfig()->getBlockClassName('core/template');
        $mark = new $mark;
        $mark->setTemplate('myshortcart/payment/form/myshortcart.phtml');
		
		$this->setTemplate('myshortcart/payment/redirect.phtml')
            ->setRedirectMessage(
                Mage::helper('myshortcart')->__('<p>Anda akan diarahkan ke website myShortCart setelah klik Place Order.</p>')
            )
            ->setMethodTitle('') 
			->setMethodLabelAfterHtml($mark->toHtml());
		
			return parent::_construct();    
	}
}

?>
