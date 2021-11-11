<?php
/**
 * Magestore
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magestore.com license that is
 * available through the world-wide-web at this URL:
 * http://www.magestore.com/license-agreement.html
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Magestore
 * @package     Magestore_Giftwrap
 * @module    Giftwrap
 * @author      Magestore Developer
 *
 * @copyright   Copyright (c) 2016 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 *
 */

$setup = new Mage_Eav_Model_Entity_Setup('core_setup');
$installer = $this;
$installer->startSetup();
$attributeId = Mage::getResourceModel('eav/entity_attribute')->getIdByCode('catalog_product', 'giftwrap');
if ($attributeId) {
    $attribute = Mage::getModel('catalog/resource_eav_attribute')->load($attributeId);
    $attribute->setSourceModel('eav/entity_attribute_source_boolean')->save();
}

$installer->endSetup();
