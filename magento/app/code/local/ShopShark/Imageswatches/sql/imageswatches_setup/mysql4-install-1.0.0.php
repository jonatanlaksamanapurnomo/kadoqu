<?php
/**
 * ShopShark Image Swatches Extension
 * @version   1.0 09.05.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2014 ShopShark
 */


$this->startSetup();
try {
    $this->run(
        "

CREATE TABLE IF NOT EXISTS `{$this->getTable('imageswatches/swatchattribute')}` (
`swatchattribute_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`swatch_status` tinyint(4) NOT NULL,
`display_popup` tinyint(4) NOT NULL,
`attribute_code` varchar(255) NOT NULL,
PRIMARY KEY (`swatchattribute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `{$this->getTable('imageswatches/swatch')}` (
`swatch_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`option_id` int(10) NOT NULL,
`custom_html` varchar(255) NOT NULL,
`image` text NOT NULL,
PRIMARY KEY (`swatch_id`),
KEY `option_id` (`option_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE  `{$this->getTable(
            'imageswatches/swatch'
        )}` ADD FOREIGN KEY (  `aw_swatchattribute_id` ) REFERENCES  `{$this->getTable('eav/attribute_option_value')}` (
`swatchattribute_id`
) ON DELETE CASCADE ON UPDATE CASCADE;

"
    );
} catch (Exception $ex) {
    Mage::logException($ex);
}
$this->endSetup();