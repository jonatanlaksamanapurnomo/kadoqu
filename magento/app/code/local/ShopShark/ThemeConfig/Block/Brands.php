<?php
/**
 * @version   1.0 06.10.2013
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2013 ShopShark
 */

class ShopShark_ThemeConfig_Block_Brands extends Mage_Core_Block_Template
{

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
	
	public function _prepareLayout()
	{
		return parent::_prepareLayout();
	}

	public function getBrands()
	{
		if (!$this->hasData('sharkbrands')) {
			$this->setData('sharkbrands', Mage::registry('sharkbrands'));
		}
		return $this->getData('sharkbrands');

	}

	public function getAllBrands()
	{
		$_brand_attribute = Mage::getSingleton('eav/config')->getAttribute('catalog_product', Mage::getStoreConfig('milanoconfig/productpage/brand_attr'));
		return $_brand_attribute->getSource()->getAllOptions(false, true);
	}
	
}