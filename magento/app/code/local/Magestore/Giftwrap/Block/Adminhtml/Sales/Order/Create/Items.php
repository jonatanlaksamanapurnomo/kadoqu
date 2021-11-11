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

class Magestore_GiftWrap_Block_Adminhtml_Sales_Order_Create_Items extends Mage_Adminhtml_Block_Sales_Order_Create_Abstract {

    /**
     * @return mixed
     */
    public function getGiftboxCollection() {
        $quote = Mage::getSingleton('adminhtml/session_quote')->getQuote();
        $collection = Mage::getModel('giftwrap/selection')->getCollection()
                ->addFieldToFilter('quote_id', $quote->getId())
        ;
        return $collection;
    }

    /**
     * @param $product
     * @return mixed
     */
    public function getParentId($product) {
        if ($product->getVisibility() == '1') {
            $parentIds = Mage::getModel('catalog/product_type_grouped')->getParentIdsByChild($product->getId()); // check for grouped product
            if (!$parentIds)
                $parentIds = Mage::getModel('catalog/product_type_configurable')->getParentIdsByChild($product->getId()); //check for config product
        }
        return $parentIds;
    }

}
