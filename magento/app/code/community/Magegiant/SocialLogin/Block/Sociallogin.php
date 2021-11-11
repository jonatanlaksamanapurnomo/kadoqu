<?php

/**
 * Magegiant
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the magegiant.com license that is
 * available through the world-wide-web at this URL:
 * http://magegiant.com/license-agreement/
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Magegiant
 * @package     Magegiant_SocialLogin
 * @copyright   Copyright (c) 2014 Magegiant (http://magegiant.com/)
 * @license     http://magegiant.com/license-agreement/
 */

/**
 * Sociallogin Block
 *
 * @category    Magegiant
 * @package     Magegiant_SocialLogin
 * @author      Magegiant Developer
 */
class Magegiant_SocialLogin_Block_Sociallogin extends Magegiant_SocialLogin_Block_Abstract
{


    public function __construct()
    {
        parent::__construct();
        //        $this->setTemplate('sociallogin/sociallogin.phtml');
    }

    /**
     * get social button
     *
     * @return array
     */
    public function getSocialButton()
    {
        if (Mage::helper('sociallogin')->isEnabled() && Mage::helper('sociallogin/fb')->getFbConfig('enable')) {
            $fb_data   = array(
                'button'  => Mage::getBlockSingleton('sociallogin/channel_fblogin')->toHtml(),
                'enabled' => Mage::helper('sociallogin/fb')->getFbConfig('enable'),
                'id'      => 'bt-loginfb',
                'sort'    => Mage::helper('sociallogin/fb')->getFbConfig('sort_order'),
            );
            $fb_button = new Varien_Object();
            $fb_button->setData($fb_data);
            $this->buttons[$fb_button->getSort()] = $fb_button;
        }
        Mage::dispatchEvent('social_button_create_before',
            array(
                'buttons' => $this->buttons,
                'current' => $this,
            ));
        ksort($this->buttons);

        return $this->buttons;
    }


}
