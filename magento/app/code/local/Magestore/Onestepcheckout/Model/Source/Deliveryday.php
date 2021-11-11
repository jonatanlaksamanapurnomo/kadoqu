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
 * Class Magestore_OneStepCheckout_Model_Source_Deliveryday
 */
class Magestore_OneStepCheckout_Model_Source_Deliveryday {

    /**
     * @return array
     */
    public function toOptionArray() {
        $options = array(
            array(
                'label' => __('Monday'),
                'value' => 1,
            ),
            array(
                'label' => __('Tuesday'),
                'value' => 2,
            ),
            array(
                'label' => __('Wednesday'),
                'value' => 3,
            ),
            array(
                'label' => __('Thursday'),
                'value' => 4,
            ),
            array(
                'label' => __('Friday'),
                'value' => 5,
            ),
            array(
                'label' => __('Saturday'),
                'value' => 6,
            ),
            array(
                'label' => __('Sunday'),
                'value' => 0,
            )
        );
        return $options;
    }

}