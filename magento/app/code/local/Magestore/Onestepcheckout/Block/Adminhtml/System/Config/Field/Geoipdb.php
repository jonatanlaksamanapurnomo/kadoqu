<?php
/**
 * Magestore
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magestore.com license that is
 * available through the world-wide-web at this URL:
 * http://www.magestore.com/license-agreement.html
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Magestore
 * @package     Magestore_Onestepcheckout
 * @copyright   Copyright (c) 2017 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 */

class Magestore_Onestepcheckout_Block_Adminhtml_System_Config_Field_Geoipdb extends Mage_Adminhtml_Block_System_Config_Form_Field {

    /**
     * @param Varien_Data_Form_Element_Abstract $element
     * @return string
     */
    protected function _getElementHtml(Varien_Data_Form_Element_Abstract $element)
    {
        $this->setElement($element);
        $html = $this->_getButtonHtml();
        $html .= $this->_getLabelHtml();
        return $html;
    }

    /**
     * @return string
     */
    protected function _getLastUpdatedTime(){
        $updatedTime = Mage::getStoreConfig(Magestore_Onestepcheckout_Helper_Geoip::CONFIG_PATH_OSC_GEOIP_LAST_UPDATED_TIME);
        return $updatedTime;
    }

    /**
     * @return string
     */
    protected function _getLabelHtml(){
        $updatedTime = ($this->_getLastUpdatedTime())?$this->_getLastUpdatedTime():false;
        if($updatedTime){
            $updatedTime = Mage::helper('core')->formatDate(date('Y/m/d H:i:s',$updatedTime), Mage_Core_Model_Locale::FORMAT_TYPE_MEDIUM, true);
        }else{
            $updatedTime = "n/a";
        }
        $lastUpdated =  Mage::helper('onestepcheckout')->__('Last update') . ": ".$updatedTime;
        return "<label id='geoip_last_updated_label'>".$lastUpdated."</label>";
    }

    /**
     * @return string
     */
    protected function _getButtonHtml()
    {
        $downloaded = ($this->_getLastUpdatedTime())?true:false;
        $url = Mage::helper('adminhtml')->getUrl('adminhtml/geoip/download/');
        $buttonHtml = $this->getLayout()->createBlock('adminhtml/widget_button')
            ->setType('button')
            ->setLabel(($downloaded)?$this->__('Update Database'):$this->__('Download Database'))
            ->setOnClick("downloadDatabase()")
            ->toHtml();
        $downloadBlock = $this->getLayout()->createBlock('onestepcheckout/adminhtml_system_config_field_download');
        if($downloadBlock){
            $downloadBlock->setDownloadUrl($url);
            $downloadHtml = $downloadBlock->toHtml();
        }else{
            $downloadHtml = "";
        }
        return $buttonHtml . $downloadHtml;
    }
}