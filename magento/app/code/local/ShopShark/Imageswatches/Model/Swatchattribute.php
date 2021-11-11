<?php
/**
 * ShopShark Image Swatches Extension
 * @version   1.0 09.05.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2014 ShopShark
 */

class ShopShark_Imageswatches_Model_Swatchattribute extends Mage_Core_Model_Abstract
{
    protected $_swatchattribute = null;

    public function _construct()
    {
        parent::_construct();
        $this->_init('imageswatches/swatchattribute', 'swatchattribute_id');
    }

    public function getSwatchattribute()
    {
        if (!$this->_swatchattribute) {
            $attribute = Mage::registry('entity_attribute');
            if ( /*$attribute->getData('is_configurable') && $attribute->getData('is_visible') && */
                $attribute->getData('frontend_input') == 'select'
            ) {
                $this->_swatchattribute = $this->getCollection()->addFieldToFilter(
                    'attribute_code', array('eq' => $attribute->getData('attribute_code'))
                )->getFirstItem();
            }
        }
        return $this->_swatchattribute;
    }

    public function getSwatchAttributeByAttribute($attribute)
    {
        return $this->load($attribute->getAttributeCode(), 'attribute_code');
    }
}