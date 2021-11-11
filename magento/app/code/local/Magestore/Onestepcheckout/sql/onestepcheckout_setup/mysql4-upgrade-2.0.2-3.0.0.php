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

$installer->getConnection()->dropTable($installer->getTable('onestepcheckout_config_data'));

$table  = $installer->getConnection()
    ->newTable($installer->getTable('onestepcheckout_config_data'))
    ->addColumn(
        'config_id',
        Varien_Db_Ddl_Table::TYPE_INTEGER,
        11,
        array('identity' => true, 'unsigned' => true, 'nullable' => false, 'primary' => true),
        'Config Id'
    )
    ->addColumn(
        'scope',
        Varien_Db_Ddl_Table::TYPE_TEXT,
        20,
        array('default' => null),
        'Scope'
    )
    ->addColumn(
        'scope_id',
        Varien_Db_Ddl_Table::TYPE_INTEGER,
        11,
        array('unsigned' => true, 'nullable' => false),
        'Scope Id'
    )
    ->addColumn(
        'path',
        Varien_Db_Ddl_Table::TYPE_TEXT,
        255,
        array('default' => null),
        'Path'
    )
    ->addColumn(
        'value',
        Varien_Db_Ddl_Table::TYPE_TEXT,
        null,
        array('default' => null),
        'Value'
    );
$installer->getConnection()->createTable($table);


$installer->endSetup();

