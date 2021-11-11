<?php
/**
 * Indonesia Shipping Carriers
 * @copyright   Copyright (c) 2016 Ndee Proaongkir
 * @email		-
 * @build_date  July 2016   
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
class Ndee_Proproaongkir_Model_Mysql4_Area extends Mage_Core_Model_Mysql4_Abstract
{
    protected function _construct()
    {
        $this->_init("proaongkir/area", "idx");
    }
}