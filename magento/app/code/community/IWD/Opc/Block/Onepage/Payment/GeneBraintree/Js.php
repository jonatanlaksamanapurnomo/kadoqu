<?php
$appCode = Mage::getBaseDir('code');
$file = Mage::getBaseDir('code') . '/community/Gene/Braintree/Block/Js.php';
if (file_exists($file)) {
    if (!class_exists('Gene_Braintree_Block_Js', false)) {
        include_once($file);
    }

    require_once $appCode . '/community/IWD/Opc/Block/Onepage/Payment/GeneBraintree/Rewrite/Js.php';
} else {
    require_once $appCode . '/community/IWD/Opc/Block/Onepage/Payment/GeneBraintree/Rewrite/Template.php';
}
