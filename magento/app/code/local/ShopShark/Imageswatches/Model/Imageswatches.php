<?php

/**
 * ShopShark Image Swatches Extension
 * @version   1.0 09.05.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2014 ShopShark
 */
class ShopShark_Imageswatches_Model_Imageswatches extends Mage_Core_Model_Abstract {

    public function addTabToAttributeEdit($event) {
        $block = $event->getBlock();

        if ($block->getId() == 'product_attribute_tabs' && !$block->getNoDispatch()) {

            if (!Mage::getModel('imageswatches/swatchattribute')->getSwatchattribute())
                return;

            $block->setNoDispatch(true);
            Mage::unregister('attribute_type_hidden_fields');
            Mage::unregister('attribute_type_disabled_types');

            $content = Mage::app()->getLayout()->createBlock('imageswatches/adminhtml_swatch_edit_tab_swatch')->toHtml();

            $block->addTab(
                    'images', array(
                'label' => Mage::helper('imageswatches')->__('Images for Attribute'),
                'title' => Mage::helper('imageswatches')->__('Images for Attribute'),
                'content' => $content,
                    )
            )->toHtml();
        }
    }

    /**
     * @param $event
     * Catch saved attribute and save swatches
     */
    public function attributeSave($event) {
        $attribute = $event->getData('data_object');
        $swatchArray = $attribute->getIs();

        if (!is_array($swatchArray))
            return;

        $swatchAttribute = Mage::getModel('imageswatches/swatchattribute')->getSwatchAttributeByAttribute($attribute);

        /**
         * save swatch attribute config
         */
        $swatchAttribute->setData('swatch_status', $swatchArray['swatch_status']);
        $swatchAttribute->setData('display_popup', $swatchArray['display_popup']);
        $swatchAttribute->setData('attribute_code', $attribute->getData('attribute_code'));
        $swatchAttribute->save();

        /**
         * save relations option = image
         */
        if (isset($swatchArray['swatch'])) {
            foreach ($swatchArray['swatch'] as $optionId => $swatch) {
                $swatchModel = Mage::getModel('imageswatches/swatch')->load($optionId, 'option_id');
                $swatchModel->setData('option_id', $optionId);

                /*
                 * ZyX added custom html option
                 */
                $swatchModel->setData('custom_html', $swatch['html']);

                if (isset($swatch['delete_image'])) {
                    $swatchModel->deleteImage();
                } elseif (isset($swatch['file'])) {
                    $swatchModel->setData('image', $swatch['file']);
                }

                $swatchModel->save();
            }
        }

        if (!empty($_FILES)) {
            try {
                $path = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . '/shopshark/imageswatches/';
                $keys = array_keys($_FILES['swfile']['name']);
                foreach ($_FILES['swfile']['name'] as $k => $v) {
                    if ($v == '') {
                        continue;
                    }
                    $xFile = array(
                        'name' => $_FILES['swfile']['name'][$k],
                        'type' => $_FILES['swfile']['type'][$k],
                        'size' => $_FILES['swfile']['size'][$k],
                        'tmp_name' => $_FILES['swfile']['tmp_name'][$k],
                        'error' => $_FILES['swfile']['error'][$k],
                    );
                    $uploader = new Varien_File_Uploader($xFile);
                    $uploader->setAllowRenameFiles(true);
                    $uploader->setFilesDispersion(false);
                    $uploader->setAllowCreateFolders(true);
                    $uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png', 'bmp'));
                    $uploadSaveResult = $uploader->save($path, $xFile['name']);

                    $swatchModel = Mage::getModel('imageswatches/swatch')->load($k, 'option_id');
                    $swatchModel->setData('image', $uploadSaveResult['file']);
                    $swatchModel->save();
                }
            } catch (Exception $e) {
                die(var_dump($e->getMessage()));
                /* $result = array(
                  "error"      => $e->getMessage(),
                  "error_code" => $e->getCode(),
                  "status"     => "error",
                  ); */
            }
        }
    }

    public function cleanCache($event) {
        $cacheDir = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'shopshark' . DS . 'imageswatches' . DS . 'resized';

        if (!file_exists($cacheDir))
            return;

        $resizes = scandir($cacheDir);
        array_shift($resizes);
        array_shift($resizes);
        if (count($resizes) > 0) {
            foreach ($resizes as $subfolder) {
                $images = scandir($cacheDir . DS . $subfolder);
                array_shift($images);
                array_shift($images);
                if (count($images) > 0) {
                    foreach ($images as $image) {
                        @unlink($cacheDir . DS . $subfolder . DS . $image);
                    }
                }
            }
        }
    }

    public function processAttributesBlocks($event) {
        if (!Mage::helper('imageswatches')->isEnabled())
            return;

        $block = $event->getData('block');
        $name = $block->getNameInLayout();
        $template = $block->getTemplate();
        $type = $block->getType();

        //Product options block
        if ($name == 'product.info.options.configurable') {
            $block->setTemplate('catalog/product/view/type/options/imageswatch.phtml');
        }

        if (!Mage::getStoreConfig('imageswatches/global/layered', Mage::app()->getStore()->getId()))
            return;

        //Layered navigation blocks
        if ($type == 'catalog/layer_state') {
            if ($template == 'catalog/layer/state.phtml') {
                $block->setTemplate('catalog/layer/imagestate.phtml');
            }
        }

        if ($type == 'catalog/layer_view' || $type == 'catalogsearch/layer') {
            $filters = $block->getFilters();
            foreach ($filters as $filter) {
                $type = $filter->getData('type');
                if ($type == 'catalog/layer_filter_attribute' || $type == 'catalogsearch/layer_filter_attribute') {
                    $filter->setTemplate('catalog/layer/imagefilter.phtml');
                }
            }
        }
    }

}
