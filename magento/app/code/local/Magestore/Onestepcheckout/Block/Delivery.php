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
 * Class Magestore_Onestepcheckout_Block_Delivery
 */
class Magestore_Onestepcheckout_Block_Delivery extends Magestore_Onestepcheckout_Block_Onestepcheckout {
    /**
     *
     */
    const FLAT_DESIGN = 'flat';
    /**
     *
     */
    const MATERIAL_DESIGN = 'material';
    /**
     * @return Mage_Core_Block_Abstract
     */
    public function _prepareLayout()
    {
        if (Mage::getStoreConfig('onestepcheckout/general/page_style') == self::FLAT_DESIGN) {
            $this->setTemplate('onestepcheckout/page/delivery/flat_style.phtml');
        } else {
            $this->setTemplate('onestepcheckout/page/delivery/material_style.phtml');
        }
        return parent::_prepareLayout();
    }
}