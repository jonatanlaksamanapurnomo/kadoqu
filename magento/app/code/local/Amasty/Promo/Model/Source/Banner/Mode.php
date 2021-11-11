<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */


class Amasty_Promo_Model_Source_Banner_Mode
{
    public function toOptionArray()
    {
        return array(
            array(
                'value' => Amasty_Promo_Block_Banner::MODE_PRODUCT,
                'label' => Mage::helper('ampromo')->__('Product')
            ),
            array(
                'value' => Amasty_Promo_Block_Banner::MODE_CART,
                'label' => Mage::helper('ampromo')->__('Cart')
            )
        );
    }
}