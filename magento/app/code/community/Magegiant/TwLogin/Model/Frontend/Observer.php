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
 * @package     MageGiant_GgLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * GgLogin Observer Model
 *
 * @category    MageGiant
 * @package     MageGiant_GgLogin
 * @author      MageGiant Developer
 */
class Magegiant_TwLogin_Model_Frontend_Observer
{
    /**
     *
     * @return Magegiant_TwLogin_Model_Observer
     */
    public function addTwButton($observer)
    {
        if (!Mage::helper('twlogin')->isEnabled())
            return $this;
        $current = $observer->getCurrent();
        $button  = Mage::helper('twlogin')->getTwButton();
        $enable = Mage::helper('twlogin')->isEnabled();
        $sort   = Mage::helper('twlogin')->getSortOrder();
        $current->addSocialButton($button, $enable, 'bt-twlogin', $sort);
        return $this;
    }
}