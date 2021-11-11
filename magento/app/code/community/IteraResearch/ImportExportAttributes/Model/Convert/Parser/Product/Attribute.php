<?php
/**
 * This file is part of ImportExportAttributes extension.
 *
 * ImportExportAttributes is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ImportExportAttributes is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ImportExportAttributes.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @category    IteraResearch
 * @package     IteraResearch_ImportExportAttributes
 * @copyright   Copyright (c) 2003-2015 Itera Research, Inc. All rights reserved. (http://www.itera-research.com/)
 * @license     http://www.gnu.org/licenses Lesser General Public License
 */

class IteraResearch_ImportExportAttributes_Model_Convert_Parser_Product_Attribute extends Mage_Dataflow_Model_Convert_Parser_Abstract
{

    /**
     * @var Mage_Core_Model_Store
     */
    protected $_store;

    /**
     * @var int
     */
    protected $_storeId;

    /**
     * @var array
     */
    protected $_columns = array(
        'attribute_code',
        'frontend_input',
        'frontend_label',
        'option_label',
        'option_order',
        'option_id',
        'attribute_sets_and_groups',
        'default_value',
        'is_required',
        'is_unique',
        'is_global',
        'is_visible',
        'is_searchable',
        'is_filterable',
        'is_comparable',
        'is_visible_on_front',
        'is_html_allowed_on_front',
        'is_used_for_price_rules',
        'is_filterable_in_search',
        'used_in_product_listing',
        'used_for_sort_by',
        'is_configurable',
        'apply_to',
        'is_visible_in_advanced_search',
        'position',
        'is_wysiwyg_enabled',
        'is_used_for_promo_rules'
    );

    /**
     * @param array $row
     */
    protected function _addDataRow($row)
    {
        $this->getBatchExportModel()->setId(null)->setBatchId($this->getBatchModel()->getId())->setBatchData($row)->setStatus(1)->save();
    }

    /**
     *
     */
    protected function _prepareColumnNames()
    {
        $names = array();
        foreach ($this->_columns as $name) {
            $names[$name] = $name;
        }
        $this->_addDataRow($names);
    }

    /**
     * @return Mage_Core_Model_Store
     * @throws Exception
     */
    public function getStore()
    {
        if (is_null($this->_store)) {
            try {
                $store = Mage::app()->getStore($this->getVar('store'));
            }
            catch (Exception $e) {
                $this->addException(Mage::helper('dataflow')->__('Invalid store specified'), Varien_Convert_Exception::FATAL);
                throw $e;
            }
            $this->_store = $store;
        }
        return $this->_store;
    }

    /**
     * @return int
     */
    public function getStoreId()
    {
        if (is_null($this->_storeId)) {
            $this->_storeId = $this->getStore()->getId();
        }
        return $this->_storeId;
    }

    /**
     * @return $this
     */
    public function parse()
    {
        return $this;
    }

    /**
     * Unparse (prepare data) loaded products
     *
     * @return Mage_Catalog_Model_Convert_Parser_Product
     */
    public function unparse()
    {
        $entityIds = $this->getData();
        $columnNames = true;
        foreach ($entityIds as $i => $entityId) {
            $model = Mage::getModel('catalog/resource_eav_attribute');

            $model->load($entityId);
            $data = $model->getData();

            if ($columnNames) {
                $columnNames = false;
                $this->_prepareColumnNames();
            }

            $row = array();
            foreach ($data as $key => $val) {
                if (in_array($key, $this->_columns)) {
                    $row[$key] = $val;
                }
            }

            /* @var $attrData Mage_Eav_Model_Resource_Entity_Attribute_Collection */
            $attrData = Mage::getModel('eav/entity_attribute')->getResourceCollection();
            $attrData->addSetInfo();
            $attrData
                ->setEntityTypeFilter($model->getEntityTypeId())
                ->addFieldToFilter('main_table.attribute_id', $model->getId())
                ->load();

            foreach ($attrData as $attrDataItem) {
                if ($attrDataItem->getAttributeSetInfo() && is_array($attrDataItem->getAttributeSetInfo())) {
                    $first = true;
                    foreach ($attrDataItem->getAttributeSetInfo() as $attributeSetId => $info) {
                        $attributeSet = Mage::getModel('eav/entity_attribute_set')->load($attributeSetId);
                        if ($attributeSet->getId()) {
                            $group = Mage::getModel('eav/entity_attribute_group')->load($info['group_id']);
                            $value = $attributeSet->getAttributeSetName();
                            if ($group->getAttributeGroupName()) {
                                $value .= '/' . $group->getAttributeGroupName();
                            }
                            if ($first) {
                                $first = false;
                                $row['attribute_sets_and_groups'] = $value;
                            } else {
                                $row['attribute_sets_and_groups'] .= ',' . $value;
                            }
                        }
                    }
                }
                break;
            }

            if ($model->getFrontendInput() == 'select' || $model->getFrontendInput() == 'multiselect') {
                $optionCollection = Mage::getResourceModel('eav/entity_attribute_option_collection')
                    ->setAttributeFilter($model->getId())
                    ->setStoreFilter($this->getStoreId(), false)
                    ->load();
                if ($optionCollection->count()) {
                    foreach ($optionCollection as $option) {
                        $row['option_id'] = $option->getId();
                        $row['option_label'] = $option->getValue();
                        $row['option_order'] = $option->getSortOrder();
                        $this->_addDataRow($row);
                    }
                } else {
                    $this->_addDataRow($row);
                }

            } else {
                $this->_addDataRow($row);
            }
        }
        return $this;
    }
}