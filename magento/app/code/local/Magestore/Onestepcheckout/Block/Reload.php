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

/**
 * Class Magestore_Onestepcheckout_Block_Reload
 */
class Magestore_Onestepcheckout_Block_Reload extends Mage_Checkout_Block_Onepage_Abstract
{

    /**
     * Magestore_Onestepcheckout_Block_Reload constructor.
     */
    public function __construct()
    {
        $this->configData = $this->_getConfigData();
    }

    /**
     * @return mixed
     */
    protected function _getConfigData()
    {
        return Mage::helper('onestepcheckout')->getConfigData();
    }

}
