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
class Magestore_Giftwrap_Block_Sales_Order_Invoice_Total_Giftwraptax extends Mage_Sales_Block_Order_Totals
{

    /**
     *
     */
    public function initTotals() {
        if ($this->giftwrapTax() > 0) {
            $total = new Varien_Object();
            $total->setCode('giftwraptax');
            $total->setValue($this->giftwrapTax());
            $total->setBaseValue(0);
            $total->setLabel('Giftwrap Tax');
            $parent = $this->getParentBlock();
            $parent->addTotal($total, 'giftwrap');
        }
    }

    /**
     * @return mixed
     */
    public function giftwrapTax() {
        $invoice = $this->getParentBlock()->getInvoice();
        $giftwrapTax = $invoice->getGiftwrapTax();
        return $giftwrapTax;
    }

}
