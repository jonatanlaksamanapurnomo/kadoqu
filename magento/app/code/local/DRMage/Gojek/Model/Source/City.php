<?php
	class DRMage_Gojek_Model_Source_City {
    /*
			* set service value
		*/
		var $url = 'http://api.onthrough.link/alamat/kabkota/';
		private function fcgx($url){
			set_time_limit(0);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_TIMEOUT, 20);
			$res = curl_exec($ch);
			curl_close($ch);
			return $res;
		}
    public function toOptionArray() {
			$base_path = Mage::getBaseDir('base');
			$path = $base_path."/app/code/local/DRMage/Gojek/Model/Source/city.json";
			$f = fopen($path, "r");
			$x = fread($f, filesize($path));
			fclose($f);
			$data = json_decode($x);
			Mage::log("path: ".$path, null, 'drmage_gojek.log');
			$dz = array();
			$i=0;
			foreach($data as $d){
				$dz[$i] = array();
				$dz[$i]['value'] = $d->nilai;
				$dz[$i]['label'] = Mage::helper('adminhtml')->__($d->nama);
				$i++;
			}
			return $dz;
		}
		
    public function toArray() {
			$base_path = Mage::getBaseDir('base');
			$path = $base_path."/app/code/local/DRMage/Gojek/Model/Source/city.json";
			$f = fopen($path, "r");
			$x = fread($f, filesize($path));
			fclose($f);
			$data = json_decode($x);
			$dz = array();
			$i=0;
			foreach($data as $d){
				$dz[$i] = array();
				$dz[$i]['value'] = $d->nilai;
				$dz[$i]['label'] = Mage::helper('adminhtml')->__($d->nama);
				$i++;
			}
			return $dz;
		}
		
	}
