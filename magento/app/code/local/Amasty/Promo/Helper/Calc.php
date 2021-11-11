<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */


class Amasty_Promo_Helper_Calc extends Mage_Core_Helper_Abstract
{
    function getQuoteSubtotal($quote, $rule)
    {
        $subtotal = 0;
        $taxInSubtotal = Mage::getStoreConfig('ampromo/general/tax_in_subtotal');
        $defualtCurrency = Mage::getStoreConfig('ampromo/general/default_currency');
        
        foreach ($quote->getItemsCollection() as $item) {
            if ($rule->getActions()->validate($item) && (!$item->getIsPromo() || $item->getPrice() != 0)) {
                if ($taxInSubtotal && $defualtCurrency)
                    $subtotal += $item->getBaseRowTotalInclTax();

                if ($taxInSubtotal && !$defualtCurrency)
                    $subtotal += $item->getRowTotalInclTax();

                if (!$taxInSubtotal && $defualtCurrency)
                    $subtotal += $item->getBaseRowTotal();

                if (!$taxInSubtotal && !$defualtCurrency)
                    $subtotal += $item->getRowTotal();
            }
        }

        return $subtotal;
    }
}
