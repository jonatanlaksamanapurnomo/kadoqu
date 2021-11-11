<?php

class Doku_Myshortcart_WhatismyshortcartController extends Mage_Core_Controller_Front_Action
{
    public function indexAction() {
		$this->getResponse()->setBody($this->getLayout()->createBlock('myshortcart/whatismyshortcart')->toHtml());
	}
}
?>
