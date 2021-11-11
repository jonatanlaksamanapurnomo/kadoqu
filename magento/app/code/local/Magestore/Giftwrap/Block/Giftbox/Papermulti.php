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

class Magestore_Giftwrap_Block_Giftbox_Papermulti extends Mage_Checkout_Block_Cart_Item_Renderer {

    /**
     * @return mixed
     */
    public function _prepareLayout() {
        return parent::_prepareLayout();
    }

    /**
     * @return array
     */
    public function getAllPapers() {
        $papers = Mage::getModel('giftwrap/giftwrap')
                        ->getCollection()
                        ->addFieldToFilter(
                                'store_id', Mage::app()->getStore()->getId())
                        ->addFieldToFilter('status', 1)
        ;
        $list = array();
        foreach ($papers as $paper) {
            $list[] = $paper;
        }
        return $list;
    }

    /**
     * @return array
     */
    public function getWrapedItems() {

        $items = Mage::helper('giftwrap')->getAllItems();
        $item_ids = array();
        foreach ($items as $it) {
            $its = explode(',', $it['itemId']);
            foreach ($its as $i) {
                $item_ids[] = $i;
            }
        }
        return $item_ids;
    }

    /**
     * @return mixed
     */
    public function getItemsCollection() {
        $quote = Mage::getSingleton('checkout/session')->getQuote();
        $items = $quote->getItemsCollection();
        return $items;
    }

    /**
     * @param $giftbox_id
     * @return array
     */
    public function getNotAvailableItems($giftbox_id) {
        $quoteId = Mage::getSingleton('checkout/session')->getQuote()->getId();
        $giftboxs = Mage::getModel('giftwrap/selection')->getCollection()
                        ->addFieldToFilter('quote_id', $quoteId)
                        ->addFieldToFilter('id', array('neq' => $giftbox_id));
        $item_ids = array();
        foreach ($giftboxs as $giftbox) {
            $its = explode(',', $giftbox->getItemId());
            foreach ($its as $i) {
                $item_ids[] = $i;
            }
        }
        return $item_ids;
    }

    /**
     * @return mixed
     */
    public function getCheckout() {
        return Mage::getSingleton('checkout/type_multishipping');
    }

    /**
     * @return mixed
     */
    public function getQuote() {
        return $this->getCheckout()->getQuote();
    }

    /**
     * @return mixed
     */
    public function getAddresses() {
        return $this->getCheckout()->getQuote()->getAllShippingAddresses();
    }

    /**
     * @return mixed
     */
    public function getAddress_id() {
        return $this->getRequest()->getParam('id');
    }

    /**
     * @param null $id
     * @return mixed
     */
    public function getAvailableItems($id = null) {
        $address_id = $this->getAddress_id();
        $allAddress = $this->getAddresses();
        foreach($allAddress as $value){
            if($value->getId() == $address_id){
                $address = $value;
                break;
            }
        }
        $items = array();
        foreach ($address->getAllItems() as $item) {
            if ($item->getParentItemId()) {
                continue;
            }
            $item->setQuoteItem($this->getCheckout()->getQuote()->getItemById($item->getQuoteItemId()));
			if (Mage::helper('giftwrap')->isGiftwrap($item->getProduct()->getId())) {
                if ($this->getNumberOfItemsCanWraped($item, $id) > 0)
                    $items[] = $item;
            }
        }
        $itemsFilter = new Varien_Filter_Object_Grid();
        $itemsFilter->addFilter(new Varien_Filter_Sprintf('%d'), 'qty');
        return $itemsFilter->filter($items);
    }

    /**
     * @param $giftbox_id
     */
    public function getItemIdsByGiftbox($giftbox_id)
    {
        $item_ids = array();
        $giftbox = Mage::getModel('giftwrap/selection')->load($giftbox_id);
        $its = $giftbox->getItemCollection();
        foreach ($its as $it) {
            $item_ids[] = $it->getItemId();
        }
    }

    /**
     * @param $item_address
     * @param null $selection_id
     * @return float
     */
    public function getNumberOfItemsCanWraped($item_address, $selection_id=null) {
        $item = $item_address->getQuoteItem();
        $address_id = $this->getAddress_id();
        
        $quoteId = $item->getQuoteId();
        $qty = floatval($item_address->getQty());
        $selectionCollection = Mage::getModel('giftwrap/selection')
                        ->getCollection()
                        ->addFieldToFilter('quote_id', $quoteId)
                        ->addFieldToFilter('addressgift_id', $address_id)
        ;
        foreach ($selectionCollection as $selection) {

            $selectionItemCollection = Mage::getModel('giftwrap/selectionitem')
                            ->getCollection()
                            ->addFieldToFilter('selection_id', $selection->getId())
                            ->addFieldToFilter('item_id', $item->getId())
    
            ;
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
     * @param $item
     */
    public function getProductOptions($item) {
        
    }

}