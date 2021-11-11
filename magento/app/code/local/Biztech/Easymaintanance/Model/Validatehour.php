<?php


class Biztech_Easymaintanance_Model_Validatehour extends Mage_Core_Model_Config_Data {

    public function _afterSave()
    {
        $hour = $this->getValue();
        if (!is_numeric($hour) || $hour < 0 || $hour > 24) {
            Mage::throwException("Please mention hour in 24-hour format");
        }
        return parent::_afterSave();
    }    
}
