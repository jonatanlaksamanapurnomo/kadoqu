<?php
/**
 * Konfirmasi Pembayaran
 * 	
 * @package		Magento
 * @author		adisthana wijaya (info@adisthana.com)
 * @website		http://adisthana.com
 * @version		0.1.0
 * 
 */
 
class Awbali_Konfirmasipembayaran_IndexController extends Mage_Core_Controller_Front_Action
{
    public function indexAction()
    {
		$this->loadLayout();    
		$this->getLayout()->getBlock('head')->setTitle('Konfirmasi Pembayaran'); 
		$this->renderLayout();
    }
	
	public function postAction()
    {
		$params = $this->getRequest()->getParams();
		$shopper = Mage::getModel('konfirmasipembayaran/konfirmasipembayaran');
		$shopper->setNoOrder($params['noorder']);
		$shopper->setBankBuyer($params['bankbuyer']);
		$shopper->setBankMerchant($params['banktujuan']);
		$shopper->setMetodeTransfer($params['metodetransfer']);
		$shopper->setNamaBuyer($params['nama']);
		$shopper->setNoRekBuyer($params['rekbuyer']);
		$shopper->setTanggalTransfer($params['tanggaltransfer']);
		$shopper->setJumlahTransfer($params['jumlahtransfer']);
		$shopper->setEmailBuyer($params['email']);
		$shopper->setCreatedTime(date("Y-m-d H:i:s"));
		$shopper->save();
		
		// send email notofication to store owner
		$fromEmail = $params['email']; // sender email address
		$fromName = $params['nama']; // sender name
	 
		$toEmail = Mage::getStoreConfig('trans_email/ident_general/email'); // magento general contact email
		$toName = Mage::getStoreConfig('trans_email/ident_general/name');  // magento general contact name
		
		$body = "Nama : ".$params['nama']."\n";	
		$body .= "Email : ".$params['email']."\n";
		$body .= "No. Order : ".$params['noorder']."\n";
		$body .= "Nama Bank Pengirim : ".$params['bankbuyer']."\n\n";
		$body .= "No. Rekening Pengirim : ".$params['rekbuyer']."\n";
		$body .= "Jumlah Transfer : ".$params['jumlahtransfer']."\n";
		$body .= "Bank Tujuan : ".$params['banktujuan']."\n\n";
		$body .= "Metode Transfer : ".$params['metodetransfer']."\n";
		$body .= "Tanggal Transfer : ".$params['tanggaltransfer']."\n\n";   
		$subject = "Konfirmasi Pembayaran ".$params['noorder']; // subject text
	 
		$mail = new Zend_Mail();  
		$mail->setBodyText($body);
		$mail->setFrom($fromEmail, $fromName);
		$mail->addTo($toEmail, $toName);
		$mail->setSubject($subject);
	 
		try {
			$mail->send();
		}
		catch(Exception $ex) {
			Mage::getSingleton('core/session')
				->addError(Mage::helper('konfirmasipembayaran')
				->__('Unable to send email.'));
		}
		
		//set redirect to success page
		Mage::app()->getFrontController()->getResponse()->setRedirect(Mage::getUrl('konfirmasipembayaran/sukses/'));
    }
}