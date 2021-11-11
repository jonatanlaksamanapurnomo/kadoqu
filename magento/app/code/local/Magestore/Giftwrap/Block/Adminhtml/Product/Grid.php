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

class Magestore_Giftwrap_Block_Adminhtml_Product_Grid extends Mage_Adminhtml_Block_Widget_Grid {

    /**
     * Magestore_Giftwrap_Block_Adminhtml_Product_Grid constructor.
     */
    public function __construct() {
        parent::__construct();
        $this->setId('productgiftwrapGrid');
        $this->setDefaultSort('entity_id');
        $this->setDefaultDir('desc');
        $this->setSaveParametersInSession(true);
        $this->setUseAjax(true);
        $this->setVarNameFilter('product_filter');
    }

    /**
     * @return mixed
     */
    protected function _getStore() {
        $storeId = (int) $this->getRequest()->getParam('store', 0);
        return Mage::app()->getStore($storeId);
    }

    /**
     * @return $this
     */
    protected function _prepareCollection() {
        $store = $this->_getStore();
        $collection = Mage::getModel('catalog/product')->getCollection()
                ->addAttributeToSelect('sku')
                ->addAttributeToSelect('name')
                ->addAttributeToSelect('attribute_set_id')
                ->addAttributeToSelect('type_id')
                ->addFieldToFilter('type_id',  array('simple','bundle','configurable'))
                ->addAttributeToSelect('giftwrap')
                ->joinField('qty', 'cataloginventory/stock_item', 'qty', 'product_id=entity_id', '{{table}}.stock_id=1', 'left');

        if ($store->getId()) {
            $collection->addStoreFilter($store);
            $collection->joinAttribute('custom_name', 'catalog_product/name', 'entity_id', null, 'inner', $store->getId());
            $collection->joinAttribute('status', 'catalog_product/status', 'entity_id', null, 'inner', $store->getId());
            $collection->joinAttribute('visibility', 'catalog_product/visibility', 'entity_id', null, 'inner', $store->getId());
            $collection->joinAttribute('price', 'catalog_product/price', 'entity_id', null, 'left', $store->getId());
        } else {
            $collection->addAttributeToSelect('price');
            $collection->addAttributeToSelect('status');
            $collection->addAttributeToSelect('visibility');
        }

        $this->setCollection($collection);

        parent::_prepareCollection();
        $this->getCollection()->addWebsiteNamesToResult();
        return $this;
    }

    /**
     * @param $column
     * @return mixed
     */
    protected function _addColumnFilterToCollection($column) {
        if ($this->getCollection()) {
            if ($column->getId() == 'websites') {
                $this->getCollection()->joinField('websites', 'catalog/product_website', 'website_id', 'product_id=entity_id', null, 'left');
            }
        }
        return parent::_addColumnFilterToCollection($column);
    }

    /**
     * @return mixed
     */
    protected function _prepareColumns() {
        $this->addColumn('entity_id', array(
            'header' => Mage::helper('catalog')->__('ID'),
            'width' => '50px',
            'type' => 'number',
            'index' => 'entity_id',
        ));
        $this->addColumn('name', array(
            'header' => Mage::helper('catalog')->__('Name'),
            'index' => 'name',
        ));

        $store = $this->_getStore();
        if ($store->getId()) {
            $this->addColumn('custom_name', array(
                'header' => Mage::helper('catalog')->__('Name In %s', $store->getName()),
                'index' => 'custom_name',
            ));
        }
       
        $this->addColumn('type', array(
            'header' => Mage::helper('catalog')->__('Type'),
            'width' => '60px',
            'index' => 'type_id',
            'type' => 'options',
            //'options' =>  Mage::getSingleton('catalog/product_type')->getOptionArray(),
            'options' => array('simple'=>"Simple Product",
                                'bundle'=>"Bundle Product",
                                'configurable'=>"Configurable Product",),
        ));
        
        $sets = Mage::getResourceModel('eav/entity_attribute_set_collection')
                ->setEntityTypeFilter(Mage::getModel('catalog/product')->getResource()->getTypeId())
                ->load()
                ->toOptionHash();

        $this->addColumn('set_name', array(
            'header' => Mage::helper('catalog')->__('Attrib. Set Name'),
            'width' => '100px',
            'index' => 'attribute_set_id',
            'type' => 'options',
            'options' => $sets,
        ));

        $this->addColumn('sku', array(
            'header' => Mage::helper('catalog')->__('SKU'),
            'width' => '80px',
            'index' => 'sku',
        ));

        $store = $this->_getStore();
        $this->addColumn('price', array(
            'header' => Mage::helper('catalog')->__('Price'),
            'type' => 'price',
            'currency_code' => $store->getBaseCurrency()->getCode(),
            'index' => 'price',
        ));

        $this->addColumn('qty', array(
            'header' => Mage::helper('catalog')->__('Qty'),
            'width' => '100px',
            'type' => 'number',
            'index' => 'qty',
        ));

        $this->addColumn('visibility', array(
            'header' => Mage::helper('catalog')->__('Visibility'),
            'width' => '70px',
            'index' => 'visibility',
            'type' => 'options',
            'options' => Mage::getModel('catalog/product_visibility')->getOptionArray(),
        ));


        $this->addColumn('giftwrap', array(
            'header' => Mage::helper('catalog')->__('Wrappable'),
            'width' => '70px',
            'index' => 'giftwrap',
            'type' =>'options',
            'options' => array(
                0 => Mage::helper('giftwrap')->__('No'),
                1 => Mage::helper('giftwrap')->__('Yes')
            ),
            'renderer' => 'giftwrap/adminhtml_product_renderer_wrappable',
        ));

        if (!Mage::app()->isSingleStoreMode()) {
            $this->addColumn('websites', array(
                'header' => Mage::helper('catalog')->__('Websites'),
                'width' => '100px',
                'sortable' => false,
                'index' => 'websites',
                'type' => 'options',
                'options' => Mage::getModel('core/website')->getCollection()->toOptionHash(),
            ));
        }

        $this->addRssList('rss/catalog/notifystock', Mage::helper('catalog')->__('Notify Low Stock RSS'));

        return parent::_prepareColumns();
    }

    /**
     * @return $this
     */
    protected function _prepareMassaction() {
        $this->setMassactionIdField('entity_id');
        $this->getMassactionBlock()->setFormFieldName('product');

        $this->getMassactionBlock()->addItem('enable', array(
            'label' => Mage::helper('catalog')->__('Wrappable'),
            'url' => $this->getUrl('*/*/enable')
        ));

        $this->getMassactionBlock()->addItem('disable', array(
            'label' => Mage::helper('catalog')->__('Unwrappable '),
            'url' => $this->getUrl('*/*/disable')
        ));

        return $this;
    }

    /**
     * @return mixed
     */
    public function getGridUrl() {
        return $this->getUrl('*/*/productGrid', array('_current' => true));
    }

    /**
     * @param $row
     * @return mixed
     */
    public function getRowUrl($row) {
        return $this->getUrl('adminhtml/catalog_product/edit', array('id' => $row->getId()));
    }

}
