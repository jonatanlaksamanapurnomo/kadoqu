<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */


class Amasty_Promo_Block_Adminhtml_Promo_Quote_Edit_Tab_Labels
    extends Mage_Adminhtml_Block_Promo_Quote_Edit_Tab_Labels
{

    /**
     * @return Mage_Adminhtml_Block_Widget_Form
     */
    protected function _prepareForm()
    {
        $parent = parent::_prepareForm();
        $model = Mage::registry('current_promo_quote_rule');

        $form = $this->getForm();

        /** Add Label fieldset */
        $fldSet = $form->addFieldset('ampromo_labels', array('legend' => Mage::helper('ampromo')->__('Order Label')));

        $fldSet->addField('ampromo_prefix', 'text', array(
            'label' => $this->__('Prefix For The Promo Item Name In The Order'),
            'name' => 'ampromo_prefix',
        ));

        $form->addValues(array(
            'ampromo_prefix' => $model->getData("ampromo_prefix")
        ));

        return $parent;
    }

}