<?php
/**
 * Konfirmasi Pembayaran
 * 	
 * @package		Magento
 * @author		adisthana wijaya (info@adisthana.com)
 * @website		http://adisthana.com
 * @version		0.1.0
 * 
 */
 
class Awbali_Konfirmasipembayaran_Block_Adminhtml_Konfirmasipembayaran_Edit extends Mage_Adminhtml_Block_Widget_Form_Container
{
    public function __construct()
    {
        parent::__construct();
                 
        $this->_objectId = 'id';
        $this->_blockGroup = 'konfirmasipembayaran';
        $this->_controller = 'adminhtml_konfirmasipembayaran';
        
        $this->_updateButton('save', 'label', Mage::helper('konfirmasipembayaran')->__('Save Item'));
        $this->_updateButton('delete', 'label', Mage::helper('konfirmasipembayaran')->__('Delete Item'));
		
        $this->_addButton('saveandcontinue', array(
            'label'     => Mage::helper('adminhtml')->__('Save And Continue Edit'),
            'onclick'   => 'saveAndContinueEdit()',
            'class'     => 'save',
        ), -100);

        $this->_formScripts[] = "
            function toggleEditor() {
                if (tinyMCE.getInstanceById('konfirmasipembayaran_content') == null) {
                    tinyMCE.execCommand('mceAddControl', false, 'konfirmasipembayaran_content');
                } else {
                    tinyMCE.execCommand('mceRemoveControl', false, 'konfirmasipembayaran_content');
                }
            }

            function saveAndContinueEdit(){
                editForm.submit($('edit_form').action+'back/edit/');
            }
        ";
    }

    public function getHeaderText()
    {
        if( Mage::registry('konfirmasipembayaran_data') && Mage::registry('konfirmasipembayaran_data')->getId() ) {
            return Mage::helper('konfirmasipembayaran')->__("Edit Item '%s'", $this->htmlEscape(Mage::registry('konfirmasipembayaran_data')->getTitle()));
        } else {
            return Mage::helper('konfirmasipembayaran')->__('Add User');
        }
    }
}