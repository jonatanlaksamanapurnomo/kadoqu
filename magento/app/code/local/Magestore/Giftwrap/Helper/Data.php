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
class Magestore_Giftwrap_Helper_Data extends Mage_Core_Helper_Abstract
{
    /**
     * @return array
     */
    public function getAllPapers() {
        $papers = Mage::getModel('giftwrap/giftwrap')
            ->getCollection()
            ->addFieldToFilter(
                'store_id', Mage::app()->getStore()->getId())
            ->addFieldToFilter('status', 1);
        $list = array();
        foreach ($papers as $paper) {
            $list[] = $paper;
        }
        return $list;
    }


    /**
     * @return bool
     */
    public function enableGiftwrap() {
        $quoteId = Mage::getSingleton('checkout/session')->getQuoteId();
        if (Mage::getStoreConfig('giftwrap/general/active')) {
            if (count(Mage::getModel('giftwrap/giftwrap')->getCollection()
                    ->addFieldToFilter('status', 1)
                    ->addFieldToFilter('store_id', Mage::app()->getStore(true)
                        ->getId())) == 0
            ) {
                Mage::getModel('giftwrap/selection')->deleteSelectionByQuoteId($quoteId);
                return false;
            } else {
                return true;
            }
        } else {
            Mage::getModel('giftwrap/selection')->deleteSelectionByQuoteId($quoteId);
            return false;
        }
    }

    /**
     * array ids of product enable giftwrap in shopping cart
     * @return array
     */
    public function arrayItems() {
        $quoteId = Mage::getSingleton('checkout/session')->getQuote()->getId();
        $session = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId(
            $quoteId);
        $productIds = array();
        if ($session) {
            foreach ($session as $value) {
                $productIds[] = $value['itemId'];
            }
        }
        return $productIds;
    }


    /**
     * show checkbox selection or not
     * @return bool
     */
    public function disableCheckGift() {
        $quoteId = Mage::getSingleton('checkout/session')->getQuote()->getId();
        $giftWrapOrder = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId(
            $quoteId);
        if ($giftWrapOrder) {
            foreach ($giftWrapOrder as $gift) {
                if ($gift['itemId'] == 0) {
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * product enable giftwrap or not
     * @param null $productId
     * @return bool
     */
    public function isGiftwrap($productId = null) {
        if (!$productId instanceof Mage_Catalog_Model_Product) {
            $product = Mage::getModel('catalog/product')->load($productId);
        } else {
            $product = $productId;
        }

        if ((int)$product->getGiftwrap() == Magestore_Giftwrap_Model_Giftwrap::STATUS_ENABLED) {
            return true;
        }
        return false;
    }

    /**
     * module is disable or enable wrapall
     * @return mixed
     */
    public function giftwrapAll() {
        return Mage::getStoreConfig('giftwrap/general/all_item', $this->getStoreId());
    }


    /**
     * image of Giftwrap module
     * @return mixed
     */
    public function getGiftwrapIcon() {
        return Mage::getStoreConfig('giftwrap/style/icon_image');
    }


    /**
     * @return bool
     */
    public function enableWrapall() {
        $maxItems = Mage::getStoreConfig(
            'giftwrap/calculation/maximum_items_wrapall');
        $quoteId = Mage::getSingleton('checkout/session')->getQuote()->getId();
        $items = Mage::getSingleton('checkout/cart')->getItems();
        $itemsOnCart = 0;
        $selectionCollection = Mage::getModel("giftwrap/selection")->getCollection()->addFieldToFilter(
            "quote_id", $quoteId);
        foreach ($items as $item) {
            $productId = $item->getProductId();
            if (Mage::getModel('catalog/product')->load($productId)->getGiftwrap()) {
                $itemsOnCart += $item->getQty();
            }
            if (count($selectionCollection)) {
                foreach ($selectionCollection as $selection) {
                    if ($selection->getItemId() == $item->getId() &&
                        ($item->getQty() > $maxItems)
                    ) {
                        $selection->delete();
                    }
                }
            }
        }
        if ($itemsOnCart > $maxItems) {
            Mage::getModel('giftwrap/selection')->deleteSelection();
            return false;
        }
        return true;
    }


    /**
     *this function check the mixmum number of Item when giftwrap all
     */
    public function checkMaximumGiftwrapItems() {
//        $maxItems = Mage::getStoreConfig(
//                        'giftwrap/general/maximum_items_wrapall');
//        $quoteId = Mage::getSingleton('checkout/session')->getQuote()->getId();
//        $items = Mage::getSingleton('checkout/cart')->getItems();
//        $itemsOnCart = 0;
//        foreach ($items as $item) {
//            $productId = $item->getProductId();
//            if (Mage::getModel('catalog/product')->load($productId)->getGiftwrap()) {
//                $itemsOnCart += $item->getQty();
//            }
//        }
//        if ($itemsOnCart > $maxItems) {
//            Mage::getModel('giftwrap/selection')->loadByQuoteId($quoteId, 0)->delete();
//            return false;
//        }
//        return true;
    }

    /**
     * @return string
     */
    public function get_wrap_all_message() {
        $maxItems = Mage::getStoreConfig(
            'giftwrap/calculation/maximum_items_wrapall');
        $message = Mage::getStoreConfig('giftwrap/message/can_not_wrap_all');
        return $this->__($message) . ": " . $maxItems;
    }

    /**
     * if Config on adminhtml is Yes -> return true
     * @return mixed
     */
    public function getCalculateOnItems() {
        return Mage::getStoreConfig('giftwrap/calculation/amount_on_number_items');
    }


    /**
     * return value of config on adminhtml
     * @return int
     */
    public function getDecreasePrice() {
        $decrease = Mage::getStoreConfig(
            'giftwrap/general/decrease_price_wrapall');
        if (is_numeric($decrease)) {
            return $decrease;
        } else {
            return 0;
        }
    }


    /**
     * return value of config on adminhtml
     * @return mixed
     */
    public function getPersonalMessageTurnedOff() {
        return Mage::getStoreConfig(
            'giftwrap/message/personal_message_disable_msg');
    }


    /**
     * return  giftwrap amount
     * @return float|int
     */
    public function giftwrapAmount_2() {
        $amountPrice = 0;
        $giftwrap_items = Mage::getModel('giftwrap/selection')->getSelection();
        $decrease = $this->getDecreasePrice();
        if (is_array($giftwrap_items)) {
            foreach ($giftwrap_items as $value) {
                $giftwrap = Mage::getModel('giftwrap/giftwrap')->load(
                    $value['styleId']);
                $amountPrice += (float)$this->subGiftwrapTotal(
                    $giftwrap->getPrice(), $value['itemId']);
            }
        }
        $items = Mage::getSingleton('checkout/cart')->getItems();
        $countProductGiftwrap = 0;
        foreach ($items as $item) {
            $productId = $item->getProductId();
            if (Mage::getModel('catalog/product')->load($productId)->getGiftwrap()) {
                $countProductGiftwrap++;
            }
        }
        $itemIds = array();
        if (is_array($giftwrap_items)) {
            foreach ($giftwrap_items as $value) {
                $itemIds[] = $value['itemId'];
            }
        }
        if ($decrease != 0 && in_array(0, $itemIds) && $countProductGiftwrap >= 2) {
            $amountPrice = $amountPrice - $amountPrice * $decrease / 100;
        }
        return $amountPrice;
    }

    /**
     * @param null $storeId
     * @param null $address_id
     * @param null $customer_address
     * @return float|int
     */
    public function giftwrapAmount($storeId = null, $address_id = null, $customer_address = null) {

        $amount = 0;
        $quoteId = Mage::getSingleton('checkout/session')->getQuoteId();
        $items = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId($quoteId, $storeId, $address_id, $customer_address);
        if ($this->getCalculateOnItems()) {
            if (is_array($items)) {
                foreach ($items as $item) {
                    $giftbox = Mage::getModel('giftwrap/selection')->load($item['id']);

                    $style = Mage::getModel('giftwrap/giftwrap')->load($item['styleId']);
                    $giftcard = Mage::getModel('giftwrap/giftcard')->load($item['giftcardId']);
                    $number = 0;
                    $its = $giftbox->getItemCollection();

                    foreach ($its as $it) {
                        $number += $it->getQty();
                    }
                    $amount += floatval($number) * floatval($giftbox->getQty()) * (floatval($style->getPrice()) + floatval($giftcard->getPrice()));
                }
            }
        } else {
            if (is_array($items)) {
                foreach ($items as $item) {
                    $giftbox = Mage::getModel('giftwrap/selection')->load($item['id']);
                    $style = Mage::getModel('giftwrap/giftwrap')->load(
                        $item['styleId']);
                    $giftcard = Mage::getModel('giftwrap/giftcard')->load(
                        $item['giftcardId']);
                    $amount += floatval($giftbox->getQty()) * (floatval($style->getPrice()) +
                            floatval($giftcard->getPrice()));
                }
            }
        }

        return $amount;
    }

    /**
     * return  sub total giftwrap amount
     * @param $price
     * @param $id
     * @return int
     */
    public function subGiftwrapTotal($price, $id) {
        $items = Mage::getSingleton('checkout/cart')->getItems();
        $amount = 0;
        if ($this->getCalculateOnItems()) {
            if ($id == 0) {
                $itemsOnCart = 0;
                foreach ($items as $item) {
                    $productId = $item->getProductId();
                    if (Mage::getModel('catalog/product')->load($productId)->getGiftwrap()) {
                        $itemsOnCart += $item->getQty();
                    }
                }
                $amount = $price * $itemsOnCart;
            } else {
                foreach ($items as $item) {
                    $productId = $item->getProductId();
                    if ($productId == $id) {
                        $amount = $price * ($item->getQty());
                    }
                }
            }
        } else {
            if ($id == 0) {
                $itemsOnCart = 0;
                foreach ($items as $item) {
                    $productId = $item->getProductId();
                    if (Mage::getModel('catalog/product')->load($productId)->getGiftwrap()) {
                        $itemsOnCart++;
                    }
                }
                $amount = $price; //*$itemsOnCart;
            } else {
                $amount = $price;
            }
        }
        return $amount;
    }

    /**
     * @param $productfile
     * @return $this
     */
    public function init($productfile) {
        $this->_productfile = $productfile;
        return $this;
    }

    /**
     * @return array
     */
    public function getListStore() {
        $list = array();
        $storeCollection = Mage::getModel('core/store')->getCollection();
        //$list[''] = 'Select stote';
        foreach ($storeCollection as $store) {
            $list[$store->getId()] = $store->getName();
        }
        return $list;
    }

    /**
     * @return array
     */
    public function getStoreOption() {
        $options = array();
        $list = $this->getListStore();
        if (count($list))
            foreach ($list as $key => $value)
                $options[] = array('label' => $value, 'value' => $key);
        return $options;
    }

    /**
     * @return mixed
     */
    public function getAllItems() {
        $quoteId = Mage::getSingleton('checkout/session')->getQuote()->getId();
        $items = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId(
            $quoteId);
        return $items;
    }

    /**
     * @param $item
     * @return array
     */
    public function getOptionList($item) {
        $product = Mage::getModel('catalog/product')->load($item->getProductId());
        $item->setProduct($product);
        try {
            if ($item->getData('product_type') == 'configurable') {
                $options = Mage::helper('catalog/product_configuration')->getConfigurableOptions($item);
                return $options;
            } else if ($item->getData('product_type') == 'simple') {
                $options = Mage::helper('catalog/product_configuration')->getCustomOptions($item);
                return $options;
            } else if ($item->getData('product_type') == 'bundle') {
                $options = Mage::helper('bundle/catalog_product_configuration')->getOptions($item);
                return $options;
            }
        } catch (Exception $e) {
            return array();
        }
    }

    /**
     * @param $file
     * @return string
     */
    public function getSwitchedTemplate($file) {
        $package = Mage::getStoreConfig('giftwrap/general/giftwrap_template');
        $styledir = 'style';
        $offsetdir = str_replace('giftwrap' . DS, '', substr($file, strrpos($file, 'giftwrap' . DS)));
        $basedir = substr($file, 0, strrpos($file, 'giftwrap' . DS)) . 'giftwrap';
        $switchedfile = $basedir . DS . $styledir . DS . $package . DS . $offsetdir;
        return $switchedfile;
    }

    /**
     * @return string
     */
    public function getSwitchedSkinFile() {
        $package = Mage::getStoreConfig('giftwrap/general/giftwrap_template');
        $styledir = 'css/style';
        $cssfile = $styledir . '/' . $package . '/' . 'giftwrap.css';
        return $cssfile;
    }

    /**
     * @param $item
     * @param null $selection_id
     * @return float
     */
    public function getNumberOfItemsCanWraped($item, $selection_id = null) {
        $quoteId = $item->getQuoteId();
        $qty = floatval($item->getQty());
        $selectionCollection = Mage::getModel('giftwrap/selection')
            ->getCollection()
            ->addFieldToFilter('quote_id', $quoteId);
        foreach ($selectionCollection as $selection) {
            $selectionItemCollection = Mage::getModel('giftwrap/selectionitem')
                ->getCollection()
                ->addFieldToFilter('selection_id', $selection->getId())
                ->addFieldToFilter('item_id', $item->getId());
            foreach ($selectionItemCollection as $selectionItem) {
                $qty = floatval($qty) - floatval($selection->getQty()) * floatval($selectionItem->getQty());
            }
        }
        if ($selection_id) {
            $selection = Mage::getModel('giftwrap/selection')->load($selection_id);
            $selectionItem = Mage::getModel('giftwrap/selectionitem')->loadBySelectionAndItem($selection_id, $item
                ->getId());
            return $qty + floatval($selectionItem->getQty()) * floatval($selection->getQty());
        }
        return $qty;
    }

    /**
     * delete selection item of selection
     * @param $selectionId
     */
    public function deleteItemOfSelection($selectionId) {
        $selectionItems = Mage::getModel('giftwrap/selectionitem')
            ->getCollection()
            ->addFieldToFilter('selection_id', $selectionId);
        if (count($selectionItems)) {
            foreach ($selectionItems as $selectionItem) {
                $selectionItem->delete();
            }
        }
    }

    /**
     * @return mixed
     */
    public function getAdminAllItems() {
        $quoteId = Mage::getSingleton('adminhtml/session_quote')->getQuote()->getId();
        $items = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId(
            $quoteId);
        return $items;
    }

    // Giftwarp filter King_211112
    /**
     * @param null $storeId
     * @param null $address_id
     * @param null $customer_address
     * @return float|int
     */
    public function giftwrapAmountAdmin($storeId = null, $address_id = null, $customer_address = null) {

        $amount = 0;
        $quoteId = Mage::getSingleton('adminhtml/session_quote')->getQuote()->getId();
        $items = Mage::getModel('giftwrap/selection')->getSelectionByQuoteId($quoteId, $storeId, $address_id, $customer_address);
        if ($this->getCalculateOnItems()) {
            if (is_array($items)) {
                foreach ($items as $item) {
                    $giftbox = Mage::getModel('giftwrap/selection')->load($item['id']);

                    $style = Mage::getModel('giftwrap/giftwrap')->load($item['styleId']);
                    $giftcard = Mage::getModel('giftwrap/giftcard')->load($item['giftcardId']);
                    $number = 0;
                    $its = $giftbox->getItemCollection();

                    foreach ($its as $it) {
                        $number += $it->getQty();
                    }
                    $amount += floatval($number) * floatval($giftbox->getQty()) * (floatval($style->getPrice()) + floatval($giftcard->getPrice()));
                }
            }
        } else {
            if (is_array($items)) {
                foreach ($items as $item) {
                    $giftbox = Mage::getModel('giftwrap/selection')->load($item['id']);
                    $style = Mage::getModel('giftwrap/giftwrap')->load(
                        $item['styleId']);
                    $giftcard = Mage::getModel('giftwrap/giftcard')->load(
                        $item['giftcardId']);
                    $amount += floatval($giftbox->getQty()) * (floatval($style->getPrice()) +
                            floatval($giftcard->getPrice()));
                }
            }
        }

        return $amount;
    }


    /**
     * @return mixed
     */
    public function getStoreId() {
        return Mage::app()->getStore()->getId();
    }

    /**
     * @return bool
     */
    public function checkUseCard() {
        $gifcards = Mage::getModel('giftwrap/giftcard')->getCollection()
            ->addFieldToFilter(
                'store_id', Mage::app()->getStore()
                ->getId())
            ->addFieldToFilter('status', 1);

        if (count($gifcards) > 0 && Mage::getStoreConfig('giftwrap/general/use_card', $this->getStoreId())) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @return mixed
     */
    public function useConfirmDelete() {
        return Mage::getStoreConfig('giftwrap/general/confirm_delete', $this->getStoreId());
    }

    /**
     * @param $note
     * @param null $store
     * @return mixed
     */
    public function getNoteConfig($note, $store = null) {
        return Mage::getStoreConfig('giftwrap/note/' . $note, $store);
    }

    /**
     *
     *
     */
    public function saveIdItemQuote($itemQuote, $kt) {
        $ItemIdsCurrent = $this->getAllIdCurrentItems($itemQuote);
        asort($ItemIdsCurrent);
        $ItemdIdsPrevious = null;
        $model = Mage::getModel('giftwrap/selectionitem')->getCollection()
            ->addFieldToFilter('item_id', -1);

        if ($model->getSize()) {
            $ItemdIdsPrevious = $this->getAllIdPreviousItems($kt);
            asort($ItemdIdsPrevious);
            foreach ($model as $item) {
                $position = array_search($item->getCheckReorder(), $ItemdIdsPrevious);
                $item->setData('item_id', $ItemIdsCurrent[$position]);
            }
            $model->save();
        }
        Mage::getSingleton('core/session')->setQuoteOldId(null);
        $this->deleteItemNotUse();
        return;
    }

    /**
     *    return array id of item in current quote
     * */
    public function getAllIdCurrentItems($itemQuote) {
        $arrIdItemCurrent = array();

        foreach ($itemQuote as $item) {
            $arrIdItemCurrent[] = $item->getId();
        }

        return $arrIdItemCurrent;
    }

    // nothing
    /**
     * @param $collection
     * @return array
     */
    public function test($collection) {
        $arr = array();
        foreach ($collection as $item) {
            $arr[] = $item->getCheckReorder();
        }
        return $arr;
    }

    /**
     *    return array id of item in previous quote
     * */
    public function getAllIdPreviousItems($kt) {
        $arrIdItemOld = array();

        $quoteOldId = Mage::getSingleton('core/session')->getQuoteOldId();
        if ($kt == 2) {
            $quoteOld = Mage::getModel('sales/quote')
                ->setStoreId(Mage::getSingleton('adminhtml/session_quote')->getStoreId())
                ->load($quoteOldId)->getAllItems();
        } else {
            $quoteOld = Mage::getModel('sales/quote')->load($quoteOldId)->getAllItems();
        }

        foreach ($quoteOld as $item) {
            $arrIdItemOld[] = $item->getId();
        }
        return $arrIdItemOld;
    }

    /**
     *
     */
    public function deleteItemNotUse() {
        $model = Mage::getModel('giftwrap/selectionitem')->getCollection()
            ->addFieldToFilter('item_id', -1);
        $arrSelectId = array();
        if ($model->getSize()) {
            foreach ($model as $item) {
                $arrSelectId[] = $item->getSelectionId();
                $item->delete();
            }
        }
        $model->save();
        $this->deleteSelectionNotUse($arrSelectId);
    }

    /**
     * @param $array
     */
    public function deleteSelectionNotUse($array) {
        foreach ($array as $item) {
            $model = Mage::getModel('giftwrap/selection')->load($item);
            $model->delete();
            $model->save();
        }
    }
}