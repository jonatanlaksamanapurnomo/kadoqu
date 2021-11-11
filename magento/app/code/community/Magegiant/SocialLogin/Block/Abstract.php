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
class Magegiant_SocialLogin_Block_Abstract extends Mage_Core_Block_Template
{
    protected $buttons;
    protected $_helper;

    public function __construct()
    {
        parent::_construct();
        $this->_helper = Mage::helper('sociallogin');
        $this->buttons = array();
    }

    /**
     * check social system is enabled or not
     *
     * @return boolean
     */
    public function isEnabled()
    {
        return Mage::helper('sociallogin')->isEnabled();
    }

    /**
     * Render block HTML
     *
     * @return string
     */
    protected function _toHtml()
    {
        if (!$this->isEnabled() || Mage::getSingleton('customer/session')->isLoggedIn()) {
            return '';
        }

        return parent::_toHtml();
    }

    /**
     * get postion config
     *
     * @return type
     */
    public function getShownPositions()
    {
        $shownpositions = $this->_helper->getGeneralConfig('position');
        $shownpositions = explode(',', $shownpositions);

        return $shownpositions;
    }

    /**
     * get direction to set position of social login
     *
     * @return type
     */
    public function getDirection()
    {
        return $this->_helper->getGeneralConfig('direction');
    }

    /**
     * get popup config
     *
     * @param $code
     * @return mixed
     */
    public function getPopupConfig($code)
    {
        return Mage::helper('sociallogin')->getGeneralConfig($code);
    }

    /**
     * add social button
     *
     * @param $block
     * @param $enable
     * @param $id
     * @param $sort
     */
    public function addSocialButton($button, $enable, $id, $sort)
    {
        $data       = array(
            'button'  => $button->toHtml(),
            'enabled' => $enable,
            'id'      => $id,
            'sort'    => $sort,
        );
        $new_button = new Varien_Object();
        $new_button->setData($data);
        $this->buttons[$new_button->getSort()] = $new_button;
        if (intval($sort) > 0) {
            ksort($this->buttons);
        }

        return $this;
    }

}
