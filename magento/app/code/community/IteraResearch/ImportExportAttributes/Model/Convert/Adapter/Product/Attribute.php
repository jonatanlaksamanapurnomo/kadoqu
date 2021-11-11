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

class IteraResearch_ImportExportAttributes_Model_Convert_Adapter_Product_Attribute extends Mage_Dataflow_Model_Convert_Adapter_Abstract
{
    const SET_NAME_KEY = 0;
    const GROUP_NAME_KEY = 1;

    /**
     * Current store model
     *
     * @var Mage_Core_Model_Store
     */
    protected $_store = null;

    /**
     * @var int
     */
    protected $_entityTypeId = null;

    /**
     * @var int
     * @todo add multi-store functionality
     */
    protected $_admin = 0;

    /**
     * @return int
     */
    protected function _getAttributeEntityTypeId()
    {
        if (is_null($this->_entityTypeId)){
            $this->_entityTypeId = Mage::getModel('eav/entity')->setType('catalog_product')->getTypeId();
        }
        return $this->_entityTypeId;
    }

    /**
     * @return int
     * @throws Exception
     */
    public function getStoreId()
    {
        if (is_null($this->_store)) {
            try {
                $this->_store = Mage::app()->getStore($this->getVar('store'));
            }
            catch (Exception $e) {
                $message = Mage::helper('dataflow')->__('Invalid store specified');
                $this->addException($message, Varien_Convert_Exception::FATAL);
                throw $e;
            }
        }
        return $this->_store->getId();
    }

    /**
     * @return $this
     * @throws Exception
     * @throws Varien_Convert_Exception
     */
    public function load()
    {
        $entityTypeId = $this->_getAttributeEntityTypeId();
        $attributes = Mage::getModel('catalog/entity_attribute')->getCollection();
        $attributes
            ->addFieldToFilter('entity_type_id', $entityTypeId)
            ->addFieldToFilter('is_user_defined', 1);
        $entityIds = $attributes->getAllIds();
        try {
           $message = Mage::helper('dataflow')->__("Loaded %d records", count($entityIds));
           $this->addException($message);
        }
        catch (Varien_Convert_Exception $e) {
            throw $e;
        }
        catch (Exception $e) {
            $message = Mage::helper('dataflow')->__('Problem loading the collection, aborting. Error: %s', $e->getMessage());
            $this->addException($message, Varien_Convert_Exception::FATAL);
        }

        $this->setData($entityIds);
        return $this;
    }

    /**
     * @param array $importData
     * @return bool
     */
    public function saveRow(array $importData)
    {
        $this->_saveAttribute($importData);
        return true;
    }

    /**
     * @return $this
     */
    public function save()
    {
        return $this;
    }

    /**
     * @param array $data
     */
    protected function _saveAttribute($data)
    {
        if ($data) {
            /* @var $model Mage_Catalog_Model_Entity_Attribute */
            $model = Mage::getModel('catalog/resource_eav_attribute');
            /* @var $helper Mage_Catalog_Helper_Product */
            $helper = Mage::helper('catalog/product');

            //validate attribute_code
            if (isset($data['attribute_code'])) {
                $validatorAttrCode = new Zend_Validate_Regex(array('pattern' => '/^[a-z][a-z_0-9]{1,254}$/'));
                if (!$validatorAttrCode->isValid($data['attribute_code'])) {
                    $message = Mage::helper('catalog')->__('Attribute code is invalid. Please use only letters (a-z), numbers (0-9) or underscore(_) in this field, first character should be a letter.');
                    Mage::throwException($message);
                }
            }

            //validate frontend_input
            if (isset($data['frontend_input'])) {
                /** @var $validatorInputType Mage_Eav_Model_Adminhtml_System_Config_Source_Inputtype_Validator */
                $validatorInputType = Mage::getModel('eav/adminhtml_system_config_source_inputtype_validator');
                if (!$validatorInputType->isValid($data['frontend_input'])) {
                    $messages = '';
                    foreach ($validatorInputType->getMessages() as $message) {
                        $messages .= $message . '<br>';
                    }
                    Mage::throwException($messages);
                }
            }

            $model->loadByCode($this->_getAttributeEntityTypeId(), $data['attribute_code']);

            if ($model->getId()) {
                if ($model->getEntityTypeId() != $this->_entityTypeId) {
                    $message = Mage::helper('catalog')->__('This attribute cannot be updated.');
                    Mage::throwException($message);
                }

                if(!$model->getIsUserDefined()){
                    $message = Mage::helper('catalog')->__('System attribute cannot be updated.');
                    Mage::throwException($message);
                }

                $data['attribute_code'] = $model->getAttributeCode();
                $data['is_user_defined'] = $model->getIsUserDefined();
                $data['frontend_input'] = $model->getFrontendInput();
            } else {
                /**
                 * @todo add to helper and specify all relations for properties
                 */
                $data['source_model'] = $helper->getAttributeSourceModelByInputType($data['frontend_input']);
                $data['backend_model'] = $helper->getAttributeBackendModelByInputType($data['frontend_input']);
            }

            if (!isset($data['is_configurable'])) {
                $data['is_configurable'] = 0;
            }
            if (!isset($data['is_filterable'])) {
                $data['is_filterable'] = 0;
            }
            if (!isset($data['is_filterable_in_search'])) {
                $data['is_filterable_in_search'] = 0;
            }

            if (is_null($model->getIsUserDefined()) || $model->getIsUserDefined() != 0) {
                $data['backend_type'] = $model->getBackendTypeByInput($data['frontend_input']);
            }

            if (!isset($data['apply_to'])) {
                $data['apply_to'] = array();
            } else {
                $data = $this->_setApplyTo($data);
            }

            if ($data['frontend_input'] == 'select' || $data['frontend_input'] == 'multiselect') {
                $data = $this->_setOption($data, $model);
            }

            //filter
            $data = $this->_filterData($data);
            $model->addData($data);

            if (!$model->getId()) {
                $model->setEntityTypeId($this->_entityTypeId);
                $model->setIsUserDefined(1);
            }

            $model->save();
            $this->_addToAttributeSet($model, $data);

            /**
             * Clear translation cache because attribute labels are stored in translation
             */
            //Mage::app()->cleanCache(array(Mage_Core_Model_Translate::CACHE_TAG));
        }
    }

    /**
     * Filter data
     *
     * @param array $data
     * @return array
     */
    protected function _filterData($data)
    {
        if ($data) {
            $label = $data['frontend_label'];
            $data['frontend_label'] = array(
                $this->_admin => $label
            );
            /** @var $helperCatalog Mage_Catalog_Helper_Data */
            $helperCatalog = Mage::helper('catalog');
            //labels
            foreach ($data['frontend_label'] as & $value) {
                if ($value) {
                    $value = $helperCatalog->stripTags($value);
                }
            }

            if (!empty($data['option']) && !empty($data['option']['value']) && is_array($data['option']['value'])) {
                foreach ($data['option']['value'] as $key => $values) {
                    $data['option']['value'][$key] = array_map(array($helperCatalog, 'stripTags'), $values);
                }
            }
        }
        return $data;
    }

    /**
     *
     * @param array $data
     * @param Mage_Catalog_Model_Entity_Attribute $attribute
     * @return array
     */
    protected function _setOption($data, $attribute)
    {
        $options = $attribute->getSource()->getAllOptions();
        $found = false;
        foreach($options as $option){
            if($option['label'] == $data['option_label']) {
                $found = true;
            }
        }
        if (!$found) {
            $data['option'] = array(
                'value' => array(
                    'option_0' => array(
                        $this->_admin => $data['option_label']
                    )
                )
            );
            if (isset($data['option_order']) && !empty($data['option_order'])) {
                $data['option']['order'] = array(
                    'option_0' => $data['option_order']
                );
            }
        }

        return $data;
    }

    /**
     * @param array $data
     * @return mixed
     */
    protected function _setApplyTo($data)
    {
        $applyTo = explode(',', $data['apply_to']);
        $data['apply_to'] = array();
        foreach($applyTo as $value) {
            $data['apply_to'][] = trim($value);
        }
        return $data;
    }

    /**
     * @param Mage_Catalog_Model_Entity_Attribute $model
     * @param array $data
     */
    protected function _addToAttributeSet($model, $data)
    {
        if (isset($data['attribute_sets_and_groups']) && !empty($data['attribute_sets_and_groups'])) {
            $setInfo = explode(',', $data['attribute_sets_and_groups']);
            $setsAndGroups = $this->_getAttributeSetsAndGroups($model->getEntityTypeId());

            if (!isset($setsAndGroups['Default'])) {
                $message = Mage::helper('catalog')->__('Default attribute set not found.');
                Mage::throwException($message);
            }

            $skeletonSet = $setsAndGroups['Default']['id'];
            foreach ($setInfo as $infoItem) {
                $names = explode('/', $infoItem);
                $attributeSetData = $this->_getSetAndGroupInfo($names, $setsAndGroups, $model->getId());
                $attributeSet = Mage::getModel('eav/entity_attribute_set')
                    ->setEntityTypeId($model->getEntityTypeId());

                if (count($attributeSetData)) {
                    $attributeSet->load($setsAndGroups[$attributeSetData['attribute_set_name']]['id']);
                    //filter html tags
                    //$setData['attribute_set_name'] = Mage::helper('adminhtml')->stripTags($setName);

                    $attributeSet->organizeData($attributeSetData);
                    $attributeSet->validate();
                    $attributeSet->save();
                } else {
                    $attributeSet->setAttributeSetName(
                        trim(Mage::helper('adminhtml')->stripTags($names[self::SET_NAME_KEY]))
                    );
                    $attributeSet->validate();
                    $attributeSet->save();
                    $attributeSet->initFromSkeleton($skeletonSet);
                    $newId = $attributeSet->save();
                    $setsAndGroups = null;
                    $setsAndGroups = $this->_getAttributeSetsAndGroups($model->getEntityTypeId());
                    $attributeSetData = null;
                    $attributeSetData = $this->_getSetAndGroupInfo($names, $setsAndGroups, $model->getId());
                    if (count($attributeSetData)) {
                        $attributeSet->setEntityTypeId($model->getEntityTypeId());
                        $attributeSet->load($newId);
                        $attributeSet->organizeData($attributeSetData);
                        $attributeSet->validate();
                        $attributeSet->save();
                    }
                }
            }
        }
    }

    /**
     * @param int $entityTypeId
     * @return array
     */
    protected function _getAttributeSetsAndGroups($entityTypeId)
    {
        $result = array();
        $attributeSets = Mage::getModel('eav/entity_attribute_set')->getResourceCollection();
        $attributeSets
            ->setEntityTypeFilter($entityTypeId)
            ->load();
        foreach ($attributeSets as $set){
            $result[$set->getAttributeSetName()] = array(
                'id' => $set->getId(),
                'groups' => array()
            );
            $groups = Mage::getModel('eav/entity_attribute_group')
                ->getResourceCollection()
                ->setAttributeSetFilter($set->getId())
                ->setSortOrder()
                ->load();
            foreach ($groups as $group){
                $result[$set->getAttributeSetName()]['groups'][$group->getAttributeGroupName()] = array(
                    'id' => $group->getId(),
                    'sort_order' => $group->getSortOrder()
                );
            }
        }
        return $result;
    }

    /**
     * @param array $names
     * @param array $setsAndGroups
     * @param int $attributeId
     * @return array
     */
    protected function _getSetAndGroupInfo($names, $setsAndGroups, $attributeId)
    {
        $result = array();
        if (isset($setsAndGroups[$names[self::SET_NAME_KEY]])) {
            $result['attribute_set_name'] = $names[self::SET_NAME_KEY];
            if (isset($setsAndGroups[$names[self::SET_NAME_KEY]]['groups'][$names[self::GROUP_NAME_KEY]])) {
                $result['attributes'] = array(
                    array(
                        0 => $attributeId, //attr id
                        1 => $setsAndGroups[$names[self::SET_NAME_KEY]]['groups'][$names[self::GROUP_NAME_KEY]]['id'],
                        2 => 0, //sort order
                        3 => ''
                    )
                );
                $result['groups'] = array(
                    array(
                        0 => $setsAndGroups[$names[self::SET_NAME_KEY]]['groups'][$names[self::GROUP_NAME_KEY]]['id'],
                        1 => $names[self::GROUP_NAME_KEY],
                        2 => $setsAndGroups[$names[self::SET_NAME_KEY]]['groups'][$names[self::GROUP_NAME_KEY]]['sort_order']
                    )
                );
            } else {
                $result['attributes'] = array(
                    array(
                        0 => $attributeId,
                        1 => 'ynode_0',
                        2 => 0,
                        3 => ''
                    )
                );
                $result['groups'] = array(
                    array(
                        0 => 'ynode_0',
                        1 => $names[self::GROUP_NAME_KEY],
                        2 => 99
                    )
                );
            }
        }
        return $result;
    }
}
