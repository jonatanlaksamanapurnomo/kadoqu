<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */


class Amasty_Promo_Helper_Weee_Data extends Mage_Weee_Helper_Data
{
    public function getRowWeeeAmountAfterDiscount($item)
    {
        $weeeTaxAppliedAmounts = $this->getApplied($item);
        $weeeAmountInclDiscount = 0;
        foreach ($weeeTaxAppliedAmounts as $weeeTaxAppliedAmount) {
            $weeeAmountInclDiscount += $weeeTaxAppliedAmount['row_amount'];
            if (!$this->includeInSubtotal() && isset($weeeTaxAppliedAmount['weee_discount'])) {
                $weeeAmountInclDiscount -= $weeeTaxAppliedAmount['weee_discount'];
            }
        }
        return $weeeAmountInclDiscount;
    }

    /**
     * Calculate base row weee amount for an order, invoice or credit memo item
     * The returned value may contain discount if the discount is not included in
     * the discount for subtotal
     *
     * @param mixed $item
     * @return float
     */
    public function getBaseRowWeeeAmountAfterDiscount($item)
    {
        $weeeTaxAppliedAmounts = $this->getApplied($item);
        $baseWeeeAmountInclDiscount = 0;
        foreach ($weeeTaxAppliedAmounts as $weeeTaxAppliedAmount) {
            $baseWeeeAmountInclDiscount += $weeeTaxAppliedAmount['base_row_amount'];
            if (!$this->includeInSubtotal() && isset($weeeTaxAppliedAmount['base_weee_discount'])) {
                $baseWeeeAmountInclDiscount -= $weeeTaxAppliedAmount['base_weee_discount'];
            }
        }
        return $baseWeeeAmountInclDiscount;
    }
}
