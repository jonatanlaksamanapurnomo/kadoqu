<?php

$installer = $this;

$installer->startSetup();

$installer->run("
CREATE TABLE IF NOT EXISTS {$this->getTable('myshortcart/records')} (
  `msc_id` int(11) NOT NULL AUTO_INCREMENT,
  `transidmerchant` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `start_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `finish_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status_code` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `transdate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ptype` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `amount` decimal(20,0) NOT NULL DEFAULT '0',
  `result_trx` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `extrainfo` varchar(250) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `msc_order_id` varchar(125) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `session_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `void_status` varchar(24) NOT NULL default '',
  `void_reason` varchar(24) NOT NULL default '',
  `void_date` varchar(24) NOT NULL default '',
  PRIMARY KEY (`msc_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;
");

$installer->endSetup();