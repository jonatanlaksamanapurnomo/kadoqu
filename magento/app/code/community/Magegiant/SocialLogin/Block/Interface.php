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
interface Magegiant_SocialLogin_Block_Interface
{
    /**
     * get image for social login
     *
     * @return button url
     */
    public function getButtonImage();

    /**
     * get social url
     *
     * @return return social url
     */
    public function getLoginUrl();

    /**
     * get label for button
     *
     * @return mixed
     */
//    public function getButtonLabel();
}