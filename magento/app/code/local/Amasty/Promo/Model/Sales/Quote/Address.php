<?php

/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */
class Amasty_Promo_Model_Sales_Quote_Address extends Mage_Sales_Model_Quote_Address
{
    protected $_currentCollector = false;

    /**
     * Collect address totals
     * Add sales_quote_address_collect_totals_before event for Magento<=1.5
     *
     * @return Mage_Sales_Model_Quote_Address
     */
    public function collectTotals()
    {
        Mage::dispatchEvent($this->_eventPrefix . '_collect_totals_before', array($this->_eventObject => $this));
        foreach ($this->getTotalCollector()->getCollectors() as $name => $model) {
            $this->_currentCollector = $name;
            $model->collect($this);
        }
        Mage::dispatchEvent($this->_eventPrefix . '_collect_totals_after', array($this->_eventObject => $this));
        return $this;
    }

    public function getAllNonNominalItems()
    {
        $items = parent::getAllNonNominalItems();

        foreach ($items as $key => $item) {
            if (!($item instanceof Amasty_Promo_Model_Sales_Quote_Item)) continue;

            $collectShipping = ($this->_currentCollector == 'shipping') && !$item->isFreeShipping();
            if (!$collectShipping
                && $this->_currentCollector !== 'subtotal'
                && $this->_currentCollector !== 'tax_subtotal'
                && $this->_currentCollector !== 'discount'
                && ((!Mage::getStoreConfig('ampromo/general/calculate_tax')) || ($this->_currentCollector !== 'tax'))
            ) //skip all except shipping and subtotal collectors
            {
                if ($item->getIsPromo()) {
                    unset($items[$key]);
                }
            }
        }

        return $items;
    }
}