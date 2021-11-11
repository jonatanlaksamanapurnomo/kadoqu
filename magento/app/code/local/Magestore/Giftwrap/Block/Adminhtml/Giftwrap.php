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

class Magestore_Giftwrap_Block_Adminhtml_Giftwrap extends Mage_Adminhtml_Block_Template
{
    /**
     * Magestore_Giftwrap_Block_Adminhtml_Giftwrap constructor.
     */
    public function __construct()
  {
    parent::__construct();
    $this->setTemplate('giftwrap/list.phtml');
  }

    /**
     * @return mixed
     */
    protected function _prepareLayout()
	{
		$this->setChild('grid', $this->getLayout()->createBlock('giftwrap/adminhtml_giftwrap_grid', 'newsletter.template.grid'));
		return parent::_prepareLayout();
	}

    /**
     * @return mixed
     */
    public function getCreateUrl()
	{
		return $this->getUrl('*/*/new');
	}

    /**
     * @return mixed
     */
    public function getHeaderText()
	{
		return Mage::helper('giftwrap')->__('Manage Gift Boxes');
	}
}