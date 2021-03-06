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


class Magestore_Giftwrap_Block_Adminhtml_Sales_Order_Grid extends Mage_Adminhtml_Block_Widget_Grid
{

    /**
     * @return array
     */
    public function getGiftwrapCollection(){
		$giftwrapCollection = Mage::getModel('giftwrap/selection')->getCollection();
		$giftwrapCollectionIds = array();
		$i = 0;
		foreach($giftwrapCollection as $selection){
			$giftwrapCollectionIds[$i] = $selection->getQuoteId();			
			$i++;
		}		
		$orders = Mage::getModel('sales/order')->getCollection()->addFieldToFilter('quote_id', array('in'=> $giftwrapCollectionIds));
		$orderIds = array();
		foreach($orders as $order){
			$orderIds[$i] = $order->getId();
			$i++;
		} 
		return $orderIds;
	}

    /**
     * @return array
     */
    public function getGiftwrapOnlyCollection(){
		$giftwrapCollection = Mage::getModel('giftwrap/selection')->getCollection()->addFieldToFilter('giftcard_id', array('in'=>array(0, null)));
		$giftwrapCollectionIds = array();
		$i = 0;
		foreach($giftwrapCollection as $selection){
			$giftwrapCollectionIds[$i] = $selection->getQuoteId();			
			$i++;
		}		
		$orders = Mage::getModel('sales/order')->getCollection()->addFieldToFilter('quote_id', array('in'=> $giftwrapCollectionIds));
		$orderIds = array();
		foreach($orders as $order){
			$orderIds[$i] = $order->getId();
			$i++;
		} 
		return $orderIds;
	}

    /**
     * @return array
     */
    public function getGiftcardCollection(){
		$getGiftcardCollection = Mage::getModel('giftwrap/selection')->getCollection()->addFieldToFilter('giftcard_id', array('nin'=>array(0, null)));
		$giftcardCollectionIds = array();
		$i = 0;
		foreach($getGiftcardCollection as $selection){
			$giftcardCollectionIds[$i] = $selection->getQuoteId();
			$i++;
		}
		$orders = Mage::getModel('sales/order')->getCollection()->addFieldToFilter('quote_id', array('in'=> $giftcardCollectionIds));
		$orderIds = array();
		foreach($orders as $order){
			$orderIds[$i] = $order->getId();
			$i++;
		}		
		return $orderIds;
	}

    /**
     * Magestore_Giftwrap_Block_Adminhtml_Sales_Order_Grid constructor.
     */
    public function __construct()
    {	
        parent::__construct();		
        $this->setId('sales_order_grid');
        $this->setUseAjax(true);
        $this->setDefaultSort('created_at');
        $this->setDefaultDir('DESC');
        $this->setSaveParametersInSession(true);
    }

    /**
     * Retrieve collection class
     *
     * @return string
     */
    protected function _getCollectionClass()
    {
        return 'sales/order_grid_collection';
    }

    /**
     * @return mixed
     */
    protected function _prepareCollection()
    {
        $collection = Mage::getResourceModel($this->_getCollectionClass());
		$gifParam = $this->getRequest()->getParam('gift');
		if($gifParam == 1) $collection->addFieldToFilter('entity_id', array('in'=>$this->getGiftwrapCollection())); 
		elseif($gifParam == 2) $collection->addFieldToFilter('entity_id', array('in'=>$this->getGiftwrapCollection()))																					
										  ->addFieldToFilter('entity_id', array('nin'=>$this->getGiftcardCollection()));																																															
		elseif($gifParam == 3) $collection->addFieldToFilter('entity_id', array('in'=>$this->getGiftcardCollection()));
        $this->setCollection($collection);
        return parent::_prepareCollection();
    }

    /**
     * @return mixed
     */
    protected function _prepareColumns()
    {

        $this->addColumn('real_order_id', array(
            'header'=> Mage::helper('sales')->__('Order #'),
            'width' => '80px',
            'type'  => 'text',
            'index' => 'increment_id',
        ));

        if (!Mage::app()->isSingleStoreMode()) {
            $this->addColumn('store_id', array(
                'header'    => Mage::helper('sales')->__('Purchased From (Store)'),
                'index'     => 'store_id',
                'type'      => 'store',
                'store_view'=> true,
                'display_deleted' => true,
            ));
        }

        $this->addColumn('created_at', array(
            'header' => Mage::helper('sales')->__('Purchased On'),
            'index' => 'created_at',
            'type' => 'datetime',
            'width' => '100px',
        ));

        $this->addColumn('billing_name', array(
            'header' => Mage::helper('sales')->__('Bill to Name'),
            'index' => 'billing_name',
        ));

        $this->addColumn('shipping_name', array(
            'header' => Mage::helper('sales')->__('Ship to Name'),
            'index' => 'shipping_name',
			'renderer'	=> 'Magestore_Giftwrap_Block_Renderer_Shipping',		
        ));

        $this->addColumn('base_grand_total', array(
            'header' => Mage::helper('sales')->__('G.T. (Base)'),
            'index' => 'base_grand_total',
            'type'  => 'currency',
            'currency' => 'base_currency_code',
        ));

        $this->addColumn('grand_total', array(
            'header' => Mage::helper('sales')->__('G.T. (Purchased)'),
            'index' => 'grand_total',
            'type'  => 'currency',
            'currency' => 'order_currency_code',
        ));

        $this->addColumn('status', array(
            'header' => Mage::helper('sales')->__('Status'),
            'index' => 'status',
            'type'  => 'options',
            'width' => '70px',
            'options' => Mage::getSingleton('sales/order_config')->getStatuses(),
        ));

        if (Mage::getSingleton('admin/session')->isAllowed('sales/order/actions/view')) {
            $this->addColumn('action',
                array(
                    'header'    => Mage::helper('sales')->__('Action'),
                    'width'     => '50px',
                    'type'      => 'action',
                    'getter'     => 'getId',
                    'actions'   => array(
                        array(
                            'caption' => Mage::helper('sales')->__('View'),
                            'url'     => array('base'=>'*/sales_order/view'),
                            'field'   => 'order_id'
                        )
                    ),
                    'filter'    => false,
                    'sortable'  => false,
                    'index'     => 'stores',
                    'is_system' => true,
            ));
        }
        $this->addRssList('rss/order/new', Mage::helper('sales')->__('New Order RSS'));

        $this->addExportType('*/*/exportCsv', Mage::helper('sales')->__('CSV'));
        $this->addExportType('*/*/exportExcel', Mage::helper('sales')->__('Excel XML'));

        return parent::_prepareColumns();
    }

    /**
     * @return $this
     */
    protected function _prepareMassaction()
    {
        $this->setMassactionIdField('entity_id');
        $this->getMassactionBlock()->setFormFieldName('order_ids');
        $this->getMassactionBlock()->setUseSelectAll(false);

        if (Mage::getSingleton('admin/session')->isAllowed('sales/order/actions/cancel')) {
            $this->getMassactionBlock()->addItem('cancel_order', array(
                 'label'=> Mage::helper('sales')->__('Cancel'),
                 'url'  => $this->getUrl('*/sales_order/massCancel'),
            ));
        }

        if (Mage::getSingleton('admin/session')->isAllowed('sales/order/actions/hold')) {
            $this->getMassactionBlock()->addItem('hold_order', array(
                 'label'=> Mage::helper('sales')->__('Hold'),
                 'url'  => $this->getUrl('*/sales_order/massHold'),
            ));
        }

        if (Mage::getSingleton('admin/session')->isAllowed('sales/order/actions/unhold')) {
            $this->getMassactionBlock()->addItem('unhold_order', array(
                 'label'=> Mage::helper('sales')->__('Unhold'),
                 'url'  => $this->getUrl('*/sales_order/massUnhold'),
            ));
        }

        $this->getMassactionBlock()->addItem('pdfinvoices_order', array(
             'label'=> Mage::helper('sales')->__('Print Invoices'),
             'url'  => $this->getUrl('*/sales_order/pdfinvoices'),
        ));

        $this->getMassactionBlock()->addItem('pdfshipments_order', array(
             'label'=> Mage::helper('sales')->__('Print Packingslips'),
             'url'  => $this->getUrl('*/sales_order/pdfshipments'),
        ));

        $this->getMassactionBlock()->addItem('pdfcreditmemos_order', array(
             'label'=> Mage::helper('sales')->__('Print Credit Memos'),
             'url'  => $this->getUrl('*/sales_order/pdfcreditmemos'),
        ));

        $this->getMassactionBlock()->addItem('pdfdocs_order', array(
             'label'=> Mage::helper('sales')->__('Print All'),
             'url'  => $this->getUrl('*/sales_order/pdfdocs'),
        ));

        $this->getMassactionBlock()->addItem('print_shipping_label', array(
             'label'=> Mage::helper('sales')->__('Print Shipping Labels'),
             'url'  => $this->getUrl('*/sales_order_shipment/massPrintShippingLabel'),
        ));

        return $this;
    }

    /**
     * @param $row
     * @return bool
     */
    public function getRowUrl($row)
    {
        if (Mage::getSingleton('admin/session')->isAllowed('sales/order/actions/view')) {
            return $this->getUrl('*/sales_order/view', array('order_id' => $row->getId()));
        }
        return false;
    }

    /**
     * @return mixed
     */
    public function getGridUrl()
    {
        return $this->getUrl('*/*/grid', array('_current'=>true));
    }	
}
