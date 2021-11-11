<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2017 Amasty (https://www.amasty.com)
 * @package Amasty_Promo
 */


/**
 * Get Label Properties
 * 
 * Class Amasty_Promo_Block_Label
 */
class Amasty_Promo_Block_Label extends Amasty_Promo_Block_Banner
{
    /**
     * @param Mage_SalesRule_Model_Rule|null $validRule
     * @return mixed
     */
    function getImage(Mage_SalesRule_Model_Rule $validRule = null)
    {
        $validRule = $this->_getValidRule();
        return Mage::helper("ampromo/image")->getLink($validRule->getData('ampromo_label_img'));
    }

    /**
     * @param Mage_SalesRule_Model_Rule|null $validRule
     * @return mixed
     */
    function getAlt(Mage_SalesRule_Model_Rule $validRule = null)
    {
        $validRule = $this->_getValidRule();
        return $validRule->getData('ampromo_label_alt');
    }

    /**
     * @param Mage_SalesRule_Model_Rule|null $validRule
     * @return mixed
     */
    function getEnabled(Mage_SalesRule_Model_Rule $validRule = null)
    {
        $validRule = $this->_getValidRule();
        return $validRule->getData('ampromo_label_enable');
    }
}
