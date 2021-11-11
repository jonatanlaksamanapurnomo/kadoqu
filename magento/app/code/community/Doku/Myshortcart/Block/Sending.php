<?php

class Doku_Myshortcart_Block_Sending extends Mage_Core_Block_Abstract 
{
     protected function _toHtml()
    {   
        $form = new Varien_Data_Form();
        $form->setAction('https://apps.myshortcart.com/payment/request-payment/')
            ->setId('myshortcartredirect')
            ->setName('myshortcartredirect')
            ->setMethod('POST')
            ->setUseContainer(true);
        
        $invoid = trim(Mage::getStoreConfig('payment/myshortcart/prefixkey')).trim(Mage::helper('myshortcart')->getUserInvoice());
        $amount = Mage::helper('myshortcart')->getTotalPrice();
        

        $strwords = sha1(trim(Mage::helper('myshortcart')->getTotalPrice()).trim(Mage::getStoreConfig('payment/myshortcart/sharekey')).trim($invoid));
        
        $connection = Mage::getSingleton('core/resource')->getConnection('core_write');
        $connection->query("insert into myshortcart (transidmerchant,start_time,result_trx,amount) values ('".$invoid."',NOW(),'Requested',".$amount.") ");
        
        $form->addField('STOREID', 'hidden', array('name'=>'STOREID', 'value'=>Mage::getStoreConfig('payment/myshortcart/storeid')));
        $form->addField('BASKET', 'hidden', array('name'=>'BASKET', 'value'=>Mage::helper('myshortcart')->getProducts()));
        $form->addField('AMOUNT', 'hidden', array('name'=>'AMOUNT', 'value'=>$amount));
        $form->addField('TRANSIDMERCHANT', 'hidden', array('name'=>'TRANSIDMERCHANT', 'value'=>$invoid));
        $form->addField('WORDS', 'hidden', array('name'=>'WORDS', 'value'=>$strwords));
        $form->addField('CNAME', 'hidden', array('name'=>'CNAME', 'value'=>Mage::helper('myshortcart')->getUserName()));
        $form->addField('CEMAIL', 'hidden', array('name'=>'CEMAIL', 'value'=>Mage::helper('myshortcart')->getUserEmail()));
        $form->addField('CWPHONE', 'hidden', array('name'=>'CWPHONE', 'value'=>Mage::helper('myshortcart')->getUserPhone()));
        $form->addField('CMPHONE', 'hidden', array('name'=>'CMPHONE', 'value'=>Mage::helper('myshortcart')->getUserPhone()));

        $form->addField('CHPHONE', 'hidden', array('name'=>'CHPHONE', 'value'=>Mage::helper('myshortcart')->getUserPhone()));
        $form->addField('CCAPHONE', 'hidden', array('name'=>'CCAPHONE', 'value'=>Mage::helper('myshortcart')->getUserPhone()));

        $form->addField('CADDRESS', 'hidden', array('name'=>'CADDRESS', 'value'=>Mage::helper('myshortcart')->getUserAddress()));
        $form->addField('CZIPCODE', 'hidden', array('name'=>'CZIPCODE', 'value'=>Mage::helper('myshortcart')->getUserZip()));

        $form->addField('SADDRESS', 'hidden', array('name'=>'SADDRESS', 'value'=>Mage::helper('myshortcart')->getUserAddress()));
        $form->addField('SZIPCODE', 'hidden', array('name'=>'SZIPCODE', 'value'=>Mage::helper('myshortcart')->getUserZip()));
        $form->addField('SCITY', 'hidden', array('name'=>'SCITY', 'value'=>Mage::helper('myshortcart')->getUserCity()));
        $form->addField('SSTATE', 'hidden', array('name'=>'SSTATE', 'value'=>Mage::helper('myshortcart')->getUserState()));
        $form->addField('SCOUNTRY', 'hidden', array('name'=>'SCOUNTRY', 'value'=>Mage::helper('myshortcart')->getUserCountry()));

        $form->addField('BIRTHDATE', 'hidden', array('name'=>'BIRTHDATE', 'value'=>"00-00-0000"));
        
        $html = '<html><body>';
        $html.= $this->__('<p>Sekarang Anda akan diarahkan ke website myShortCart untuk melakukan pembayaran.</p>');
        $html.= $form->toHtml();
        $html.= '<script type="text/javascript">document.getElementById("myshortcartredirect").submit();</script>';
        $html.= '</body></html>';

        return $html;
        
      
    }
    
}
?>
