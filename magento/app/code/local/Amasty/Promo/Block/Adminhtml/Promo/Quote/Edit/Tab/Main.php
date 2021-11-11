<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */


class Amasty_Promo_Block_Adminhtml_Promo_Quote_Edit_Tab_Main
    extends Mage_Adminhtml_Block_Promo_Quote_Edit_Tab_Main
{

    /**
     * @return Mage_Adminhtml_Block_Widget_Form
     */
    protected function _prepareForm()
    {
        $parent = parent::_prepareForm();
        $model = Mage::registry('current_promo_quote_rule');
        $form = $this->getForm();
        $fieldset = $form->getElements()->searchById('base_fieldset');
        if (!Mage::app()->isSingleStoreMode()) {
            $fieldset->addField(
                'amstore_ids', 'multiselect', array(
                'name' => 'amstore_ids[]',
                'label' => Mage::helper('ampromo')->__('Store View'),
                'title' => Mage::helper('ampromo')->__('Store View'),
                'values' => Mage::getSingleton('adminhtml/system_store')
                    ->getStoreValuesForForm(false, true),
                'note' => Mage::helper('ampromo')->__('Leave empty to apply for all store views'),
            ),
                'website_ids'
            );
        } else {
            $fieldset->addField(
                'amstore_ids', 'hidden', array(
                    'name' => 'amstore_ids[]',
                    'value' => Mage::app()->getStore(true)->getId()
                )
            );
        }

        $form->addValues(array(
            'amstore_ids' => $model->getData("amstore_ids")
        ));
        return $parent;
    }
}
