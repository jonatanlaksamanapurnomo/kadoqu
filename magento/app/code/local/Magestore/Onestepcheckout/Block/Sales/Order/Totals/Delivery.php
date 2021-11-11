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
 * Class Magestore_Onestepcheckout_Block_Sales_Order_Totals_Delivery
 */
class Magestore_Onestepcheckout_Block_Sales_Order_Totals_Delivery extends Mage_Sales_Block_Order_Totals
{

    /**
     * @return Mage_Core_Block_Abstract
     */
    public function _prepareLayout()
    {
        return parent::_prepareLayout();
    }

    /**
     * @param $order
     * @return Mage_Core_Model_Abstract
     */
    public function getDelivery($order)
    {
        $delivery = Mage::getModel('onestepcheckout/delivery')->load($order->getId(), 'order_id');
        return $delivery;
    }

}
