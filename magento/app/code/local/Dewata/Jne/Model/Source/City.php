<?php

class Dewata_Jne_Model_Source_City {
    /*
     * set service value
     */

    public function toOptionArray() {
        return array(
            array('value' => 'Jakarta', 'label' => Mage::helper('adminhtml')->__('Jakarta')),
            array('value' => 'Bandung', 'label' => Mage::helper('adminhtml')->__('Bandung')) ,
			array('value' => 'Depok', 'label' => Mage::helper('adminhtml')->__('Depok')),
			array('value' => 'Bogor', 'label' => Mage::helper('adminhtml')->__('Bogor')),
			array('value' => 'Surabaya', 'label' => Mage::helper('adminhtml')->__('Surabaya')),
			array('value' => 'Semarang', 'label' => Mage::helper('adminhtml')->__('Semarang')),
			array('value' => 'Surabaya', 'label' => Mage::helper('adminhtml')->__('Surabaya')),
			array('value' => 'Denpasar', 'label' => Mage::helper('adminhtml')->__('Denpasar'))
        );
    }

    public function toArray() {
        return array(
            array('value' => 'Jakarta', 'label' => Mage::helper('adminhtml')->__('Jakarta')),
            array('value' => 'Bandung', 'label' => Mage::helper('adminhtml')->__('Bandung')) ,
			array('value' => 'Depok', 'label' => Mage::helper('adminhtml')->__('Depok')),
			array('value' => 'Bogor', 'label' => Mage::helper('adminhtml')->__('Bogor')),
			array('value' => 'Surabaya', 'label' => Mage::helper('adminhtml')->__('Surabaya')),
			array('value' => 'Semarang', 'label' => Mage::helper('adminhtml')->__('Semarang')),
			array('value' => 'Surabaya', 'label' => Mage::helper('adminhtml')->__('Surabaya')),
			array('value' => 'Denpasar', 'label' => Mage::helper('adminhtml')->__('Denpasar'))
        );
    }

}

?>
