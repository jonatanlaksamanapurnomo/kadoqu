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

class Magestore_Giftwrap_Block_Cart_Bundle_Item extends Mage_Bundle_Block_Checkout_Cart_Item_Renderer {

    /**
     * @return array
     */
    public function getOptionList() {
        $options = parent::getOptionList();
        $item = $this->getItem();

        $giftwrapItem = Mage::getModel('giftwrap/selectionitem')
                ->getCollection()
                ->addFieldToFilter('item_id', $item->getId())
                ->getFirstItem();
        $giftbox = Mage::getModel('giftwrap/selection')
                ->load($giftwrapItem->getSelectionId());
        $giftwrap = Mage::getModel('giftwrap/giftwrap')
                ->load($giftbox->getStyleId());
        $giftcard = Mage::getModel('giftwrap/giftcard')
                ->load($giftbox->getGiftcardId());
        if ($giftwrapItem->getId()) {
            $options[] = array(
                'label' => Mage::helper('giftwrap')->__('Gift Wrap'),
                'value' => $this->htmlEscape($giftwrap->getTitle()),
            );
            if ($giftcard->getId()) {
                $options[] = array(
                    'label' => Mage::helper('giftwrap')->__('Gift Card'),
                    'value' => $this->htmlEscape($giftcard->getName()),
                );
            }
            if ($giftbox->getMessage()) {
                $options[] = array(
                    'label' => Mage::helper('giftwrap')->__('Gift Message'),
                    'value' => $this->htmlEscape($giftbox->getMessage()),
                );
            }
        }
        return $options;
    }

}