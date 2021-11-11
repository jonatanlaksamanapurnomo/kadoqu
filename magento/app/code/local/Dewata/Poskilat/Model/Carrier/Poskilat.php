<?php  
    class Dewata_Poskilat_Model_Carrier_Poskilat     
		extends Mage_Shipping_Model_Carrier_Abstract
		implements Mage_Shipping_Model_Carrier_Interface
	{  
		protected $_code = 'poskilat';
		public function collectRates(Mage_Shipping_Model_Rate_Request $request){  
			$store_id = Mage::getSingleton('checkout/session')->getQuote()->getStoreId();
			$website_id = Mage::getModel('core/store')->load($store_id)->getWebsiteId();
			$website = Mage::app()->getWebsite($website_id);
			$website_code = $website->getData("code");
			
			if($website_code != "admin"){
				Mage::log('====frontend mode', null, 'dewata_poskilat.log');
				//return false;
				return $this->__sendrequest($request);
				
			}
			Mage::log('====backend mode', null, 'dewata_poskilat.log');
			return $this->__sendrequestAdm($request);			
		} 

		public function __sendrequest($request=null){
			$w=0;
			$i=0;
			$kecamatan="";
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
			Mage::log('Total w on gr : '.$w, null, 'dewata_poskilat.log');
			Mage::log('Total w on Kg : '.$totalw, null, 'dewata_poskilat.log');
			/*end weight kalkulator*/
			$saddr = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress();
			
			$street = $saddr->getData('street');
			$streets = explode("\n",$street);
			$postcode = $saddr->getData('postcode');
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
			$store_code = Mage::app()->getStore()->getCode();
			$website_id = Mage::getModel('core/store')->load($store_id)->getWebsiteId();
			$website = Mage::app()->getWebsite($website_id);
			$website_name = $website->getData("name");
			$website_code = $website->getData("code");
			
			
			Mage::log("store_id: ".$store_id, null, 'dewata_poskilat.log');
			Mage::log("postcode: ".$postcode, null, 'dewata_poskilat.log');
			Mage::log("website_id: ".$website_id, null, 'dewata_poskilat.log');
			Mage::log("store_code: ".$store_code, null, 'dewata_poskilat.log');
			//Mage::log("kecamatan: ".$kecamatan, null, 'dewata_poskilat.log');
		//	Mage::log("city: ".$city, null, 'dewata_poskilat.log');
			//Mage::log("region: ".$region, null, 'dewata_poskilat.log');
			//Mage::log("Country: ".$country.'('.$country_id.')', null, 'dewata_poskilat.log');
			
			//free ongkir mezora
			// Mage::log('Validasi free ongkir untuk mezora', null, 'dewata_poskilat.log');
			// if(strtolower($region)=="jawa barat" || strtolower($region)=="banten"){
				// Mage::log('masuk ke jabar banten', null, 'dewata_poskilat.log');
				// if($website_code=="mezora"){
					// Mage::log('website codenya '.$website_code.', POSKILAT deactivated', null, 'dewata_poskilat.log');
					// Mage::log('end of log', null, 'dewata_poskilat.log');
					// return false;
				// } 
			// }
			$currency_code = Mage::app()->getStore()->getCurrentCurrencyCode();;
			Mage::log('Currency Code : '.$currency_code, null, 'dewata_jnereg.log');
			if($currency_code=='base'){
				$kurs = (float) $kurs;
			}elseif($currency_code=='IDR'){
				$kurs = (float) $kurs;
			}elseif($currency_code=='USD'){
				$kurs = (float) $kurs/15000;
			}elseif($currency_code=='EUR'){
				$kurs = (float) $kurs/18000;
			}else{
				$kurs = (float) $kurs/10000;
			}
			Mage::log("kurs: ".$kurs, null, 'dewata_poskilat.log');
			
			$url  = "http://api.kadoqu.com/api/ongkir/getpos/";
			$url .= "?country=" . urlencode($country_id);
			$url .= "&kodepos=" . urlencode($postcode);
			$url .= "&weight=".$totalw;
			//$url = "http://192.168.1.141/project/kerja/shafco/ency_panel/api/ongkir/?city=bandung&region=all&country=all";
			
			Mage::log("api url from apikey : ".$url, null, 'dewata_poskilat.log');
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
			$head = curl_exec($ch);
			curl_close($ch);
			
			Mage::log("curl result: ".$head, null, 'dewata_poskilat.log');
			$requests = json_decode($head);
			
			$result = Mage::getModel('shipping/rate_result');
			$berat = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress()->getWeight();
			$berat = (float) $berat;
			Mage::log('Total berat gr: '.$berat, null, 'dewata_poskilat.log');
			$berat = ceil($berat/1000);
			Mage::log('Total berat kg: '.$berat, null, 'dewata_poskilat.log');
			if (!empty($requests->result)) {
				$i =1;
				foreach ($requests->result as $r) {
					$method = Mage::getModel('shipping/rate_result_method');
					$method->setCarrier($this->_code);
					$method->setCarrierTitle($this->getConfig('title'));
					$method->setMethod($this->_code . $i++);
					$kode = $r->code;
					$kode = str_replace(" ","",$kode);
					if(strtolower($kode) == "poskilat"){
						if(strtolower($store_code)=="id"){
							$method->setMethodTitle("".$r->service." Waktu Pengiriman 6-28 Hari (".$r->city.")");
						}else{
							$method->setMethodTitle("".$r->service." Est Shipment 6-28 Days (".$r->city.")");
						}
					}elseif(strtolower($kode) == "poskilatkhusus"){
						if(strtolower($store_code)=="id"){
							$method->setMethodTitle("".$r->service." Waktu Pengiriman 3-10 Hari (".$r->city.")");
						}else{
							$method->setMethodTitle("".$r->service." Est Shipment 3-10 Days (".$r->city.")");
						}
					}else{
						if(strtolower($store_code)=="id"){
							$method->setMethodTitle("".$r->service." Waktu Pengiriman 1-4 Hari (".$r->city.")");
						}else{
							$method->setMethodTitle("".$r->service." Est Shipment 1-4 Days (".$r->city.")");
						}
					}
					Mage::log("".$r->service." (".$r->city.")", null, 'dewata_poskilat.log');
					$price = $kurs*$r->price;
					Mage::log("price: ".$price, null, 'dewata_poskilat.log');
					//$price = $totalw * $price;
					Mage::log("total price: ".$price, null, 'dewata_poskilat.log');
					
					
					$method->setPrice($price);
					$method->setCost($price);
					$result->append($method);
				}
				Mage::log("end of log", null, 'dewata_poskilat.log');
				return $result;
			} else {
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
		public function __sendrequestAdm($request=null){
			Mage::log(json_encode($request->getData()), null, 'dewata_poskilat.log');
			$w = 0;
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
			Mage::log('Berat : '.$w.' gr', null, 'dewata_poskilat.log');
			Mage::log('Berat : '.$totalw.' kg', null, 'dewata_poskilat.log');
			/*end weight kalkulator*/
			$saddr = Mage::getSingleton('adminhtml/session_quote')->getQuote()->getShippingAddress();
			
			$street = $request->getData('dest_street');
			$streets = explode("\n",$street);
			$postcode = $request->getData('dest_postcode');
			$region = $request->getData('region');
			$country_id = $request->getData('dest_country_id');
			$countryCollection = Mage::getModel('directory/country')->getCollection();
			foreach ($countryCollection as $c) {
					if ($country_id == $c->getCountryId()) {
							$country = $c->getName();
							break;
					}
			}
			$region_id = $request->getData('dest_region_id');
			if(!empty($region_id)){
				$region_data = Mage::getModel('directory/region')->load($region_id);
				$region = $region_data->getName();
			}
			$website_id = $request->getData('website_id');
			$website = Mage::app()->getWebsite($website_id);
			$website_name = $website->getData("name");
			$website_code = $website->getData("code");
			
			
			Mage::log("store_id: admin", null, 'dewata_poskilat.log');
			Mage::log("postcode: ".$postcode, null, 'dewata_poskilat.log');
			Mage::log("website_id: ".$website_id, null, 'dewata_poskilat.log');
			//Mage::log("kecamatan: ".$kecamatan, null, 'dewata_poskilat.log');
			//Mage::log("city: ".$city, null, 'dewata_poskilat.log');
			Mage::log("region: ".$region, null, 'dewata_poskilat.log');
			Mage::log("Country: ".$country.'('.$country_id.')', null, 'dewata_poskilat.log');
			
			//free ongkir mezora
			// Mage::log('Validasi free ongkir untuk mezora', null, 'dewata_poskilat.log');
			// if(strtolower($region)=="jawa barat" || strtolower($region)=="banten"){
				// Mage::log('masuk ke jabar banten', null, 'dewata_poskilat.log');
				// if($website_code=="mezora"){
					// Mage::log('website codenya '.$website_code.', POSKILAT deactivated', null, 'dewata_poskilat.log');
					// Mage::log('end of log', null, 'dewata_poskilat.log');
					// return false;
				// } 
			// }
			
			$currency_code = Mage::app()->getStore()->getCurrentCurrencyCode();;
			Mage::log('Currency Code : '.$currency_code, null, 'dewata_jnereg.log');
			if($currency_code=='base'){
				$kurs = (float) $kurs;
			}elseif($currency_code=='IDR'){
				$kurs = (float) $kurs;
			}elseif($currency_code=='USD'){
				$kurs = (float) $kurs/15000;
			}elseif($currency_code=='EUR'){
				$kurs = (float) $kurs/18000;
			}else{
				$kurs = (float) $kurs/10000;
			}
			Mage::log("kurs: ".$kurs, null, 'dewata_poskilat.log');
			
			$url  = "http://api.kadoqu.com/api/ongkir/getposkilat/";
			$url .= "?country=" . urlencode($country_id);
			$url .= "&kodepos=" . urlencode($postcode);
			$url .= "&weight=".$totalw;
			//$url = "http://192.168.1.141/project/kerja/shafco/ency_panel/api/ongkir/?city=bandung&region=all&country=all";
			
			Mage::log("api url from apikey : ".$url, null, 'dewata_poskilat.log');
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
			$head = curl_exec($ch);
			curl_close($ch);
			
			Mage::log("curl result: ".$head, null, 'dewata_poskilat.log');
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
					Mage::log("".$r->service." (".$r->city.")", null, 'dewata_poskilat.log');
					$price = $kurs*$r->price;
					Mage::log("price: ".$price, null, 'dewata_poskilat.log');
					//$price = $totalw * $price;
					Mage::log("total price: ".$price, null, 'dewata_poskilat.log');
					
					
					$method->setPrice($price);
					$method->setCost($price);
					$result->append($method);
				}
				Mage::log("end of log", null, 'dewata_poskilat.log');
				return $result;
			} else {
				return false;
			}
		}
	}  
