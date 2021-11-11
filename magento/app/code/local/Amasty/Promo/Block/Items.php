<?php

/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */
class Amasty_Promo_Block_Items extends Mage_Catalog_Block_Product_Abstract
{
    /**
     * @return string
     */
    public function getFormActionUrl()
    {
        $returnUrl = Mage::getUrl('*/*/*', array('_use_rewrite' => true, '_current' => true));

        $params = array(
            Mage_Core_Controller_Front_Action::PARAM_NAME_URL_ENCODED => Mage::helper('core')->urlEncode($returnUrl)
        );
        $secureParam = array('_secure' => false);
        if (Mage::app()->getStore()->isCurrentlySecure())
            $secureParam = array('_secure' => true);

        return $this->getUrl('ampromo/cart/update', $secureParam, $params);
    }

    /**
     * prepare layout
     */
    protected function _prepareLayout()
    {
        $helper = Mage::helper('ampromo');
        /** @var Amasty_Promo_Helper_Data $products */
        //force reload new items collection, possible changes in quote object
        $products = $helper->getNewItems(true);
        $this->setNewItems($products);
    }

    /**
     * @return mixed|string
     * @throws Exception
     */
    protected function _getReferer()
    {
        if ($this->getRequest()->isXmlHttpRequest()) {
            $referer = $this->getRequest()->getServer('HTTP_REFERER');
        } else {
            $referer = Mage::getUrl('*/*/*', array('_current' => true, '_use_rewrite' => true));
        }

        $referer = Mage::helper('core')->urlEncode($referer);

        return $referer;
    }

    /**
     * @param Mage_Catalog_Model_Product $product
     * @param bool|false $displayMinimalPrice
     * @param string $idSuffix
     * @return mixed|string
     */
    public function getPriceHtml($product, $displayMinimalPrice = false, $idSuffix = '')
    {
        if ($product->getAmpromoShowOrigPrice()) {

            if ($product->getTypeId() == 'giftcard') {
                $_amount = Mage::helper("ampromo")->getGiftcardAmounts($product);
                $_amount = array_shift($_amount);
                $product->setPrice($_amount);
            }

            $html = parent::getPriceHtml($product, $displayMinimalPrice, $idSuffix);

            if ($product->getSpecialPrice() == 0) {
                $html = str_replace('regular-price', 'old-price', $html);
            }
            return $html;
        }

        return "";
    }
}
