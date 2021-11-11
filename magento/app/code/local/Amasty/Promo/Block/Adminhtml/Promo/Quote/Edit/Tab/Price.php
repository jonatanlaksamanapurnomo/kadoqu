<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */


class Amasty_Promo_Block_Adminhtml_Promo_Quote_Edit_Tab_Price
    extends Mage_Adminhtml_Block_Widget_Form
    implements Mage_Adminhtml_Block_Widget_Tab_Interface
{

    /**
     * @return bool
     */
    public function canShowTab()
    {
        return true;
    }

    /**
     * @return string
     */
    public function getTabLabel()
    {
        return $this->__('Promo Items Price');
    }

    /**
     * @return string
     */
    public function getTabTitle()
    {
        return $this->__('Promo Items Price');
    }

    /**
     * @return bool
     */
    public function isHidden()
    {
        return false;
    }

    /**
     * @return Mage_Adminhtml_Block_Widget_Form
     */
    protected function _prepareForm()
    {
        $parent = parent::_prepareForm();
        $model = Mage::registry('current_promo_quote_rule');

        if (!$model->getId()) {
            $model->addData(array(
                'ampromo_use_discount_amount' => '0',
                'ampromo_show_orig_price' => '0',
                'ampromo_free_shipping' => 'global',
            ));
        }

        $form = new Varien_Data_Form();
        $form->setHtmlIdPrefix('rule_');

        $fldSet = $form->addFieldset('ampromo_discount', array('legend' => Mage::helper('ampromo')->__('Discount')));

        $fldSet->addField('ampromo_discount_value', 'text', array(
                'name' => 'ampromo_discount_value',
                'class' => 'validate-for-discount',
                'label' => Mage::helper('ampromo')->__('Promo Items Discount'),
                'note' => Mage::helper('ampromo')->__('Set fixed price (e.g. 20), fixed discount (-20) or a percent discount (e.g. 50%).'),
            )
        );

        $fldSet->addField('ampromo_min_price', 'text', array(
                'name' => 'ampromo_min_price',
                'label' => Mage::helper('ampromo')->__('Minimal Price'),
            )
        );

        /** Add Price Discount fieldset */
        $fldSet = $form->addFieldset('ampromo_price_discount', array('legend' => Mage::helper('ampromo')->__('Оriginal Price')));

        $fldSet->addField('ampromo_use_discount_amount', 'select', array(
            'name' => 'ampromo_use_discount_amount',
            'label' => $this->__('Show Discount on the Cart Page'),
            'title' => $this->__('Show Discount on the Cart Page'),
            'options' => array(
                0 => $this->__('No'),
                1 => $this->__('Yes')
            )
        ));

        $fldSet->addField('ampromo_show_orig_price', 'select', array(
            'name' => 'ampromo_show_orig_price',
            'label' => $this->__('Show Original Price in the Popup'),
            'title' => $this->__('Show Original Price in the Popup'),
            'options' => array(
                0 => $this->__('No'),
                1 => $this->__('Yes')
            )
        ));

        /** Add Shipping fieldset */
        $fldSet = $form->addFieldset('ampromo_shipping', array('legend' => Mage::helper('ampromo')->__('Shipping')));

        $fldSet->addField('ampromo_free_shipping', 'select', array(
            'name' => 'ampromo_free_shipping',
            'label' => $this->__('Free Shipping for Promo Items'),
            'title' => $this->__('Free Shipping for Promo Items'),
            'options' => array(
                'no' => $this->__('No'),
                'yes' => $this->__('Yes'),
                'global' => $this->__('Use config'),
            )
        ));

        $this->setForm($form);

        $form->setValues($model->getData());
        return $parent;
    }

}
