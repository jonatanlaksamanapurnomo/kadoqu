<?php
/** Shopshark Admin Notification Feed
  *	@author ShopShark http://www.shopshark.net <info@shopshark.net>
  *	@copyright Copyright (C) 2010 - 2014 ShopShark
  */
  
class ShopShark_ThemeConfig_Model_Feed extends Mage_AdminNotification_Model_Feed {
    
	/**
     * Retrieve feed URL
     *
     * @return string
     */
	public function getFeedUrl() {
        if (is_null($this->_feedUrl)) {
			$this->_feedUrl = 'https://www.shopshark.net/magentofeed.xml?dom='.parse_url(Mage::getBaseUrl(), PHP_URL_HOST);
		}
		return $this->_feedUrl;
    }
	
	/**
     * Retrieve Update Frequency
     *
     * @return int
     */
    public function getFrequency()
    {
        return 86400;
    }

    /**
     * Retrieve Last update time
     *
     * @return int
     */
    public function getLastUpdate()
    {
        return Mage::app()->loadCache('shopshark_notifications_lastcheck');
    }

    /**
     * Set last update time (now)
     *
     * @return Mage_AdminNotification_Model_Feed
     */
    public function setLastUpdate()
    {
        Mage::app()->saveCache(time(), 'shopshark_notifications_lastcheck');
        return $this;
    }
	
	/**
     * The Observer Method
     *
     * @return Mage_AdminNotification_Model_Feed
     */   
    public function observe() {
        $model = Mage::getModel('ThemeConfig/Feed');
        $model->checkUpdate();
    }
}

?>