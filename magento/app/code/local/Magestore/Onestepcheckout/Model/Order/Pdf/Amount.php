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
 * Class Magestore_Onestepcheckout_Model_Order_Pdf_Amount
 */
class Magestore_Onestepcheckout_Model_Order_Pdf_Amount
		extends Mage_Sales_Model_Order_Pdf_Total_Default
{
    /**
     * @return array
     */
    public function getTotalsForDisplay()
    {	
	
		$amount = $this->getAmount();	
		$fontSize = $this->getFontSize() ? $this->getFontSize() : 7;
		if(floatval($amount))
		{
			$amount = $this->getOrder()->formatPriceTxt($amount);
			if ($this->getAmountPrefix()) 
			{
				$amount = $this->getAmountPrefix().$amount;
			}		
			
			$totals = array(
						array(
							'label' => Mage::helper('onestepcheckout')->__('Giftwrap'),
							'amount' => $amount,
							'font_size' => $fontSize,
						)
					);						
			return $totals;
		}
	}

    /**
     * @return mixed
     */
    public function getAmount()
    {
        return $this->getOrder()->getOnestepcheckoutGiftwrapAmount();
    }	
}