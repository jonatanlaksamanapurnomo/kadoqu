<?php

class ShopShark_ThemeConfig_Helper_Data extends Mage_Core_Helper_Abstract {

    public function getMenuCss() {
        $_menutype = Mage::getStoreConfig('milanoconfig/menuoptions/menutype');
        if ($_menutype == 1)
            return "css/menu1.css";
        else
            return "css/menu2.css";
    }

    public function getMenuJs() {
        $_menutype = Mage::getStoreConfig('milanoconfig/menuoptions/menutype');
        if ($_menutype == 1)
            return "shopshark/jquery.megamenu.js";
        else
            return "shopshark/jquery.menu.js";
    }

    public function getStylesCss() {
        $_design_variation = Mage::getStoreConfig('milanoconfig/generaloptions/design_variation');
        if ($_design_variation == 0)
            return "css/styles.css";
        if ($_design_variation == 1)
            return "css/styles-dark.css";
        return "css/styles.css";
    }

    public function getSliderCss() {
        $_design_variation = Mage::getStoreConfig('milanoconfig/generaloptions/design_variation');
        if ($_design_variation == 0)
            return "css/slider.css";
        if ($_design_variation == 1)
            return "css/slider-dark.css";
        return "css/slider.css";
    }

    public function getDesignVariationCss() {
        $_design_variation = Mage::getStoreConfig('milanoconfig/generaloptions/design_variation');
        if ($_design_variation == 1)
            return "css/design1.css";
        if ($_design_variation == 2)
            return "css/design2.css";
        if ($_design_variation == 3)
            return "css/design3.css";
        if ($_design_variation == 4)
            return "css/design4.css";
        if ($_design_variation == 5)
            return "css/design5.css";
        return false;
    }

    public function getISGridPageLimit() {

        $_columnCount = Mage::getStoreConfig('milanoconfig/product_list/column_count');
        $_infinity_scroll_rowCount = Mage::getStoreConfig('milanoconfig/product_list/infinity_scroll_row_count');

        if (($_currentCategory = Mage::registry('current_category')) && ($_customColumnCount = $_currentCategory->getProductsColumnCount()) && $_customColumnCount) {
            $_columnCount = $_customColumnCount;
        }

        if ($_columnCount == 3) {
            $_rowCount = 3;
        } else if ($_columnCount == 4) {
            $_rowCount = 4;
        } else {
            $_rowCount = 2;
        }
        return $_columnCount * $_rowCount * $_infinity_scroll_rowCount;
    }

    public function getHomeNewProductsCatId() {
        $_cat_id = Mage::getStoreConfig('milanoconfig/homeoptions/new_products_cat_id');
        return empty($_cat_id) ? false : $_cat_id;
    }

    public function getHomeSaleProductsCatId() {
        $_cat_id = Mage::getStoreConfig('milanoconfig/homeoptions/sale_products_cat_id');
        return empty($_cat_id) ? false : $_cat_id;
    }

    public function getHomeStyleOfTheDayCatId() {
        $_cat_id = Mage::getStoreConfig('milanoconfig/homeoptions/style_of_the_day_cat_id');
        return empty($_cat_id) ? false : $_cat_id;
    }

}

?>