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

$connection = $installer->getConnection();
if(!$connection->tableColumnExists($installer->getTable('sales/order'), 'onestepcheckout_order_comment')) {
    $connection->addColumn($installer->getTable('sales/order'),'onestepcheckout_order_comment', array(
        'type'      => Varien_Db_Ddl_Table::TYPE_TEXT,
        'nullable'  => true,
        'length'    => null,
        'comment'   => 'Order Comment'
    ));
}

$installer->endSetup(); 