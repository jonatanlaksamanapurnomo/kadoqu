<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */


/**
 * Class Amasty_Promo_Block_Banner
 *
 * @author Artem Brunevski
 */
class Amasty_Promo_Block_Banner extends Mage_Catalog_Block_Product_Abstract
{
    /**
     * Getting shopping rule modes
     */
    const MODE_PRODUCT = 'product';
    const MODE_CART = 'cart';

    /** @var Mage_SalesRule_Model_Rule[] */
    protected $_validRules;

    /** @var Mage_SalesRule_Model_Resource_Rule_Collection */
    protected $_rulesCollection;

    /**
     * Get Valid Rules List
     *
     * @return Mage_SalesRule_Model_Rule[]
     */
    protected function _getValidRules()
    {
        if ($this->_validRules === null) {
            $this->_validRules = array();
            /**
             * product mode based on current product (faster mode), useful for FPC
             * cart mode use quote, can take some time for validation
             */
            if (Mage::getStoreConfig('ampromo/banners/mode') === self::MODE_PRODUCT) {
                $this->_validRules = $this->_getProductBasedValidRule();
            } else if (Mage::getStoreConfig('ampromo/banners/mode') === self::MODE_CART) {
                $this->_validRules = $this->_getQuoteBasedValidRule();
            } else {
                $this->_validRules = new Varien_Object();
            }
        }

        return $this->_validRules;
    }

    /**
     * Get Amasty Promo Rules Collection Filtered by website_id customer_group_id coupon_code
     *
     * @return Mage_SalesRule_Model_Resource_Rule_Collection
     */
    protected function _getRulesCollection()
    {
        if (!$this->_rulesCollection) {
            /** @var Mage_Checkout_Model_Cart $quote */
            $quote = Mage::getModel('checkout/cart')->getQuote();
            $store = Mage::app()->getStore($quote->getStoreId());

            $this->_rulesCollection = Mage::getModel('salesrule/rule')
                ->getCollection()
                ->setValidationFilter($store->getWebsiteId(), $quote->getCustomerGroupId(), $quote->getCouponCode());

            $this->_rulesCollection->getSelect()->where("simple_action in ('ampromo_items', 'ampromo_product') and is_active = 1");

            if (!Mage::app()->isSingleStoreMode()) {
                /**
                 * check stores filter
                 * if rule don't have selected stores, they should be available too
                 * current store matched, stores filter not initialized or all stores options selected (0 value)
                 */
                $this->_rulesCollection->getSelect()->where("FIND_IN_SET ('{$store->getId()}', amstore_ids) or amstore_ids = '' or FIND_IN_SET (0, amstore_ids)");
            }
        }

        return $this->_rulesCollection;
    }

    /**
     * Get Valid Rules for current product
     *
     * @return Mage_SalesRule_Model_Rule[]
     */
    protected function _getProductBasedValidRule()
    {
        /** @var Mage_Checkout_Model_Cart $currentQuote */
        $currentQuote = Mage::getModel('checkout/cart')->getQuote();

        /** @var Mage_Sales_Model_Quote $quoteItem */
        $quoteItem = new Varien_Object();
        $quoteItem->setProduct($this->getProduct());
        $quoteItem->setStoreId(Mage::getModel('checkout/cart')->getQuote()->getStoreId());
        $quoteItem->setIsVirtual(false);
        $quoteItem->setQuote($currentQuote);
        $quoteItem->setAllItems(array($this->getProduct()));

        /** @var Mage_SalesRule_Model_Rule $rule */
        foreach ($this->_getRulesCollection() as $rule) {
            if ($rule->getActions()->validate($quoteItem)) {
                $this->_validRules[] = $rule;
            }
        }

        return $this->_validRules;
    }

    /**
     * Get Valid Rules For Current Quote
     *
     * @return Mage_SalesRule_Model_Rule[]
     */
    protected function _getQuoteBasedValidRule()
    {
        /** Avoid out of stock exception */
        if (!Mage::helper('ampromo')->checkAvailableQty($this->getProduct(), $this->getProduct()->getStockItem()->getMinSaleQty())) {
            $this->_validRules;
        }

        $product = $this->getProduct();

        if ($product->getTypeId() === 'configurable') {
            $childrenProducts = $product->getChildrenProducts();
            foreach ($childrenProducts as $key => $childProduct) {
                if (!Mage::helper('ampromo')->checkAvailableQty($childProduct, 1)) {
                    unset($childrenProducts[$key]);
                }
            }
            if (count($childrenProducts) > 0) {
                $product = end($childrenProducts);
                $product = Mage::getModel('catalog/product')->load($product->getId());
            }
        }

        /** @var Mage_Sales_Model_Quote $currentQuote */
        /**
         * add product to cart
         */
        $currentQuote = Mage::getModel('checkout/cart')->getQuote();
        $afterQuote = Mage::getModel('sales/quote');
        $afterQuote->addProduct($this->getProduct(), new Varien_Object(array('qty' => $this->getProduct()->getStockItem()->getMinSaleQty())));
        $afterQuote->merge($currentQuote);
        $afterQuote->setIsFake(true);
        $afterQuote->collectTotals();

        /**
         * validate rules according to current quote
         */
        $currentRuleIds = $currentQuote->getAppliedRuleIds();

        /**
         * match with quote after add current product
         */
        $afterRuleIds = $afterQuote->getAppliedRuleIds();

        /**
         * get new applied rules
         */
        $afterRulesArray = explode(",", $afterRuleIds);
        $currentRulesArray = explode(",", $currentRuleIds);
        foreach ($afterRulesArray as $ruleId){
            if (!in_array($ruleId,$currentRulesArray)){
                $this->_validRules[] = Mage::getModel('salesrule/rule')->load($ruleId);
            }
        }
        return $this->_validRules;
    }

    /**
     * Get list of matched rules according to settings
     * @return Mage_SalesRule_Model_Rule[]
     */
    public function getValidRules()
    {
        $validRules = $this->_getValidRules();
        if (Mage::getStoreConfig('ampromo/banners/single') === '1' && count($validRules) > 0) {
            return array_slice($validRules, 0, 1);
        }

        return $validRules;
    }

    /**
     * Get top-priority validate rule, compatibility for themes before 2.3.6
     * @return Mage_SalesRule_Model_Rule|Varien_Object
     */
    protected function _getValidRule()
    {
        $validRule = new Varien_Object();
        $validRules = $this->_getValidRules();
        if (count($validRules) > 0 && array_key_exists(0, $validRules)) {
            $validRule = $validRules[0];
        }

        return $validRule;
    }

    /**
     * @param Mage_SalesRule_Model_Rule|null $validRule
     * @return mixed
     */
    function getDescription(Mage_SalesRule_Model_Rule $validRule = null)
    {
        if ($validRule === null) {
            $validRule = $this->_getValidRule();
        }
        return $validRule->getData('ampromo_' . $this->getPosition() . '_banner_description');
    }

    /**
     * @param Mage_SalesRule_Model_Rule|null $validRule
     * @return mixed
     */
    function getImage(Mage_SalesRule_Model_Rule $validRule = null)
    {
        if ($validRule === null) {
            $validRule = $this->_getValidRule();
        }
        return Mage::helper("ampromo/image")->getLink($validRule->getData('ampromo_' . $this->getPosition() . '_banner_img'));
    }

    /**
     * @param Mage_SalesRule_Model_Rule|null $validRule
     * @return mixed
     */
    function getAlt(Mage_SalesRule_Model_Rule $validRule = null)
    {
        if ($validRule === null) {
            $validRule = $this->_getValidRule();
        }
        return $validRule->getData('ampromo_' . $this->getPosition() . '_banner_alt');
    }

    /**
     * @param Mage_SalesRule_Model_Rule|null $validRule
     * @return mixed
     */
    function getHoverText(Mage_SalesRule_Model_Rule $validRule = null)
    {
        if ($validRule === null) {
            $validRule = $this->_getValidRule();
        }
        return $validRule->getData('ampromo_' . $this->getPosition() . '_banner_hover_text');
    }

    /**
     * @param Mage_SalesRule_Model_Rule|null $validRule
     * @return mixed|string
     */
    function getLink(Mage_SalesRule_Model_Rule $validRule = null)
    {
        if ($validRule === null) {
            $validRule = $this->_getValidRule();
        }
        return $validRule->getData('ampromo_' . $this->getPosition() . '_banner_link') ? $validRule->getData('ampromo_' . $this->getPosition() . '_banner_link') : "#";
    }

    /**
     * @param Mage_SalesRule_Model_Rule|null $validRule
     * @return bool
     */
    function isShowGiftImages(Mage_SalesRule_Model_Rule $validRule = null)
    {
        if ($validRule === null) {
            $validRule = $this->_getValidRule();
        }

        return $validRule->getData('ampromo_' . $this->getPosition() . '_banner_gift_images') == 1;
    }

    /**
     * @return mixed
     */
    function getAttributeHeader()
    {
        return Mage::getStoreConfig('ampromo/gift_images/attribute_header');
    }

    /**
     * @return mixed
     */
    function getAttributeDescription()
    {
        return Mage::getStoreConfig('ampromo/gift_images/attribute_description');
    }

    /**
     * @param Mage_SalesRule_Model_Rule|null $validRule
     * @return array
     */
    function getProducts(Mage_SalesRule_Model_Rule $validRule = null)
    {
        if ($validRule === null) {
            $validRule = $this->_getValidRule();
        }

        $products = array();
        if ('ampromo_product' == $validRule->getSimpleAction())
            return $products;

        $promoSku = $validRule->getPromoSku();
        $skuArray = explode(",", $promoSku);
        array_walk($skuArray, array($this, 'trimValue'));

        if (!empty($promoSku)) {
            $products = Mage::getResourceModel('catalog/product_collection')
                ->addFieldToFilter('sku', array('in' => $skuArray))
                ->addUrlRewrite()
                ->addFinalPrice()
                ->addAttributeToSelect(array('name', 'thumbnail', $this->getAttributeHeader(), $this->getAttributeDescription()))
                ->addAttributeToFilter(
                    'status',
                    array('eq' => Mage_Catalog_Model_Product_Status::STATUS_ENABLED)
                );
            $products = $this->applyPromoQty($products,$skuArray);
        }

        return $products;
    }

    /**
     * Apply Promo Qty to Products Collection
     *
     * @param $products
     * @param $skuArray
     *
     * @return
     */
    function applyPromoQty($products, $skuArray)
    {
        $promoSkuCounts = array_count_values($skuArray);

        foreach($products as $product)
        {
            $product->setPromoQty($promoSkuCounts[$product->getSku()]);
        }

        return $products;
    }

    /**
     * @param $value
     */
    function trimValue(&$value)
    {
        $value = trim($value);
    }

    /**
     * @return mixed
     */
    function getWidth()
    {
        return Mage::getStoreConfig('ampromo/gift_images/gift_image_width');
    }

    /**
     * @return mixed
     */
    function getHeight()
    {
        return Mage::getStoreConfig('ampromo/gift_images/gift_image_height');
    }
}