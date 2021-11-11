<?php

class IWD_Opc_Block_Onepage_Payment extends Mage_Checkout_Block_Onepage_Abstract
{
    /**
     * @return IWD_Opc_Helper_Data
     */
    public function getOpcHelper()
    {
        return $this->helper('iwd_opc');
    }

    public function isShowStoreCredit()
    {

        if (!$this->getOpcHelper()->isStoreCreditEnable()
            || !$this->isCustomerLoggedIn()
        ) {
            return false;
        }

        if (!$this->getStoreCreditAmount()) {
            return false;
        }

        if ($this->getQuote()->getGrandTotal() <= 0 && !$this->getQuote()->getUseStoreCredit()) {
            return false;
        }

        if ($this->getOpcHelper()->isRecurringPaymentsEnabled()) {
            if (Mage::helper('iwd_recurringpayments/quote')->isSubscriptionItemsInQuote($this->getQuote())) {
                return false;
            }
        }

        return true;
    }

    public function isShowIwdGiftCard()
    {
        if (!$this->getOpcHelper()->isIwdGiftCardEnable()) {
            return false;
        }

        if ($this->getQuote()->getGrandTotal() <= 0 && !$this->getQuote()->getBaseGiftCardsAmountUsed()) {
            return false;
        }

        if ($this->getOpcHelper()->isRecurringPaymentsEnabled()) {
            if (Mage::helper('iwd_recurringpayments/quote')->isSubscriptionItemsInQuote($this->getQuote())) {
                return false;
            }
        }

        return true;
    }

    public function getStoreCreditAmount()
    {
        return Mage::getModel('iwd_storecredit/storecredit')
            ->setCustomer(Mage::getSingleton('customer/session')->getCustomer())
            ->setWebsiteId(Mage::app()->getStore()->getWebsiteId())
            ->loadByCustomer()
            ->getAmount();
    }
}
