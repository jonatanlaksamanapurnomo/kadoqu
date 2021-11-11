<?php
/**
 * ShopShark Image Swatches Extension
 * @version   1.0 09.05.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2014 ShopShark
 */

class ShopShark_Imageswatches_Block_Adminhtml_Renderer_Attributetable extends Mage_Adminhtml_Block_Template
    implements Varien_Data_Form_Element_Renderer_Interface
{
    protected $_element;

    protected $_config = null;

    public function getSwatchByOptionId($optionId)
    {
        return Mage::getModel('imageswatches/swatch')->load($optionId, 'option_id');
    }

    protected function _construct()
    {
        $this->setTemplate('imageswatches/swatchattribute.phtml');
    }

    public function getElement()
    {
        return $this->_element;
    }

    public function render(Varien_Data_Form_Element_Abstract $element)
    {
        $this->_element = $element;
        return $this->toHtml();
    }

    public function getAttribute()
    {
        return Mage::registry('entity_attribute');
    }

    public function getConfigJson($field)
    {
        $config = $this->getConfig();
        $config->setParams(
            array(
                'form_key' => $this->getFormKey(),
                "field"    => $field
            )
        );
        $config->setFileField($field);
        $config->setUrl(
            Mage::getModel('adminhtml/url')->addSessionParam()->getUrl(
                "imageswatches_admin/adminhtml_attribute/upload", array("field" => $field, '_secure' => true)
            )
        );
        $config->setFilters(
            array(
                'images' => array(
                    'label' => Mage::helper('adminhtml')->__('Images'),
                    'files' => array('*.jpg', '*.jpeg', '*.bmp', '*.gif', '*.png')
                )
            )
        );
        $config->setWidth('32');
        $this->getConfig()->setReplaceBrowseWithRemove(true);
        $this->getConfig()->setHideUploadButton(true);
        return Mage::helper('core')->jsonEncode($config->getData());
    }

    public function getConfig()
    {
        if (is_null($this->_config)) {
            $this->_config = new Varien_Object();
        }
        return $this->_config;
    }

    public function getPostMaxSize()
    {
        return ini_get('post_max_size');
    }

    public function getUploadMaxSize()
    {
        return ini_get('upload_max_filesize');
    }

    public function getDataMaxSize()
    {
        return min($this->getPostMaxSize(), $this->getUploadMaxSize());
    }

    public function getDataMaxSizeInBytes()
    {
        $iniSize = $this->getDataMaxSize();
        $size = substr($iniSize, 0, strlen($iniSize)-1);
        $parsedSize = 0;
        switch (strtolower(substr($iniSize, strlen($iniSize)-1))) {
            case 't':
                $parsedSize = $size*(1024*1024*1024*1024);
                break;
            case 'g':
                $parsedSize = $size*(1024*1024*1024);
                break;
            case 'm':
                $parsedSize = $size*(1024*1024);
                break;
            case 'k':
                $parsedSize = $size*1024;
                break;
            case 'b':
            default:
                $parsedSize = $size;
                break;
        }
        return $parsedSize;
    }

    public function getUploadAllButtonHtml()
    {
        $uploadAllButton = Mage::app()->getLayout()
            ->createBlock('adminhtml/widget_button')
            ->addData(
                array(
                     'id'      => 'is-upload-all',
                     'type'    => 'button',
                     'label'   => Mage::helper('adminhtml')->__('Upload All'),
                )
            );
        return $uploadAllButton->toHtml();
    }
}