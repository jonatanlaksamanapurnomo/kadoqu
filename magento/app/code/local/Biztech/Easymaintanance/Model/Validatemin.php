<?php


class Biztech_Easymaintanance_Model_Validatemin extends Mage_Core_Model_Config_Data {

    public function _afterSave()
    {        
        $min = $this->getValue();
        if (!is_numeric($min) || $min < 0 || $min > 60) {
            Mage::throwException("Minute should be numeric or should not be less than 0 and greater than 60.");
        }
        return parent::_afterSave();
    }    
}
