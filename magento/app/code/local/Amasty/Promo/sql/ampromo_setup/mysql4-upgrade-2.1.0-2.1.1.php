<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */
$this->startSetup();


$fieldsSql = 'SHOW COLUMNS FROM ' . $this->getTable('salesrule/rule');
$cols = $this->getConnection()->fetchCol($fieldsSql);

if (!in_array('ampromo_discount_value', $cols)){
    $this->run("ALTER TABLE `{$this->getTable('salesrule/rule')}` ADD `ampromo_discount_value` VARCHAR(255) after `ampromo_type`");
}

if (!in_array('ampromo_min_price', $cols)){
    $this->run("ALTER TABLE `{$this->getTable('salesrule/rule')}` ADD `ampromo_min_price` VARCHAR(255) after `ampromo_discount_value`");
}

if (!in_array('ampromo_use_discount_amount', $cols)){
    $this->run("ALTER TABLE `{$this->getTable('salesrule/rule')}` ADD `ampromo_use_discount_amount` SMALLINT(6) NOT NULL DEFAULT '0' after `ampromo_min_price`");
}

if (!in_array('ampromo_show_orig_price', $cols)){
    $this->run("ALTER TABLE `{$this->getTable('salesrule/rule')}` ADD `ampromo_show_orig_price` SMALLINT(6) NOT NULL DEFAULT '0' after `ampromo_use_discount_amount`");
}

if (!in_array('ampromo_free_shipping', $cols)){
    $this->run("ALTER TABLE `{$this->getTable('salesrule/rule')}` ADD `ampromo_free_shipping` VARCHAR(255) NOT NULL DEFAULT 'global' after `ampromo_show_orig_price`");
}

$this->endSetup();