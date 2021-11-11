<?php
/**
 * Magestore
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magestore.com license that is
 * available through the world-wide-web at this URL:
 * http://www.magestore.com/license-agreement.html
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Magestore
 * @package     Magestore_Onestepcheckout
 * @copyright   Copyright (c) 2017 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 */

/**
 * Class Magestore_Onestepcheckout_Helper_Message
 */
class Magestore_Onestepcheckout_Helper_Message extends Mage_GiftMessage_Helper_Message {

    const CHECKOUT_PAGE_STYLE = 'onestepcheckout/general/page_style';
    const CHECKOUT_PAGE_LAYOUT = 'onestepcheckout/general/page_layout';

    /**
     * @param string $type
     * @param Varien_Object $entity
     * @param bool $dontDisplayContainer
     * @return string
     */
    public function getInline($type, Varien_Object $entity, $dontDisplayContainer = false) {
        if (in_array($type, array('onepage_checkout', 'multishipping_adress'))) {
            if (!$this->isMessagesAvailable('items', $entity)) {
                return '';
            }
        } elseif (!$this->isMessagesAvailable($type, $entity)) {
            return '';
        }

        $style = Mage::getStoreConfig(self::CHECKOUT_PAGE_STYLE);
        $layout = Mage::getStoreConfig(self::CHECKOUT_PAGE_LAYOUT);
        $folder = '';

        if ($style == 'flat' && $layout == '30columns')
            $folder = 'flatnew';
        else
            $folder = $style;

        return Mage::getSingleton('core/layout')->createBlock('giftmessage/message_inline')
                        ->setId('giftmessage_form_' . $this->_nextId++)
                        ->setDontDisplayContainer($dontDisplayContainer)
                        ->setEntity($entity)
                        ->setType($type)
                        ->setTemplate('onestepcheckout/'.$folder.'/giftmessage/inline.phtml')
                        ->toHtml();
    }

}
