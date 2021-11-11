<?php

class Smartwave_Porto_Model_System_Config_Source_Setting_Product_Page_Type extends Mage_Eav_Model_Entity_Attribute_Source_Abstract
{
    public function toOptionArray()
    {
        return array(
            array('value' => 'custom', 'label' => Mage::helper('porto')->__('Custom')),
            array('value' => 'default', 'label' => Mage::helper('porto')->__('Default')),
            array('value' => 'carousel', 'label' => Mage::helper('porto')->__('Fullwidth Carousel')),
            array('value' => 'fullwidth', 'label' => Mage::helper('porto')->__('Fullwidth')),
            array('value' => 'grid', 'label' => Mage::helper('porto')->__('Grid Images')),
            array('value' => 'sticky_left_right', 'label' => Mage::helper('porto')->__('Sticky Left-Right Info')),
            array('value' => 'sticky_right', 'label' => Mage::helper('porto')->__('Sticky Right Info')),
            array('value' => 'wide_grid', 'label' => Mage::helper('porto')->__('Wide Grid'))
        );
    }
    public function getAllOptions()
    {
        if ($this->_options === null) {
            $this->_options = $this->toOptionArray();
        }
        return $this->_options;
    }
}