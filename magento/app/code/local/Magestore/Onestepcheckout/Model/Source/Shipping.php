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
class Magestore_Onestepcheckout_Model_Source_Shipping {
    /**
     * @return array
     */
    public function toOptionArray() {
		$options = array();		
                $options[] = array(
			'label' => '-- Please select --',
			'value'	=> ''
		);
                $carriers = Mage::getStoreConfig('carriers');		
		foreach($carriers as $code => $carrier) {			
			$active = $carrier['active'];
			if($active == 1 || $active == true) {
				if(isset($carrier['title'])) {
					$options[] = array(
						 'label' =>   $carrier['title'],
						 'value' => $code
					);
				}
			}	
		}
		return $options;
	}
}
