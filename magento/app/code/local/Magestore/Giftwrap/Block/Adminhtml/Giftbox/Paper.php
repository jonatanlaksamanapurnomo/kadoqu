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

class Magestore_Giftwrap_Block_Adminhtml_Giftbox_Paper extends Mage_Checkout_Block_Cart_Item_Renderer
{
    /**
     * @return mixed
     */
    public function _prepareLayout ()
    {	
        return parent::_prepareLayout();
    }

    /**
     * @return array
     */
    public function getAllPapers ()
    {
        
        $papers = Mage::getModel('giftwrap/giftwrap')
        		->getCollection()
        		->addFieldToFilter('status',1)
                ->addFieldToFilter('store_id',Mage::app()->getStore()->getId());
        $list = array();
        foreach ($papers as $paper) {
            $list[] = $paper;
        }
        return $list;
    }

    /**
     * @return array
     */
    public function getWrapedItems ()
    {
        $items = Mage::helper('giftwrap')->getAdminAllItems();
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
    public function getItemsCollection ()
    {
        $quote = Mage::getSingleton('adminhtml/session_quote')->getQuote();
        $items = $quote->getItemsCollection();
        return $items;
    }

    /**
     * @param $giftbox_id
     * @return array
     */
    public function getNotAvailableItems($giftbox_id)
    {
        $quoteId = Mage::getSingleton('adminhtml/session_quote')->getQuote()->getId();
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
     * @param null $id
     * @return array
     */
    public function getAvailableItems ($id = null)
    {
        $quote = Mage::getSingleton('adminhtml/session_quote')->getQuote();
        $giftwrapItems = array();
        foreach ($quote->getAllVisibleItems() as $item) {        
			if(Mage::helper('giftwrap')->isGiftwrap(
            $item->getProduct()
                ->getId())) {
                if($this->getNumberOfItemsCanWraped($item,$id) >0)
                	$giftwrapItems[] = $item->getId();
            }
        }
        return $giftwrapItems;
    }

    /**
     * @param $giftbox_id
     * @return array
     */
    public function getItemIdsByGiftbox ($giftbox_id)
    {
        $item_ids = array();
        $giftbox = Mage::getModel('giftwrap/selection')->load($giftbox_id);
        $its = $giftbox->getItemCollection();
        foreach ($its as $it) {
            $item_ids[] = $it->getItemId();
        }
        return $item_ids;
    }

    /**
     * @param $item
     * @param null $selection_id
     * @return float
     */
    public function getNumberOfItemsCanWraped($item, $selection_id=null){
    	$quoteId = $item->getQuoteId();
     
    	$qty = floatval($item->getQty());
    	$selectionCollection = Mage::getModel('giftwrap/selection')
    							->getCollection()
    							->addFieldToFilter('quote_id',$quoteId)
    							;
    	foreach($selectionCollection as $selection){
    		$selectionItemCollection = Mage::getModel('giftwrap/selectionitem')
    									->getCollection()
    									->addFieldToFilter('selection_id',$selection->getId())
    									->addFieldToFilter('item_id',$item->getId())
    									;
    		foreach($selectionItemCollection as $selectionItem){
    			$qty = floatval($qty) - floatval($selection->getQty())*floatval($selectionItem->getQty());
    		}
    	}
    	if($selection_id){
    		$selection = Mage::getModel('giftwrap/selection')->load($selection_id);
    		$selectionItem = Mage::getModel('giftwrap/selectionitem')->loadBySelectionAndItem($selection_id,$item
    		->getId());
    		return $qty + floatval($selectionItem->getQty())*floatval($selection->getQty());
    	}
    	return $qty;
    }

    /**
     * @return mixed
     */
    public function getAllGiftcards ()
    {
        $gifcards = Mage::getModel('giftwrap/giftcard')->getCollection()
        						->addFieldToFilter(
        'store_id', Mage::app()->getStore()
            ->getId())
            					->addFieldToFilter('status',1);
        return $gifcards;
    }

    /**
     *
     */
    public function getKeyRequest ()
    {
		$this->getRequest()->getParam('key');
    }
}