<?php
/**
 * Magestore
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magestore.com license that is
 * available through the world-wide-web at this URL:
 * http://www.magestore.com/license-agreement.html
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Magestore
 * @package     Magestore_Giftwrap
 * @module    Giftwrap
 * @author      Magestore Developer
 *
 * @copyright   Copyright (c) 2016 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 *
 */

class Magestore_Giftwrap_Block_Catalog_Product_Giftwrap_New extends Mage_Core_Block_Template {

    /**
     * Magestore_Giftwrap_Block_Catalog_Product_Giftwrap_New constructor.
     */
    public function __construct() {
        parent::__construct();
    }

    /**
     * @return mixed
     */
    public function getGiftwrapCollection() {
        $papers = Mage::getModel('giftwrap/giftwrap')
                ->getCollection()
                ->addFieldToFilter('store_id', Mage::app()->getStore()->getId())
                ->addFieldToFilter('status', 1);
        return $papers;
    }

    /**
     * @return mixed
     */
    public function getAllGiftcards() {
        $gifcards = Mage::getModel('giftwrap/giftcard')->getCollection()
                ->addFieldToFilter(
                        'store_id', Mage::app()->getStore()
                        ->getId())
                ->addFieldToFilter('status', 1);
        return $gifcards;
    }

    /**
     *
     */
    public function _prepareLayout() {
        $config = Mage::getStoreConfig('giftwrap/style/giftwrap_view_type');
        if ($config == 'radio') {
            $this->setTemplate('giftwrap/catalog/product/view/new/type/radio.phtml');
        } else {
            $this->setTemplate('giftwrap/catalog/product/view/new/type/select.phtml');
        }
    }

    /**
     * @return mixed
     */
    public function getProduct() {
        return Mage::registry('product');
    }

    /**
     * @return mixed
     */
    public function getGiftWrapToolTip() {
        return Mage::getStoreConfig('giftwrap/message/product_giftwrap');
    }

    /**
     * @return mixed
     */
    public function getNoGiftWrapToolTip() {
        return Mage::getStoreConfig('giftwrap/message/product_no_giftwrap');
    }

    /**
     * @return mixed
     */
    protected function _beforeToHtml() {
        if (!Mage::helper('magenotification')->checkLicenseKey('Giftwrap')) {
            $this->setTemplate(null);
        }
        return parent::_beforeToHtml();
    }

}