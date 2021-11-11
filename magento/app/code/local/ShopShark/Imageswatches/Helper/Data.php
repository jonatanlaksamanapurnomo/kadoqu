<?php
/**
 * ShopShark Image Swatches Extension
 * @version   1.0 09.05.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2014 ShopShark
 */

class ShopShark_Imageswatches_Helper_Data extends Mage_Core_Helper_Abstract
{
    const DEFAULT_THUMBNAIL_WIDTH = 30;
    const DEFAULT_THUMBNAIL_HEIGHT = 30;

    public static function getThumbnailSize()
    {
        $width = Mage::getStoreConfig('imageswatches/global/width');
        $height = Mage::getStoreConfig('imageswatches/global/height');
        if (!(int)$width) $width = self::DEFAULT_THUMBNAIL_WIDTH;
        if (!(int)$height) $height = self::DEFAULT_THUMBNAIL_HEIGHT;
        
		return array('width' => $width, 'height' => $height);
    }

    public static function resizeImg($fileName, $width = null, $height = null)
    {
        $imageURL = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . "shopshark/imageswatches/{$fileName}";
        $basePath = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'shopshark' . DS . 'imageswatches' . DS . $fileName;
        $sizes = ShopShark_Imageswatches_Helper_Data::getThumbnailSize();
        
		if (is_null($width)) $width = $sizes['width'];
        if (is_null($height)) $height = $sizes['height'];
		
        $newPath = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'shopshark' . DS . 'imageswatches' . DS . "resized" . DS . $width . "x" . $height . DS . $fileName;

        if (file_exists($basePath) && is_file($basePath) && !file_exists($newPath)) {
            $imageObj = new Varien_Image($basePath);
            $imageObj->constrainOnly(TRUE);
            $imageObj->keepAspectRatio(TRUE);
            $imageObj->keepFrame(TRUE);
			$imageObj->keepTransparency(TRUE);
			$imageObj->backgroundColor(array(255,255,255));
			$imageObj->quality(100);
            try {
                $imageObj->resize($width, $height);
                $imageObj->save($newPath);
            } catch (Exception $e) {
                return $imageURL;
            }
        }
        return Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . "shopshark/imageswatches/resized/{$width}x{$height}/{$fileName}";
    }


    public function isEnabled()
    {
        return $this->isModuleOutputEnabled() && Mage::getStoreConfig('imageswatches/global/enabled');
    }

    public function isSwatchEnabled($attribute)
    {
        $swatchAttribute = Mage::getModel('imageswatches/swatchattribute')->load($attribute->getData('attribute_code'), 'attribute_code');
        if ($swatchAttribute->getId() && $swatchAttribute->getData('swatch_status')) {
            return true && $this->isEnabled();
        }
        return false;
    }

    public function displayPopup($attribute)
    {
        $swatchAttribute = Mage::getModel('imageswatches/swatchattribute')->load($attribute->getData('attribute_code'), 'attribute_code');
        return (bool)$swatchAttribute->getData('display_popup');
    }

    public function getControllerUrl()
    {
        return Mage::getUrl('imageswatches');
    }
}