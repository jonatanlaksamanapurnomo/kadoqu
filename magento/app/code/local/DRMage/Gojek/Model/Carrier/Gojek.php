<?php  
    class DRMage_Gojek_Model_Carrier_Gojek    
		extends Mage_Shipping_Model_Carrier_Abstract
		implements Mage_Shipping_Model_Carrier_Interface
	{  
		protected $_code = 'gojek';  
    var $pricelist = 'YUhSMGNEb3ZMMkZ3YVM1dmJuUm9jbTkxWjJndWJHbHVheTloYkdGdFlYUXZjSEp2Y0dsdWMya3Y=';
        
		/**
		 * Get allowed shipping methods
		 *
		 * @return array
		 */
		public function getAllowedMethods()
		{
			return array($this->_code=>$this->getConfigData('name'));
		}
		public function collectRates(Mage_Shipping_Model_Rate_Request $request){  				
			$enable = Mage::getStoreConfig('carriers/gojek/active',Mage::app()->getStore());
			$price = Mage::getStoreConfig('carriers/gojek/price',Mage::app()->getStore());
			$name = Mage::getStoreConfig('carriers/gojek/name',Mage::app()->getStore());
			$title = Mage::getStoreConfig('carriers/gojek/title',Mage::app()->getStore());
			$storecode = Mage::getStoreConfig('carriers/gojek/api_key',Mage::app()->getStore());
			$city = Mage::getStoreConfig('carriers/gojek/city',Mage::app()->getStore());
			$saddr = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress();
			$ccity = $saddr->getData('city');
			//$pl = $this->getPrice($this->pricelist,$storecode);
			$pl = "";
			Mage::log('enable: '.$enable, null, 'drmage_gojek.log');
			Mage::log('price: '.$price, null, 'drmage_gojek.log');
			Mage::log('title: '.$title, null, 'drmage_gojek.log');
			Mage::log('city: '.$city, null, 'drmage_gojek.log');
			Mage::log('ccity: '.$ccity, null, 'drmage_gojek.log');
			Mage::log($pl, null, 'drmage_gojek.log');
			//if($enable && count($pl)>0 && ($city==$ccity)){
			$i=0;
			if(($enable==1)){
				$scsc = strcmp($city,$ccity);
				if($scsc==0){
					Mage::log("OKE", null, 'drmage_gojek.log');
					$result = Mage::getModel('shipping/rate_result');
					$method = Mage::getModel('shipping/rate_result_method');
					$method->setCarrier($this->_code);
					$method->setCarrierTitle($title);
					$method->setMethod($this->_code . $i++);
					$method->setMethodTitle($name." ".$city);
					$method->setPrice($price);
					$method->setCost($price);
					$result->append($method);
					return $result;
				}	
			}
			return false;
	  } 
		public function fgcx($url){
			Mage::log('url: '.$url, null, 'drmage_gojek.log');
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			$res = curl_exec($ch);
			Mage::log('res: '.$res, null, 'drmage_gojek.log');
			curl_close($ch);
			return $res;
		}
		public function getPrice($pricelist,$storecode){
			$pricelist = base64_decode(base64_decode($pricelist))."/".$storecode;
			$pl = $this->fgcx($pricelist);
			$pl = json_decode($pl);
			return $pl;
		}
}  
