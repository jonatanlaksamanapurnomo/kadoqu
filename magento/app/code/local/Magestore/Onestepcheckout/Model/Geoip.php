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
 * Geoip Model
 * 
 * @category    Magestore
 * @package     Magestore_Geoip
 * @author      Magestore Developer
 */
class Magestore_Onestepcheckout_Model_Geoip extends Mage_Core_Model_Abstract
{


    /**
     * @param $source
     * @param $destination
     * @return array
     */
    public function download($source, $destination)
    {
        $errors = array();

        $sourceFile = curl_init($source);
        $newFile = @fopen($destination, "wb");

        if (!$sourceFile) {
            $errors[] = Mage::helper('onestepcheckout')->__('DataBase source is not found');
        }

        if (!$newFile) {
            $errors[] = sprintf(Mage::helper('onestepcheckout')->__("Can't create file %s. Please check if contained folder has write permissions."), $destination);
        }

        if(!empty($errors)){
            return $errors;
        }

        curl_setopt($sourceFile, CURLOPT_FILE, $newFile);
        curl_exec($sourceFile);
        curl_close($sourceFile);
        fclose($newFile);

        return $errors;
    }


    /**
     * @param $source
     * @param $destination
     * @return bool
     */
    public function extract($source, $destination)
    {
        $sourceFile = @gzopen($source, "rb");
        $newFile = @fopen($destination, "wb");

        if (!$sourceFile || !$newFile) {
            return false;
        }

        while ($string = gzread($sourceFile, 4096)) {
            fwrite($newFile, $string, strlen($string));
        }

        gzclose($sourceFile);
        fclose($newFile);

        return true;
    }

    /**
     * @param $ip
     * @return array
     */
    public function processGeoIP($ip)
    {
        include_once Mage::getBaseDir() . DS . 'lib' . DS . 'Magestore' . DS . 'Onestepcheckout' . DS . 'Geoip' . DS . 'geoipcity.inc';
        include_once Mage::getBaseDir() . DS . 'lib' . DS . 'Magestore' . DS . 'Onestepcheckout' . DS . 'Geoip' . DS . 'geoipregionvars.php';
        $pathToDB = Mage::helper('onestepcheckout/geoip')->getDatabasePath();
        $geoip = geoip_open($pathToDB, GEOIP_STANDARD);
        $data = array('ip' => $ip);

        $address = geoip_record_by_addr($geoip, $ip);

        if ($address) {
            $data['code']        = $address->country_code;
            $data['country']     = $address->country_name;
            $data['region']      = (isset($GEOIP_REGION_NAME[$address->country_code][$address->region]) ? $GEOIP_REGION_NAME[$address->country_code][$address->region] : $address->region);
            $data['city']        = $address->city;
            $data['postal_code'] = $address->postal_code;
            $data['country_id'] = $address->country_code;
            $data['region_id'] = $this->getRegionIdByCode($address->region, $address->country_code);
        }

        geoip_close($geoip);
        return $data;
    }

    /**
     * Gets location by ip address
     *
     * @param string $ip
     * @return array
     */
    public function getLocationByIp($ip)
    {
        if (!Mage::helper('onestepcheckout/geoip')->hasDatabase()) {
            return false;
        }
        return $this->processGeoIP($ip);
    }

    /**
     * @param $code
     * @param $countryId
     * @return mixed
     * @internal param $code $
     */
    public function getRegionIdByCode($code, $countryId)
    {
        $model = Mage::getModel('directory/region');
        $model->loadByCode($code, $countryId);
        return ($model->getId())?$model->getId():0;
    }
}