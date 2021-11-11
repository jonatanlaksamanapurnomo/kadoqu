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
 * Class Magestore_Onestepcheckout_Model_Source_Style
 */
class Magestore_Onestepcheckout_Model_Source_Style {

    /**
     * @return array
     */
    public function toOptionArray() {
        $options = array();

        $options[] = array(
            'label' => 'Flat',
            'value' => 'flat'
        );

        $options[] = array(
            'label' => 'Material',
            'value' => 'material'
        );

        return $options;
    }

}
