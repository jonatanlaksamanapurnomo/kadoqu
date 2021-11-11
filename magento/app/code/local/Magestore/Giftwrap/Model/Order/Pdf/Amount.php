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
class Magestore_Giftwrap_Model_Order_Pdf_Amount extends Mage_Sales_Model_Order_Pdf_Total_Default
{

    /**
     * @return array
     */
    public function getTotalsForDisplay() {
        $invoiceId = Mage::app()->getRequest()->getParam('invoice_id');
        $creditmemoId = Mage::app()->getRequest()->getParam('creditmemo_id');
        if ($invoiceId) {
            $invoice = Mage::getModel('sales/order_invoice')->load($invoiceId);
            $amount = $this->getOrder()->formatPriceTxt($invoice->getGiftwrapAmount());
            $tax = $this->getOrder()->formatPriceTxt($invoice->getGiftwrapTax());
        } else if ($creditmemoId) {
            $creditmemo = Mage::getModel('sales/order_creditmemo')->load($creditmemoId);
            $amount = $this->getOrder()->formatPriceTxt($creditmemo->getGiftwrapAmount());
            $tax = $this->getOrder()->formatPriceTxt($creditmemo->getGiftwrapTax());
        } else {
            $amount = $this->getOrder()->formatPriceTxt($this->getOrder()->getGiftwrapAmount());
            $tax = $this->getOrder()->formatPriceTxt($this->getOrder()->getGiftwrapTax());
        }

        if ($this->getAmountPrefix()) {
            $amount = $this->getAmountPrefix() . $amount;
        }

        $totals = array(array(
            'label' => Mage::helper('giftwrap')->__('Giftwrap Amount'),
            'amount' => $amount,
            'font_size' => $fontSize,
        )
        );

        if ($this->getAmountPrefix())
            $tax = $this->getAmountPrefix() . $tax;
        $totals[] = array(
            'label' => Mage::helper('giftwrap')->__('Giftwrap Tax'),
            'amount' => $tax,
            'font_size' => $fontSize,
        );

        return $totals;
    }

}
