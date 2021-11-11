<?php

/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */
class Amasty_Promo_Block_Items_Bundle extends Mage_Bundle_Block_Catalog_Product_View_Type_Bundle
{
    /**
     * 
     */
    public function _construct()
    {
        $this->addRenderer('select', 'bundle/catalog_product_view_type_bundle_option_select');
        $this->addRenderer('multi', 'bundle/catalog_product_view_type_bundle_option_multi');
        $this->addRenderer('radio', 'bundle/catalog_product_view_type_bundle_option_radio');
        $this->addRenderer('checkbox', 'bundle/catalog_product_view_type_bundle_option_checkbox');

        return parent::_construct();
    }

    /**
     * @param Mage_Catalog_Model_Product_Option $option
     * @return string
     */
    public function getOptionHtml($option)
    {
        if (!isset($this->_optionRenderers[$option->getType()])) {
            return $this->__("There is no defined renderer for <b>%s</b> option type.", $option->getType());
        }
        return $this->getLayout()->createBlock($this->_optionRenderers[$option->getType()])
            ->setProduct($this->getProduct())
            ->setOption($option)->toHtml();
    }
}
