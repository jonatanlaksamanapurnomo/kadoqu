<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */
$this->startSetup();

$this->run("ALTER TABLE `{$this->getTable('salesrule/rule')}`
ADD COLUMN `ampromo_prefix` VARCHAR(255) DEFAULT NULL;
");

$this->endSetup();