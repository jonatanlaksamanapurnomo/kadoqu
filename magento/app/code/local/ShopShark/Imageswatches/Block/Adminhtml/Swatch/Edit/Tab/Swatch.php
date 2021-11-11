<?php
/**
 * ShopShark Image Swatches Extension
 * @version   1.0 09.05.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2014 ShopShark
 */

class ShopShark_Imageswatches_Block_Adminhtml_Swatch_Edit_Tab_Swatch extends Mage_Adminhtml_Block_Widget_Form
    implements Mage_Adminhtml_Block_Widget_Tab_Interface
{

    protected function _prepareForm()
    {
        
        $form = new Varien_Data_Form(
            array(
                 'method'  => 'post',
                 'enctype' => 'multipart/form-data'
            )
        );

        $helper = Mage::helper('imageswatches');
        $_fieldset = $form->addFieldset('swatch_form', array('legend' => $helper->__('Images Settings')));

        $_data = Mage::getSingleton('imageswatches/swatchattribute')->getSwatchattribute();

        $_fieldset->addField(
            'swatch_status', 'select',
            array(
                 'name'   => 'is[swatch_status]',
                 'label'  => $this->__('Enable Images for Current Attribute'),
                 'title'  => $this->__('Enable Images for Current Attribute'),
                 'values' => Mage::getModel('adminhtml/system_config_source_yesno')->toOptionArray(),
            )
        );

        $_fieldset->addField(
            'display_popup', 'select',
            array(
                 'name'   => 'is[display_popup]',
                 'label'  => $this->__('Display Pop-Up on Mouse Hovering'),
                 'title'  => $this->__('Display Pop-Up on Mouse Hovering'),
                 'values' => Mage::getModel('adminhtml/system_config_source_enabledisable')->toOptionArray(),
            )
        );

        $_fieldset2 = $form->addFieldset('swatch_table', array('legend' => $helper->__('Images')));
        $renderer = new ShopShark_Imageswatches_Block_Adminhtml_Renderer_Attributetable;
        $renderer->setSwatchattribute($_data);
        $_fieldset2->addField(
            'attributetable', 'text',
            array('name' => 'attributetable')
        )->setRenderer($renderer);

        $form->setValues($_data->getData());
        $this->setForm($form);
        return parent::_prepareForm();
    }

    public function getTabLabel()
    {
        return Mage::helper('imageswatches')->__('Images for Attribute');
    }

    public function getTabTitle()
    {
        return Mage::helper('imageswatches')->__('Images for Attribute');
    }

    public function canShowTab()
    {
        return true;
    }

    public function isHidden()
    {
        return false;
    }

}