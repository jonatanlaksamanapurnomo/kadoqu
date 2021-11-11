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
class Magestore_Giftwrap_Block_Adminhtml_Product extends Mage_Adminhtml_Block_Widget_Grid_Container
{
    /**
     * Magestore_Giftwrap_Block_Adminhtml_Product constructor.
     */
    public function __construct() {
        $this->_controller = 'adminhtml_product';
        $this->_blockGroup = 'giftwrap';
        $this->_headerText = Mage::helper('giftwrap')->__('Manage Wrappable Products');

        parent::__construct();
        $this->_removeButton('add');
    }
}