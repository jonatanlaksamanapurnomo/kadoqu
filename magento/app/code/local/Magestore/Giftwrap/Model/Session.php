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

class Magestore_Giftwrap_Model_Session extends Mage_Core_Model_Session_Abstract {
    /**
     * Magestore_Giftwrap_Model_Session constructor.
     */
    public function __construct() {
		$this->init('giftwrap');	
	}

    /**
     *
     */
    public function unsetAll() {
		parent::unsetAll();
		$this->_collections = null;
	}

    /**
     *
     */
    public function clear() {
		$this->setData("items",null);
	}

    /**
     * @param $quoteId
     * @param $itemId
     * @param $item_data
     */
    public function addItem($quoteId, $itemId, $item_data)	{
		$items = $this->getData("items");	
		$sessionQuoteId = $items['quoteId'];
		if ($sessionQuoteId == $quoteId) {
			$giftwrap_items = $items['giftwrap_items'];
			$giftwrap_items[$itemId] = $item_data;
			$items = array('quoteId' => $quoteId, 'giftwrap_items' => $giftwrap_items);			
		}
		else {
			$this->clear();
			$giftwrap_items = array();
			$giftwrap_items[$itemId] = $item_data;
			$items = array('quoteId' => $quoteId, 'giftwrap_items' => $giftwrap_items);
		}
		$this->setData("items",$items);
	}

    /**
     * @return null
     */
    public function getAllItems()	{
		$items = $this->getData("items");
		$quoteId = Mage::getSingleton('checkout/session')->getQuote()->getId();
		if ($quoteId == $items['quoteId']) {
			$giftwrap_items = $items['giftwrap_items'];
			return $giftwrap_items;
		}
		return null;
	}

    /**
     * @param $quoteId
     * @param $item_id
     */
    public function deleteItem($quoteId, $item_id) {
		$quotes = $this->getData("items");		
		if (is_array($quotes) && ($quotes['quoteId'] == $quoteId)) {				
			$giftwrap_items = $quotes['giftwrap_items'];
			if (is_array($giftwrap_items) && isset($giftwrap_items[$item_id])) {
				unset($giftwrap_items[$item_id]);
			}
			$quotes = array('quoteId' => $quoteId, 'giftwrap_items' => $giftwrap_items);
		}
		$this->setData("items",$quotes);				
	}

    /**
     * @param $itemId
     * @return bool|mixed
     */
    public function giftwrapSelected($itemId) {
		$quotes = $this->getData('items');
		$quoteId = Mage::getSingleton('checkout/session')->getQuote()->getId();
		if ($quoteId == $quotes['quoteId']) {		
			$giftwrap_items = $quotes['giftwrap_items'];		
			if (is_array($giftwrap_items) && isset($giftwrap_items[$itemId])) {
				return $giftwrap_items[$itemId];
			}
		}
		return false;
	}

    /**
     * @return int|null
     */
    public function getItemCount() {
		$items = $this->getData("items");
		$giftwrap_items = $items['giftwrap_items'];
		if (is_array($giftwrap_items)) return count($giftwrap_items);
		return null;
	}

    /**
     * @param $itemId
     * @param $styleId
     * @param $quoteId
     */
    public function chooseStyle($itemId, $styleId, $quoteId) {
		$items = $this->getData("items");
		if ($quoteId == $items['quoteId']) {
			$giftwrap_items = $items['giftwrap_items'];
			$giftwrap_items[$itemId] = array('itemId' => $itemId, 'styleId' => $styleId);
			$items = array('quoteId' => $quoteId, 'giftwrap_items' => $giftwrap_items);
		}
		else {
			$this->clear();
			$giftwrap_items = array();
			$giftwrap_items[$itemId] = array('itemId' => $itemId, 'styleId' => $styleId);
			$items = array('quoteId' => $quoteId, 'giftwrap_items' => $giftwrap_items);
		}
		$this->setData("items",$items);
	}

    /**
     * @param $newQuoteId
     */
    public function setNewQuote($newQuoteId) {
		$items = $this->getData("items");
		if ($items['quoteId'] != $newQuoteId) {
			$this->clear();
			$giftwrap_items = $items['giftwrap_items'];
			$quotes = array('quoteId' => $newQuoteId, 'giftwrap_items' => $giftwrap_items);
			$this->setData("items", $quotes);
		}
	}
}