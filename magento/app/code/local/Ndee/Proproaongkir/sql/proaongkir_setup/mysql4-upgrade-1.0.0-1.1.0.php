<?php

$installer = $this;
 
$installer->startSetup();
 
$this->addAttribute('customer_address', 'subdistrict_name', array(
    'type' => 'varchar',
    'input' => 'text',
    'label' => 'Kecamatan',
    'global' => 1,
    'visible' => 1,
    'required' => 0,
    'user_defined' => 1,
    'visible_on_front' => 1
));
Mage::getSingleton('eav/config')
    ->getAttribute('customer_address', 'subdistrict_name')
    ->setData('used_in_forms', array('customer_register_address','customer_address_edit','adminhtml_customer_address','checkout_register','customer_account_create','customer_account_edit'))
    ->save();
$installer->endSetup();

$tablequote = $this->getTable('sales/quote_address');
$installer->run("
ALTER TABLE  $tablequote ADD  `subdistrict_name` varchar(255) NOT NULL
");
 
$tablequote = $this->getTable('sales/order_address');
$installer->run("
ALTER TABLE  $tablequote ADD  `subdistrict_name` varchar(255) NOT NULL
");