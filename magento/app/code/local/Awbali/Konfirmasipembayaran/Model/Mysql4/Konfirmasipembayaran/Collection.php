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

class Awbali_Konfirmasipembayaran_Model_Mysql4_Konfirmasipembayaran_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('konfirmasipembayaran/konfirmasipembayaran');
    }
}