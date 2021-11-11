<?php

$appCode = Mage::getBaseDir('code');
$file = $appCode . '/community/IWD/GiftCardAccount/Block/Onepage/Payment/Giftcard.php';
if (file_exists($file)) {
    if (!class_exists('IWD_GiftCardAccount_Block_Onepage_Payment_Giftcard', false)) {
        include_once($file);
    }

    require_once $appCode . '/community/IWD/Opc/Block/Onepage/Payment/Giftcard/Rewrite/Giftcard.php';
} else {
    require_once $appCode . '/community/IWD/Opc/Block/Onepage/Payment/Giftcard/Rewrite/Template.php';
}
