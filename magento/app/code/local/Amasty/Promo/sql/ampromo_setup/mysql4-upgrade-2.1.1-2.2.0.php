<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */
$this->startSetup();

$this->run("ALTER TABLE `{$this->getTable('salesrule/rule')}`
ADD COLUMN `ampromo_top_banner_description` TEXT,
ADD COLUMN `ampromo_top_banner_img` VARCHAR(255) DEFAULT NULL,
ADD COLUMN `ampromo_top_banner_alt` VARCHAR(255) DEFAULT NULL,
ADD COLUMN `ampromo_top_banner_hover_text` VARCHAR(255) DEFAULT NULL,
ADD COLUMN `ampromo_top_banner_link` VARCHAR(255) DEFAULT NULL,
ADD COLUMN `ampromo_top_banner_gift_images` SMALLINT(6) NOT NULL DEFAULT '0',
ADD COLUMN `ampromo_after_name_banner_description` TEXT,
ADD COLUMN `ampromo_after_name_banner_img` VARCHAR(255) DEFAULT NULL,
ADD COLUMN `ampromo_after_name_banner_alt` VARCHAR(255) DEFAULT NULL,
ADD COLUMN `ampromo_after_name_banner_hover_text` VARCHAR(255) DEFAULT NULL,
ADD COLUMN `ampromo_after_name_banner_link` VARCHAR(255) DEFAULT NULL,
ADD COLUMN `ampromo_after_name_banner_gift_images` SMALLINT(6) NOT NULL DEFAULT '0',
ADD COLUMN `ampromo_label_img` VARCHAR(255) DEFAULT NULL,
ADD COLUMN `ampromo_label_alt` VARCHAR(255) DEFAULT NULL;
");

$this->run("
INSERT INTO `{$this->getTable('core/config_data')}` (scope, scope_id, path, `value`)
SELECT scope, scope_id, REPLACE(path, 'general', 'popup'), `value` FROM `{$this->getTable('core/config_data')}`
WHERE path IN ('ampromo/general/add_message', 'ampromo/general/auto_open_popup', 'ampromo/general/popup_on_checkout');

INSERT INTO `{$this->getTable('core/config_data')}` (scope, scope_id, path, `value`)
SELECT scope, scope_id, REPLACE(path, 'general', 'messages'), `value` FROM `{$this->getTable('core/config_data')}`
WHERE path IN ('ampromo/general/display_notification');

INSERT INTO `{$this->getTable('core/config_data')}` (scope, scope_id, path, `value`)
SELECT scope, scope_id, REPLACE(path, 'general', 'limitations'), `value` FROM `{$this->getTable('core/config_data')}`
WHERE path IN ('ampromo/general/skip_special_price', 'ampromo/general/skip_special_price_configurable');

");

$this->endSetup();