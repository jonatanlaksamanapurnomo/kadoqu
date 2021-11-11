<?php
/**
 * ShopShark Image Swatches Extension
 * @version   1.0 09.05.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2014 ShopShark
 */

class ShopShark_Imageswatches_Adminhtml_AttributeController extends Mage_Adminhtml_Controller_Action
{
    public function uploadAction()
    {
        $result = array();
        if (!empty($_FILES)) {
            try {
                $field = $this->getRequest()->getParam('field');
                $uploader = new Varien_File_Uploader($field);
                $uploader->setAllowRenameFiles(true);

                $uploader->setFilesDispersion(false);
                $uploader->setAllowCreateFolders(true);

                $path = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'shopshark' . DS . 'imageswatches' . DS;

                $uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png', 'bmp'));
                $uploadSaveResult = $uploader->save($path, $_FILES[$field]['name']);

                $result['file_name'] = $uploadSaveResult['file'];
            } catch (Exception $e) {
                $result = array(
                    "error"      => $e->getMessage(),
                    "error_code" => $e->getCode(),
                    "status"     => "error",
                );
            }
        }
        $this->getResponse()->setBody(Mage::helper('core')->jsonEncode($result));
    }
}