<?php

/**
 * @category   DRex
 * @package    DRex_KerangjangKosong
 * @author     Daeng Rosanda -- daengrosanda@gmail.com
 */

class DRex_KeranjangKosong_Block_Isi extends Mage_Core_Block_Text
{
	public function setPassingTransport($transport)
	{
		$this->setData('text', $transport.$this->_generateContent());
	}

	private function _generateContent()
	{
		$_extensionDirectory = dirname(dirname(__FILE__));
		$_javascriptFileName = 'content.phtml';
		$_templateDirectory = 'template';
		$_fileContents = file_get_contents($_extensionDirectory . DS . $_templateDirectory . DS . $_javascriptFileName);
		return eval('?>' . $_fileContents);
	}
}