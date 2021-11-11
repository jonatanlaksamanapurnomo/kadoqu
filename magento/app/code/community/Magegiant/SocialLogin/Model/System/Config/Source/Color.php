<?php

/**
 * MageGiant
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magegiant.com license that is
 * available through the world-wide-web at this URL:
 * http://www.magegiant.com/license-agreement.html
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @copyright   Copyright (c) 2014 Magegiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement.html
 */
class Magegiant_SocialLogin_Model_System_Config_Source_Color
{
    /**
     * Options getter
     *
     * @return array
     */
    public function toOptionArray()
    {
        return array(
            array('value' => '#3399cc', 'label' => Mage::helper('sociallogin')->__('Default')),
            array('value' => 'orange', 'label' => Mage::helper('sociallogin')->__('Orange')),
            array('value' => 'green', 'label' => Mage::helper('sociallogin')->__('Green')),
            array('value' => 'black', 'label' => Mage::helper('sociallogin')->__('Black')),
            array('value' => 'blue', 'label' => Mage::helper('sociallogin')->__('Blue')),
            array('value' => 'darkblue', 'label' => Mage::helper('sociallogin')->__('Dark Blue')),
            array('value' => 'pink', 'label' => Mage::helper('sociallogin')->__('Pink')),
            array('value' => 'red', 'label' => Mage::helper('sociallogin')->__('Red')),
            array('value' => 'violet', 'label' => Mage::helper('sociallogin')->__('Violet')),
            array('value' => 'custom', 'label' => Mage::helper('sociallogin')->__('Custom')),
        );
    }
}
