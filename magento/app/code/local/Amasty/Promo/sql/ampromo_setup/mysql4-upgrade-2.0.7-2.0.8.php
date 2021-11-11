<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */
$this->startSetup();

$this->run("ALTER TABLE `{$this->getTable('salesrule/rule')}` CHANGE `discount_step` `discount_step` FLOAT UNSIGNED NOT NULL COMMENT 'Discount Step'");

$this->endSetup();