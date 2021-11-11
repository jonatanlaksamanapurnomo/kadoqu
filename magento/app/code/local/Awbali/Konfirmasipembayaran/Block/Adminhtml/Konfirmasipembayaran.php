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
 
class Awbali_Konfirmasipembayaran_Block_Adminhtml_Konfirmasipembayaran extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {
    $this->_controller = 'adminhtml_konfirmasipembayaran';
    $this->_blockGroup = 'konfirmasipembayaran';
    $this->_headerText = Mage::helper('konfirmasipembayaran')->__('Konfirmasi Pembayaran Manager');
    $this->_addButtonLabel = Mage::helper('konfirmasipembayaran')->__('Add User');
    parent::__construct();
	$this->_removeButton('add'); // removing add new button
  }
}