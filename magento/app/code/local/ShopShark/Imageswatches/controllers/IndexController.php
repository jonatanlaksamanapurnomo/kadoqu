<?php
/**
 * ShopShark Image Swatches Extension
 * @version   1.0 09.05.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2014 ShopShark
 */

class ShopShark_Imageswatches_IndexController extends Mage_Core_Controller_Front_Action
{

    protected function _config($option)
    {
        return Mage::getStoreConfig("imageswatches/global/{$option}", Mage::app()->getStore()->getId());
    }

    public function indexAction()
    {
        $_helper = Mage::helper('catalog/output');
        $product = Mage::getModel('catalog/product')->load(Mage::app()->getRequest()->getParam('id'));
        if (!Mage::helper('imageswatches')->isEnabled()) {
            return $this;
        }
        $image = null;
        $description = null;
        $shortDescription = null;
        $title = null;
        $additional = null;

        Mage::register('product', $product);

        if ($this->_config('title')) {
            $title = $_helper->productAttribute($product, $product->getName(), 'name');
        }

        if (!is_null($product->getData('image')) && $this->_config('image')
            && 'no_selection' != $product->getData('image')
        ) {
            $imageBlock = $this->getLayout()->createBlock('catalog/product_view_media');
            $imageBlock->setTemplate('catalog/product/view/media.phtml');
            $image = $imageBlock->toHtml();
        }
        if ($this->_config('additional')) {
            $additionalBlock = $this->getLayout()->createBlock('catalog/product_view_attributes');
            $additionalBlock->setTemplate('catalog/product/view/attributes.phtml');
            $additional = $additionalBlock->toHtml();
        }

        if (!is_null($product->getData('description')) && $this->_config('description')) {
            $descriptionBlock = $this->getLayout()->createBlock('catalog/product_view_description');
            $descriptionBlock->setTemplate('catalog/product/view/description.phtml');
            $description = $descriptionBlock->toHtml();
        }

        if (!is_null($product->getData('short_description')) && $this->_config('short_description')) {
            $shortDescription = $_helper->productAttribute(
                $product, nl2br($product->getShortDescription()), 'short_description'
            );
        }

        $dataArray = array(
            'id'               => $product->getId(),
            'title'            => $title,
            'fullDescritption' => $description,
            'shortDescription' => $shortDescription,
            'image'            => $image,
            'additional'       => $additional,
        );

        return $this->getResponse()->setBody(json_encode($dataArray));
    }

    public function galleryAction()
    {
        $product = Mage::getModel('catalog/product')->load($this->getRequest()->getParam('id'));
        Mage::register('product', $product);
        $this->loadLayout();
        $this->renderLayout();
    }
    
    public function listgalleryAction()
    {
        $product = Mage::getModel('catalog/product')->load($this->getRequest()->getParam('id'));
        Mage::register('product', $product);
        Mage::register('img_size', array(
            'width' => $this->getRequest()->getParam('w'),
            'height' => $this->getRequest()->getParam('h')
        ));
        $this->loadLayout();
        $this->renderLayout();
    }
}