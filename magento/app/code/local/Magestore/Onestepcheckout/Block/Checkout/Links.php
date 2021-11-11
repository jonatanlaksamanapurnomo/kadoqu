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
 * Links block
 *
 * @category    Mage
 * @package     Mage_Checkout
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class Magestore_Onestepcheckout_Block_Checkout_Links extends Mage_Checkout_Block_Links
{

    /**
     * @return $this
     */
    public function addCheckoutLink()
    {
        $parentBlock = $this->getParentBlock();
        if (Mage::helper('onestepcheckout')->enabledOnestepcheckout() && Mage::helper('core')->isModuleOutputEnabled('Magestore_Onestepcheckout')) {
            $text = $this->__('Checkout');
            if ($parentBlock)
                $parentBlock->addLink(
                        $text, 'onestepcheckout/index', $text, true, array('_secure' => true), 60, null, 'class="top-link-checkout"'
                );
        }else {
            if (!$this->helper('checkout')->canOnepageCheckout()) {
                return $this;
            }


            if ($parentBlock && Mage::helper('core')->isModuleOutputEnabled('Mage_Checkout')) {
                $text = $this->__('Checkout');
                $parentBlock->addLink(
                        $text, 'checkout', $text, true, array('_secure' => true), 60, null, 'class="top-link-checkout"'
                );
            }
        }

        return $this;
    }

}
