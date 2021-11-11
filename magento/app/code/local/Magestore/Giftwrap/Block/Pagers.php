<?php
/**
 * Magestore
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magestore.com license that is
 * available through the world-wide-web at this URL:
 * http://www.magestore.com/license-agreement.html
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Magestore
 * @package     Magestore_Giftwrap
 * @module    Giftwrap
 * @author      Magestore Developer
 *
 * @copyright   Copyright (c) 2016 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 *
 */

class Magestore_Giftwrap_Block_Pagers extends Mage_Core_Block_Template
{
    /**
     * @return mixed
     */
    public function _prepareLayout() {
		return parent::_prepareLayout();
	}

    /**
     * @return array
     */
    public function getPagers() {
		$pagers = array();
		$collection = $this->getCollection();
		foreach ($collection as $item) {
			$pagers[$item['giftwrap_id']] = array('id' => $item['giftwrap_id'],
												'title' => $item['title'],
												'price' => $item['price'], 
												'image' => $item['image'], 
												);
		}
		return $pagers;
	}

    /**
     * @return mixed
     */
    public function getCollection() {
		$collection = Mage::getModel('giftwrap/giftwrap')->getCollection();
		$collection->addFieldToFilter('store_id',Mage::app()->getStore(true)->getId());
		$collection->setOrder('sort_order', 'asc');
		$collection->load();
		return $collection;
	}
}