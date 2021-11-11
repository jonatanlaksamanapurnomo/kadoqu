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
$installer->run("
	DROP TABLE IF EXISTS {$this->getTable('giftwrap_item')};
	CREATE TABLE {$this->getTable('giftwrap_item')} (
		`selection_item_id` int(11) unsigned NOT NULL auto_increment,
	  	`selection_id` int(11) unsigned NOT NULL,
	  	`item_id` int(11) NOT NULL,
	  	`qty` int(11) NOT NULL default '1',
	  	INDEX(`selection_id`),
	  	FOREIGN KEY (`selection_id`) REFERENCES `{$this->getTable('giftwrap_selection')}` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	  	PRIMARY KEY (`selection_item_id`)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
	
	
	ALTER TABLE  `giftwrap_selection` DROP COLUMN  `item_id`;
	
");

$installer->getConnection()->addColumn($this->getTable('giftwrap/selection'), 'qty', "int(11) NOT NULL default '1' ");
$installer->getConnection()->addColumn($this->getTable('giftwrap/selection'), 'type', "smallint(6) NOT NULL default '1' ");

$installer->endSetup(); 