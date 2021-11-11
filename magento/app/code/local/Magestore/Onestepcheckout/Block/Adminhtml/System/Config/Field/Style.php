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
 * Class Magestore_Onestepcheckout_Block_Adminhtml_System_Config_Field_Style
 */
class Magestore_Onestepcheckout_Block_Adminhtml_System_Config_Field_Style extends Mage_Adminhtml_Block_System_Config_Form_Fieldset {

    protected $_dummyElement;
    protected $_fieldRenderer;
    protected $_values;

    /**
     * @param Varien_Data_Form_Element_Abstract $element
     * @return string
     */
    public function render(Varien_Data_Form_Element_Abstract $element) {

        $this->setTemplate('onestepcheckout/style.phtml');
        $html =  $this->_toHtml();

        return $html;
    }

}