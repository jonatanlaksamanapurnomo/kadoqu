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
 * Class Magestore_OneStepCheckout_Block_System_Config_Form_Field_Survey
 */
class Magestore_OneStepCheckout_Block_System_Config_Form_Field_Survey extends Mage_Adminhtml_Block_System_Config_Form_Field_Array_Abstract
{
    /**
     * Magestore_OneStepCheckout_Block_System_Config_Form_Field_Survey constructor.
     */
    public function __construct()
    {
        $this->addColumn('value', array(
            'label' => Mage::helper('onestepcheckout')->__('Label'),
            'style' => 'width:250px',
        ));
        $this->_addAfter = false;
        $this->_addButtonLabel = Mage::helper('onestepcheckout')->__('Add label');
        parent::__construct();
    }
}