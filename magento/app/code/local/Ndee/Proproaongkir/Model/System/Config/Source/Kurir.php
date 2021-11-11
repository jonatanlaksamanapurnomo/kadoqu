<?php
/**
 * Indonesia Shipping Carriers
 * @copyright   Copyright (c) 2016 Ndee Proaongkir
 * @email		-
 * @build_date  July 2016   
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
class Ndee_Proproaongkir_Model_System_Config_Source_Kurir
{

    /**
     * Options getter
     *
     * @return array
     */
    public function toOptionArray()
    {
        return array(
		
            array('value' => 'JNE', 'label'=>Mage::helper('adminhtml')->__('JNE')),
            array('value' => 'POS', 'label'=>Mage::helper('adminhtml')->__('POS')),
            array('value' => 'TIKI', 'label'=>Mage::helper('adminhtml')->__('TIKI')),
			array('value' => 'ESL', 'label'=>Mage::helper('adminhtml')->__('ESL Express')),
			array('value' => 'PCP', 'label'=>Mage::helper('adminhtml')->__('PCP')),
			array('value' => 'RPX', 'label'=>Mage::helper('adminhtml')->__('RPX')),
			array('value' => 'PANDU', 'label'=>Mage::helper('adminhtml')->__('PANDU Express')),
			array('value' => 'WAHANA', 'label'=>Mage::helper('adminhtml')->__('WAHANA Logistik')),
			
			
        );
    }

}
