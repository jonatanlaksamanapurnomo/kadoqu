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

class Magestore_Giftwrap_Block_Adminhtml_Giftcard_Edit_Form extends Mage_Adminhtml_Block_Widget_Form {

    /**
     * Define Form settings
     *
     */
    var $_checkeds = array();
    /**
     * @var array
     */
    var $_disableds = array();

    /**
     * Magestore_Giftwrap_Block_Adminhtml_Giftcard_Edit_Form constructor.
     */
    public function __construct() {
        parent::__construct();
    }

    /**
     * Retrieve template object
     *
     * @return Mage_Newsletter_Model_Template
     */
    public function getModel() {
        return Mage::registry('giftcard_data');
    }

    /**
     * Prepare form before rendering HTML
     *
     * @return Mage_Adminhtml_Block_Newsletter_Template_Edit_Form
     */
    protected function _prepareForm() {
        $giftcard_data = array();
        $model = $this->getModel();
        if (Mage::getSingleton('adminhtml/session')->getGiftcardData()) {
            $giftcard_data = Mage::getSingleton('adminhtml/session')->getGiftcardData();
        } elseif (Mage::registry('giftcard_data')) {
            $giftcard_data = $model->getData();
        }

        $form = new Varien_Data_Form(array(
            'id' => 'edit_form',
            'action' => $this->getData('action'),
            'method' => 'post',
            'enctype' => 'multipart/form-data'
        ));

        $store_id = $this->getRequest()->getParam('store', 0);

        $fieldset = $form->addFieldset('base_fieldset', array(
            'legend' => Mage::helper('giftwrap')->__('Gift Card Information')));
        $this->setStatus($giftcard_data);
        if ($model->getId()) {
            $fieldset->addField('id', 'hidden', array(
                'name' => 'id',
                'value' => $model->getId(),
            ));
        }

        $fieldset->addField('name', 'text', array(
            'name' => 'name',
            'label' => Mage::helper('giftwrap')->__('Card Name'),
            'title' => Mage::helper('giftwrap')->__('Card Name'),
            'required' => true,
            'value' => $model->getName(),
            'disabled' => $this->_disableds['name'],
            'note' => 'Use maximum 30 characters for better display'
        ));

        if ($store_id != 0)
            $fieldset->addField('label_default_name', 'checkbox', array(
                'label' => Mage::helper('giftwrap')->__('User Default Card Name'),
                'name' => 'label_default_name',
                'checked' => $this->_checkeds['name'],
                'onclick' => 'doCheck(\'label_default_name\',\'default_name\',\'name\')',
            ));

        $fieldset->addField('default_name', 'hidden', array(
            'name' => 'default_name',
            'value' => $model->getDefaultName(),
        ));

        $fieldset->addField('price', 'text', array(
            'name' => 'price',
            'label' => Mage::helper('giftwrap')->__('Price'),
            'title' => Mage::helper('giftwrap')->__('Price'),
            'required' => true,
            'class' => 'required-entry validate-zero-or-greater input-text',
            'value' => $model->getPrice(),
            'disabled' => $this->_disableds['price'],
            'note' => 'Cost per box/item (configure in Calculation tab of <a href="' . $this->getUrl('adminhtml/system_config/edit/section/giftwrap') . '" >Settings</a>)'
         
        ));

        if ($store_id != 0)
            $fieldset->addField('label_default_price', 'checkbox', array(
                'label' => Mage::helper('giftwrap')->__('User Default Price'),
                'name' => 'label_default_price',
                'checked' => $this->_checkeds['price'],
                'onclick' => 'doCheck(\'label_default_price\',\'default_price\',\'price\')',
            ));

        $fieldset->addField('default_price', 'hidden', array(
            'name' => 'default_price',
            'value' => $model->getDefaultPrice(),
        ));


        $imagePath = '';
        if ($model->getImage()) {
            $imagePath = 'giftwrap/giftcard/' . $model->getImage();
        }
        $fieldset->addField('image', 'image', array(
            'name' => 'image',
            'label' => Mage::helper('giftwrap')->__('Card Image'),
            'title' => Mage::helper('giftwrap')->__('Card Image'),
            'required' => false,
            'value' => $imagePath,
            'disabled' => $this->_disableds['image'],
            'note' => '(jpeg, tiff, png formats supported)'
        ));

        if ($store_id != 0)
            $fieldset->addField('label_default_image', 'checkbox', array(
                'label' => Mage::helper('giftwrap')->__('User Default Card Image'),
                'name' => 'label_default_image',
                'checked' => $this->_checkeds['image'],
                'onclick' => 'doCheck(\'label_default_image\',\'default_image\',\'image\')',
            ));

        $fieldset->addField('default_image', 'hidden', array(
            'name' => 'default_image',
            'value' => $model->getDefaultImage(),
        ));


        $fieldset->addField('character', 'text', array(
            'name' => 'character',
            'label' => Mage::helper('giftwrap')->__('Message\'s Max Length'),
            'title' => Mage::helper('giftwrap')->__('Message\'s Max Length'),
            'required' => true,
            'class' => 'validate-greater-than-zero required-entry input-text',
            'value' => $model->getCharacter(),
            'disabled' => $this->_disableds['character'],
        ));

        if ($store_id != 0)
            $fieldset->addField('label_default_character', 'checkbox', array(
                'label' => Mage::helper('giftwrap')->__('User Default Limit Character'),
                'name' => 'label_default_character',
                'checked' => $this->_checkeds['character'],
                'onclick' => 'doCheck(\'label_default_character\',\'default_character\',\'character\')',
            ));

        $fieldset->addField('default_character', 'hidden', array(
            'name' => 'default_character',
            'value' => $model->getDefaultCharacter(),
        ));


        $fieldset->addField('status', 'select', array(
            'label' => Mage::helper('giftwrap')->__('Status'),
            'title' => Mage::helper('giftwrap')->__('Status'),
            'name' => 'status',
            'required' => false,
            'options' => array(
                '1' => Mage::helper('giftwrap')->__('Enabled'),
                '2' => Mage::helper('giftwrap')->__('Disabled'),
            ),
            'disabled' => $this->_disableds['status'],
            'value' => $model->getStatus()
        ));

        if ($store_id != 0)
            $fieldset->addField('label_default_status', 'checkbox', array(
                'label' => Mage::helper('giftwrap')->__('User Default Status'),
                'name' => 'label_default_status',
                'checked' => $this->_checkeds['status'],
                'onclick' => 'doCheck(\'label_default_status\',\'default_status\',\'status\')',
            ));

        $fieldset->addField('default_status', 'hidden', array(
            'name' => 'default_status',
            'value' => $model->getDefaultStatus(),
        ));




        $form->setAction($this->getUrl('*/*/save'));
        $form->setUseContainer(true);
        $this->setForm($form);

        return parent::_prepareForm();
    }

    /**
     * @param $data
     */
    function setStatus($data) {
        $arrFielName = array(0 => 'name', 1 => 'price', 2 => 'character', 3 => 'image', 4 => 'message', 5 => 'status');
        foreach ($arrFielName as $fielName) {
            if (isset($data['default_' . $fielName]) && $data['default_' . $fielName] && $data['store_id']) {
                $this->_checkeds[$fielName] = 'checked';
                $this->_disableds[$fielName] = true;
            } else {
                $this->_checkeds[$fielName] = '';
                $this->_disableds[$fielName] = false;
            }
        }
    }

}
