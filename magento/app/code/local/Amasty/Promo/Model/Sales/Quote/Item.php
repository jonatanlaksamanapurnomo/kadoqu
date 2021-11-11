<?php

/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */
class Amasty_Promo_Model_Sales_Quote_Item extends Mage_Sales_Model_Quote_Item
{
    protected $_ruleId = null;
    protected $_rule = null;

    protected $_sourcePrice;
    protected $_taxConfig;

    public function getRuleId()
    {
        if (is_null($this->_ruleId)) {
            $buyRequest = $this->getBuyRequest();

            $this->_ruleId = isset($buyRequest['options']['ampromo_rule_id']) ? $buyRequest['options']['ampromo_rule_id'] : null;
        }

        return $this->_ruleId;
    }

    public function getRule()
    {
        if (is_null($this->_rule)) {
            $this->_rule = Mage::getModel('salesrule/rule');

            if (!is_null($this->getRuleId())) {
                $this->_rule->load($this->getRuleId());
            }

        }

        return $this->_rule;
    }

    public function getIsPromo()
    {
        return $this->getRuleId() !== null;
    }

    public function isFreeShipping()
    {
        $ret = false;

        if ($this->getRule()->getAmpromoFreeShipping() === 'global') {
            $ret = Mage::getStoreConfigFlag('ampromo/general/free_shipping');
        } else {
            $ret = $this->getRule()->getAmpromoFreeShipping() == 'yes';
        }

        return $ret;
    }

    protected function _getDiscountPrice($price)
    {
        return Mage::helper("ampromo")->getDiscountPrice($this->getRule(), $price, $this);
    }

    protected function _getTaxConfig()
    {
        if (!$this->_taxConfig)
            $this->_taxConfig = Mage::getSingleton('tax/config');

        return $this->_taxConfig;
    }

    public function setDiscountAmount($discount)
    {
        if ($this->getIsPromo() && $this->getRule()->getAmpromoUseDiscountAmount()) {
            $origPrice = 0;

            if ($this->_getTaxConfig()->discountTax()) {
                $origPrice = parent::getPriceInclTax();
            } else {
                $origPrice = parent::getPrice();
            }

            $discount = (($origPrice - $this->_getDiscountPrice($origPrice)) * $this->getQty());

        }
        return parent::setDiscountAmount($discount);
    }

    public function setBaseDiscountAmount($discount)
    {
        if ($this->getIsPromo() && $this->getRule()->getAmpromoUseDiscountAmount()) {

            $origPrice = 0;

            if ($this->_getTaxConfig()->discountTax()) {
                $origPrice = parent::getBasePriceInclTax();
            } else {
                $origPrice = parent::getBasePrice();
            }

            $discount = (($origPrice - $this->_getDiscountPrice($origPrice)) * $this->getQty());
        }
        return parent::setBaseDiscountAmount($discount);
    }

    function getNoDiscount()
    {
        if ($this->getIsPromo() && $this->getRule()->getAmpromoUseDiscountAmount()) {
            return 0;
        }
        return parent::getNoDiscount();
    }

    protected function _isDiscountNotApplied($price)
    {
        return $this->_sourcePrice === null || $this->_sourcePrice == $price;
    }

    public function getPrice()
    {
        $price = parent::getPrice();

        if ($this->getIsPromo()
            && !$this->getRule()->getAmpromoUseDiscountAmount()
            && $this->_isDiscountNotApplied($price)
        ) {
            $price = $this->_getDiscountPrice($price);
        }

        return $price;
    }

    public function setPrice($price)
    {
        if ($this->getIsPromo()
            && $this->_isDiscountNotApplied($price)
        ) {
            $this->_sourcePrice = $price;
            if (!$this->getRule()->getAmpromoUseDiscountAmount()) {
                $price              = $this->_getDiscountPrice($price);
            }
            if ($this->getProductType() == 'bundle') {
                $price              = $this->_getDiscountPrice($price);
                $this->getProduct()->setPriceType(Mage_Bundle_Model_Product_Price::PRICE_TYPE_FIXED);
            }
        }

        return parent::setPrice($price);
    }

    public function representProduct($product)
    {
        if (parent::representProduct($product)) {
            $option = $product->getCustomOption('info_buyRequest');
            $productBuyRequest = new Varien_Object($option ? unserialize($option->getValue()) : null);

            $currentBuyRequest = $this->getBuyRequest();

            $productIsFree = isset($productBuyRequest['options']['ampromo_rule_id']) ? $productBuyRequest['options']['ampromo_rule_id'] : null;
            $currentIsFree = isset($currentBuyRequest['options']['ampromo_rule_id']) ? $currentBuyRequest['options']['ampromo_rule_id'] : null;

            return $productIsFree === $currentIsFree;
        } else
            return false;
    }

    /**
     * Added for Magento <= 1.4 compatibility
     * @return Varien_Object
     */
    public function getBuyRequest()
    {
        $option = $this->getOptionByCode('info_buyRequest');
        $buyRequest = new Varien_Object($option ? unserialize($option->getValue()) : null);

        // Overwrite standard buy request qty, because item qty could have changed since adding to quote
        $buyRequest->setOriginalQty($buyRequest->getQty())
            ->setQty($this->getQty() * 1);

        return $buyRequest;
    }
}