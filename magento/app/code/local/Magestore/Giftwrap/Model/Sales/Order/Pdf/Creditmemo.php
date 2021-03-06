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
class Magestore_Giftwrap_Model_Sales_Order_Pdf_Creditmemo extends Mage_Sales_Model_Order_Pdf_Creditmemo
{
    /**
     * @param array $creditmemos
     * @return Zend_Pdf
     */
    public function getPdf($creditmemos = array()) {
        $this->_beforeGetPdf();
        $this->_initRenderer('creditmemo');
        $pdf = new Zend_Pdf();
        $this->_setPdf($pdf);
        $style = new Zend_Pdf_Style();
        $this->_setFontBold($style, 10);

        foreach ($creditmemos as $creditmemo) {
            if ($creditmemo->getStoreId()) {
                Mage::app()->getLocale()->emulate($creditmemo->getStoreId());
                Mage::app()->setCurrentStore($creditmemo->getStoreId());
            }
            $page = $pdf->newPage(Zend_Pdf_Page::SIZE_A4);
            $pdf->pages[] = $page;
            $order = $creditmemo->getOrder();
            /* Add image */
            $this->insertLogo($page, $creditmemo->getStore());
            /* Add address */
            $this->insertAddress($page, $creditmemo->getStore());
            /* Add head */
            $this->insertOrder($page, $order,
                Mage::getStoreConfigFlag(
                    self::XML_PATH_SALES_PDF_INVOICE_PUT_ORDER_ID, $order->getStoreId()));

            $page->setFillColor(new Zend_Pdf_Color_GrayScale(666));
            $this->_setFontRegular($page);
            $page->drawText(
                Mage::helper('sales')->__('Creditmemo # ') . $creditmemo->getIncrementId(),
                35, 800, 'UTF-8');
            /* Add table */
            $page->setFillColor(new Zend_Pdf_Color_RGB(0.93, 0.92, 0.92));
            $page->setLineColor(new Zend_Pdf_Color_GrayScale(0.5));
            $page->setLineWidth(0.5);
            $page->drawRectangle(25, $this->y, 570, $this->y - 15);
            $this->y -= 10;
            /* Add table head */
            $page->setFillColor(new Zend_Pdf_Color_RGB(0.4, 0.4, 0.4));
            $page->drawText(Mage::helper('sales')->__('Products'), 35, $this->y,
                'UTF-8');
            //            $page->drawText(Mage::helper('sales')->__('SKU'), 255, $this->y, 'UTF-8');
            $page->drawText(Mage::helper('sales')->__('Price'), 380,
                $this->y, 'UTF-8');
            $page->drawText(Mage::helper('sales')->__('Qty'), 430, $this->y,
                'UTF-8');
            $page->drawText(Mage::helper('sales')->__('Tax'), 480, $this->y,
                'UTF-8');
            $page->drawText(Mage::helper('sales')->__('Subtotal'), 530,
                $this->y, 'UTF-8');
            $this->y -= 15;
            $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));
            /* Add body */
            foreach ($creditmemo->getAllItems() as $item) {
                if ($item->getOrderItem()->getParentItem()) {
                    continue;
                }
                if ($this->y < 15) {
                    $page = $this->newPage(array('table_header' => true));
                }
                /* Draw item */
                $page = $this->_drawItem($item, $page, $order);
                $page->setLineWidth(0.5);
                $page->setLineColor(new Zend_Pdf_Color_GrayScale(0.5));
                $page->drawLine(25, $this->y, 570, $this->y);
                $this->y -= 10;
            }
            // Output Giftwrap Information
            $gifBlock = Mage::getBlockSingleton('giftwrap/adminhtml_sales_order_view_tab_giftwrap');
            $giftwrapItems = $gifBlock->getCreditmemoItemGiftwrap();
            if (count($giftwrapItems)) {
                /* Add table */
                $page->setFillColor(new Zend_Pdf_Color_RGB(0.93, 0.92, 0.92));
                $page->setLineColor(new Zend_Pdf_Color_GrayScale(0.5));
                $page->setLineWidth(0.5);
                $page->drawRectangle(25, $this->y, 570, $this->y - 15);
                $this->y -= 10;
                /* Add table head */
                $page->setFillColor(new Zend_Pdf_Color_RGB(0.4, 0.4, 0.4));
                $page->drawText(Mage::helper('sales')->__('Item #'), 35, $this->y, 'UTF-8');
                $page->drawText(Mage::helper('sales')->__('Product'), 70, $this->y, 'UTF-8');
                $page->drawText(Mage::helper('sales')->__('Gift Wrap'), 200, $this->y, 'UTF-8');
                $page->drawText(Mage::helper('sales')->__('Gift Card'), 300, $this->y, 'UTF-8');
                $page->drawText(Mage::helper('sales')->__('Message'), 400, $this->y, 'UTF-8');
                //$page->drawText(Mage::helper('sales')->__('Quatity'), 440, $this->y, 'UTF-8');
                $page->drawText(Mage::helper('sales')->__('Subtotal'), 520, $this->y, 'UTF-8');
                $this->y -= 15;
                $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));
                /* Add body */
                $i = 0;
                foreach ($giftwrapItems as $giftwrapItem) {
                    $i++;
                    if ($this->y < 80) {
                        $page = $this->newPage(
                            array('table_header' => true));
                    }
                    $page->drawText($i, 35, $this->y - 20, 'UTF-8');
                    $giftwrapItemId = Mage::getModel('giftwrap/selectionitem')->getCollection()
                        ->addFieldToFilter('selection_id', $giftwrapItem["id"])->getFirstItem()->getItemId();
                    $orderItemId = Mage::getModel('sales/order_item')->getCollection()
                        ->addFieldToFilter('quote_item_id', $giftwrapItemId)
                        ->getFirstItem()->getItemId();
                    $creditmemoItem = Mage::getModel('sales/order_creditmemo_item')->getCollection()
                        ->addFieldToFilter('order_item_id', $orderItemId)->getFirstItem();
                    $selectionId = $giftwrapItem["id"];
                    $this->drawGiftProduct($creditmemoItem->getProductId(), $pdf, $page, $creditmemoItem);
                    $page->drawText($gifBlock->getGiftwrapStyleName($giftwrapItem['style_id']), 200, $this->y - 65, 'UTF-8');
                    $image = $gifBlock->getGiftwrapStyleImage($giftwrapItem['style_id']);
                    $giftboxitems = Mage::getModel('giftwrap/selectionitem')->getCollection()
                        ->addFieldToFilter('selection_id', $selectionId);
                    $numberitems = 0;
                    foreach ($giftboxitems as $giftboxitem) {
                        $numberitems += $giftboxitem->getQty();
                    }
                    $pricegiftbox = Mage::getModel('giftwrap/giftwrap')->load($giftwrapItem['style_id'])->getPrice();
                    $pricegiftcard = Mage::getModel('giftwrap/giftcard')->load($giftwrapItem['giftcard_id'])->getprice();
                    if ($giftwrapItem['calculate_by_item'] == '1') {
                        $subtotal = ($pricegiftbox + $pricegiftcard) * $numberitems;
                    } else {
                        $subtotal = $pricegiftbox + $pricegiftcard;
                    }
                    $subtotal = Mage::helper('core')->currency($subtotal, true, false);
                    $page->drawText($subtotal, 535, $this->y - 10, 'UTF-8');
                    if ($image) {
                        $fileExtension = end(explode(".", $image));
                        $fileExtension = strtolower($fileExtension);
                        switch ($fileExtension) {
                            case 'tif':
                                $check = 1;
                                break;
                            case 'tiff':
                                $check = 1;
                                break;
                            case 'png':
                                $check = 1;
                                break;
                            case 'jpg':
                                $check = 1;
                                break;
                            case 'jpe':
                                $check = 1;
                                break;
                            case 'jpeg':
                                $check = 1;
                                break;
                            default:
                                $check = 0;
                                break;
                        }
                        if ($check == 1) {
                            $image = Mage::getBaseDir('media') . DS . 'giftwrap' . DS . $image;
                            if ($image) {
                                $this->insertImageGif($page, $image, $creditmemo->getStore(), $this->y);
                            } else {
                                $page->drawText(Mage::helper('sales')->__('No Image'), 300, $this->y - 10, 'UTF-8');
                            }
                        } else {
                            $page->drawText(Mage::helper('sales')->__('Unsupported type.'), 300, $this->y, 'UTF-8');
                        }
                    } else {
                        $page->drawText(Mage::helper('sales')->__('No Image'), 300, $this->y - 10, 'UTF-8');
                    }
                    $page->drawText($gifBlock->getGiftcardName($giftwrapItem['giftcard_id']), 300, $this->y - 65, 'UTF-8');
                    $this->drawGiftcard($page, $gifBlock, $giftwrapItem['giftcard_id'], $creditmemo);
                    $this->drawGift($giftwrapItem, $pdf, $page);
                    if ($check == 1) {
                        $this->y -= 60;
                    } else {
                        $this->y -= 15;
                    }

                }
            }
            /* Add totals */
            $this->insertTotals($page, $creditmemo);
            if ($creditmemo->getStoreId()) {
                Mage::app()->getLocale()->revert();
            }
        }
        $this->_afterGetPdf();
        return $pdf;
    }

    /**
     * @param $page
     * @param $gifBlock
     * @param $giftcardId
     * @param $creditmemo
     */
    public function drawGiftcard(&$page, $gifBlock, $giftcardId, $creditmemo) {

        $image = $gifBlock->getGiftcardImage($giftcardId);
        if ($image) {
            $fileExtension = end(explode(".", $image));
            switch ($fileExtension) {
                case 'tif':
                    $check = 1;
                    break;
                case 'tiff':
                    $check = 1;
                    break;
                case 'png':
                    $check = 1;
                    break;
                case 'jpg':
                    $check = 1;
                    break;
                case 'jpe':
                    $check = 1;
                    break;
                case 'jpeg':
                    $check = 1;
                    break;
                default:
                    $check = 0;
                    break;
            }

            if ($check == 1) {
                $image = Mage::getBaseDir('media') . DS . 'giftwrap' . DS . 'giftcard' . DS . $image;
                if (is_file($image)) {
                    $this->insertImageGif($page, $image, $creditmemo->getStore(),
                        $this->y, 290);
                } else {
                    $page->drawText(Mage::helper('sales')->__('No Image'), 300, $this->y - 10, 'UTF-8');
                }
            } else {
                $page->drawText(Mage::helper('sales')->__('Unsupported type.'),
                    300, $this->y, 'UTF-8');
            }
        } else {
            $page->drawText(Mage::helper('sales')->__('No Image'), 300, $this->y - 10, 'UTF-8');
        }
    }

    /**
     * @param $page
     * @param $image
     * @param $store
     * @param $y
     * @param null $x
     * @return mixed
     */
    protected function insertImageGif($page, $image, $store = null, $y, $x = null) {
        $image = Zend_Pdf_Image::imageWithPath($image);
        if (!$x) {
            $page->drawImage($image, 190, $y - 55, 250, $y);
        } else {
            $page->drawImage($image, $x, $y - 55, $x + 60, $y);
        }
        return $page;
    }

    /**
     * @param $giftwrapItem
     * @param $pdf
     * @param $page
     */
    public function drawGift($giftwrapItem, $pdf, $page) {
        $lines = array();
        $lines[0][] = array('text' => Mage::helper('core/string')->str_split($giftwrapItem['message'], 35), 'feed' => 370);
        $lineBlock = array('lines' => $lines, 'height' => 10);
        $page = $this->drawLineBlocks($page, array($lineBlock),
            array('table_header' => true));
        $this->setPage($page);
    }

    /**
     * @param $productId
     * @param $pdf
     * @param $page
     * @param $creditmemoItem
     */
    public function drawGiftProduct($productId, $pdf, $page, $creditmemoItem) {
        $gifBlock = Mage::getBlockSingleton('giftwrap/adminhtml_sales_order_view_tab_giftwrap');
        $lines = array();
        $lines[0][] = array('text' => Mage::helper('core/string')->str_split($gifBlock->getProduct($productId)->getName() . ' - ' . (int)$creditmemoItem->getQty() . ' item(s)', 26), 'feed' => 60);
        $lineBlock = array('lines' => $lines, 'height' => 10);
        $page = $this->drawLineBlocks($page, array($lineBlock), array('table_header' => true));
        $this->setPage($page);
    }
}