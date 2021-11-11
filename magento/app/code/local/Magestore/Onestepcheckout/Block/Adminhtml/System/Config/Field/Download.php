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

class Magestore_Onestepcheckout_Block_Adminhtml_System_Config_Field_Download extends Mage_Core_Block_Template
{
    /**
     * @var string
     */
    protected $_url = "";

    /**
     * Constructor
     */
    protected function _construct()
    {
        parent::_construct();
        $this->setTemplate('onestepcheckout/widget/download.phtml');
    }

    /**
     * @param string $url
     */
    public function setDownloadUrl($url = ""){
        $this->_url = $url;
    }

    /**
     * @return string
     */
    public function getDownloadUrl(){
        return $this->_url;
    }
}