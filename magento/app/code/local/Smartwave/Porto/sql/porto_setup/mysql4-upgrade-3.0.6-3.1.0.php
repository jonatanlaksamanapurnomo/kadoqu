<?php

$installer = $this;

$installer->startSetup();

if(!$installer->getAttribute('catalog_product', 'product_page_type', 'attribute_id')){
	$installer->addAttribute('catalog_product', 'product_page_type', array(
        'type'              => 'varchar',
        'backend_type'      => 'varchar',
        'backend'           => '',
        'frontend'          => '',
        'label'             => 'Product Page Type',
        'input'             => 'select',
        'frontend_class'    => '',
        'source'            => 'porto/system_config_source_setting_product_page_type',
        'global'            => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
        'visible'           => true,
        'required'          => false,
        'user_defined'      => true,
        'default'           => '',
        'searchable'        => false,
        'filterable'        => false,
        'comparable'        => false,
        'visible_on_front'  => false,
        'unique'            => false,
        'apply_to'          => '',
        'is_configurable'   => false
	));
}
if(!$installer->getAttribute('catalog_product', 'product_image_size', 'attribute_id')){
        $installer->addAttribute('catalog_product', 'product_image_size', array(
        'type'              => 'varchar',
        'backend_type'      => 'varchar',
        'backend'           => '',
        'frontend'          => '',
        'label'             => 'Product Image Size',
        'input'             => 'select',
        'frontend_class'    => '',
        'source'            => 'porto/system_config_source_setting_product_image_size',
        'global'            => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
        'visible'           => true,
        'required'          => false,
        'user_defined'      => true,
        'default'           => '',
        'searchable'        => false,
        'filterable'        => false,
        'comparable'        => false,
        'visible_on_front'  => false,
        'unique'            => false,
        'apply_to'          => '',
        'is_configurable'   => false
        ));
}
if(!$installer->getAttribute('catalog_product', 'custom_block', 'attribute_id')){
        $installer->addAttribute('catalog_product', 'custom_block', array(
        'type'              => 'text',
        'backend_type'      => 'text',
        'backend'           => '',
        'frontend'          => '',
        'label'             => 'Custom Block 1',
        'input'             => 'textarea',
        'frontend_class'    => '',
        'source'            => '',
        'global'            => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
        'visible'           => true,
        'required'          => false,
        'user_defined'      => true,
        'default'           => '',
        'searchable'        => false,
        'filterable'        => false,
        'comparable'        => false,
        'visible_on_front'  => false,
        'unique'            => false,
        'apply_to'          => '',
        'is_configurable'   => false
        ));
}
if(!$installer->getAttribute('catalog_product', 'custom_block_2', 'attribute_id')){
        $installer->addAttribute('catalog_product', 'custom_block_2', array(
        'type'              => 'text',
        'backend_type'      => 'text',
        'backend'           => '',
        'frontend'          => '',
        'label'             => 'Custom Block 2',
        'input'             => 'textarea',
        'frontend_class'    => '',
        'source'            => '',
        'global'            => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
        'visible'           => true,
        'required'          => false,
        'user_defined'      => true,
        'default'           => '',
        'searchable'        => false,
        'filterable'        => false,
        'comparable'        => false,
        'visible_on_front'  => false,
        'unique'            => false,
        'apply_to'          => '',
        'is_configurable'   => false
        ));
}

$installer->addAttributeToSet('catalog_product', 'Default', 'General', 'product_page_type');
$installer->addAttributeToSet('catalog_product', 'Default', 'General', 'product_image_size');
$installer->addAttributeToSet('catalog_product', 'Default', 'General', 'custom_block');
$installer->addAttributeToSet('catalog_product', 'Default', 'General', 'custom_block_2');

$installer->endSetup();