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
 * @copyright   Copyright (c) 2012 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 */

/**
 * Onestepcheckout Adminhtml Controller
 * 
 * @category    Magestore
 * @package     Magestore_Onestepcheckout
 * @author      Magestore Developer
 */
class Magestore_Onestepcheckout_Adminhtml_GeoipController extends Mage_Adminhtml_Controller_Action
{

    /**
     * @return mixed
     */
    public function downloadAction(){
        $result = array();
        $helper = Mage::helper('onestepcheckout/geoip');
        $action = $this->getRequest()->getParam('action', false);
        $nextAction = false;
        $success = true;
        $errors = array();

        switch ($action) {
            case 'start':
                $result['message'] = $this->__('Downloading...');
                $nextAction = 'download';
                break;

            case 'download':
                $errors = Mage::getModel('onestepcheckout/geoip')->download(Magestore_Onestepcheckout_Helper_Geoip::DB_UPDATE_SOURCE, $helper->getTempFile());
                if(count($errors)){
                    $success = false;
                }
                $result['message'] = $this->__('Uncompressing archive...');
                $nextAction = 'extract';
                break;

            case 'extract':
                $success = Mage::getModel('onestepcheckout/geoip')->extract($helper->getTempFile(), $helper->getDatabasePath());
                $result['message'] = $this->__('Deleting temporary files...');
                $nextAction = 'finish';
                break;

            case 'finish':
                unlink($helper->getTempFile());
                $lastUpdated = time();
                Mage::getModel('core/config')->saveConfig(Magestore_Onestepcheckout_Helper_Geoip::CONFIG_PATH_OSC_GEOIP_LAST_UPDATED_TIME, $lastUpdated);
                $lastUpdated = Mage::helper('core')->formatDate(date('Y/m/d H:i:s',$lastUpdated), Mage_Core_Model_Locale::FORMAT_TYPE_MEDIUM, true);
                $result['message'] = $this->__('Done');
                $result['last_updated_label'] = Mage::helper('onestepcheckout')->__('Last update') . ": ".$lastUpdated;
                $result['stop'] = true;
                break;
        }

        if ($nextAction) {
            $result['action'] = $nextAction;
        }
        if (!$success) {
            $result['error'] = true;
            if (count($errors)) {
                $result['message'] = implode('<br>', $errors);
            } else {
                $result['message']  = $this->__('An error occured while updating GeoIP database.');
            }
            $result['stop']  = true;
        }
        $this->getResponse()->setBody(Zend_Json::encode($result));
    }

    /**
     * @return mixed
     */
    protected function _isAllowed()
    {
        return Mage::getSingleton('admin/session')->isAllowed('system/config/onestepcheckout/geoip');
    }
}