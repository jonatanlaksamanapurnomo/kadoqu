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
class Magegiant_SocialLogin_Block_Adminhtml_System_Config_Form_Field_RedirectUrl
    extends Mage_Adminhtml_Block_System_Config_Form_Field
{
    protected function _getElementHtml(Varien_Data_Form_Element_Abstract $element)
    {
        $html_id     = $element->getHtmlId();
        $redirectUrl = $this->_redirectUrl($element);
        $redirectUrl = str_replace('index.php/', '', $redirectUrl);
        $html        = '<input readonly id="' . $html_id . '" class="input-text" value="' . $redirectUrl . '" onclick="this.select()">';

        return $html;
    }

    protected function _redirectUrl($element)
    {
        $htmlId       = $element->getHtmlId();
        $media_folder = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . 'sociallogin/config/';
        switch ($htmlId) {
            case 'sociallogin_yh_redirect_url':
                $element->setComment('<a href="' . $media_folder . 'yahoo-api-config.png' . '" target="_blank" a>' . $this->__('View Demo') . '</a>');
                $storeId = $this->getRequest()->getParam('store');
                if (!$storeId) {
                    $stores = Mage::app()->getStores(false);
                    foreach ($stores as $store => $value) {
                        if ($value->getStoreId()) {
                            $storeId = $value->getStoreId();
                            Break;
                        }
                    }
                }
                $redirectUrl = str_replace('https://', 'http://', Mage::app()->getStore($storeId)->getUrl(''));
                $domain      = parse_url($redirectUrl);
                $referer     = isset($domain['host']) ? $domain['scheme'] . '://' . $domain['host'] : $redirectUrl;

                return $referer;
            case 'sociallogin_fb_redirect_url':
                //                $element->setComment('<a href="" target="_blank" a>' . $this->__('View Demo') . '</a>');

                return Mage::helper('sociallogin/fb')->getAuthUrl();
            case 'sociallogin_gg_redirect_url':
                //                $element->setComment('<a href="" target="_blank" a>' . $this->__('View Demo') . '</a>');

                return Mage::getUrl('gglogin/index/callback');
            case 'sociallogin_wp_redirect_url':
                //                $element->setComment('<a href="" target="_blank" a>' . $this->__('View Demo') . '</a>');

                return Mage::getUrl('wplogin/index/callback');
            case 'sociallogin_live_redirect_url':
                //                $element->setComment('<a href="" target="_blank" a>' . $this->__('View Demo') . '</a>');

                return Mage::getUrl('livelogin/index/callback');
            case 'sociallogin_tw_redirect_url':
                //                $element->setComment('<a href="" target="_blank" a>' . $this->__('View Demo') . '</a>');
                return Mage::getUrl('twlogin/index/callback',array('_secure'=>true));
            default:
                return '';
        }
    }
}
