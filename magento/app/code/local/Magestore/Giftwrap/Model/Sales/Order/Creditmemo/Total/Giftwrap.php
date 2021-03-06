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
class Magestore_Giftwrap_Model_Sales_Order_Creditmemo_Total_Giftwrap extends Mage_Sales_Model_Order_Total_Abstract
{


    /**
     * @param Mage_Sales_Model_Order_Creditmemo $creditmemo
     * @return $this
     */
    public function collect(Mage_Sales_Model_Order_Creditmemo $creditmemo) {
        $creditmemo->setGiftwrapAmount(0);
        $totalAmount = 0;
        $totalQtyOfBox = array();
        $totalRefundedOfBox = array();
        $itemOfBox = array();
        $parentItemChildQty = array();
        $giftbox = array();
        $parentItemOrderedQty = array();
        $prepareQty = array();
        $order_id = Mage::app()->getRequest()->getParam('order_id');
        $order = $creditmemo->getOrder();
        $tax_info = $order->getFullTaxInfo();
        $rate = $tax_info[0]['percent'];
        //get all gitbox of order
        $giftboxes = Mage::getModel('giftwrap/selection')
            ->getCollection()
            ->addFieldToFilter('order_id', $order_id)
            ->addFieldToFilter('is_invoiced', 1);
        foreach ($giftboxes as $gbox) {
            $totalQtyOfBox[$gbox->getId()] = 0;
            $totalRefundedOfBox[$gbox->getId()] = 0;
            $giftboxItemCollection = Mage::getModel('giftwrap/selectionitem')
                ->getCollection()
                ->addFieldToFilter('selection_id', $gbox->getId());
            foreach ($giftboxItemCollection as $giftboxItem) {
                $totalQtyOfBox[$gbox->getId()] += (int)$giftboxItem->getQty();
                $orderItem = Mage::getModel('sales/order_item')->getCollection()
                    ->addFieldToFilter('quote_item_id', $giftboxItem->getItemId())
                    ->getFirstItem();
                $itemOfBox[$orderItem->getItemId()] = $gbox->getId();
                $totalRefundedOfBox[$gbox->getId()] += (int)$orderItem->getQtyRefunded();
            }
        }
        foreach ($creditmemo->getAllItems() as $item) {
            $orderItem = Mage::getModel('sales/order_item')->getCollection()
                ->addFieldToFilter('item_id', $item->getOrderItemId())
                ->getFirstItem();
            if (!$orderItem->getParentItemId() && $item->getQty() > 0) {
                if (isset($itemOfBox[$item->getOrderItemId()])) {
                    $prepareQty[$itemOfBox[$item->getOrderItemId()]] += ((int)$totalRefundedOfBox[$itemOfBox[$item->getOrderItemId()]] + (int)$item->getQty());
                    if ($prepareQty[$itemOfBox[$item->getOrderItemId()]] == (int)$totalQtyOfBox[$itemOfBox[$item->getOrderItemId()]]) {
                        $giftwrapPrice = 0;
                        $giftcardPrice = 0;
                        $selection = Mage::getModel('giftwrap/selection')->load($itemOfBox[$item->getOrderItemId()]);
                        $giftbox[] = $selection->getId();
                        $giftwrapPrice += (float)Mage::getModel('giftwrap/giftwrap')->load($selection->getStyleId())
                            ->getPrice();
                        if ($selection->getGiftcardId()) {
                            $giftcardPrice += (float)Mage::getModel('giftwrap/giftcard')->load($selection->getGiftcardId())
                                ->getPrice();
                        }
                        if ($selection->getCalculateByItem()) {
                            $totalQtyInBox = $totalQtyOfBox[$selection->getId()];
                            $totalAmount += $totalQtyInBox * ($giftwrapPrice + $giftcardPrice);
                        } else {
                            $totalAmount += ($giftwrapPrice + $giftcardPrice);
                        }
                    }
                }
            } else {
                $parentItemChildQty[$orderItem->getParentItemId()] += ((int)$orderItem->getQtyRefunded() + (int)$item->getQty());
                $parentItemOrderedQty[$orderItem->getParentItemId()] += (int)$orderItem->getQtyOrdered();
            }
        }
        if (count($parentItemChildQty) > 0) {
            foreach ($parentItemChildQty as $orderItemId => $qty) {
                $orderItem = Mage::getModel('sales/order_item')->load($orderItemId);
                $quoteItemId = $orderItem->getQuoteItemId();
                $selectionItem = Mage::getResourceModel('giftwrap/selectionitem_collection')->addFieldToFilter('item_id', $quoteItemId)->getFirstItem();
                $selection = Mage::getModel('giftwrap/selection')->load($selectionItem->getSelectionId());
                $giftwrapPrice = 0;
                $giftcardPrice = 0;
                $totalQtyInBox = 0;
                $giftwrapPrice += (float)Mage::getModel('giftwrap/giftwrap')->load($selection->getStyleId())
                    ->getPrice();
                if ($selection->getGiftcardId()) {
                    $giftcardPrice += (float)Mage::getModel('giftwrap/giftcard')->load($selection->getGiftcardId())
                        ->getPrice();
                }
                $key = array_search($selection->getId(), $giftbox);
                if ($key !== false) {
                    if ($qty != $parentItemOrderedQty[$orderItemId]) {
                        if ($selection->getCalculateByItem()) {
                            $selectionItems = Mage::getResourceModel('giftwrap/selectionitem_collection')
                                ->addFieldToFilter('selection_id', $selection->getId());
                            foreach ($selectionItems as $sItem) {
                                $totalQtyInBox += $sItem->getQty();
                            }
                            $totalAmount -= $totalQtyInBox * ($giftwrapPrice + $giftcardPrice);
                        } else {
                            $totalAmount -= ($giftwrapPrice + $giftcardPrice);
                        }
                        unset($giftbox[$key]);
                    }
                } else {
                    $qtyToRefund = (int)$qty;
                    if ($qtyToRefund == (int)$parentItemOrderedQty[$orderItemId]) {
                        $giftbox[] = $selection->getId();
                        if ($selection->getCalculateByItem()) {
                            $selectionItems = Mage::getResourceModel('giftwrap/selectionitem_collection')->addFieldToFilter('selection_id', $selection->getId());
                            foreach ($selectionItems as $sItem) {
                                $totalQtyInBox += $sItem->getQty();
                            }
                            $totalAmount += $totalQtyInBox * ($giftwrapPrice + $giftcardPrice);
                        } else {
                            $totalAmount += ($giftwrapPrice + $giftcardPrice);
                        }
                    }
                }
            }
        }
        $giftbox = array_filter($giftbox);
        Mage::getSingleton('adminhtml/session')->setSubtotalGiftwrap($totalAmount);
        Mage::getSingleton('adminhtml/session')->setGiftboxRefund($giftbox);
        $lastId = $creditmemo->getItemsCollection()->getLastItem()->getId();
        Mage::getSingleton('adminhtml/session')->setLastId($lastId);
        $orderGiftwrapAmount = $totalAmount;
        if (Mage::getStoreConfig('giftwrap/calculation/active', Mage::app()->getStore(true)->getId())) {
            if ($rate) {
                $orderGiftwrapTax = $totalAmount * $rate;
            }
        }

        if ($orderGiftwrapAmount || $orderGiftwrapAmount == 0) {
            $creditmemo->setGiftwrapAmount($orderGiftwrapAmount);
            $creditmemo->setGrandTotal($creditmemo->getGrandTotal() + $orderGiftwrapAmount);
            $creditmemo->setBaseGrandTotal($creditmemo->getBaseGrandTotal() + $orderGiftwrapAmount);
            if ($orderGiftwrapTax) {
                $creditmemo->setGiftwrapTax($orderGiftwrapTax);
                $creditmemo->setGrandTotal($creditmemo->getGrandTotal() + $orderGiftwrapTax);
                $creditmemo->setBaseGrandTotal($creditmemo->getBaseGrandTotal() + $orderGiftwrapTax);
            }
        }
        return $this;
    }

}
