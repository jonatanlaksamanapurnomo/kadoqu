<?php

class Awbali_Konfirmasipembayaran_Block_Adminhtml_Konfirmasipembayaran_Edit_Tab_Form extends Mage_Adminhtml_Block_Widget_Form
{
  protected function _prepareForm()
  {
      $form = new Varien_Data_Form();
      $this->setForm($form);
      $fieldset = $form->addFieldset('konfirmasipembayaran_form', array('legend'=>Mage::helper('konfirmasipembayaran')->__('Item information')));
	    
	  $fieldset->addField('nama_buyer', 'text', array(
          'label'     => Mage::helper('konfirmasipembayaran')->__('Nama'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'nama_buyer',
      ));
	  $fieldset->addField('email_buyer', 'text', array(
          'label'     => Mage::helper('konfirmasipembayaran')->__('Email'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'email_buyer',
      ));
	  $fieldset->addField('no_order', 'text', array(
          'label'     => Mage::helper('konfirmasipembayaran')->__('No. Order'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'no_order',
      ));
	  $fieldset->addField('bank_buyer', 'text', array(
          'label'     => Mage::helper('konfirmasipembayaran')->__('Bank Pengirim'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'bank_buyer',
      ));
	  $fieldset->addField('no_rek_buyer', 'text', array(
          'label'     => Mage::helper('konfirmasipembayaran')->__('No. Rek Pengirim'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'no_rek_buyer',
      ));
	  $fieldset->addField('jumlah_transfer', 'text', array(
          'label'     => Mage::helper('konfirmasipembayaran')->__('Jumlah Transfer'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'jumlah_transfer',
      ));
	  $fieldset->addField('bank_merchant', 'text', array(
          'label'     => Mage::helper('konfirmasipembayaran')->__('Bank Tujuan'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'bank_merchant',
      ));
	  $fieldset->addField('metode_transfer', 'text', array(
          'label'     => Mage::helper('konfirmasipembayaran')->__('Metode Transfer'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'metode_transfer',
      ));
	  $fieldset->addField('tanggal_transfer', 'text', array(
          'label'     => Mage::helper('konfirmasipembayaran')->__('Tanggal Transfer'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'tanggal_transfer',
      ));
	  
	 
	   
      if ( Mage::getSingleton('adminhtml/session')->getKonfirmasipembayaranData() )
      {
          $form->setValues(Mage::getSingleton('adminhtml/session')->getKonfirmasipembayaranData());
          Mage::getSingleton('adminhtml/session')->setKonfirmasipembayaranData(null);
      } elseif ( Mage::registry('konfirmasipembayaran_data') ) {
          $form->setValues(Mage::registry('konfirmasipembayaran_data')->getData());
      }
      return parent::_prepareForm();
  }
}