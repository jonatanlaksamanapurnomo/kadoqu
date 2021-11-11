<?php
class DRex_Smssimple_Model_Observer{
	public function sendSmsShipped(Varien_Event_Observer $observer){
		Mage::log("sendSmsShipped : trigerred", null, 'DRex_Smssimple.log');
		$pengirim = "";
		$d = $observer->getShipment();
		$billing_address_id = $d->getData("billing_address_id");
		$address = Mage::getModel('sales/order_address')->load($billing_address_id);
		$nomorhp = $address->getData("telephone");
		if(strlen($nomorhp)>2){
			$postdata = array();
			$postdata["nomor"] = $nomorhp;
			$postdata["isi"] = "Psnan anda telah diproses dan dikirim.";
			$this->__invkSmsBtw($postdata);
		}
	}
	
	public function sendSmsInvoiced(Varien_Event_Observer $observer){
		Mage::log("sendSmsInvoiced : trigerred", null, 'DRex_Smssimple.log');
		$pengirim = "";
		$invoice = $observer->getInvoice();
		$billing_address_id = $invoice->getData("billing_address_id");
		$address = Mage::getModel('sales/order_address')->load($billing_address_id);
		Mage::log($address->getData(), null, 'DRex_Smssimple.log');
		$nomorhp = $address->getData("telephone");
		//die();
		if(strlen($nomorhp)>2){
			$postdata = array();
			$postdata["nomor"] = $nomorhp;
			$postdata["isi"] = "Tks.Pembayaran utk psnan #".$invoice->getIncrementId()." tlh diterima & siap dikirim.";
			$this->__invkSmsBtw($postdata);
		}
	}
	
	public function sendSmsOrdered(Varien_Event_Observer $observer){
		$website_name = "";
		//$session = Mage::getSingleton('checkout/session');
		//$session->unsMageOptoutRemoved(); 
		
		Mage::log("sendSmsOrdered : trigerred", null, 'DRex_Smssimple.log');
		$order = $observer->getOrder();
		$nomorhp = $order->getBillingAddress()->getTelephone();
		if(strlen($nomorhp)>2){
			$postdata = array();
			$postdata["nomor"] = $nomorhp;
			$postdata["isi"] = "Tks ats kprcyaan Anda. Psnan utk #".$order->getIncrementId()." tlh ditrima.";
			$this->__invkSmsBtw($postdata);
		}
	}
	protected function __invkSmsBtw($postdata=array()){
		//$postdata = array();
		if(count($postdata)>0){
			$url = "http://60.253.121.51:3128/dgm_sms/sendsms.php?apikey=kmzwakdq21";
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postdata));
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT , 3); 
			curl_setopt($ch, CURLOPT_TIMEOUT, 3); //timeout in seconds
			$res = curl_exec($ch);
			curl_close($ch);
			Mage::log("Sms triggered : ".$postdata["isi"], null, 'DRex_Smssimple.log');
		}
	}
}