<?php
/**
 * Indonesia Shipping Carriers
 * @copyright   Copyright (c) 2016 Ndee Proaongkir
 * @email		-
 * @build_date  July 2016   
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
class Ndee_Proproaongkir_Model_System_Config_Source_City
{

    /**
     * Options getter
     *
     * @return array
     */
	
	public function helper()
	{
		return  Mage::helper('proaongkir');
	}
	
	
	
	
    public function toOptionArray()
    {
		
		
		
		if($this->helper()->getApiKey()):
		
		//$this->helper()->saveAreaToDb();
		
			$city_array = array();
			$city_list = Mage::getModel('proaongkir/area')->getCollection()
						->setOrder('province','ASC')
						->setOrder('city','ASC')
						->setOrder('subdistrict_name','ASC')
						;
			
			$count = Mage::getModel('proaongkir/area')->getCollection()->count();
			
			if(!$count)
			{
				$this->helper()->saveAreaToDb();
			}
			
			$city_array[] = array('value' => '', 'label'=> '--- Select Origin ('.$count.' Cities Registered) ---' );
			$city_array[] = array('value' => 'disabled', 'label'=> 'Disabled' );
			
			foreach($city_list->getData() as $data)
			{
				$subdistrict_id =  $data['subdistrict_id'];
				$city_name = "Provinsi ".$data["province"]." ".$data["type"]." ".$data["city"].
				" Kecamatan ".$data["subdistrict_name"];
				$city_array[] = array('value' => $subdistrict_id, 'label'=> $city_name );
				
			}
		 
		 	//asort($city_array,);
			//uasort($city_array, 'cmp');
			return $city_array;
		 
		
		else:
			return array(
			
				array('value' => 1, 'label'=>Mage::helper('adminhtml')->__('API KEY INVALID')),
				
			);
		endif;
    }

}
