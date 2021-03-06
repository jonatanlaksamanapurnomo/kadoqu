<?php  
    class Dewata_Posems_Model_Carrier_Posems     
		extends Mage_Shipping_Model_Carrier_Abstract
		implements Mage_Shipping_Model_Carrier_Interface
	{  
		protected $_code = 'posems';
		public function collectRates(Mage_Shipping_Model_Rate_Request $request){  
			$store_id = Mage::getSingleton('checkout/session')->getQuote()->getStoreId();
			$website_id = Mage::getModel('core/store')->load($store_id)->getWebsiteId();
			$website = Mage::app()->getWebsite($website_id);
			$website_code = $website->getData("code");
			
			if($website_code != "admin"){
				Mage::log('====frontend mode', null, 'dewata_posems.log');
				return $this->__sendrequest($request);	
			}
			Mage::log('====backend mode', null, 'dewata_posems.log');
			return $this->__sendrequestAdm($request);			
		} 

		public function __sendrequest($request=null){
			$w=0;
			$i=0;
			foreach ($request->getAllItems() as $item) {
				if($item->getPrice()>0){
					$qty  = 0;
					$cw  = 0;
					$iw  = 0;
					Mage::log(json_encode($item->getData()));
					$iw  = (float) $item->getProduct()->getWeight();
					$sku = $item->getProduct()->getSku();
					$qty = (float) $item->getQty();
					$cw  = $iw * $qty;
					$w   = $w + $cw;
					$i++;
					Mage::log($i.'. '.$sku.' Qty: '.$qty.' berat: '.$iw.' cweight: '.$cw, null, 'dewata_jnereg.log');
				}
				
			}
			$kurs = 1;
			$totalw = ceil($w/1000);
			Mage::log('Total w on gr : '.$w, null, 'dewata_posems.log');
			Mage::log('Total w on Kg : '.$totalw, null, 'dewata_posems.log');
			/*end weight kalkulator*/
			$saddr = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress();
			
			$street = $saddr->getData('street');
			$streets = explode("\n",$street);
			$kecamatan = end($streets);
			
			$city = $saddr->getData('city');
			$region = $saddr->getData('region');
			$country_id = $saddr->getData('country_id');
			$countryCollection = Mage::getModel('directory/country')->getCollection();
			foreach ($countryCollection as $c) {
					if ($country_id == $c->getCountryId()) {
							$country = $c->getName();
							break;
					}
			}
			$region_id = $saddr->getData('region_id');
			if(!empty($region_id)){
				$region_data = Mage::getModel('directory/region')->load($region_id);
				$region = $region_data->getName();
			}
			$store_id = Mage::getSingleton('checkout/session')->getQuote()->getStoreId();
			$website_id = Mage::getModel('core/store')->load($store_id)->getWebsiteId();
			$website = Mage::app()->getWebsite($website_id);
			$website_name = $website->getData("name");
			$website_code = $website->getData("code");
			
			
			
			Mage::log("website_code: ".$website_code, null, 'dewata_posems.log');
			Mage::log("store_id: ".$store_id, null, 'dewata_posems.log');
			Mage::log("website_id: ".$website_id, null, 'dewata_posems.log');
			Mage::log("kecamatan: ".$kecamatan, null, 'dewata_posems.log');
			Mage::log("city: ".$city, null, 'dewata_posems.log');
			Mage::log("region: ".$region, null, 'dewata_posems.log');
			Mage::log("Country: ".$country.'('.$country_id.')', null, 'dewata_posems.log');
			
			$kurs=1;
			if($country_id != "ID"){
				//get latest kurs
				
				$url = "http://kurs.onthrough.link/home/latest";
				Mage::log("getting latest kurs from: ".$url, null, 'dewata_posems.log');
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				$res = curl_exec($ch);
				$jres = json_decode($res);
				if(!empty($jres->result[0]->value)){
					$kurs = $jres->result[0]->value;
				}else{
					$kurs = 15246;
				}
				
				Mage::log("kurs: ".$kurs, null, 'dewata_posems.log');
			
				$url  = $GLOBALS['panel_url']."api/ongkir/getems/";
				$url .= "?country=" . urlencode($country_id);
				$url .= "&region=" . urlencode($country);
				$url .= "&weight=".$totalw;
				//$url = "http://192.168.1.141/project/kerja/shafco/ency_panel/api/ongkir/?city=bandung&region=all&country=all";
				
				Mage::log("api url from apikey : ".$url, null, 'dewata_posems.log');
				
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
				$head = curl_exec($ch);
				curl_close($ch);
				
				Mage::log("curl result: ".$head, null, 'dewata_posems.log');
				$requests = json_decode($head);
				
				$result = Mage::getModel('shipping/rate_result');
				if (!empty($requests->result)) {
					$i =1;
					foreach ($requests->result as $r) {
						$method = Mage::getModel('shipping/rate_result_method');
						$method->setCarrier($this->_code);
						$method->setCarrierTitle($this->getConfig('title'));
						$method->setMethod($this->_code . $i++);
						if($r->kode == "000000"){
							$method->setMethodTitle("".$r->service." (".$r->city.")");
						}else{
							$method->setMethodTitle("".$r->service." (".$r->city.") *".$r->kode);
						}
						Mage::log("".$r->service." (".$r->city.")", null, 'dewata_posems.log');
						$price = $kurs*$r->price;
						Mage::log("price: ".$price, null, 'dewata_posems.log');
						//$price = $totalw * $price;
						Mage::log("total price: ".$price, null, 'dewata_posems.log');
						
						
						$method->setPrice($price);
						$method->setCost($price);
						$result->append($method);
					}
					Mage::log("end of log", null, 'dewata_posems.log');
					return $result;
				} else {
					return false;
				}
			}else{
				Mage::log("Negara = ID", null, 'dewata_posems.log');
				Mage::log("end of log", null, 'dewata_posems.log');
				return false;
			}
			
		}

		/**
		 * Get allowed shipping methods
		 *
		 * @return array
		 */
		public function getAllowedMethods()
		{
			return array($this->_code=>$this->getConfigData('name'));
		}
		private function getVendorLogo($str,$country="ID"){
			if($country=="ID"){
				
				$findme   = 'jne';
				$pos = strpos(strtolower($str), $findme);
				if ($pos !== false) {
					return '<img src=$GLOBALS['panel_url']."assets/img/jne.png" style="height: 25px;" /><br />';
				}else{
					return '<img src=$GLOBALS['panel_url']."assets/img/pos.png" style="height: 25px;" /><br />';
				}
			}else{
				return '<img src=$GLOBALS['panel_url']."assets/img/pos_ems.png" style="height: 25px;" /><br />';
			}
		}
		public function __sendrequestAdm($request=null){
			foreach ($request->getAllItems() as $item) {
				if($item->getPrice()>0){
					$qty  = 0;
					$cw  = 0;
					$iw  = 0;
					Mage::log(json_encode($item->getData()));
					$iw  = (float) $item->getProduct()->getWeight();
					$sku = $item->getProduct()->getSku();
					$qty = (float) $item->getQty();
					$cw  = $iw * $qty;
					$w   = $w + $cw;
					$i++;
					Mage::log($i.'. '.$sku.' Qty: '.$qty.' berat: '.$iw.' cweight: '.$cw, null, 'dewata_jnereg.log');
				}
				
			}
			$totalw = ceil($w/1000);
			Mage::log(json_encode($request->getData()), null, 'dewata_posems.log');
			Mage::log('Total w on gr : '.$w, null, 'dewata_posems.log');
			Mage::log('Total w on Kg : '.$totalw, null, 'dewata_posems.log');
			/*end weight kalkulator*/
			$street = $request->getData('dest_street');
			$streets = explode("\n",$street);
			$kecamatan = end($streets);
			
			$city = $request->getData('dest_city');
			//$region = $request->getData('dest_region');
			$country_id = $request->getData('dest_country_id');
			$countryCollection = Mage::getModel('directory/country')->getCollection();
			foreach ($countryCollection as $c) {
					if ($country_id == $c->getCountryId()) {
							$country = $c->getName();
							break;
					}
			}
			//$region_id = $saddr->getData('dest_region_id');
			//if(!is_null($region_id)){
				//$region_data = Mage::getModel('directory/region')->load($region_id);
				//$region = $region_data->getName();
			//}
			$store_id = Mage::getSingleton('checkout/session')->getQuote()->getStoreId();
			$website_id = Mage::getModel('core/store')->load($store_id)->getWebsiteId();
			$website = Mage::app()->getWebsite($website_id);
			$website_name = $website->getData("name");
			$website_code = $website->getData("code");
			
			
			
			Mage::log("website_code: ".$website_code, null, 'dewata_posems.log');
			Mage::log("store_id: ".$store_id, null, 'dewata_posems.log');
			Mage::log("website_id: ".$website_id, null, 'dewata_posems.log');
			Mage::log("kecamatan: ".$kecamatan, null, 'dewata_posems.log');
			Mage::log("city: ".$city, null, 'dewata_posems.log');
			Mage::log("region: ".$region, null, 'dewata_posems.log');
			Mage::log("Country: ".$country.'('.$country_id.')', null, 'dewata_posems.log');
			
			$kurs=1;
			if($country_id != "ID"){
				//get latest kurs
				
				$url = "http://kurs.onthrough.link/home/latest";
				Mage::log("getting latest kurs from: ".$url, null, 'dewata_posems.log');
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				$res = curl_exec($ch);
				$jres = json_decode($res);
				if(!empty($jres->result[0]->value)){
					$kurs = $jres->result[0]->value;
				}else{
					$kurs = 15246;
				}
				
				Mage::log("kurs: ".$kurs, null, 'dewata_posems.log');
			
				$url  = $GLOBALS['panel_url']."api/ongkir/getems/";
				$url .= "?country=" . urlencode($country_id);
				$url .= "&region=" . urlencode($country);
				$url .= "&weight=".$totalw;
				//$url = "http://192.168.1.141/project/kerja/shafco/ency_panel/api/ongkir/?city=bandung&region=all&country=all";
				
				Mage::log("api url from apikey : ".$url, null, 'dewata_posems.log');
				
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
				$head = curl_exec($ch);
				curl_close($ch);
				
				Mage::log("curl result: ".$head, null, 'dewata_posems.log');
				$requests = json_decode($head);
				
				$result = Mage::getModel('shipping/rate_result');
				if (!empty($requests->result)) {
					$i =1;
					foreach ($requests->result as $r) {
						$method = Mage::getModel('shipping/rate_result_method');
						$method->setCarrier($this->_code);
						$method->setCarrierTitle($this->getConfig('title'));
						$method->setMethod($this->_code . $i++);
						if($r->kode == "000000"){
							$method->setMethodTitle("".$r->service." (".$r->city.")");
						}else{
							$method->setMethodTitle("".$r->service." (".$r->city.") *".$r->kode);
						}
						Mage::log("".$r->service." (".$r->city.")", null, 'dewata_posems.log');
						$price = $kurs*$r->price;
						Mage::log("price: ".$price, null, 'dewata_posems.log');
						//$price = $totalw * $price;
						Mage::log("total price: ".$price, null, 'dewata_posems.log');
						
						
						$method->setPrice($price);
						$method->setCost($price);
						$result->append($method);
					}
					Mage::log("end of log", null, 'dewata_posems.log');
					return $result;
				} else {
					return false;
				}
			}else{
				Mage::log("Negara = ID", null, 'dewata_posems.log');
				Mage::log("end of log", null, 'dewata_posems.log');
				return false;
			}
			
		}
}  
