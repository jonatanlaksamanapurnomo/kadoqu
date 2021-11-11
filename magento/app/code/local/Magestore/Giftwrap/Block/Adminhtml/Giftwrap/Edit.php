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

class Magestore_Giftwrap_Block_Adminhtml_Giftwrap_Edit extends Mage_Adminhtml_Block_Widget
{

    /**
     * @var bool
     */
    protected $_editMode = false;

    /**
     * Magestore_Giftwrap_Block_Adminhtml_Giftwrap_Edit constructor.
     */
    public function __construct() {
		parent::__construct();
		
    $this->setTemplate('giftwrap/edit.phtml');
	}

    /**
     * @return mixed
     */
    public function getModel()
	{
			return Mage::registry('giftwrap_data');
	}

    /**
     * @return mixed
     */
    protected function _prepareLayout()
	{
			$this->setChild('back_button',
					$this->getLayout()->createBlock('adminhtml/widget_button')
							->setData(array(
									'label'     => Mage::helper('giftwrap')->__('Back'),
									'onclick'   => "window.location.href = '" . $this->getUrl('*/*') . "'",
									'class'     => 'back'
							))
			);

			$this->setChild('reset_button',
					$this->getLayout()->createBlock('adminhtml/widget_button')
							->setData(array(
									'label'     => Mage::helper('giftwrap')->__('Reset'),
									'onclick'   => 'window.location.href = window.location.href'
							))
			);

			$this->setChild('save_button',
					$this->getLayout()->createBlock('adminhtml/widget_button')
							->setData(array(
									'label'     => Mage::helper('giftwrap')->__('Save'),
									'onclick'   => 'giftwrapControl.save()',
									'class'     => 'save'
							))
			);
			
			
			$this->setChild('save_continue_button',
					$this->getLayout()->createBlock('adminhtml/widget_button')
							->setData(array(
									'label'     => Mage::helper('giftwrap')->__('Save And Continue Edit'),
									'onclick'   => 'giftwrapControl.save_continue()',
									'class'     => 'save'
							))
			);

			$this->setChild('delete_button',
					$this->getLayout()->createBlock('adminhtml/widget_button')
							->setData(array(
									'label'     => Mage::helper('giftwrap')->__('Delete'),
									'onclick'   => 'giftwrapControl.deleteGiftwrap()',
									'class'     => 'delete'
							))
			);

			return parent::_prepareLayout();
	}

    /**
     * @return mixed
     */
    public function getBackButtonHtml()
	{
		return $this->getChildHtml('back_button');
	}

    /**
     * @return mixed
     */
    public function getResetButtonHtml()
	{
			return $this->getChildHtml('reset_button');
	}

    /**
     * @return mixed
     */
    public function getSaveButtonHtml()
	{
			return $this->getChildHtml('save_button');
	}

    /**
     * @return mixed
     */
    public function getSaveContinueButtonHtml()
	{
			return $this->getChildHtml('save_continue_button');
	}

    /**
     * @return mixed
     */
    public function getDeleteButtonHtml()
	{
			return $this->getChildHtml('delete_button');
	}

    /**
     * @return mixed
     */
    public function getForm()
	{
			return $this->getLayout()
					->createBlock('giftwrap/adminhtml_giftwrap_edit_form')
					->toHtml();
	}

    /**
     * @param bool $value
     * @return $this
     */
    public function setEditMode($value = true)
	{
			$this->_editMode = (bool)$value;
			return $this;
	}

    /**
     * @return bool
     */
    public function getEditMode()
	{
			return $this->_editMode;
	}

    /**
     * @return mixed
     */
    public function getHeaderText()
	{
			if ($this->getEditMode()) {
					return Mage::helper('giftwrap')->__('Edit Gift Box');
			}

			return  Mage::helper('giftwrap')->__('New Gift Box');
	}

    /**
     * @return mixed
     */
    public function getSaveUrl()
	{
		$store_id = $this->getRequest()->getParam('store',0);
		return $this->getUrl('*/*/save',array('store'=>$store_id));
	}

    /**
     * @return mixed
     */
    public function getDeleteUrl()
	{
			return $this->getUrl('*/*/delete', array('id' => $this->getRequest()->getParam('id')));
	}
		
		
}