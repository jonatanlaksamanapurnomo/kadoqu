<?php

class DigitalPianism_ProductExport_Model_Observer
{
    /**
     * Add a new massaction to export products to CSV
     * @param Varien_Event_Observer $observer
     */
    public function addMassExport(Varien_Event_Observer $observer)
    {
        $block = $observer->getEvent()->getBlock();

        $block->getMassactionBlock()->addItem('productexport', array(
            'label' => 'Export to CSV',
            'url' => $block->getUrl('adminhtml/productexport/massExport',array('store' => Mage::app()->getRequest()->getParam('store')))
        ));
    }
}