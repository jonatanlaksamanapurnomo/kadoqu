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
class Magegiant_GgLogin_Model_Frontend_Observer
{
    /**
     * process controller_action_predispatch event
     *
     * @return Magegiant_GgLogin_Model_Observer
     */
    public function addGgButton($observer)
    {
        if (!Mage::helper('gglogin')->isEnabled())
            return $this;
        $current = $observer->getCurrent();
        $button  = Mage::helper('gglogin')->getGgButton();
        $enable  = Mage::helper('gglogin')->isEnabled();
        $sort    = Mage::helper('gglogin')->getSortOrder();
        $current->addSocialButton($button, $enable, 'bt-logingg', $sort);

        return $this;
    }
}