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

class Nwdthemes_Revslider_Helper_Images extends Mage_Cms_Helper_Wysiwyg_Images {

	const IMAGE_DIR = 'revslider';
	const IMAGE_THUMB_DIR = 'revslider_thumbs';
	const RS_IMAGE_PATH = 'revslider';

	/**
	 * Get images directory
	 *
	 * @return string
	 */
	
	public function getImageDir() {
		return self::IMAGE_DIR;
	}

	/**
	 * Get image thumbs directory
	 *
	 * @return string
	 */
	
	public function getImageThumbDir() {
		return self::IMAGE_THUMB_DIR;
	}
	
    /**
     * Images Storage root directory
     *
     * @return string
     */
    public function getStorageRoot() {
        return $this->image_base_dir();
    }

    /**
     * Check whether using static URLs is allowed
     * always allowed for Revslider
     *
     * @return boolean
     */
    public function isUsingStaticUrlsAllowed() {
		return true;
    }

	/**
	 * Resize image
	 *
	 * @param string $fileName
	 * @param int $width
	 * @param int $height
	 * @return string Resized image url
	 */

	public function resizeImg($fileName, $width, $height = '') {

		if (strpos($fileName, '://') !== false && strpos($fileName, Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA)) === false)
		{
			return $fileName;
		}

		if ( ! $height)
		{
			$height = $width;
		}

		$thumbDir = self::IMAGE_THUMB_DIR;
		$resizeDir = $thumbDir . "/resized_{$width}x{$height}";

		$ioFile = new Varien_Io_File();
		$ioFile->checkandcreatefolder(Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . $resizeDir);

		$baseURL = str_replace(array('https://', 'http://'), '//', Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA));
		$fileName = str_replace(array('https://', 'http://'), '//', $fileName);
		$fileName = str_replace($baseURL, '', $fileName);

		$imageFile = str_replace(array('/', '\\'), '_', str_replace('revslider/', '', $fileName));

		$folderURL = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA);
		$imageURL = $folderURL . $fileName;

		$basePath = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . $fileName;
		$newPath = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . $resizeDir . DS . $imageFile;

		if ($width != '')
		{
			if (file_exists($basePath) && is_file($basePath) && ! file_exists($newPath))
			{
				$imageObj = new Varien_Image($basePath);
				$imageObj->constrainOnly(TRUE);
				$imageObj->keepAspectRatio(TRUE);
				$imageObj->keepFrame(FALSE);
				$imageObj->keepTransparency(TRUE);
				//$imageObj->backgroundColor(array(255,255,255));
				$imageObj->resize($width, $height);
				$res = $imageObj->save($newPath);
			}

			$resizedURL = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . $resizeDir . '/' . $imageFile;
		}
		else
		{
			$resizedURL = $imageURL;
		}
		return $resizedURL;
	}

	/**
	 *	Compatibility wrappers
	 */

	public function get_intermediate_image_sizes() {
		return array();
	}

	public function wp_generate_attachment_metadata() {
		return FALSE;
	}

	public function wp_update_attachment_metadata() {
		return FALSE;
	}

	public function wp_get_attachment_metadata() {
		return FALSE;
	}

	/**
	 *	Get image id by url
	 *
	 *	@param	string	$url
	 *	@return	int
	 */
	
	public function attachment_url_to_postid($url) {
		return $this->get_image_id_by_url($url);
	}

	/**
	 *	Get image id by url
	 *
	 *	@param	string	$url
	 *	@return	int
	 */

	public function get_image_id_by_url($url) {
		$id = false;
		$imagePath = $this->image_from_url($url);
		if ($imagePath && file_exists($this->image_base_dir() . $imagePath))
		{
			$id = $this->idEncode($imagePath);
		}
		return $id;
	}

	/**
	 *	Get image url by id and size
	 *
	 *	@param	int		Image id
	 *	@param	string	Size type
	 *	@return string
	 */

	public function wp_get_attachment_image_src($attachment_id, $size='thumbnail') {
		return $this->image_downsize($attachment_id, $size);
	}
	
	/**
	 *	Get attached file
	 *
	 *	@param	string
	 *	@return string
	 */

	public function get_attached_file($attachment_id) {
		if ($attachment_id)
		{
			$image = $this->image_base_dir() . $this->idDecode($attachment_id);
			if (file_exists($image))
			{
				return $image;
			}
		}
	}
	
	/**
	 *	Resize image by id and preset size
	 *
	 *	@param	int		Image id
	 *	@param	string	Size type
	 *	@return string
	 */

	public function image_downsize($id, $size = 'medium') {
		if ((string)(int)$id === (string)$id && $product = Mage::getModel('catalog/product')->load($id))
		{
			switch ($size) {
				case 'thumbnail' :
					$image = $product->getThumbnailUrl();
				break;
				case 'small' :
				case 'medium' :
					$image = $product->getSmallImageUrl();
				break;
				case 'base' :
				case 'large' :
				case 'full' :
				default :
					$image = $product->getImageUrl();
				break;
			}
			if ($size = getimagesize( $this->image_url_to_path($image) ))
			{
				$width = $size[0];
				$height = $size[1];
				return array($image, $width, $height);
			}
		}
		elseif ($id)
		{
			$image = $this->get_attached_file($id);
			if ($image && $size = getimagesize($image))
			{
				$image = $this->image_path_to_url($image);
				$width = $size[0];
				$height = $size[1];
				return array($image, $width, $height);
			}
		}
		return false;
	}

	/**
	 *	Resize image
	 *
	 *	@param	string	Image url
	 *	@param	int		Width
	 *	@param	int		Height
	 *	@param	boolean	Is crop
	 *	@param	boolean	Is single
	 *	@param	boolean	Is upscale
	 *	@return string
	 */

	public function image_resize($url, $width = null, $height = null, $crop = null, $single = true, $upscale = false) {
		return $this->resizeImg($url, $width, $height);
	}

	/**
	 *	Insert new image
	 *
	 *	@param	array	Data
	 *	@param	string	Image
	 *	@return	int		Id
	 */

	public function wp_insert_attachment($data, $image) {
		return false;
	}

	/**
	 *	Alias for Resize Image
	 */

	public function rev_aq_resize($url, $width = null, $height = null, $crop = null, $single = true, $upscale = false) {
		return $this->image_resize($url, $width, $height, $crop, $single, $upscale);
	}

	/**
	 *	Convert image path to url
	 *
	 *	@param	string
	 *	@return	string
	 */

	public function image_path_to_url($path) {
		$image = str_replace($this->image_base_dir(), '', $path);
		$url = $this->image_base_url() . $image;
		return $url;
	}

	/**
	 *	Convert image name to url
	 *
	 *	@param	string
	 *	@return	string
	 */

	public function image_to_url($image) {
		$image = $this->image_from_url($image);
		$image = $this->image_from_path($image);
		if (strpos($image, '//') !== false)
		{
			$url = $image;
		}
		else
		{
			$url = $this->image_base_url() . $image;
		}
		return $url;
	}

	/**
	 *	Convert image url to path
	 *
	 *	@param	string
	 *	@return	string
	 */

	public function image_url_to_path($url) {
		if (strpos($url, $this->image_base_url()) === false && strpos($url, Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA)) !== false) {
			$image = str_replace(Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA), '', $url);
			$path = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . $image;
		} else {
			$image = str_replace($this->image_base_url(), '', $url);
			$path = $this->image_base_dir() . $image;
		}

		return $path;
	}

	/**
	 *	Get image from url
	 *
	 *	@param	string
	 *	@return	string
	 */

	public function image_from_url($url) {
		$image = str_replace($this->image_base_url(), '', $url);
		return $image;
	}

	/**
	 *	Get image from path
	 *
	 *	@param	string
	 *	@return	string
	 */

	public function image_from_path($path) {
		$image = str_replace($this->image_base_dir(), '', $path);
		return $image;
	}

	/**
	 *	Get images base path
	 *
	 *	@return	string
	 */

	public function image_base_dir() {
		return Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . self::IMAGE_DIR . DS;
	}

	/**
	 *	Get images base url
	 *
	 *	@return	string
	 */

	public function image_base_url() {
		return Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . self::IMAGE_DIR . '/';
	}

}
