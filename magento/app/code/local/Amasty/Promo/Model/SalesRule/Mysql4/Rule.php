<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */


class Amasty_Promo_Model_SalesRule_Mysql4_Rule extends Mage_SalesRule_Model_Mysql4_Rule
{

    public function _beforeSave(Mage_Core_Model_Abstract $object)
    {

        parent::_beforeSave($object);

        $data = Mage::app()->getRequest()->getParams();
        if ($object->getAmstoreIds() && is_array($object->getAmstoreIds()) && is_array($data['amstore_ids'])) {
            $object->setAmstoreIds(implode(',', $object->getAmstoreIds()));
        } else {
            $object->setAmstoreIds('');
        }


    }
}