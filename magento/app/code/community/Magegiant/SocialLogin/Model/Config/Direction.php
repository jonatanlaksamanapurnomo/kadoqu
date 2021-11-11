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
 * SocialLogin  Model
 * 
 * @category    MageGiant
 * @package     MageGiant_SocialLogin
 * @author      MageGiant Developer
 */
class Magegiant_SocialLogin_Model_Config_Direction
{
    const LEFT_TO_RIGHT    = 'ltr';
    const RIGHT_TO_LEFT    = 'rtl';
    public function toOptionArray()
    {
        return array(
            array('value' => self::LEFT_TO_RIGHT, 'label'=>Mage::helper('sociallogin')->__('Left to Right')),
            array('value' => self::RIGHT_TO_LEFT, 'label'=>Mage::helper('sociallogin')->__('Right to Left')),
		);
    }
}