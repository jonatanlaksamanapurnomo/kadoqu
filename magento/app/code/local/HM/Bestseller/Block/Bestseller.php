<?php

/**
 * @category   HM
 * @package   HM_Bestseller
 * @copyright  Copyright (c) Hello Magento
 * Support Mutil Mode: Get All Bestseller products with toolbar feature, get bestseller product by number. 
 * @version    1.0.0
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
class HM_Bestseller_Block_Bestseller extends Mage_Catalog_Block_Product_Abstract {

	 protected $_defaultColumnCount = 3;

    /**
     * Product amount per row in grid display mode depending
     * on custom page layout of category
     *
     * @var array
     */
    protected $_columnCountLayoutDepend = array();
	 
	 /**
     * Get Bestseller product by number
     *
     * @return collection
     */
	 public function getBestsellers($showTotal)
	{
		$categoryId = $this->getRequest()->getParam('id', false);
		$bestsellers = Mage::getModel('bestseller/bestseller');
		if(isset($categoryId) && is_numeric($categoryId)){
				$bestsellers = $bestsellers->getBestsellersByCatId($showTotal,$categoryId);
		
		}else{
		   	$bestsellers = $bestsellers->getBestsellers($showTotal);
		}
		return $bestsellers;
	}
	/**
	* Override _preparyLayout() method found in Mage_Core_Block_Abstract
	* @Return HM_Bestseller_Block_Bestseller
    **/
	public function _prepareLayout() {
		//$storeId = Mage::app()->getStore()->getId();
		$bestsellers = Mage::getModel('bestseller/bestseller');
		$products = $bestsellers->getAllBestsellers();
		$this->setToolbar($this->getLayout()->createBlock('catalog/product_list_toolbar', 'Toolbar')); 
		$toolbar = $this->getToolbar(); 
		$toolbar->setAvailableOrders(array(
		'ordered_qty'  => $this->__('Most Purchased'),
		'name'      => $this->__('Name'),
		'price'     => $this->__('Price')
		))
		->setDefaultOrder('ordered_qty')
		->setDefaultDirection('desc')
		->setCollection($products);
		return $this;
	}

	/**
	* Retrieve product collection. 
	* @Return Mage_Reports_Model_Mysql4_Product_Collection
    **/
	protected function _getProductCollection() {
		return $this->getToolbar()->getCollection();
	}
	
	public function getToolbarHtml() {
		return $this->getToolbar()->_toHtml();
	}
	 
	/**
     * Retrieve current view mode
     *
     * @return string
     */
	public function getMode() {
		return $this->getToolbar()->getCurrentMode();
	}

	/**
     * Retrieve loaded category collection
     *
     * @return Mage_Eav_Model_Entity_Collection_Abstract
     */
	public function getLoadedProductCollection() {
		return $this->_getProductCollection();
	}

   /**
     * Retrieve product amount per row in grid display mode
     *
     * @return int
    */
    public function getColumnCount()
    {
        if (!$this->_getData('column_count')) {
            $pageLayout = $this->getPageLayout();
            if ($pageLayout && $this->getColumnCountLayoutDepend($pageLayout->getCode())) {
                $this->setData(
                    'column_count',
                    $this->getColumnCountLayoutDepend($pageLayout->getCode())
                );
            } else {
                $this->setData('column_count', $this->_defaultColumnCount);
            }
        }
        return (int) $this->_getData('column_count');
    }

    /**
     * Add row size depends on page layout
     *
     * @param string $pageLayout
     * @param int $rowSize
     * @return Mage_Catalog_Block_Product_List
     */
    public function addColumnCountLayoutDepend($pageLayout, $columnCount)
    {
        $this->_columnCountLayoutDepend[$pageLayout] = $columnCount;
        return $this;
    }

    /**
     * Remove row size depends on page layout
     *
     * @param string $pageLayout
     * @return Mage_Catalog_Block_Product_List
     */
    public function removeColumnCountLayoutDepend($pageLayout)
    {
        if (isset($this->_columnCountLayoutDepend[$pageLayout])) {
            unset($this->_columnCountLayoutDepend[$pageLayout]);
        }

        return $this;
    }

    /**
     * Retrieve row size depends on page layout
     *
     * @param string $pageLayout
     * @return int|boolean
     */
    public function getColumnCountLayoutDepend($pageLayout)
    {
        if (isset($this->_columnCountLayoutDepend[$pageLayout])) {
            return $this->_columnCountLayoutDepend[$pageLayout];
        }

        return false;
    }

    /**
     * Retrieve current page layout
     *
     * @return Varien_Object
     */
    public function getPageLayout()
    {
        return $this->helper('page/layout')->getCurrentPageLayout();
    }
}