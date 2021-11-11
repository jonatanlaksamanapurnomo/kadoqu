<?php

class Doku_Myshortcart_BillingController extends Mage_Core_Controller_Front_Action 
{
    const XML_PATH_ENABLED          = 'payment/myshortcart/enabled';

    public function preDispatch()
    {
        parent::preDispatch();

        if( !Mage::getStoreConfigFlag(self::XML_PATH_ENABLED) ) {
            $this->norouteAction();
        }
    }

    public function indexAction() {
		$this->loadLayout();
		$this->getLayout()->getBlock('myshortcartForm')
			->setFormAction( Mage::getUrl('*/*/post') );

		$this->_initLayoutMessages('customer/session');
		$this->_initLayoutMessages('catalog/session');
		$this->renderLayout();
	}
	
    public function postAction() {
		$this->loadLayout();
		$this->renderLayout();

		$sender = Mage::getStoreConfig('payment/myshortcart/sender_email');
		$recipient = Mage::getStoreConfig('payment/myshortcart/recipient_email');
	  try {
		$emailTemplate  = Mage::getModel('core/email_template')
							->loadDefault('myshortcart_billing_form');
		$emailTemplateVariables = array();
		$emailTemplateVariables['sendername'] = $_POST['name'];
		$emailTemplateVariables['senderemail'] = $_POST['email'];
		$emailTemplateVariables['telephone'] = $_POST['telephone'];
		$emailTemplateVariables['order_id'] = $_POST['order_id'];
		$emailTemplateVariables['transaction_id'] = $_POST['transaction_id'];
		$emailTemplateVariables['transfer_date'] = $_POST['transfer_date'];
		$emailTemplateVariables['amount_transfered'] = $_POST['amount_transfered'];
		$emailTemplateVariables['comment'] = $_POST['comment'];
		
		$emailTemplate->setSenderName('Konfirmasi Pembayaran');
		$emailTemplate->setSenderEmail($sender);
		$emailTemplate->setType('text');
		$emailTemplate->setTemplateSubject('Konfirmasi Pembayaran MyShortCart .....................');
		$emailTemplate->setReplyTo($_POST['email']);
				
		$emailTemplate->send($recipient, Mage::app()->getStore()->getName(), $emailTemplateVariables);
			
		return true;
		} catch (Exception $e) {
			$errorMessage = $e->getMessage();
			return $errorMessage;
		}
				
	}
    
}

?>


