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
 * Class Magestore_OneStepCheckout_Model_Source_Ajaxbilling
 */
class Magestore_OneStepCheckout_Model_Source_Ajaxbilling {
    /**
     * @return array
     */
    public function toOptionArray() {
		$fields = array('Country', 'Postcode', 'State/region', 'City');
		$options = array();		
		foreach($fields as $field)	{
			$options[] = array('label' => $field, 'value' => strtolower($field));
		}
		return $options;
	}
}