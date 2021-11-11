<?php
/**
 * Indonesia Shipping Carriers
 * @copyright   Copyright (c) 2015 Ansyori B.
 * @email		ansyori@gmail.com / ansyori@kemanaservices.com
 * @build_date  March 2015   
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
class Ansyori_Aongkir_Model_Mysql4_Area extends Mage_Core_Model_Mysql4_Abstract
{
    protected function _construct()
    {
        $this->_init("aongkir/area", "idx");
    }
}