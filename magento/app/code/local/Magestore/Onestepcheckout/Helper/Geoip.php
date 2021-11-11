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

class Magestore_Onestepcheckout_Helper_Geoip extends Mage_Core_Helper_Abstract {

    const CONFIG_PATH_OSC_GEOIP_ENABLE  = 'onestepcheckout/geoip/enable';

    const CONFIG_PATH_OSC_GEOIP_LAST_UPDATED_TIME  = 'onestepcheckout/geoip/database';

    const DB_UPDATE_SOURCE     = 'http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz';

    /**
     * @return string
     */
    public function getDbDir()
    {
        $dir = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'magestore' .  DS . 'onestepcheckout'.  DS . 'geoip';
        chmod($dir, 0777);
        return $dir;
    }

    /**
     * Returns full path to GeoIP database
     *
     * @return string
     */
    public function getDatabasePath()
    {
        return $this->getDbDir() . DS . 'GeoLiteCity.dat';
    }

    /**
     * Returns full path to temporary GeoIP database
     *
     * @return string
     */
    public function getTempFile()
    {
        $dbPath = $this->getDatabasePath();
        return $dbPath . '_temp.gz';
    }

    /**
     * @return bool
     */
    public function hasDatabase()
    {
        return file_exists($this->getDatabasePath());
    }

    /**
     * @return mixed
     */
    public function isGeoipEnable(){
        return Mage::getStoreConfig(self::CONFIG_PATH_OSC_GEOIP_ENABLE);
    }

    /**
     * @return string
     */
    public function getCurrentIp()
    {
//        return '24.24.24.24'; //USA
//        return '62.147.0.1'; // FRANCE
//        return '81.13.146.205'; //Swiss
//        return '78.159.112.71'; //Germany
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }

        $ips = explode(',', $ip);
        $ip = $ips[count($ips) - 1];

        return trim($ip);
    }
}