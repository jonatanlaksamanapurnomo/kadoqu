<?php

/**
 * @category   HM
 * @package    HM_Bestseller
 * @copyright  Copyright (c) Hello-Magento
 * @version    1.0.0
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
class HM_Bestseller_Model_Bestseller
{		

	/**
	 * Get All products and sort by ordered quanlity
	 */
	public function getAllBestsellers(){
		$storeId = Mage::app()->getStore()->getId();
		$products = Mage::getResourceModel('reports/product_collection')
		->addOrderedQty()
		->addAttributeToSelect('*') 
		->setStoreId($storeId)
		->addStoreFilter($storeId);
		Mage::getSingleton('catalog/product_status')->addVisibleFilterToCollection($products);
		Mage::getSingleton('catalog/product_visibility')->addVisibleInCatalogFilterToCollection($products);
		return $products;
	}
	/**
	 * Get Bestseller product by number
	 */
	public function getBestsellers($showTotal)
	{

	     $visibility = array(
                      Mage_Catalog_Model_Product_Visibility::VISIBILITY_BOTH,
                      Mage_Catalog_Model_Product_Visibility::VISIBILITY_IN_CATALOG
                  );
		$storeId = Mage::app()->getStore()->getId();
		$products = Mage::getResourceModel('reports/product_collection')
		->addOrderedQty()
		->addAttributeToFilter('visibility', $visibility) 
		->addAttributeToSelect('*') 
		->setStoreId($storeId)
		->addStoreFilter($storeId)
		->setOrder('ordered_qty', 'desc')
		->getSelect()->limit((int)$showTotal)->query();
		
        
		$_bestsellers = array();

		if(count($products) > 0)
		{
			foreach ($products as $productdata)
			{
				$_product = Mage::getModel('catalog/product');
				$_product->load($productdata['entity_id']);
	 		 	
				$_bestsellers[] = $_product->addData($productdata);
			}
		}

		return $_bestsellers;

	}

	/**
	 * Get Bestseller product by number 
	 * Filter by Category
	 */
	public function getBestsellersByCatId($showTotal, $categoryId)
	{

      
	    $visibility = array(
                      Mage_Catalog_Model_Product_Visibility::VISIBILITY_BOTH,
                      Mage_Catalog_Model_Product_Visibility::VISIBILITY_IN_CATALOG
                  );
		$storeId = Mage::app()->getStore()->getId();
	
		$products = Mage::getResourceModel('reports/product_collection')
			->addOrderedQty()
			->addAttributeToFilter('visibility', $visibility) 
			->addCategoryFilter(Mage::getModel('catalog/category')->load($categoryId))
			->addAttributeToSelect('*') 
			->setStoreId($storeId)
			->addStoreFilter($storeId)
			->setOrder('ordered_qty', 'desc')
			->getSelect()->limit((int)$showTotal)->query();
        
		$_bestsellers = array();

		if(count($products) > 0)
		{
			foreach ($products as $productdata)
			{
				$_product = Mage::getModel('catalog/product');
				$_product->load($productdata['entity_id']);
	 		 	
				$_bestsellers[] = $_product->addData($productdata);
			}
		}

		return $_bestsellers;

	}
	
	
	
}