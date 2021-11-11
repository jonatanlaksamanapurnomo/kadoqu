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
 
class Awbali_Konfirmasipembayaran_Block_Adminhtml_Konfirmasipembayaran_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{

  public function __construct()
  {
      parent::__construct();
      $this->setId('konfirmasipembayaran_tabs');
      $this->setDestElementId('edit_form');
      $this->setTitle(Mage::helper('konfirmasipembayaran')->__('Konfirmasi Pembayaran Information'));
  }

  protected function _beforeToHtml()
  {
      $this->addTab('form_section', array(
          'label'     => Mage::helper('konfirmasipembayaran')->__('Konfirmasi Pembayaran Information'),
          'title'     => Mage::helper('konfirmasipembayaran')->__('Konfirmasi Pembayaran Information'),
          'content'   => $this->getLayout()->createBlock('konfirmasipembayaran/adminhtml_konfirmasipembayaran_edit_tab_form')->toHtml(),
      ));
     
      return parent::_beforeToHtml();
  }
}