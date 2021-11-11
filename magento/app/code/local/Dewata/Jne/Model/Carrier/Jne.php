<?php  
    class Dewata_Jne_Model_Carrier_Jne     
		extends Mage_Shipping_Model_Carrier_Abstract
		implements Mage_Shipping_Model_Carrier_Interface
	{  
		protected $_code = 'jne';  
      
        
		public function collectRates(Mage_Shipping_Model_Rate_Request $request){  				
			$store_id = Mage::getSingleton('checkout/session')->getQuote()->getStoreId();
			$website_id = Mage::getModel('core/store')->load($store_id)->getWebsiteId();
			$website = Mage::app()->getWebsite($website_id);
			$website_code = $website->getData("code");
			
			if($website_code != "admin"){
				if($website_code != "mezora"){
					if(!isset($GLOBALS['dewata_result'])){
						Mage::log('====frontend mode', null, 'dewata_jne.log');
						return $this->__sendrequest($request);
					}else{
						//return false;
						Mage::log('====frontend mode', null, 'dewata_jne.log');
						return $this->__sendrequest($request);
					}
				}else{
					Mage::log('====frontend mode', null, 'dewata_jne.log');
					return $this->__sendrequest($request);
				}
			}else{
				
				Mage::log('====backend mode', null, 'dewata_jne.log');
			return $this->__sendrequestAdm($request);			
			}
	  } 

		public function __sendrequest($request=null){
			$w = 0;
			$i = 0;
			foreach ($request->getAllItems() as $item) {
				if($item->getPrice()>0){
					//$iw  = 0;
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
					Mage::log($i.'. '.$sku.' Qty: '.$qty.' berat: '.$iw.' cweight: '.$cw, null, 'dewata_jne.log');
				}
				
			}
			$totalw = ceil($w/1000);
			Mage::log('Total w on gr : '.$w, null, 'dewata_jne.log');
			Mage::log('Total w on Kg : '.$totalw, null, 'dewata_jne.log');
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
			//get store code
			$store_id = Mage::getSingleton('checkout/session')->getQuote()->getStoreId();
			$website_id = Mage::getModel('core/store')->load($store_id)->getWebsiteId();
			$website = Mage::app()->getWebsite($website_id);
			$website_name = $website->getData("name");
			$website_code = $website->getData("code");
			
			
			
			Mage::log("website_code: ".$website_code, null, 'dewata_jne.log');
			Mage::log("store_id: ".$store_id, null, 'dewata_jne.log');
			Mage::log("website_id: ".$website_id, null, 'dewata_jne.log');
			Mage::log("kecamatan: ".$kecamatan, null, 'dewata_jne.log');
			Mage::log("city: ".$city, null, 'dewata_jne.log');
			Mage::log("region: ".$region, null, 'dewata_jne.log');
			Mage::log("Country: ".$country.'('.$country_id.')', null, 'dewata_jne.log');
			
			$kurs=1;
			
			
			$currency_code = Mage::app()->getStore()->getCurrentCurrencyCode();
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
			Mage::log("kurs: ".$kurs, null, 'dewata_jne.log');
			
			$url  = "http://api.kadoqu.com/api/ongkir/getjne5/";
			$url .= "?country=" . urlencode($country_id);
			if($country_id != "ID"){
				$url .= "&region=" . urlencode($country);
			}else{
				$url .= "&kec=" . urlencode($kecamatan);
				$url .= "&city=" . urlencode($city);
				$url .= "&region=" . urlencode($region);
			}
			$url .= "&weight=".$totalw;
			//$url = "http://192.168.1.141/project/kerja/shafco/ency_panel/api/ongkir/?city=bandung&region=all&country=all";
			
			Mage::log("api url from apikey : ".$url, null, 'dewata_jne.log');
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
			$head = curl_exec($ch);
			curl_close($ch);
			
			Mage::log("curl result: ".$head, null, 'dewata_jne.log');
			$requests = json_decode($head);
			
			$result = Mage::getModel('shipping/rate_result');
			$berat = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress()->getWeight();
			$berat = (float) $berat;
			Mage::log('Total berat gr: '.$berat, null, 'dewata_jne.log');
			$berat = ceil($berat/1000);
			Mage::log('Total berat kg: '.$berat, null, 'dewata_jne.log');
			
			$store_code = Mage::app()->getStore()->getCode();
			Mage::log('Store Code: '.$store_code, null, 'dewata_jne.log');
			if (!empty($requests->result)) {
				$i =1;
				foreach ($requests->result as $r) {
					$method = Mage::getModel('shipping/rate_result_method');
					$method->setCarrier($this->_code);
					$method->setCarrierTitle($this->getConfig('title'));
					$method->setMethod($this->_code . $i++);
					if($r->service == "JNE YES"){
						if($store_code=="id"){
							$method->setMethodTitle("".$r->service." Waktu Pengiriman 1-3 Hari (".$r->city.") *".$r->kode);
						}else{
							$method->setMethodTitle("".$r->service." Est Shipment 1-3 Days (".$r->city.") *".$r->kode);
						}
					}elseif($r->service == "JNE OKE"){
						if($store_code=="id"){
							$method->setMethodTitle("".$r->service." Waktu Pengiriman 7-14 Hari (".$r->city.") *".$r->kode);
						}else{
							$method->setMethodTitle("".$r->service." Est Shipment 7-14 Days (".$r->city.") *".$r->kode);
						}
					}else{
						$method->setMethodTitle("".$r->service." (".$r->city.") *".$r->kode);
					}
					Mage::log("".$r->service." (".$r->city.")", null, 'dewata_jne.log');
					$price = $kurs*$r->price;
					Mage::log("price: ".$price, null, 'dewata_jne.log');
					//$price = $berat * $price;
					Mage::log("total price: ".$price, null, 'dewata_jne.log');
					
					
					$method->setPrice($price);
					$method->setCost($price);
					$result->append($method);
				}
				Mage::log("end of log", null, 'dewata_jne.log');
				return $result;
			}else{
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
		private function __oldWeightCalc(){
			/*start weight kalkulator*/
			$w = 0;
			$totalw = 1;
			$iw = 0;
			$i=0;
			foreach ($request->getAllItems() as $item) {
				$iw  = 0;
				$iw  = (float) $item->getProduct()->getWeight();
				$sku = $item->getProduct()->getSku();
				$w   = $w+$iw;
				$i++;
				Mage::log($i.'. '.$sku.' berat: '.$iw, null, 'dewata_jne.log');
			}
			$totalw = ceil($w/1000);
			Mage::log('Total on gr : '.$w, null, 'dewata_jne.log');
			Mage::log('Total on Kg : '.$totalw, null, 'dewata_jne.log');
			/*end weight kalkulator*/
		}
		public function __sendrequestAdm($request=null){
			$w = 0;
			$i = 0;
			foreach ($request->getAllItems() as $item) {
				if($item->getPrice()>0){
					//$iw  = 0;
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
					Mage::log($i.'. '.$sku.' Qty: '.$qty.' berat: '.$iw.' cweight: '.$cw, null, 'dewata_jne.log');
				}
				
			}
			$totalw = ceil($w/1000);
			Mage::log('Berat : '.$w.' gr', null, 'dewata_jne.log');
			Mage::log('Berat : '.$totalw.' Kg', null, 'dewata_jne.log');
			/*end weight kalkulator*/
			
			//$saddr = Mage::getSingleton('adminhtml/session_quote')->getQuote()->getShippingAddress();
			
			$street = $request->getData('dest_street');
			$streets = explode("\n",$street);
			$kecamatan = end($streets);
			
			$city = $request->getData('dest_city');
			$region = $request->getData('dest_region');
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
			//get store code
			$website_id = $request->getData('website_id');
			$website = Mage::app()->getWebsite($website_id);
			$website_name = $website->getData("name");
			$website_code = $website->getData("code");
			
			
			
			Mage::log("website_code: ".$website_code, null, 'dewata_jne.log');
			//Mage::log("store_id: ".$store_id, null, 'dewata_jne.log');
			Mage::log("website_id: ".$website_id, null, 'dewata_jne.log');
			Mage::log("kecamatan: ".$kecamatan, null, 'dewata_jne.log');
			Mage::log("city: ".$city, null, 'dewata_jne.log');
			Mage::log("region: ".$region, null, 'dewata_jne.log');
			Mage::log("Country: ".$country.'('.$country_id.')', null, 'dewata_jne.log');
			
			$kurs=1;
			
			
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
			}
			Mage::log("kurs: ".$kurs, null, 'dewata_jne.log');
			
			$url  = "http://api.kadoqu.com/api/ongkir/getjne5/";
			$url .= "?country=" . urlencode($country_id);
			if($country_id != "ID"){
				$url .= "&region=" . urlencode($country);
			}else{
				$url .= "&kec=" . urlencode($kecamatan);
				$url .= "&city=" . urlencode($city);
				$url .= "&region=" . urlencode($region);
			}
			$url .= "&weight=".$totalw;
			//$url = "http://192.168.1.141/project/kerja/shafco/ency_panel/api/ongkir/?city=bandung&region=all&country=all";
			
			Mage::log("api url from apikey : ".$url, null, 'dewata_jne.log');
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
			$head = curl_exec($ch);
			curl_close($ch);
			
			Mage::log("curl result: ".$head, null, 'dewata_jne.log');
			$requests = json_decode($head);
			
			$result = Mage::getModel('shipping/rate_result');
			if (!empty($requests->result)) {
				$i =1;
				foreach ($requests->result as $r) {
					Mage::log('Validasi free ongkir untuk mezora', null, 'dewata_jne.log');
					if(strtolower($region)=="jawa barat" || strtolower($region)=="banten"){
						Mage::log('masuk ke jabar banten', null, 'dewata_jne.log');
						if($website_code=="mezora"){
							//applied promo for mezora
							Mage::log('website codenya '.$website_code.', JNEYES & POS deactivated', null, 'dewata_jne.log');
							if($r->kode == "000000"){
								Mage::log('POS deactivated', null, 'dewata_jne.log');
								continue;
							}else{
								Mage::log('Building shipping promo Free Ongkir '.$r->service.' By Mezora', null, 'dewata_jne.log');
								$method = Mage::getModel('shipping/rate_result_method');
								$method->setCarrier($this->_code);
								$method->setCarrierTitle($this->getConfig('title'));
								$method->setMethod($this->_code . $i++);
								
								Mage::log("".$r->service." (".$r->city.")", null, 'dewata_jne.log');
								if($r->service=="JNE OKE"){
									$method->setMethodTitle("Free ".$r->service." Jabar&Banten (".$r->city.") *".$r->kode);
									$price = 0.0;
								}else{
									$method->setMethodTitle("".$r->service." (".$r->city.") *".$r->kode);
									$price = $kurs*$r->price;
								}
								Mage::log("price: ".$price, null, 'dewata_jne.log');
								Mage::log("total price: ".$price, null, 'dewata_jne.log');
								$method->setPrice($price);
								$method->setCost($price);
								$result->append($method);
							}
							
						}else{
							////bukan mezora
							$method = Mage::getModel('shipping/rate_result_method');
							$method->setCarrier($this->_code);
							$method->setCarrierTitle($this->getConfig('title'));
							$method->setMethod($this->_code . $i++);
							if($r->kode == "000000"){
								$method->setMethodTitle("".$r->service." (".$r->city.")");
							}else{
								$method->setMethodTitle("".$r->service." (".$r->city.") *".$r->kode);
							}
							Mage::log("".$r->service." (".$r->city.")", null, 'dewata_jne.log');
							$price = $kurs*$r->price;
							Mage::log("price: ".$price, null, 'dewata_jne.log');
							//$price = $berat * $price;
							Mage::log("total price: ".$price, null, 'dewata_jne.log');
							
							
							$method->setPrice($price);
							$method->setCost($price);
							$result->append($method);
						}
					}else{
						////bukan jabar dan banten
						$method = Mage::getModel('shipping/rate_result_method');
						$method->setCarrier($this->_code);
						$method->setCarrierTitle($this->getConfig('title'));
						$method->setMethod($this->_code . $i++);
						if($r->kode == "000000"){
							$method->setMethodTitle("".$r->service." (".$r->city.")");
						}else{
							$method->setMethodTitle("".$r->service." (".$r->city.") *".$r->kode);
						}
						Mage::log("".$r->service." (".$r->city.")", null, 'dewata_jne.log');
						$price = $kurs*$r->price;
						Mage::log("price: ".$price, null, 'dewata_jne.log');
						//$price = $berat * $price;
						Mage::log("total price: ".$price, null, 'dewata_jne.log');
						
						
						$method->setPrice($price);
						$method->setCost($price);
						$result->append($method);
					}
					
				}
				/*
				Mage::log('Building shipping promo Free Ongkir '.$r->service.' By Mezora', null, 'dewata_jne.log');
				$method = Mage::getModel('shipping/rate_result_method');
				$method->setCarrier($this->_code);
				$method->setCarrierTitle($this->getConfig('title'));
				$method->setMethod($this->_code . $i++);
				
				Mage::log("".$r->service." (".$r->city.")", null, 'dewata_jne.log');
				$method->setMethodTitle("Free Ongkir (".$r->city.") *".$r->kode);
				$price = 0.0;
				Mage::log("price: ".$price, null, 'dewata_jne.log');
				Mage::log("total price: ".$price, null, 'dewata_jne.log');
				$method->setPrice($price);
				$method->setCost($price);
				$result->append($method);
				Mage::log("end of log", null, 'dewata_jne.log');
				*/
				Mage::log("end of log", null, 'dewata_jne.log');
				
				return $result;
			} else {
				return false;
			}
		}
}  
