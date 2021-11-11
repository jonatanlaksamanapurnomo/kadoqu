<?php

$installer = $this;

$installer->startSetup();

$installer->run("

DROP TABLE IF EXISTS {$this->getTable('konfirmasi_pembayaran')};
CREATE TABLE {$this->getTable('konfirmasi_pembayaran')} (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `no_order` varchar(250) NOT NULL,
  `bank_buyer` varchar(250) NOT NULL,
  `bank_merchant` varchar(250) NOT NULL,
  `metode_transfer` varchar(250) NOT NULL,
  `nama_buyer` varchar(250) NOT NULL,
  `no_rek_buyer` varchar(250) NOT NULL,
  `tanggal_transfer` varchar(250) NOT NULL,
  `created_time` datetime NULL,
  `update_time` datetime NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    ");

$installer->endSetup(); 