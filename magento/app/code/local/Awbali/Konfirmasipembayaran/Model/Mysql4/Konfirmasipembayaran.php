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
 
class Awbali_Konfirmasipembayaran_Model_Mysql4_Konfirmasipembayaran extends Mage_Core_Model_Mysql4_Abstract
{
    public function _construct()
    {    
        // Note that the web_id refers to the key field in your database table.
        $this->_init('konfirmasipembayaran/konfirmasipembayaran', 'id');
    }
}