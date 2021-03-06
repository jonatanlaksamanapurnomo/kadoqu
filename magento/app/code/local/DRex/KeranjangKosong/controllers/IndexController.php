<?php

/**
 * @category   DRex
 * @package    DRex_KeranjangKosong
 * @author     Daeng Rosanda -- daengrosanda@gmail.com
 */

class DRex_KeranjangKosong_IndexController extends Mage_Core_Controller_Front_Action
{
	public function indexAction()
	{
		//Get cart helper
		$cartHelper = Mage::helper('checkout/cart');

		//Get all items from cart
		$items = $cartHelper->getCart()->getItems();

		//Loop through all of cart items
		foreach ($items as $item) {
			$itemId = $item->getItemId();
			//Remove items, one by one
			$cartHelper->getCart()->removeItem($itemId)->save();
		}

		//Redirect back to cart or wherever ou wish
		$this->_redirect('checkout/cart');
	}

	public function addAllAction()
	{
		//Get cart helper

		$cartHelper = Mage::helper('checkout/cart');

		//Get all items from cart
		$items = $cartHelper->getCart()->getItems();

		//Loop through all of cart items
		foreach ($items as $item) {
			$itemId = $item->getItemId();
			//Remove items, one by one
			$cartHelper->getCart()->removeItem($itemId)->save();
		}

		//Redirect back to cart or wherever ou wish
		$this->_redirect('checkout/cart');
	}
}