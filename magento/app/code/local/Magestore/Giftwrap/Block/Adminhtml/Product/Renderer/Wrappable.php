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
class Magestore_Giftwrap_Block_Adminhtml_Product_Renderer_Wrappable
    extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract
{
    /**
     * @param Varien_Object $row
     * @return mixed
     */
    public function render(Varien_Object $row) {
        if ((int)$row->getGiftwrap() == Magestore_Giftwrap_Model_Giftwrap::STATUS_ENABLED) {
            return $this->__('Yes');

        }
        if ((int)$row->getGiftwrap() == Magestore_Giftwrap_Model_Giftwrap::STATUS_DISABLED) {
            return $this->__('No');
        }
        return $this->__("");
    }
}