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
 * @package     Magestore_Giftwrap
 * @module    Giftwrap
 * @author      Magestore Developer
 *
 * @copyright   Copyright (c) 2016 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 *
 */

$installer = $this;
$installer->startSetup();

$installer->getConnection()->addColumn($this->getTable('sales/order'), 'giftwrap_amount', "DECIMAL( 12, 4 ) ");
$installer->getConnection()->addColumn($this->getTable('sales/order'), 'giftwrap_tax', "DECIMAL( 12, 4 ) NOT NULL default '0' ");


$installer->run("
	
	ALTER TABLE {$this->getTable('giftwrap')}  
		ADD  `store_id` smallint(5) unsigned NOT NULL,
		ADD  `option_id` int(11) NOT NULL default '0',
		ADD  `default_title` tinyint(1) NOT NULL default '1',
		ADD  `default_price` tinyint(1) NOT NULL default '1',
		ADD  `default_image` tinyint(1) NOT NULL default '1',
		ADD  `default_sort_order` tinyint(1) NOT NULL default '1',
		ADD  `default_personal_message` tinyint(1) NOT NULL default '1',
		ADD  `default_status` tinyint(1) NOT NULL default '1',
		ADD  `default_character` tinyint(1) NOT NULL default '1',
		ADD INDEX ( `store_id` ), 
		ADD FOREIGN KEY ( `store_id` ) REFERENCES {$this->getTable('core/store')} (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE	
	;	

");

$installer->endSetup(); 