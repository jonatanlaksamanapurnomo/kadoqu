<?php
/**
 * ShopShark Image Swatches Extension
 * @version   1.0 09.05.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2014 ShopShark
 */

class ShopShark_Imageswatches_Model_Swatch extends Mage_Core_Model_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('imageswatches/swatch', 'swatch_id');
    }

    public function getSwatchByOption($option)
    {
        return $this->getCollection()->addFieldToFilter('option_id', array('eq' => $option))->getFirstItem();
    }

    public function getOptionsByAttribute($attribute)
    {
        $options = $attribute->getSource()->getAllOptions();
        $optionIds = array();
        foreach ($options as $option) {
            if (!$option['value']) continue;
            $optionIds[] = $option['value'];
        }

        return $this->getCollection()->addFieldToFilter('option_id', array('in' => $optionIds));
    }

    public function getCustomHTML(){
        if ($this->getData('custom_html')) return $this->getData('custom_html');
        else return '';
    }

    public function getImageUrl()
    {
        if ($this->getData('image')) return $this->getData('image');
        return Mage::getDesign()->getSkinUrl('images/no_image.jpg');
    }

    public function getFullImageUrl()
    {
        return Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . 'shopshark/imageswatches/' . $this->getImageUrl();
    }

    public function getThumbnail($width = null, $height = null)
    {
        if ($this->getData('image')) return ShopShark_Imageswatches_Helper_Data::resizeImg($this->getImageUrl(), $width, $height);
        return '';
    }

    public function getLayeredImage()
    {
        if ($this->getData('image')) return ShopShark_Imageswatches_Helper_Data::resizeImg($this->getImageUrl(), 16, 16);
        return '';
    }

    public function deleteImage()
    {
        @unlink(Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'shopshark' . DS . 'imageswatches' . DS . $this->getData('image'));
        
		$resizes = array();
        
		//remove resized images
        if (file_exists(Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'shopshark' . DS . 'imageswatches' . DS . 'resized')) {
            $resizes = scandir(Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'shopshark' . DS . 'imageswatches' . DS . 'resized');
        }

        if (!empty($resizes) && count($resizes) > 2) {
            array_shift($resizes);
            array_shift($resizes);
            foreach ($resizes as $subfolder) {
                @unlink(Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'shopshark' . DS . 'imageswatches' . DS . 'resized' . DS . $subfolder . DS . $this->getData('image'));
            }
        }
        $this->setData('image', '');
    }

}