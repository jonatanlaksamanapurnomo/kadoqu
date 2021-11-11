<?php
/**
 * Indonesia Shipping Carriers
 * @copyright   Copyright (c) 2016 Ndee Proaongkir
 * @email		-
 * @build_date  July 2016   
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
$installer = $this;

$installer->startSetup();

$installer->run("

DROP TABLE IF EXISTS {$this->getTable('daftar_alamat')};
CREATE TABLE {$this->getTable('daftar_alamat')} (
  idx int(10) unsigned auto_increment NOT NULL ,
  
  `city_id` int(10) NOT NULL default '0',
  `province_id` int(10) NOT NULL default '0',
  `city_name` varchar(255) NOT NULL default '',
  `city` varchar(255) NOT NULL default '',
  
  `province` varchar(255) NOT NULL default '',
  `type` varchar(255) NOT NULL default '',
  `postal_code` varchar(30) NOT NULL default '',
  `subdistrict_id` int(10) NOT NULL default '0',
  `subdistrict_name` varchar(255) NOT NULL default '',
  
  `last_update` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,

  PRIMARY KEY(idx)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;





   ");
/*
idx int(10) unsigned NOT NULL auto_increment,
  website_id int(11) NOT NULL default '0',
  dest_country_id varchar(4) NOT NULL default '0',
  dest_region_id int(10) NOT NULL default '0',
  dest_city varchar(30) NOT NULL default '',
  dest_zip varchar(10) NOT NULL default '',
  dest_zip_to varchar(10) NOT NULL default '',
  condition_name varchar(20) NOT NULL default '',
  condition_from_value decimal(12,4) NOT NULL default '0.0000',
  condition_to_value decimal(12,4) NOT NULL default '0.0000',
  price decimal(12,4) NOT NULL default '0.0000',
  cost decimal(12,4) NOT NULL default '0.0000',
  delivery_type varchar(255) NOT NULL default '',
*/


$installer->run("

DROP TABLE IF EXISTS {$this->getTable('proaongkir_save_rates')};
CREATE TABLE {$this->getTable('proaongkir_save_rates')} (
		  `idx` int(6) unsigned NOT NULL AUTO_INCREMENT,
		  `dari` varchar(255) NOT NULL,
		  `ke` varchar(30) NOT NULL,
		  `harga` decimal(19,4) DEFAULT NULL,
		  `lup` datetime DEFAULT NULL,
		  `kurir` varchar(255) NOT NULL,
		  `servis` varchar(255) NOT NULL,
		  `text` text NOT NULL,
		  PRIMARY KEY (`idx`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8;
		


   ");
   
   
   
   $installer->run("

DROP TABLE IF EXISTS {$this->getTable('proaongkir_service_list')};
CREATE TABLE {$this->getTable('proaongkir_service_list')} (
			`idx` int(11) NOT NULL AUTO_INCREMENT,
		  `kurir` varchar(255) DEFAULT NULL,
		  `servis` varchar(255) DEFAULT NULL,
		  `service_text` varchar(255) DEFAULT NULL,
		  PRIMARY KEY (`idx`)
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;
		
		
		INSERT IGNORE INTO {$this->getTable('proaongkir_service_list')}
		(`idx`, `kurir`, `servis`, `service_text`) VALUES
		(1,	'JNE',	'CTC',	'JNE (CTC) JNE City Courier'),
		(2,	'JNE',	'CTCOKE',	'JNE (CTCOKE) JNE City Courier'),
		(3,	'JNE',	'CTCYES',	'JNE (CTCYES) JNE City Courier'),
		(4,	'JNE',	'OKE',	'JNE (OKE) Ongkos Kirim Ekonomis'),
		(5,	'JNE',	'PELIK',	'JNE (PELIK) Amplop Pra Bayar PELIKAN'),
		(6,	'JNE',	'REG',	'JNE (REG) Layanan Reguler'),
		(7,	'JNE',	'SPS',	'JNE (SPS) Super Speed'),
		(8,	'JNE',	'YES',	'JNE (YES) Yakin Esok Sampai'),
		(9,	'POS',	'Express Next Day',	'POS (Express Next Day) Express Next Day'),
		(10,	'POS',	'Surat Kilat Khusus',	'POS (Surat Kilat Khusus) Surat Kilat Khusus'),
		(11,	'TIKI',	'ECO',	'TIKI (ECO) Economi Service'),
		(12,	'TIKI',	'HDS',	'TIKI (HDS) Holiday Delivery Service'),
		(13,	'TIKI',	'ONS',	'TIKI (ONS) Over Night Service'),
		(14,	'TIKI',	'REG',	'TIKI (REG) Regular Service'),
		(15,	'TIKI',	'SDS',	'TIKI (SDS) Same Day Service'),
		(16,	'TIKI',	'TDS',	'TIKI (TDS) Two Day Service');
		


   ");

$installer->endSetup();


