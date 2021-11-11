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
class Magegiant_SocialLogin_Block_Adminhtml_System_Config_Form_Field_Notification
    extends Mage_Adminhtml_Block_System_Config_Form_Field
{
    /**
     * renderer notification config callback api
     *
     * @param Varien_Data_Form_Element_Abstract $element
     * @return string
     */
    public function render(Varien_Data_Form_Element_Abstract $element)
    {
        $fieldConfig = $element->getFieldConfig();
        $htmlId      = $element->getHtmlId();
        $html        = '<tr id="row_' . $htmlId . '">'
            . '<td class="label" colspan="3">';

        $marginTop   = $fieldConfig->margin_top ? (string)$fieldConfig->margin_top : '0px';
        $customStyle = $fieldConfig->style ? (string)$fieldConfig->style : '';

        $html .= '<ul style="margin-top: ' . $marginTop
            . '" class="messages'
            . $customStyle . '">';
        $html .= '<li class="notice-msg">'.str_replace('{{your_domain}}',Mage::getBaseUrl(true),$element->getLabel()).'</li>';
        $html .= '</ul></td></tr>';

        return $html;
    }
}
