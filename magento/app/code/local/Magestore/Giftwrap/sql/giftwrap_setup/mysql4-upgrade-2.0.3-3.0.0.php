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

	DROP TABLE IF EXISTS {$this->getTable('giftwrap_giftcard')};
	CREATE TABLE {$this->getTable('giftwrap_giftcard')} (
		  `giftcard_id` int(11) unsigned NOT NULL auto_increment,
		  `status` smallint(6) NOT NULL default '0',
		  `name` varchar(255) NOT NULL default '',
		  `image` varchar(255) NULL default '',
		  `price` DECIMAL(12,4) NOT NULL default '0',
		  `store_id` smallint(5) unsigned NOT NULL,
		  `message` text NULL,
		  `character` int(10) NOT NULL default '0',
	  	  `option_id` int(11) NOT NULL default '0',
		  `default_name` tinyint(1) NOT NULL default '1',
		  `default_price` tinyint(1) NOT NULL default '1',
		  `default_image` tinyint(1) NOT NULL default '1',
		  `default_sort_order` tinyint(1) NOT NULL default '1',
		  `default_message` tinyint(1) NOT NULL default '1',
		  `default_status` tinyint(1) NOT NULL default '1',
		  `default_character` tinyint(1) NOT NULL default '1',
	  INDEX(`store_id`),
	  FOREIGN KEY (`store_id`) REFERENCES {$this->getTable('core/store')} (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	  PRIMARY KEY (`giftcard_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;
	
	ALTER TABLE  {$this->getTable('giftwrap_selection')} CHANGE  `item_id`  `item_id` VARCHAR( 255 ) NOT NULL DEFAULT  '';
	
");

$installer->getConnection()->addColumn($this->getTable('giftwrap/selection'), 'giftcard_id', "int(11) unsigned NULL ");
$installer->getConnection()->addConstraint(
    'giftcard_id_ibfk_1',
    $this->getTable('giftwrap/selection'),
    'giftcard_id',
    $this->getTable('giftwrap_giftcard'),
    'giftcard_id',
    'CASCADE',
    'CASCADE',
    0
);

$installer->endSetup(); 