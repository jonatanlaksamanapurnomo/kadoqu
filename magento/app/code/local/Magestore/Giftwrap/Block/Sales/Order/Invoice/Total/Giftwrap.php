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

class Magestore_Giftwrap_Block_Sales_Order_Invoice_Total_Giftwrap extends Mage_Core_Block_Template {

    /**
     *
     */
    public function initTotals() {
        $totalsBlock = $this->getParentBlock();
        $invoice = $totalsBlock->getInvoice();
        if ($invoice->getGiftwrapAmount() > 0) {
            $totalsBlock->addTotal(new Varien_Object(array(
                'code' => 'giftwrapamount',
                'label' => $this->__('Giftwrap Amount:'),
                'value' => $invoice->getGiftwrapAmount(),
                    )), 'subtotal');
        }
    }

}