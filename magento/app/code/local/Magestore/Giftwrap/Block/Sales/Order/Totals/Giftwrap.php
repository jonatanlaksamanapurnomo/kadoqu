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
 * @package     Magestore_Giftwrap
 * @module    Giftwrap
 * @author      Magestore Developer
 *
 * @copyright   Copyright (c) 2016 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 *
 */
class Magestore_Giftwrap_Block_Sales_Order_Totals_Giftwrap extends Mage_Sales_Block_Order_Totals
{
    /**
     *
     */
    public function initTotals() {
        if ($this->giftwrapAmount() > 0) {
            $total = new Varien_Object();
            $total->setCode('giftwrap');
            $total->setValue($this->giftwrapAmount());
            $total->setBaseValue(0);
            $total->setLabel('Giftwrap Amount');
            $parent = $this->getParentBlock();
            $parent->addTotal($total, 'subtotal');
        }
    }

    /**
     * @return mixed
     */
    public function giftwrapAmount() {
        $order = $this->getParentBlock()->getOrder();
        $giftwrapAmount = $order->getGiftwrapAmount();
        return $giftwrapAmount;
    }
}