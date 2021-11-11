<?php
/**
 * @version   1.0 06.10.2014
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2013 ShopShark
 */

class ShopShark_ThemeConfig_Block_Themeoptions extends Mage_Core_Block_Template
{

	/**
     * Initialize block's cache
     */
    protected function _construct()
    {
        parent::_construct();
			
		$this->addData(array(
            'cache_lifetime'    => 86400,
            'cache_tags'        => array(ShopShark_ThemeConfig_Model_Settings::CACHE_TAG)
        ));
		
		Mage::register('themeMediaUrl', Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA).'wysiwyg/milano/');
		
    }
	
	/**
     * Get Key pieces for caching block content
     *
     * @return array
     */
    public function getCacheKeyInfo()
    {
        return array(
           ShopShark_ThemeConfig_Model_Settings::CACHE_TAG,
		   'THEME_OPTIONS',
           Mage::app()->getStore()->getId()
        );
    }
	
	public function _prepareLayout()
	{
		return parent::_prepareLayout();
	}
	
	public function jsString($str='') { 
        return trim(preg_replace("/('|\"|\r?\n)/", '', $str)); 
    }

		
}