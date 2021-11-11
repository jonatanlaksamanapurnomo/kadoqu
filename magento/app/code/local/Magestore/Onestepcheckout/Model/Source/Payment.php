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
 * Config category source
 *
 * @category   Mage
 * @package    Mage_Adminhtml
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class Magestore_Onestepcheckout_Model_Source_Payment {
    /**
     * @return array
     */
    public function toOptionArray() {
		$options = array();
		$options[] = array(
			'label' => '-- Please select --',
			'value'	=> ''
		);
		$quote = Mage::helper("onestepcheckout")->getOnePage()->getQuote();
		$store = $quote ? $quote->getStoreId() : null;
		$methods = Mage::helper('payment')->getStoreMethods($store, $quote);
		foreach ($methods as $key => $method) {
			$options[] = array(
			  'label' => $method->getTitle(),
				'value' => $method->getCode()
			);
		}		       
		return $options;
	}
}
