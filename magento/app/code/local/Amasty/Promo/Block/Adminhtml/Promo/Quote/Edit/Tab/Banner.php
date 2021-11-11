<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */


class Amasty_Promo_Block_Adminhtml_Promo_Quote_Edit_Tab_Banner
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
        return $this->__('Product Page Banners');
    }

    /**
     * @return string
     */
    public function getTabTitle()
    {
        return $this->__('Product Page Banners');
    }

    /**
     * @return bool
     */
    public function isHidden()
    {
        return false;
    }

    /**
     * Add Wysiwyg if supported
     *
     * @return Mage_Core_Block_Abstract
     */
    protected function _prepareLayout()
    {
        $return = parent::_prepareLayout();
        if (Mage::getSingleton('cms/wysiwyg_config')->isEnabled()) {
            $this->getLayout()->getBlock('head')->setCanLoadTinyMce(true);
        }
        return $return;
    }

    /**
     * Add form fields to banner tab
     *
     * @return Mage_Adminhtml_Block_Widget_Form
     */
    protected function _prepareForm()
    {
        $parent = parent::_prepareForm();
        $model = Mage::registry('current_promo_quote_rule');

        $form = new Varien_Data_Form();
        $form->setHtmlIdPrefix('rule_');

        /** Add Top Banner fieldset */
        $fldSet = $form->addFieldset('ampromo_top_banner', array('legend' => Mage::helper('ampromo')->__('Top Banner')));

        $fldSet->addField('ampromo_top_banner_enable', 'select', array(
            'name' => 'ampromo_top_banner_enable',
            'label' => $this->__('Enabled'),
            'title' => $this->__('Enabled'),
            'options' => array(
                0 => $this->__('No'),
                1 => $this->__('Yes')
            ),
        ));

        $fldSet->addField('ampromo_top_banner_img', 'image', array(
            'label' => $this->__('Image'),
            'name' => 'ampromo_top_banner_img',
        ));

        $fldSet->addField('ampromo_top_banner_alt', 'text', array(
            'label' => $this->__('Alt'),
            'name' => 'ampromo_top_banner_alt',
        ));

        $fldSet->addField('ampromo_top_banner_hover_text', 'text', array(
            'label' => $this->__('On Hover Text'),
            'name' => 'ampromo_top_banner_hover_text',
        ));

        $fldSet->addField('ampromo_top_banner_link', 'text', array(
            'label' => $this->__('Link'),
            'name' => 'ampromo_top_banner_link',
        ));

        $fldSet->addField('ampromo_top_banner_gift_images', 'select', array(
            'name' => 'ampromo_top_banner_gift_images',
            'label' => $this->__('Show Gift Images'),
            'title' => $this->__('Show Gift Images'),
            'options' => array(
                0 => $this->__('No'),
                1 => $this->__('Yes')
            ),
            'note' => 'works with sku conditions'
        ));

        $fldSet->addField('ampromo_top_banner_description', 'editor', array(
            'name' => 'ampromo_top_banner_description',
            'label' => $this->__('Description'),
            'title' => $this->__('Description'),
            'style' => 'height:16em;',
            'config' => Mage::getSingleton('cms/wysiwyg_config')->getConfig(),
            'required' => false
        ));
        
        /** Add After Product Banner fieldset */
        $fldSet = $form->addFieldset('ampromo_after_name_banner', array('legend' => Mage::helper('ampromo')->__('After Product Description Banner')));

        $fldSet->addField('ampromo_after_name_banner_enable', 'select', array(
            'name' => 'ampromo_after_name_banner_enable',
            'label' => $this->__('Enabled'),
            'title' => $this->__('Enabled'),
            'options' => array(
                0 => $this->__('No'),
                1 => $this->__('Yes')
            ),
        ));

        $fldSet->addField('ampromo_after_name_banner_img', 'image', array(
            'label' => $this->__('Image'),
            'name' => 'ampromo_after_name_banner_img',
        ));

        $fldSet->addField('ampromo_after_name_banner_alt', 'text', array(
            'label' => $this->__('Alt'),
            'name' => 'ampromo_after_name_banner_alt',
        ));

        $fldSet->addField('ampromo_after_name_banner_hover_text', 'text', array(
            'label' => $this->__('On Hover Text'),
            'name' => 'ampromo_after_name_banner_hover_text',
        ));

        $fldSet->addField('ampromo_after_name_banner_link', 'text', array(
            'label' => $this->__('Link'),
            'name' => 'ampromo_after_name_banner_link',
        ));

        $fldSet->addField('ampromo_after_name_banner_gift_images', 'select', array(
            'name' => 'ampromo_after_name_banner_gift_images',
            'label' => $this->__('Show Gift images'),
            'title' => $this->__('Show Gift Images'),
            'options' => array(
                0 => $this->__('No'),
                1 => $this->__('Yes')
            ),
            'note' => 'works with sku conditions'
        ));

        $fldSet->addField('ampromo_after_name_banner_description', 'editor', array(
            'name' => 'ampromo_after_name_banner_description',
            'label' => $this->__('Description'),
            'title' => $this->__('Description'),
            'style' => 'height:16em;',
            'config' => Mage::getSingleton('cms/wysiwyg_config')->getConfig(),
            'required' => false
        ));

        /** Add Promo Label fieldset */
        $fldSet = $form->addFieldset('ampromo_label', array('legend' => Mage::helper('ampromo')->__('Label')));

        $fldSet->addField('ampromo_label_enable', 'select', array(
            'name' => 'ampromo_label_enable',
            'label' => $this->__('Enabled'),
            'title' => $this->__('Enabled'),
            'options' => array(
                0 => $this->__('No'),
                1 => $this->__('Yes')
            ),
        ));

        $fldSet->addField('ampromo_label_img', 'image', array(
            'label' => $this->__('Image'),
            'name' => 'ampromo_label_img',
        ));

        $fldSet->addField('ampromo_label_alt', 'text', array(
            'label' => $this->__('Alt'),
            'name' => 'ampromo_label_alt',
        ));

        $this->setForm($form);

        /** @var Amasty_Promo_Helper_Image $imageHelper */
        $imageHelper = Mage::helper("ampromo/image");

        $model->setAmpromoTopBannerImg($imageHelper->getLink($model->getAmpromoTopBannerImg()));
        $model->setAmpromoAfterNameBannerImg($imageHelper->getLink($model->getAmpromoAfterNameBannerImg()));
        $model->setAmpromoLabelImg($imageHelper->getLink($model->getAmpromoLabelImg()));

        $form->setValues($model->getData());
        return $parent;
    }

}
