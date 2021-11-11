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
 * Class Magestore_Onestepcheckout_Model_Giftwrap
 */
class Magestore_Onestepcheckout_Model_Giftwrap extends Mage_Core_Model_Abstract
{

    /**
     * @return array
     */
    public function toOptionArray()
    {
        return array(
            0    => Mage::helper('onestepcheckout')->__('Per Order'),
            1    => Mage::helper('onestepcheckout')->__('Per Item')
        );
    }

    /**
     * 
     * @param $observer
     */
    public function paypal_prepare_line_items($observer) {

        if (!Mage::helper('onestepcheckout')->enabledOnestepcheckout()) {
            return;
        }

        if (version_compare(Mage::getVersion(), '1.4.2', '>=')) {
            $paypalCart = $observer->getEvent()->getPaypalCart();
            if ($paypalCart) {
                $salesEntity = $paypalCart->getSalesEntity();
                $giftwrapAmount = 0;
                if ($salesEntity->getOnestepcheckoutGiftwrapAmount()) {
                    $giftwrapAmount = $salesEntity->getOnestepcheckoutGiftwrapAmount();
                } else {
                    $giftwrapAmount = Mage::getModel('checkout/session')->getData('onestepcheckout_giftwrap_amount');
                }
                if ($giftwrapAmount) {
                    $paypalCart->addItem(Mage::helper('onestepcheckout')->__('Giftwrap'), 1, abs((float) $giftwrapAmount));
                }
            }
        } else {
            $salesEntity = $observer->getSalesEntity();
            $additional = $observer->getAdditional();
            if ($salesEntity && $additional) {
                $giftwrapAmount = 0;
                if ($salesEntity->getOnestepcheckoutGiftwrapAmount()) {
                    $giftwrapAmount = $salesEntity->getOnestepcheckoutGiftwrapAmount();
                } else {
                    $giftwrapAmount = Mage::getModel('checkout/session')->getData('onestepcheckout_giftwrap_amount');
                }
                if ($giftwrapAmount) {
                    $items = $additional->getItems();
                    $items[] = new Varien_Object(array(
                        'name' => Mage::helper('onestepcheckout')->__('Giftwrap'),
                        'qty' => 1,
                        'amount' => (abs((float) $giftwrapAmount)),
                    ));
                    $additional->setItems($items);
                }              
            }
        }
    }
}