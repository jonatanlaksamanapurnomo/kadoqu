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
 * @package     Magestore_Giftwrap
 * @module    Giftwrap
 * @author      Magestore Developer
 *
 * @copyright   Copyright (c) 2016 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 *
 */

class Magestore_Giftwrap_Model_System_Config_Source_Product_View_Type
{
    /**
     * @return array
     */
    public function toOptionArray ()
    {
        return array(
        array('value' => 'radio', 'label' => Mage::helper('adminhtml')->__('Radio')), 
        array('value' => 'dropdown', 'label' => Mage::helper('adminhtml')->__('Dropdown')));
    }
}