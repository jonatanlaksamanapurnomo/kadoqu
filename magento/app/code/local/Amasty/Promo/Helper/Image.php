<?php

/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */
class Amasty_Promo_Helper_Image extends Mage_Core_Helper_Abstract
{
    /**
     * return media path
     *
     * @return string
     */
    protected function _getPath()
    {
        return Mage::getBaseDir('media') . DS . 'ampromo' . DS;
    }

    /**
     * @param $field
     * @return null|string
     */
    function upload($field)
    {
        $ret = null;
        try {
            $uploader = new Varien_File_Uploader($field);
            $uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png'));
            $uploader->setFilesDispersion(false);
            $uploader->setAllowRenameFiles(false);

            $path = $_FILES[$field]['name'];
            $ext = pathinfo($path, PATHINFO_EXTENSION);

            $fileName = uniqid($field . "_") . "." . $ext;
            $uploader->save($this->_getPath(), $fileName);
            $ret = $fileName;
        } catch (Exception $e) {
            Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
        }
        return $ret;
    }

    /**
     * Get Link for file
     * 
     * @param $file
     * @return null|string
     */
    function getLink($file)
    {
        return $file ? Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . 'ampromo' . DS . $file : null;
    }
}