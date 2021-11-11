<?php
/**
 * Konfirmasi Pembayaran
 * 	
 * @package		Magento
 * @author		adisthana wijaya (info@adisthana.com)
 * @website		http://adisthana.com
 * @version		0.1.0
 * 
 */
 
class Awbali_Konfirmasipembayaran_Block_Adminhtml_Konfirmasipembayaran_Grid extends Mage_Adminhtml_Block_Widget_Grid
{
  public function __construct()
  {
      parent::__construct();
      $this->setId('konfirmasipembayaranGrid');
      $this->setDefaultSort('id');
      $this->setDefaultDir('ASC');
      $this->setSaveParametersInSession(true);
  }

  protected function _prepareCollection()
  {
      $collection = Mage::getModel('konfirmasipembayaran/konfirmasipembayaran')->getCollection();
      $this->setCollection($collection);
      return parent::_prepareCollection();
  }

 protected function _prepareColumns()
  {
	   $this->addColumn('id', array(
          'header'    => Mage::helper('konfirmasipembayaran')->__('ID'),
          'align'     =>'right',
          'width'     => '50px',
          'index'     => 'id',
      ));
	  
	  $this->addColumn('no_order', array(
          'header'    => Mage::helper('konfirmasipembayaran')->__('No. Order'),
          'align'     =>'left',
          'index'     => 'no_order',
      ));
	  $this->addColumn('nama_buyer', array(
          'header'    => Mage::helper('konfirmasipembayaran')->__('Nama'),
          'align'     =>'left',
          'index'     => 'nama_buyer',
      ));
	  $this->addColumn('email_buyer', array(
          'header'    => Mage::helper('konfirmasipembayaran')->__('Email'),
          'align'     =>'left',
          'index'     => 'email_buyer',
      ));
	  
        $this->addColumn('action',
            array(
                'header'    =>  Mage::helper('konfirmasipembayaran')->__('Action'),
                'width'     => '100',
                'type'      => 'action',
                'getter'    => 'getId',
                'actions'   => array(
                    array(
                        'caption'   => Mage::helper('konfirmasipembayaran')->__('Edit'),
                        'url'       => array('base'=> '*/*/edit'),
                        'field'     => 'id'
                    )
                ),
                'filter'    => false,
                'sortable'  => false,
                'index'     => 'stores',
                'is_system' => true,
        ));
		
		//$this->addExportType('*/*/exportCsv', Mage::helper('konfirmasipembayaran')->__('CSV'));
		//$this->addExportType('*/*/exportXml', Mage::helper('konfirmasipembayaran')->__('XML'));
	  
      return parent::_prepareColumns();
  }

    protected function _prepareMassaction()
    {
        $this->setMassactionIdField('customerid');
        $this->getMassactionBlock()->setFormFieldName('konfirmasipembayaran');

        $this->getMassactionBlock()->addItem('delete', array(
             'label'    => Mage::helper('konfirmasipembayaran')->__('Delete'),
             'url'      => $this->getUrl('*/*/massDelete'),
             'confirm'  => Mage::helper('konfirmasipembayaran')->__('Are you sure?')
        ));
        return $this;
    }

  public function getRowUrl($row)
  {
      return $this->getUrl('*/*/edit', array('id' => $row->getId()));
  }

}