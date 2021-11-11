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

class Magestore_Giftwrap_Block_Adminhtml_Giftwrap_Grid extends Mage_Adminhtml_Block_Widget_Grid {

    /**
     *
     */
    protected function _construct() {
        $this->setEmptyText(Mage::helper('giftwrap')->__('No Gift Boxes Found'));
    }

    /**
     * @return mixed
     */
    protected function _prepareCollection() {
        $store_id = $this->getRequest()->getParam('store', 0);
        $collection = Mage::getModel('giftwrap/giftwrap')->getCollection();
        $collection->addFieldToFilter('store_id', $store_id);
        $this->setCollection($collection);
        return parent::_prepareCollection();
    }

    /**
     * @return mixed
     */
    protected function _prepareColumns() {
        $this->addColumn('giftwrap_id', array(
            'header' => Mage::helper('giftwrap')->__('ID'),
            'align' => 'right',
            'width' => '20px',
            'index' => 'giftwrap_id',
        ));

        $this->addColumn('image', array(
            'header' => Mage::helper('giftwrap')->__('Image'),
            'index' => 'image',
            'filter' => false,
            'width' => '80px',
            'align' => 'center',
            'renderer' => 'giftwrap/adminhtml_giftwrap_renderer_image',
        ));

        $this->addColumn('title', array(
            'header' => Mage::helper('giftwrap')->__('Name'),
            'align' => 'left',
            'width' => '400px',
            'index' => 'title',
        ));

        $store = $this->_getStore();
        $this->addColumn('price', array(
            'header' => Mage::helper('giftwrap')->__('Price'),
            'width' => '50px',
            'type' => 'price',
            'index' => 'price',
            'currency_code' => $store->getBaseCurrency()->getCode(),
        ));

        $this->addColumn('status', array(
            'header' => Mage::helper('giftwrap')->__('Status'),
            'index' => 'status',
            'width' => '50px',
            'align' => 'right',
            'type' => 'options',
            'options' => array(
                2 => Mage::helper('giftwrap')->__('Disabled'),
                1 => Mage::helper('giftwrap')->__('Enabled')
            ),
        ));

        $this->addColumn('action', array(
            'header' => Mage::helper('giftwrap')->__('Action'),
            'width' => '50px',
            'type' => 'action',
            'getter' => 'getId',
            'actions' => array(
                array(
                    'caption' => Mage::helper('giftwrap')->__('Edit'),
                    'url' => array('base' => '*/*/edit/store/' . $this->getRequest()->getParam('store', 0),),
                    'field' => 'id'
                )
            ),
            'filter' => false,
            'sortable' => false,
            'index' => 'stores',
            'is_system' => true,
        ));

        return parent::_prepareColumns();
    }

    /**
     * @return $this
     */
    protected function _prepareMassaction() {
        $this->setMassactionIdField('giftwrap_id');
        $this->getMassactionBlock()->setFormFieldName('giftwrap');

        $this->getMassactionBlock()->addItem('delete', array(
            'label' => Mage::helper('giftwrap')->__('Delete'),
            'url' => $this->getUrl('*/*/massDelete'),
            'confirm' => Mage::helper('giftwrap')->__('Are you sure?')
        ));
        $statuses = Mage::getSingleton('giftwrap/Status')->getOptionArray();
        array_unshift($statuses, array('label' => '', 'value' => ''));
        $this->getMassactionBlock()->addItem('status', array(
            'label' => Mage::helper('giftwrap')->__('Change status'),
            'url' => $this->getUrl('*/*/massStatus', array('_current' => true)),
            'additional' => array(
                'visibility' => array(
                    'name' => 'status',
                    'type' => 'select',
                    'class' => 'required-entry',
                    'label' => Mage::helper('giftwrap')->__('Status'),
                    'values' => $statuses
                ))
        ));
        //end loki
        return $this;
    }

    /**
     * @param $row
     * @return mixed
     */
    public function getRowUrl($row) {
        return $this->getUrl('*/*/edit', array('id' => $row->getId(), 'store' => $this->getRequest()->getParam('store', 0)));
    }

    /**
     * @return mixed
     */
    protected function _getStore() {
        $storeId = (int) $this->getRequest()->getParam('store', 0);
        return Mage::app()->getStore($storeId);
    }

}
