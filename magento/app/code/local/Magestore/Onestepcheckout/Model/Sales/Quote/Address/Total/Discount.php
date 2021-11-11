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
 * Class Magestore_Onestepcheckout_Model_Sales_Quote_Address_Total_Discount
 */
class Magestore_Onestepcheckout_Model_Sales_Quote_Address_Total_Discount extends Mage_Sales_Model_Quote_Address_Total_Abstract {
    /**
     * @param Mage_Sales_Model_Quote_Address $address
     * @return $this
     */
    public function collect(Mage_Sales_Model_Quote_Address $address) {
        $session = Mage::getSingleton('checkout/session');
		$discount = $session->getData('onestepcheckout_admin_discount');
        if(!$discount){
            return $this;
        }
		
		$items = $address->getAllItems();
		if (!count($items)) {
			return $this;
		}
		$session->setData('onestepcheckout_admin_discount',$discount);
		$address->setOnestepcheckoutDiscountAmount($discount);		
		$address->setData('onestepcheckout_discount_amount',$discount);
		$address->setGrandTotal($address->getGrandTotal() - $address->getOnestepcheckoutDiscountAmount());
		$address->setBaseGrandTotal($address->getBaseGrandTotal() - $address->getOnestepcheckoutDiscountAmount());	
		return $this;
	}

    /**
     * @param Mage_Sales_Model_Quote_Address $address
     * @return $this
     */
    public function fetch(Mage_Sales_Model_Quote_Address $address)
	{
		$amount = $address->getOnestepcheckoutDiscountAmount();		
		$title = Mage::helper('sales')->__('Discount(Admin)');
		if ($amount!=0) {
			$address->addTotal(array(
					'code'=>$this->getCode(),
					'title'=>$title,
					'value'=>'-'.$amount
			));
		}
		return $this;
	}
}
