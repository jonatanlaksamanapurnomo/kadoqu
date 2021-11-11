<?php

class Doku_Myshortcart_Block_Whatismyshortcart extends Mage_Core_Block_Abstract
{
    
     protected function _toHtml()
    {
        echo '<img src="'.Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA).'/myshortcart/logo.png"/>';
	echo '<br />';
	echo '<p><strong>Apa itu DOKU MyShortCart?</strong></p>';
	echo '<p>DOKU MyShortCart merupakan solusi pembayaran online untuk netpreneur, start-up, maupun penjual individu yang biasa berjualan melalui social media seperti Facebook, twitter dan lainnya. Solusi MyShortCart dapat juga digunakan untuk perusahaan-perusahaan kecil dan menengah sebagai alat pembayaran online dengan mudah dan terpercaya.</p>';
	echo '<p>Metode pembayaran apa yang diterima DOKU MyShortCart?
MyShortCart saat ini menerima Credit Card VISA dan MasterCard, DOKU Wallet serta Transfer ATM.</p>';
		
    }
}
?>
