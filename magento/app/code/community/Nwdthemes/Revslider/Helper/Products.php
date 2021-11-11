<?php

/**
 * Nwdthemes Revolution Slider Extension
 *
 * @package     Revslider
 * @author		Nwdthemes <mail@nwdthemes.com>
 * @link		http://nwdthemes.com/
 * @copyright   Copyright (c) 2015. Nwdthemes
 * @license     http://themeforest.net/licenses/terms/regular
 */

class Nwdthemes_Revslider_Helper_Products extends Mage_Core_Helper_Abstract {

	private $_products = array();
	private $_categories = array();

	/**
	 * Gets product
	 *
	 * @param	id		$id
	 * @return	array
	 */

	public function getProduct($id) {

		if (isset($this->_products[$id]))
		{
			return $this->_products[$id];
		}

		$product = Mage::getModel('catalog/product')->load($id);
		return $this->_prepareProduct($product);
	}

	/**
	 * Gets products by querey
	 *
	 * @param	array	$query
	 * @return	array
	 */

	public function getProductsByQuery($query) {

		$productsCollection = Mage::getModel('catalog/product')->getCollection();
		if ( ! Mage::helper('nwdall')->getCfg('options/show_out_of_stock', 'cataloginventory'))
		{
			Mage::getSingleton('cataloginventory/stock')->addInStockFilterToCollection($productsCollection);
		}
		
		if (isset($query['tax_query'][0]['taxonomy'])
			&& $query['tax_query'][0]['taxonomy'] == 'category'
			&& isset($query['tax_query'][0]['terms'])
			&& ! empty($query['tax_query'][0]['terms'])
			&& is_array($query['tax_query'][0]['terms']))
		{
			$productsCollection
				->joinField('category_id', 'catalog/category_product', 'category_id', 'product_id = entity_id', null, 'left')
				->addAttributeToFilter('category_id', array('in' => $query['tax_query'][0]['terms']));
		}
		elseif (isset($query['post__in']) && ! empty($query['post__in']) && is_array($query['post__in']))
		{
			$productsCollection->addFieldToFilter('entity_id', array('in' => $query['post__in']));
		}
		else
		{
			return array();
		}

		$productsCollection
			->addFieldToFilter('status', Mage_Catalog_Model_Product_Status::STATUS_ENABLED)
			->addFieldToFilter('visibility', array(Mage_Catalog_Model_Product_Visibility::VISIBILITY_BOTH, Mage_Catalog_Model_Product_Visibility::VISIBILITY_IN_CATALOG))
			->addAttributeToSelect('*');
			
		if (isset($query['orderby']))
		{
			$productsCollection->setOrder($query['orderby'], isset($query['order']) ? $query['order'] : 'desc');
		}	
			
		if (isset($query['showposts']))
		{
			$productsCollection->setPageSize($query['showposts']);
		}	
			
		$productsCollection->getSelect()->group('e.entity_id');

		$products = array();
		foreach ($productsCollection as $product) {
			$products[] = $this->_prepareProduct($product);
		}
		
		return $products;
	}

	/**
	 * Gets category
	 *
	 * @param	id		$id
	 * @return	array
	 */

	public function getCategory($id) {

		if (isset($this->_categories[$id]))
		{
			return $this->_categories[$id];
		}

		$category = Mage::getModel('catalog/category')->load($id);
		return $this->_prepareCategory($category);
	}

	/**
	 * Gets categories
	 *
	 * @return	array
	 */

	public function getCategories() {

		$categoriesCollection = Mage::getModel('catalog/category')
			->getCollection()
			->addAttributeToSelect('name')
			->addAttributeToSort('path', 'asc');

		$categories = array();
		foreach ($categoriesCollection as $category) {
			if ($_category = $this->_prepareCategory($category))
			{
				$categories[] = $_category;
			}
		}

		return $categories;
	}

	/**
	 * Prepare product data for slider
	 *
	 * @param object $product
	 * @return array
	 */

	private function _prepareProduct($product) {

		if (isset($this->_products[$product->getId()]))
		{
			return $this->_products[$product->getId()];
		}

		$arrProduct = $product->getData();
		try{
			$arrProduct['image'] = $product->getImageUrl();
		} catch (Exception $e) {
			$arrProduct['image'] = '';
		}
		$arrProduct['ID'] = $product->getId();
		$arrProduct['post_excerpt'] = $product->getShortDescription();
		$arrProduct['post_status'] = 'published';
		$arrProduct['post_category'] = '';
		$arrProduct['cart_link'] = Mage::helper('checkout/cart')->getAddUrl($product);
		$arrProduct['wishlist_link'] = Mage::helper('wishlist')->getAddUrl($product);
		$arrProduct['price'] = Mage::helper('core')->currency($product->getPrice(), true, false);
		$arrProduct['url'] = $product->getProductUrl();

		$this->_products[$product->getId()] = $arrProduct;

		return $arrProduct;
	}

	/**
	 * Prepare category data for slider
	 *
	 * @param object $product
	 * @return array
	 */

	private function _prepareCategory($category) {

		if (isset($this->_categories[$category->getId()]))
		{
			return $this->_categories[$category->getId()];
		}

		$arrCategory = $category->getData();

		if ( ! ($category->getId() > 1 && isset($arrCategory['name']) && isset($arrCategory['level'])))
		{
			return false;
		}

		/*$productCollection = $category->getProductCollection();
		$productCollection->addFieldToFilter('status', Mage_Catalog_Model_Product_Status::STATUS_ENABLED);
		$productCollection->addFieldToFilter('visibility', array(Mage_Catalog_Model_Product_Visibility::VISIBILITY_BOTH, Mage_Catalog_Model_Product_Visibility::VISIBILITY_IN_CATALOG));*/

		$arrCategory['count'] = 1; //$productCollection->count();
		$arrCategory['name'] = str_repeat('- ', $arrCategory['level'] - 1) . $arrCategory['name'];// . ' (' . $arrCategory['count'] . ')';
		$arrCategory['cat_ID'] = $category->getId();
		$arrCategory['term_id'] = $category->getId();
		$arrCategory['url'] = $category->getUrl($category);

		$this->_categories[$category->getId()] = $arrCategory;

		return $arrCategory;
	}	
	
}