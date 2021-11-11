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
 * Class Magestore_Onestepcheckout_Adminhtml_SimiController
 */
class Magestore_Onestepcheckout_Adminhtml_SimiController extends Mage_Adminhtml_Controller_Action
{
    /**
     *
     */
    public function indexAction()
    {
        $url = "https://www.simicart.com/usermanagement/checkout/buyProfessional/?extension=3&utm_source=magestorebuyer&utm_medium=backend&utm_campaign=Magestore Buyer Backend";
        Mage::app()->getResponse()->setRedirect($url)->sendResponse();
    }

    /**
     * @return mixed
     */
    protected function _isAllowed()
    {
        return Mage::getSingleton('admin/session')->isAllowed('onestepcheckout');
    }
}