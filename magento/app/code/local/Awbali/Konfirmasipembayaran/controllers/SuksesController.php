<?php
/**
 * Konfirmasi Pembayaran
 * 	
 * @package		Magento
 * @author		adisthana wijaya (info@adisthana.com)
 * @website		http://adisthana.com
 * @version		0.1.0
 * 
 */
 
class Awbali_Konfirmasipembayaran_SuksesController extends Mage_Core_Controller_Front_Action
{
    public function indexAction()
    {
		$this->loadLayout();     
		$this->getLayout()->getBlock('head')->setTitle('Konfirmasi Sukses');
		$this->renderLayout();
    }
}