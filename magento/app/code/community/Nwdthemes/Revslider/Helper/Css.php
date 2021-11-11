<?php

/**
 * Nwdthemes Revolution Slider Extension
 *
 * @package     Revslider
 * @author		Nwdthemes <mail@nwdthemes.com>
 * @link		http://nwdthemes.com/
 * @copyright   Copyright (c) 2014. Nwdthemes
 * @license     http://themeforest.net/licenses/terms/regular
 */

class Nwdthemes_Revslider_Helper_Css extends Mage_Core_Helper_Abstract {

	const ADMIN_CSS_DIR = '/skin/adminhtml/default/default/css/nwdthemes/revslider/';
	const FRONT_CSS_DIR = '/skin/frontend/base/default/css/nwdthemes/revslider/';

	/**
	 * Get admin css directory
	 *
	 * @return string
	 */
	
	public function getAdminCssDir() {
		return self::ADMIN_CSS_DIR;
	}

	/**
	 * Get front css directory
	 *
	 * @return string
	 */
	
	public function getFrontCssDir() {
		return self::FRONT_CSS_DIR;
	}
	
	/**
	 * Put css data to file
	 *
	 * @param string $cssFile Name of css file
	 * @param string $strCss CSS data
	 */

	public function putCss($cssFile, $strCss) {
		$cssPaths = array(
			Mage::getBaseDir() . self::ADMIN_CSS_DIR,
			Mage::getBaseDir() . self::FRONT_CSS_DIR
		);
		foreach ($cssPaths as $_path) {
			$this->_putCssToPath($_path, $cssFile, $strCss);
		}
	}

	/**
	 * Put css data to paths file
	 *
	 * @param string $cssPath Path of css file
	 * @param string $cssFile Name of css file
	 * @param string $strCss CSS data
	 */

	private function _putCssToPath($cssPath, $cssFile, $strCss) {
		try {
			$file = new Varien_Io_File();
			$file->setAllowCreateFolders(true)
				->open(array('path' => $cssPath));
			$file->streamOpen($cssFile, 'w+');
			$file->streamWrite($strCss);
			$file->streamClose();
		} catch (Exception $e) {
			Mage::getSingleton('adminhtml/session')->addError(Mage::helper('nwdall')->__('Css generation error: %s', $cssPath . $cssFile) . '<br/>' . $e->getMessage());
			Mage::logException($e);
		}
	}

	/**
	 * Put dynamic CSS to file
	 */

	public function putDynamicCss() {
		$_collection = Mage::getModel('nwdrevslider/css')->getCollection();
		$strCss = '';
		foreach ($_collection as $_item) {
			$strCss .= $_item->getHandle() . '{';
			$_arrStyle = Mage::helper('nwdrevslider')->stringCssToArray($_item->getParams());
			foreach ($_arrStyle as $_key => $_val) {
				$strCss .= $_key . ':' . $_val . ';';
			}
			$strCss .= '}';
		}
		$this->putCss('dynamic.css', $strCss);
	}
	
	/**
	 * Put static CSS to file
	 */

	public function putStaticCss() {
		$strCss = Mage::getModel('nwdrevslider/options')->getOption('revslider-static-css', '');
		$this->putCss('static.css', $strCss);
	}	

}
