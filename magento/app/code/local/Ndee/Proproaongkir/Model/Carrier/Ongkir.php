<?php
/**
 * Indonesia Shipping Carriers
 * @copyright   Copyright (c) 2016 Ndee Proaongkir
 * @email		-
 * @build_date  July 2016   
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */  
class Ndee_Proproaongkir_Model_Carrier_Ongkir     
		extends Mage_Shipping_Model_Carrier_Abstract
		implements Mage_Shipping_Model_Carrier_Interface
	{  
        protected $_code = 'ongkir';  
        public function collectRates(Mage_Shipping_Model_Rate_Request $request){  
		  	if (!$this->getConfigFlag('active')) {
            	return false;
        	}
			
			if(!$this->helper()->validateLicense())
			return false;
		
			$list_euy = $this->getListRates();
		
            $result = Mage::getModel('shipping/rate_result');  
			$count = 0;
			foreach($list_euy as $jangar_kana_hulu)
			{
				$count++;
				//getMethodRates($code,$title,$name,$rates)
				$method = $this->getMethodRates('_'.$count,'',$jangar_kana_hulu['text'],$jangar_kana_hulu['cost']);
				$result->append($method);
			};
			//$is_free_ship = 1;
			
			
			$is_free_ship = $this->isFreeShipping();
			
			$free_shipping_text = $this->helper()->getConfig('freeshipping_text');
			
			if(empty($free_shipping_text))
			{
				$free_shipping_text = 'Free Shipping';
			} 
				
				
			
          if($is_free_ship)
		  {
			    $count++;
			    $method = $this->getMethodRates('_'.$count,'',$free_shipping_text,0);
				$result->append($method);
		   } 
			  
            return $result;  
        }
		
		public function helper($type = 'proaongkir')
		{
			return Mage::helper($type);	
		}
		
		public function getKecId()
		{
			$string_city = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress()->getCity();
			$string_kec = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress()->getSubdistrictName();
			
			
			
			$sql = "select * from 
			".Mage::getConfig()->getTablePrefix()."daftar_alamat 
			where concat(type,' ',city) = '$string_city' and  subdistrict_name = '$string_kec' limit 0,1 ";
			
			$res =  $this->helper()->fetchSql($sql);
			
			return $res[0]['subdistrict_id'];
		}
		
		public function getCityId()
		{
			$string_city = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress()->getCity();
			
			
			$sql = "select * from 
			".Mage::getConfig()->getTablePrefix()."daftar_alamat where concat(type,' ',city_name) = '$string_city' limit 0,1 ";
			
			$res =  $this->helper()->fetchSql($sql);
			
			return $res[0]['city_id'];
			
		}
		
		public function getListRates()
		{
			$origin = $this->getOriginId();
			//$dest = $this->getCityId();
			$dest = $this->getKecId();
			$weight = $this->getBeratTotal();
			
			$carriers = $this->getActiveCarriers();
			
			$rate_list = array();
			//getRates($origin,$dest,$weight,$kurir)
			foreach($carriers as $kurir)
			{
				if($weight > 29){
					$rates_by_kurir = $this->helper()->getSavedRates($origin,$dest,1,$kurir);
				}else{
					$rates_by_kurir = $this->helper()->getSavedRates($origin,$dest,$weight,$kurir);
				};
				foreach($rates_by_kurir as $final_list)
				{
					if($weight > 29):
						$ship_cost = $this->changePrice($final_list['cost']) * $weight;
					else:
						$ship_cost = $this->changePrice($final_list['cost']);
					endif;
					
					$rate_list[] = array(
						'text' => $final_list['text'] . "($weight Kg)",
						'cost' => $ship_cost
						
					);
				}
			}
			$this->helper()->setLog('Final rate '.print_r($rate_list,true));
			return $rate_list;
			
		}
		
		public function getActiveCarriers()
		{
			return explode(',',strtolower($this->helper()->config('kurir')));
		}
		
		
		public function changePrice($price)
		{
			$set = $this->helper()->config('changeprice');
			
			if(!$set):
				return $price;
			
			else:
			/*if (strpos($a,'are') !== false) {
				echo 'true';
			}*/
			
			$found_persen = false;
			
			if (strpos($set,'%') !== false) {
				//echo 'true';
				
				$found_persen = true;
				
				$set = str_replace('%','',$set);
			};
			
			$found_minus = false;
			
			if (strpos($set,'-') !== false) {
				//echo 'true';
				
				$found_minus = true;
				$set = str_replace('-','',$set);
				
			};
			
			$found_plus = false;
			
			if (strpos($set,'+') !== false) {
				//echo 'true';
				
				$found_plus = true;
				$set = str_replace('+','',$set);
				
			};
			
			$final_set = $set ;
			$changed_price = 0;
			if($found_persen)
			{
				$changed_price = ($price * $set) / 100;
			}else
			{
				$changed_price = abs($set);
			};
			
			if($found_minus)
			{
				return $price - $changed_price;
			};
			
			if($found_plus)
			{
				return $price + $changed_price;
			};
			
			
			
			
			
			//$final_price
			
			
			
				return $price; 
			endif;
		}
		
		public function getOriginId()
		{
			return $this->helper()->config('origin');
		}
		
		public function getDisabledServices()
		{
			return $this->helper()->config('disablesvr');
		}
		
		public function getBeratTotal()
		{
			$items = Mage::getSingleton('checkout/session')->getQuote()->getAllVisibleItems();
			$totalWeight = 0;
			foreach($items as $item) {
				$totalWeight += ($item->getWeight() * $item->getQty()) ;
			}
			
			if($totalWeight < 1)
			$totalWeight = 1;
			
			
			return $totalWeight;
		}
		
		public function isFreeShipping()
		{
			$dest = $this->getKecId();
			$config_city = $this->helper()->getConfig('freeshipping_city');
			$config_city = explode(",",$config_city);
			$city_flag = false;
			
			$min_subtot = $this->helper()->getConfig('freeshipping_min_subtot');
			
			$subTotal_cart = Mage::getModel('checkout/cart')->getQuote()->getSubtotal();
			
			if(in_array($dest,$config_city) && !empty($config_city))
			{
				$city_flag = true;
				
				if($subTotal_cart >= $min_subtot)
				{
					$city_flag = true;
				}else{
					$city_flag = false;
				}
				
			}
			
			
			
			return $city_flag;
			
			
			
		}
		
		
		public function getMethodRates($code,$title,$name,$rates)
		{
			$method = Mage::getModel('shipping/rate_result_method');  
            $method->setCarrier($this->_code);  
            $method->setCarrierTitle($title);
            $method->setMethod($this->_code.$code);  
            $method->setMethodTitle($name);
		    $method->setPrice($rates);
			
			return $method;
			
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
		public function isTrackingAvailable()
		{
			return true;
		}
    }  
