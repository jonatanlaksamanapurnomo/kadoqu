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
 * Class Magestore_Onestepcheckout_Block_Widget_Dob
 */
class Magestore_Onestepcheckout_Block_Widget_Dob extends Mage_Customer_Block_Widget_Dob
{
    /**
     * Date inputs
     *
     * @var array
     */
    protected $_dateInputs = array();

    public function _construct()
    {
        parent::_construct();

        // default template location
        $storeId = Mage::app()->getStore()->getStoreId();
        $style = Mage::getStoreConfig('onestepcheckout/general/page_style', $storeId);
		$this->setTemplate('onestepcheckout/'.$style.'/widget/dob.phtml');
    }


    /**
     * @return bool
     */
    public function isRequired()
    {
        return (bool)Mage::getStoreConfig('onestepcheckout/field_require_management/birthday');
    }

    /**
     * @param $date
     * @return $this
     */
    public function setDate($date)
    {
        $this->setTime($date ? strtotime($date) : false);
        $this->setData('date', $date);
        return $this;
    }

    /**
     * @return false|string
     */
    public function getDay()
    {
        return $this->getTime() ? date('d', $this->getTime()) : '';
    }

    /**
     * @return false|string
     */
    public function getMonth()
    {
        return $this->getTime() ? date('m', $this->getTime()) : '';
    }

    /**
     * @return false|string
     */
    public function getYear()
    {
        return $this->getTime() ? date('Y', $this->getTime()) : '';
    }

    /**
     * Returns format which will be applied for DOB in javascript
     *
     * @return string
     */
    public function getDateFormat()
    {
        return Mage::app()->getLocale()->getDateStrFormat(Mage_Core_Model_Locale::FORMAT_TYPE_SHORT);
    }

    /**
     * Add date input html
     *
     * @param string $code
     * @param string $html
     */
    public function setDateInput($code, $html)
    {
        $this->_dateInputs[$code] = $html;
    }

    /**
     * Sort date inputs by dateformat order of current locale
     *
     * @return string
     */
    public function getSortedDateInputs()
    {
        $strtr = array(
            '%b' => '%1$s',
            '%B' => '%1$s',
            '%m' => '%1$s',
            '%d' => '%2$s',
            '%e' => '%2$s',
            '%Y' => '%3$s',
            '%y' => '%3$s'
        );

        $dateFormat = preg_replace('/[^\%\w]/', '\\1', $this->getDateFormat());

        return sprintf(strtr($dateFormat, $strtr),
            $this->_dateInputs['m'], $this->_dateInputs['d'], $this->_dateInputs['y']);
    }
}
