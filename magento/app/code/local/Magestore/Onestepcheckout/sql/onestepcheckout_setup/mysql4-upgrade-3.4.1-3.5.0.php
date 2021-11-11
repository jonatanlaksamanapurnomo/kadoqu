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
if(!$connection->tableColumnExists($installer->getTable('onestepcheckout_delivery'), 'delivery_security_code')) {
    $connection->addColumn($installer->getTable('onestepcheckout_delivery'),'delivery_security_code', array(
        'type'      => Varien_Db_Ddl_Table::TYPE_TEXT,
        'nullable'  => true,
        'default'   => '',
        'length'    => '255',
        'comment'   => 'Security Code'
    ));
}

$installer->endSetup();