<?php
/**
 * ShopShark Image Swatches Extension
 * @version   1.0 09.05.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2014 ShopShark
 */

class ShopShark_Imageswatches_Model_Resource_Swatchattribute extends Mage_Core_Model_Mysql4_Abstract
{
    public function _construct()
    {
        $this->_init('imageswatches/swatchattribute', 'swatchattribute_id');
    }
}