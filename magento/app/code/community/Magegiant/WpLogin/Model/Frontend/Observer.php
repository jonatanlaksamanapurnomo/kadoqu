<?php
/**
 * MageGiant
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the MageGiant.com license that is
 * available through the world-wide-web at this URL:
 * http://magegiant.com/license-agreement/
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    MageGiant
 * @package     MageGiant_WpLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * WpLogin Observer Model
 *
 * @category    MageGiant
 * @package     MageGiant_WpLogin
 * @author      MageGiant Developer
 */
class Magegiant_WpLogin_Model_Frontend_Observer
{
    /**
     * add WordPress Button
     *
     * @param $observer
     * @return $this
     */
    public function addWpButton($observer)
    {
        if (!Mage::helper('wplogin')->isEnabled())
            return $this;
        $current = $observer->getCurrent();
        $button  = Mage::helper('wplogin')->getWpButton();
        $enable  = Mage::helper('wplogin')->isEnabled();
        $sort    = Mage::helper('wplogin')->getSortOrder();
        $current->addSocialButton($button, $enable, 'bt-wplogin', $sort);

        return $this;
    }
}