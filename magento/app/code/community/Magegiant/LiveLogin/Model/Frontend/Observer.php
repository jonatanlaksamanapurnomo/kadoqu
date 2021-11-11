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
 * LiveLogin Observer Model
 *
 * @category    MageGiant
 * @package     MageGiant_LiveLogin
 * @author      MageGiant Developer
 */
class Magegiant_LiveLogin_Model_Frontend_Observer
{
    /**
     * process social buttion create before
     *
     * @return Magegiant_GgLogin_Model_Observer
     */
    public function addLiveButton($observer)
    {
        if (!Mage::helper('livelogin')->isEnabled())
            return $this;
        $current = $observer->getCurrent();
        $button  = Mage::helper('livelogin')->getLiveButton();
        $enable  = Mage::helper('livelogin')->isEnabled();
        $sort    = Mage::helper('livelogin')->getSortOrder();
        $current->addSocialButton($button, $enable, 'bt-livelogin', $sort);

        return $this;
    }
}