<?php

class Mage_Catalog_Block_Product_Styleoftheday extends Mage_Catalog_Block_Product_Abstract
{
    protected $_productsCount = null;
	protected $_categoryId = null;

    const DEFAULT_PRODUCTS_COUNT = 4;

    /**
     * Initialize block's cache
     */
    protected function _construct()
    {
        parent::_construct();
			
		$this->addData(array(
            'cache_lifetime'    => 86400,
            'cache_tags'        => array(Mage_Catalog_Model_Product::CACHE_TAG),
        ));

    }
	
	/**
     * Get Key pieces for caching block content
     *
     * @return array
     */
    public function getCacheKeyInfo()
    {
        return array(
           'CATALOG_STYLE_OF_THE_DAY',
           Mage::app()->getStore()->getId(),
           $this->getProductsCount()
        );
    }

    /**
     * Prepare collection with new products and applied page limits.
     *
     * return Mage_Catalog_Block_Product_New
     */
    protected function _beforeToHtml()
    {
        $todayDate  = Mage::app()->getLocale()->date()->toString(Varien_Date::DATETIME_INTERNAL_FORMAT);

        $collection = Mage::getResourceModel('catalog/product_collection');
        $collection->setVisibility(Mage::getSingleton('catalog/product_visibility')->getVisibleInCatalogIds());

        $collection = $this->_addProductAttributesAndPrices($collection)
            ->addStoreFilter()
			->addAttributeToFilter('type_id', array('eq' => 'grouped'))
			->setPageSize($this->getProductsCount())
            ->setCurPage(1)
        ;
		
		// Limit to a specific category
		if(!empty($this->_categoryId)) $collection->addCategoryFilter(Mage::getModel("catalog/category")->load($this->_categoryId));
		
        $this->setProductCollection($collection);

        return parent::_beforeToHtml();
    }

	/**
     * Set a specific category to take the products from.
     *
     * @param $catid
     * @return Mage_Catalog_Block_Product_New
     */
    public function setCategory($catid)
    {
        $this->_categoryId = (int)$catid;
        return $this;
    }
	
	/**
     * Get the category id
     *
     * @return int
     */
    public function getCategory()
    {
        return (int)$this->_categoryId;
    }

    /**
     * Set how much product should be displayed at once.
     *
     * @param $count
     * @return Mage_Catalog_Block_Product_New
     */
    public function setProductsCount($count)
    {
        $this->_productsCount = $count;
        return $this;
    }

    /**
     * Get how much products should be displayed at once.
     *
     * @return int
     */
    public function getProductsCount()
    {
        if (null === $this->_productsCount) {
            $this->_productsCount = self::DEFAULT_PRODUCTS_COUNT;
        }
        return $this->_productsCount;
    }
}
