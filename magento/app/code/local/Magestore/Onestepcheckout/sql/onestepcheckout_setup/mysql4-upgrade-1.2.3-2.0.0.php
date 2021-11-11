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

$installer = $this;
$installer->startSetup();

$installer->getConnection()->dropTable($installer->getTable('onestepcheckout_survey'));

$table  = $installer->getConnection()
    ->newTable($installer->getTable('onestepcheckout_survey'))
    ->addColumn(
        'survey_id',
        Varien_Db_Ddl_Table::TYPE_INTEGER,
        11,
        array('identity' => true, 'unsigned' => true, 'nullable' => false, 'primary' => true),
        'Survey Id'
    )
    ->addColumn(
        'order_id',
        Varien_Db_Ddl_Table::TYPE_INTEGER,
        11,
        array('unsigned' => true, 'nullable' => false),
        'Order Id'
    )
    ->addColumn(
        'question',
        Varien_Db_Ddl_Table::TYPE_TEXT,
        255,
        array('default' => null),
        'Question'
    )
    ->addColumn(
        'answer',
        Varien_Db_Ddl_Table::TYPE_TEXT,
        255,
        array('default' => null),
        'Answer'
    )->addIndex(
        $installer->getIdxName('osc_survey_order', array('order_id')),
        array('order_id')
    )->addForeignKey(
        $installer->getFkName(
            'onestepcheckout_survey',
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


$connection = $installer->getConnection();
if(!$connection->tableColumnExists($installer->getTable('sales/order'), 'onestepcheckout_giftwrap_amount')) {
    $connection->addColumn($installer->getTable('sales/order'),'onestepcheckout_giftwrap_amount', array(
        'type'      => Varien_Db_Ddl_Table::TYPE_DECIMAL,
        'nullable'  => true,
        'default'   => '0.000',
        'length'    => '12,4',
        'comment'   => 'Giftwrap amount'
    ));
}

$installer->endSetup(); 