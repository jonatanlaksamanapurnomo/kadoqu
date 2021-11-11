<?php

/**
 * @category   DRex
 * @package    DRex_KeranjangKosong
 * @author     Daeng Rosanda -- daengrosanda@gmail.com
 */

class DRex_KeranjangKosong_Model_Observer
{
	const MODULE_NAME = 'DRex_KeranjangKosong';

	public function kosongkanKeranjang($observer = NULL)
	{
		if (!$observer) {
			return;
		}

		if ('checkout.cart.methods.onepage.top' == $observer->getEvent()->getBlock()->getNameInLayout()) {

			if (!Mage::getStoreConfig('advanced/modules_disable_output/'.self::MODULE_NAME)) {
				$transport = $observer->getEvent()->getTransport();
				$block = new DRex_KeranjangKosong_Block_Isi();
				$block->setPassingTransport($transport['html']);
				$block->toHtml();
			}
		}

		return $this;
	}
}