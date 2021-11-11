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
 * Class Magestore_Onestepcheckout_Block_Adminhtml_Config_Edit
 */
class Magestore_Onestepcheckout_Block_Adminhtml_Config_Edit extends Mage_Adminhtml_Block_System_Config_Edit
{

    /**
     *
     */
    protected function _prepareLayout()
    {
        parent::_prepareLayout();
        if ($this->getRequest()->getModuleName() 
                && $this->getRequest()->getControllerName() == 'system_config' 
                && $this->getRequest()->getActionName() == 'edit' 
                && $this->getRequest()->getParam('section') == 'onestepcheckout') {
            $this->setChild('save_button', $this->getLayout()->createBlock('adminhtml/widget_button')
                            ->setData(array(
                                'label' => Mage::helper('adminhtml')->__('Save Config'),
                                'onclick' => 'checkValueRequire()',
                                'class' => 'save',
                            ))
            );
        } else {
            $this->setChild('save_button', $this->getLayout()->createBlock('adminhtml/widget_button')
                            ->setData(array(
                                'label' => Mage::helper('adminhtml')->__('Save Config'),
                                'onclick' => 'configForm.submit()',
                                'class' => 'save',
                            ))
            );
        }
    }

}
