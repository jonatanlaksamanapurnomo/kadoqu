<?php

$installer = $this;

$installer->startSetup();

$installer->run("

ALTER TABLE {$this->getTable('konfirmasi_pembayaran')}
ADD (	jumlah_transfer	varchar(250) NOT NULL
);

");
$installer->endSetup();

