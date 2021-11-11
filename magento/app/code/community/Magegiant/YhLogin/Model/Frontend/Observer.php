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
 * YhLogin Observer Model
 *
 * @category    MageGiant
 * @package     MageGiant_YhLogin
 * @author      MageGiant Developer
 */
class Magegiant_YhLogin_Model_Frontend_Observer
{
    /**
     * process social buttion create before
     *
     * @return Magegiant_GgLogin_Model_Observer
     */
    public function addYhButton($observer)
    {
        if (!Mage::helper('yhlogin')->isEnabled())
            return $this;
        $current = $observer->getCurrent();
        $button  = Mage::helper('yhlogin')->getYhButton();
        $enable = Mage::helper('yhlogin')->isEnabled();
        $sort   = Mage::helper('yhlogin')->getSortOrder();
        $current->addSocialButton($button, $enable, 'bt-yalogin', $sort);
        return $this;
    }
}