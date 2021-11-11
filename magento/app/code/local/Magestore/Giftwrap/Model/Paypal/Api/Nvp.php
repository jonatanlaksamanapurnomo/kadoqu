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
class Magestore_Giftwrap_Model_Paypal_Api_Nvp extends Mage_Paypal_Model_Api_Nvp
{
    /**
     * @param array $request
     * @param int $i
     * @return bool|null|void
     */
    public function _exportLineItems(array &$request, $i = 0) {
        if (!$this->_cart) {
            return null;
        }
        // always add cart totals, even if line items are not requested
        if ($this->_lineItemTotalExportMap) {
            foreach ($this->_cart->getTotals() as $key => $total) {
                if (isset($this->_lineItemTotalExportMap[$key])) { // !empty($total)
                    $privateKey = $this->_lineItemTotalExportMap[$key];
                    $request[$privateKey] = $this->_filterAmount($total);
                }
            }
        }
        $giftwrapTax = 0;
        $giftwrapAmount = Mage::helper('giftwrap')->giftwrapAmount();
        if ($giftwrapAmount > 0) {
            if (Mage::getStoreConfig('giftwrap/calculation/active', Mage::app()->getStore(true)->getId())) {
                $percent = Mage::getStoreConfig('giftwrap/tax/percent', Mage::app()->getStore(true)->getId());
                if ($percent) {
                    $giftwrapTax = floatval($giftwrapAmount) * floatval($percent) / 100;
                }
            }
            $request['ITEMAMT'] += $giftwrapAmount + $giftwrapTax;
            $request['ITEMAMT'] = (string)$request['ITEMAMT'];
        }
        // add cart line items
        $items = $this->_cart->getItems();
        if (empty($items) || !$this->getIsLineItemsEnabled()) {
            return null;
        }
        $result = null;
        foreach ($items as $item) {
            foreach ($this->_lineItemExportItemsFormat as $publicKey => $privateFormat) {
                $result = true;
                $value = $item->getDataUsingMethod($publicKey);
                if (isset($this->_lineItemExportItemsFilters[$publicKey])) {
                    $callback = $this->_lineItemExportItemsFilters[$publicKey];
                    $value = call_user_func(array($this, $callback), $value);
                }
                if (is_float($value)) {
                    $value = $this->_filterAmount($value);
                }
                $request[sprintf($privateFormat, $i)] = $value;
            }
            $i++;
        }
        return $result;
    }
}
