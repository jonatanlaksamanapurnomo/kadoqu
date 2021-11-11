<?php

/**
 * Nwdthemes Revolution Slider Extension
 *
 * @package     Revslider
 * @author		Nwdthemes <mail@nwdthemes.com>
 * @link		http://nwdthemes.com/
 * @copyright   Copyright (c) 2015. Nwdthemes
 * @license     http://themeforest.net/licenses/terms/regular
 */

class Nwdthemes_Revslider_Adminhtml_NwdrevsliderController extends Mage_Adminhtml_Controller_Action {

	private $_revSliderAdmin;

	/**
	 *	Constructor
	 */

	protected function _construct() {
        spl_autoload_register( array(Mage::helper('nwdrevslider'), 'loadRevClasses'), true, true );
		global $revSliderVersion;
		global $wp_version;
		global $wpdb;
		$revSliderVersion = RevSliderGlobals::SLIDER_REVISION;
		$wp_version = Mage::getVersion();
		$wpdb = Mage::helper('nwdrevslider/query');
    }

	/**
	 * Check permissions
	 */

    protected function _isAllowed() {
        return Mage::getSingleton('admin/session')->isAllowed('nwdthemes/nwdrevslider');
    }

	/**
	 * Init action
	 */

	protected function _initAction() {
		$this->_revSliderAdmin = new RevSliderAdmin;
		return $this;
	}

	/**
	 * Init page
	 */

	protected function _initPage() {
		
		if (Mage::helper('nwdrevslider/install')->validateInstall())
		{
		    $this->_redirect('*/*/error');;
		}		

		$this->_initAction();
		$this->_revSliderAdmin->onAddScripts();

		Mage::helper('nwdrevslider/framework')->add_filter('revslider_mod_icon_sets', array('RevSliderBase', 'set_icon_sets'));
		Mage::helper('nwdrevslider/framework')->call_actions('admin_enqueue_scripts');

		$this->loadLayout()
			->_setActiveMenu('nwdthemes/nwdrevslider/nwdrevslider')
			->_addBreadcrumb(Mage::helper('adminhtml')->__('Revolution Slider'), Mage::helper('adminhtml')->__('Revolution Slider'));
			
		$this->getLayout()->getBlock('head')
			->assign('inline_styles', Mage::registry('nwdrevslider_inline_styles'))
			->setCanLoadExtJs(true);
	}

	/**
	 * Default page
	 */

	public function indexAction() {
		$this->slidersAction();
	}

	/**
	 * All Sliders
	 */

	public function slidersAction() {
		$this->_initPage();
		$this->_setTitle(Mage::helper('nwdrevslider')->__('All Sliders'));
		$this->renderLayout();
	}

	/**
	 * Slider Settings
	 */

	public function sliderAction() {
		$this->_initPage();
		$this->_setTitle(Mage::helper('nwdrevslider')->__('Slider Settings'));
		$this->renderLayout();
	}

	/**
	 * Slide Editor
	 */

	public function slideAction() {
		$this->_initPage();
		$this->_setTitle(Mage::helper('nwdrevslider')->__('Slide Editor'));
		$this->renderLayout();
	}

	/**
	 * Order Products Slides
	 */

	public function slidesAction() {
		$this->_initPage();
		$this->_setTitle(Mage::helper('nwdrevslider')->__('Order Products'));
		$this->renderLayout();
	}

	/**
	 * Navigation Editor
	 */

	public function navigationAction() {
		$this->_initPage();
		$this->_setTitle(Mage::helper('nwdrevslider')->__('Navigation Editor'));
		$this->renderLayout();
	}

	/**
	 * Ajax actions
	 */

	public function ajaxAction() {
		$this->_initAction();
		$this->_revSliderAdmin->onAjaxAction();
	}

	/**
	 * Error page
	 */

	public function errorAction() {
		if ( ! $strError = Mage::helper('nwdrevslider/install')->validateInstall() )
		{
			$this->_redirect('*/*/index');
		}
		else
		{
		    Mage::getSingleton('adminhtml/session')->addError($strError);
		    $this->loadLayout()->_setActiveMenu('nwdthemes/nwdrevslider/nwdrevslider');
			$this->_setTitle(Mage::helper('nwdrevslider')->__('Error'));
			$this->renderLayout();
		}
	}

	/**
	 * Set page title
	 *
	 * @param string $title
	 */

	private function _setTitle($title) {
		$this->getLayout()->getBlock('head')->setTitle(Mage::helper('nwdrevslider')->__('Revolution Slider - ') . $title);
	}

}
