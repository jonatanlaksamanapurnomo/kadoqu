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
 * Class Magestore_Onestepcheckout_Model_Sales_Order_Creditmemo_Total_Giftwrap
 */
class Magestore_Onestepcheckout_Model_Sales_Order_Creditmemo_Total_Giftwrap extends Mage_Sales_Model_Order_Creditmemo_Total_Abstract {

    /**
     * @param Mage_Sales_Model_Order_Creditmemo $creditmemo
     * @return $this
     */
    public function collect(Mage_Sales_Model_Order_Creditmemo $creditmemo) {
		$creditmemo->setOnestepcheckoutGiftwrapAmount(0);        

        $orderGiftwrapAmount = $creditmemo->getOrder()->getOnestepcheckoutGiftwrapAmount();		
        $baseOrderShippingAmount = $creditmemo->getOrder()->getOnestepcheckoutGiftwrapAmount();
        if ($orderGiftwrapAmount) {
            $creditmemo->setOnestepcheckoutGiftwrapAmount($orderGiftwrapAmount);           
            $creditmemo->setGrandTotal($creditmemo->getGrandTotal()+$orderGiftwrapAmount);
			$creditmemo->setBaseGrandTotal($creditmemo->getBaseGrandTotal()+$orderGiftwrapAmount);			
        }
        return $this;
	}
}