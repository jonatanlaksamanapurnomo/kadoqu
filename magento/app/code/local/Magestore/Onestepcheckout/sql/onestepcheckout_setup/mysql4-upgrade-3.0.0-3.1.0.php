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
 * @package     Magestore_Onestepcheckout
 * @copyright   Copyright (c) 2017 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 */
/** @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$installer->startSetup();

$installer->getConnection()->dropTable($installer->getTable('onestepcheckout_delivery'));

$table  = $installer->getConnection()
    ->newTable($installer->getTable('onestepcheckout_delivery'))
    ->addColumn(
        'delivery_id',
        Varien_Db_Ddl_Table::TYPE_INTEGER,
        11,
        array('identity' => true, 'unsigned' => true, 'nullable' => false, 'primary' => true),
        'Delivery Id'
    )
    ->addColumn(
        'delivery_time_date',
        Varien_Db_Ddl_Table::TYPE_TEXT,
        16,
        array('default' => null),
        'Delivery Date Time'
    )
    ->addColumn(
        'order_id',
        Varien_Db_Ddl_Table::TYPE_INTEGER,
        11,
        array('unsigned' => true, 'nullable' => false),
        'Order Id'
    )
    ->addIndex(
        $installer->getIdxName('osc_delivery_order', array('order_id')),
        array('order_id')
    )->addForeignKey(
        $installer->getFkName(
            'onestepcheckout_delivery',
            'order_id',
            'sales_flat_order',
            'entity_id'
        ),
        'order_id',
        $installer->getTable('sales_flat_order'),
        'entity_id',
        Varien_Db_Ddl_Table::ACTION_CASCADE
    );

$installer->getConnection()->createTable($table);

$installer->endSetup();

