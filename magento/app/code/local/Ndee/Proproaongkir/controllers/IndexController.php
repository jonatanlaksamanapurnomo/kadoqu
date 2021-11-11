<?php
/**
 * Indonesia Shipping Carriers
 * @copyright   Copyright (c) 2016 Ndee Proaongkir
 * @email		-
 * @build_date  July 2016   
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
class Ndee_Proproaongkir_IndexController extends Mage_Core_Controller_Front_Action{
    public function IndexAction() {
      
	  $this->loadLayout();   
      $this->renderLayout(); 
	  
    }
	
	public function testdomainAction()
	{
		$val = $this->helper()->validateLicense();
		
		if($val)
		echo 'domain '.$_SERVER['HTTP_HOST'].' allowed';
		else
		echo 'domain '.$_SERVER['HTTP_HOST'].' not allowed';
	}
	
	public function refreshareaAction()
	{
		echo 'START Reinstall Province City'.'<br>';
		$this->helper()->saveAreaToDb();
		echo 'END Reinstall Province City'.'<br>';
		
	}
	
	public function cityAction()
	{
			$model = Mage::getModel('proaongkir/area');
		    $prov_id = $this->getRequest()->getParam('prov_id');
			
			
			$region = Mage::getModel('directory/region')->load($prov_id);
			$state_code = $region->getCode(); //CA
			
			
			$city = $model->getCollection()
					->distinct(true)
					->addFieldToFilter('province_id',$state_code)
					->addFieldToSelect('city_id')
					//->addFieldToSelect('city_name')
					->addFieldToSelect('city')
					//->addFieldToSelect('subdistrict_id')
					//->addFieldToSelect('subdistrict_name')
					
					->addFieldToSelect('type')
					
					->setOrder('city','ASC')
					//->setOrder('subdistrict_name','ASC')
					
					
					->load()
					;
			foreach($city as $data_city)
			{
				$region_cities[] = array(
					'city_id' => $data_city->getCityId(),
					'display_name' => $data_city->getType() . ' ' .$data_city->getCity(),
				);
				
			}
					
			
			
			echo json_encode($region_cities);
		return;
	}
	
	
	public function kecamatanAction()
	{
			$model = Mage::getModel('proaongkir/area');
		    $prov_id = $this->getRequest()->getParam('prov_id');
			$city_name = $this->getRequest()->getParam('city');
			
			$city_name = str_replace('Kabupaten ','',$city_name);
			$city_name = str_replace('Kota ','',$city_name);
			
			
			
			$region = Mage::getModel('directory/region')->load($prov_id);
			$state_code = $region->getCode(); //CA
			
			
			$city = $model->getCollection()
					->distinct(true)
					->addFieldToFilter('province_id',$state_code)
					->addFieldToFilter('city',$city_name)
					
					
					//->addFieldToSelect('city_id')
					//->addFieldToSelect('city_name')
					//->addFieldToSelect('city')
					->addFieldToSelect('subdistrict_id')
					->addFieldToSelect('subdistrict_name')
					
					->addFieldToSelect('type')
					
					//->setOrder('city','ASC')
					->setOrder('subdistrict_name','ASC')
					
					
					->load()
					;
			foreach($city as $data_city)
			{
				$region_cities[] = array(
					'city_id' => $data_city->getSubdistrictId(),
					'display_name' => $data_city->getSubdistrictName(),
				);
				
			}
					
			
			
			echo json_encode($region_cities);
		return;
	}
	
	public function xcityAction()
	{
			$model = Mage::getModel('proaongkir/area');
		    $prov_id = $_GET['query'];
			
			
			$region = Mage::getModel('directory/region')->load($prov_id);
			$state_code = $region->getCode(); //CA
			
			
			$city = $model->getCollection()
					->distinct(true)
					->addFieldToFilter('province_id',$state_code)
					->addFieldToSelect('city_id')
					->addFieldToSelect('city_name')
					->addFieldToSelect('type')
					
					
					->load()
					;
			foreach($city as $data_city)
			{
				$string .= "{ value: '".$data_city->getType().' '.$data_city->getCityName()."', data: '".$data_city->getCityId()."' },";
			}
			
			
			
			echo $string."{value: 'Kabupaten Badung', data: '17' },{ value: 'Kabupaten Bangli', data: '32' },{ value: 'Kabupaten Buleleng', data: '94' },{ value: 'Kota Denpasar', data: '114' },{ value: 'Kabupaten Gianyar', data: '128' },{ value: 'Kabupaten Jembrana', data: '161' },{ value: 'Kabupaten Karangasem', data: '170' },{ value: 'Kabupaten Klungkung', data: '197' },{ value: 'Kabupaten Tabanan', data: '447' },";
	}
	
	public function helper($type = 'proaongkir')
	{
			return Mage::helper($type);	
	}
	
	public function addressAction()
	{
		$sess = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress();
		
		echo '<pre>';
		
		print_r($sess->getData());
	}
	
	public function testAction()
	{


		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "http://pro.rajaongkir.com/api/cost",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "POST",
		  CURLOPT_POSTFIELDS => "origin=2112&originType=subdistrict&destination=2128&destinationType=subdistrict&weight=1700&courier=rpx",
		  CURLOPT_HTTPHEADER => array(
			"content-type: application/x-www-form-urlencoded",
			"key: ".$this->helper()->getApiKey()
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
		  echo "cURL Error #:" . $err;
		} else {
			echo $response;
			echo '<pre>';
		  print_r(json_decode($response)) ;
		}
	}
	
	public function kecAction()
	{
		$string_city = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress()->getCity();
			$string_kec = Mage::getSingleton('checkout/session')->getQuote()->getShippingAddress()->getSubdistrictName();
			
			
			
			$sql = "select * from 
			".Mage::getConfig()->getTablePrefix()."daftar_alamat 
			where concat(type,' ',city) = '$string_city' and  subdistrict_name = '$string_kec' limit 0,1 ";
			//echo $sql;
			$res =  $this->helper()->fetchSql($sql);
			
			echo $res[0]['subdistrict_id'];
	}
}