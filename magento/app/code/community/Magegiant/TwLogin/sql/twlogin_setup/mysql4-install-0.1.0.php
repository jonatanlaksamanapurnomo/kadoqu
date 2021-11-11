<?php
/**
 * MageGiant
 * 
 * NOTICE OF LICENSE
 * 
 * This source file is subject to the MageGiant.com license that is
 * available through the world-wide-web at this URL:
 * http://magegiant.com/license-agreement/
 * 
 * DISCLAIMER
 * 
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 * 
 * @category    MageGiant
 * @package     MageGiant_TwLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/** @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$installer->startSetup();

/**
 * create twlogin table
 */
$installer->run("

DROP TABLE IF EXISTS {$this->getTable('twlogin_customer')};
CREATE TABLE {$this->getTable('twlogin_customer')} (
	`twitter_customer_id` int(11) unsigned NOT NULL auto_increment,
	`twitter_id` int(11) unsigned NOT NULL,
	`customer_id` int(10) unsigned NOT NULL,
	INDEX(`customer_id`),
	FOREIGN KEY (`customer_id`) REFERENCES `{$this->getTable('customer_entity')}` (`entity_id`) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (`twitter_customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 ");

$installer->endSetup();

