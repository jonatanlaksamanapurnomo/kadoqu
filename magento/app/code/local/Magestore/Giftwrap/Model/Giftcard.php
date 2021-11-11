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

class Magestore_Giftwrap_Model_Giftcard extends Mage_Core_Model_Abstract {

    /**
     * @var string
     */
    protected $_eventPrefix = 'giftwrap_giftcard';
    /**
     * @var string
     */
    protected $_eventObject = 'giftcard';

    /**
     *
     */
    public function _construct() {
        parent::_construct();
        $this->_init('giftwrap/giftcard');
    }

    /**
     * @param $giftcard_id
     * @param $store_id
     * @return mixed
     */
    public function getStoreGiftcard($giftcard_id, $store_id) {
        $option_id = Mage::getModel('giftwrap/giftcard')->load($giftcard_id)->getOptionId();
        $giftcard = Mage::getModel('giftwrap/giftcard')
                ->getCollection()
                ->addFieldToFilter('option_id', $option_id)
                ->addFieldToFilter('store_id', $store_id)
                ->getFirstItem()
        ;
        return $giftcard;
    }

    /**
     * @param $optionId
     * @param $storeId
     * @return mixed
     */
    public function loadByOptionAndStore($optionId, $storeId) {
        $model = Mage::getModel('giftwrap/giftcard');
        $collection = Mage::getModel('giftwrap/giftcard')->getCollection()
                ->addFieldToFilter('option_id', $optionId)
                ->addFieldToFilter('store_id', $storeId)
        ;
        if (count($collection)) {
            return $model->load($collection->getFirstItem()->getId());
        }
        return $model;
    }

}