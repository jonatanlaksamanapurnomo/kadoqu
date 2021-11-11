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
class Magestore_Giftwrap_Model_Mysql4_Selection extends Mage_Core_Model_Mysql4_Abstract
{
    /**
     *
     */
    protected function _construct() {
        $this->_init('giftwrap/selection', 'id');
    }

    /**
     * @param $selection
     * @param $quoteId
     * @param $itemId
     * @return $this
     */
    public function loadByQuoteId($selection, $quoteId, $itemId) {
        $read = $this->_getReadAdapter();
        if ($read) {
            $select = $read->select();
            $select->from($this->getTable('giftwrap/selection'))
                ->where('quote_id = ?', $quoteId)
                ->where('item_id = ?', $itemId)
                ->limit(1);

            $data = $read->fetchRow($select);
            if ($data) {
                $selection->setData($data);
            }
        }
        $this->_afterLoad($selection);
        return $this;
    }

    /**
     * @param $quoteId
     * @return $this
     */
    public function removeAllSelection($quoteId) {
        $condition = $this->_getWriteAdapter()->quoteInto('quote_id=?', $quoteId);
        $this->_getWriteAdapter()->delete(
            $this->getTable('giftwrap/selection'),
            $condition
        );
        return $this;
    }


}