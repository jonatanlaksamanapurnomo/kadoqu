<?php

/* 
 * ShopShark SkarkSkin
 * Copyright (c) ShopShark (http://www.shopshark.net)
 */

class ShopShark_Imageswatches_Model_System_Config_Source_Catalog_Product_Configattribute_Select        
{
    protected $_attributes = null;

    public function _toOptionArray()
    {
        if (is_null($this->_attributes)) {
            $attrCollection = Mage::getResourceModel('catalog/product_attribute_collection')
                ->addVisibleFilter()
                ->setFrontendInputTypeFilter('select')
                ->addFieldToFilter('additional_table.is_configurable', 1)
                ->addFieldToFilter('additional_table.is_visible', 1)
                ->addFieldToFilter('main_table.is_user_defined', 1)
                ->setOrder('frontend_label', Varien_Data_Collection::SORT_ORDER_ASC);

            $this->_attributes = array();
            foreach ($attrCollection as $attribute) {
                $this->_attributes[] = array(
                    'label' => $attribute->getFrontendLabel(),
                    'value' => $attribute->getId(),
                );
            }
        }
        return $this->_attributes;
    }
    
    /**
     * Retrieve attributes as array
     *
     * @return array
     */
    public function toOptionArray()
    {
        if (is_null($this->_attributes)) {
            $this->_toOptionArray();
            array_unshift(
                $this->_attributes,
                array(
                    'value' => '',
                    'label' => Mage::helper('imageswatches')->__('-- Disabled --'),
                )
            );
        }
        return $this->_attributes;
    }
}
