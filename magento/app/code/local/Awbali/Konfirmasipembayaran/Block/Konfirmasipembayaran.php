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
 
class Awbali_Konfirmasipembayaran_Block_Konfirmasipembayaran extends Mage_Core_Block_Template
{
	public function _prepareLayout()
    {
		return parent::_prepareLayout();
    }
    
     public function getKonfirmasipembayaran()     
     { 
        if (!$this->hasData('konfirmasipembayaran')) {
            $this->setData('konfirmasipembayaran', Mage::registry('konfirmasipembayaran'));
        }
        return $this->getData('konfirmasipembayaran');
        
    }
}