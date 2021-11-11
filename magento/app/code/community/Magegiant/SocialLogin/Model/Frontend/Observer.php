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
 * @package     MageGiant_SocialLogin
 * @copyright   Copyright (c) 2014 MageGiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * SocialLogin Observer Model
 *
 * @category    MageGiant
 * @package     MageGiant_SocialLogin
 * @author      MageGiant Developer
 */
class Magegiant_SocialLogin_Model_Frontend_Observer
{
    /**
     * process controller_action_core block to html after
     *
     * @return Magegiant_SocialLogin_Model_Observer
     */
    public function addButtonTopTopMenu($observer)
    {
        $position_topmenu = Magegiant_SocialLogin_Model_Config_Position::POSITION_TOP_MENU;
        if (!in_array($position_topmenu, Mage::helper('sociallogin')->getPosition()))
            return $this;
        $menu = $observer->getMenu();
        $tree = $menu->getTree();
        // Children menu items
        $buttons = Mage::getBlockSingleton('sociallogin/sociallogin')->getSocialButton();
        foreach ($buttons as $button) {
            if ($button->getEnabled()) {
                $node = new Varien_Data_Tree_Node(array(
                    'name'  => $button->getButton(),
                    'id'    => $button->getId(),
                    'class' => 'social-button',
                    'url'   => Mage::getUrl(),
                ), 'id', $tree, $menu);
                $menu->addChild($node);
            }
        }
    }
}