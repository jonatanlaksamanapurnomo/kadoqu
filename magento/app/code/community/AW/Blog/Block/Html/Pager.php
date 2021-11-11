<?php
/**
 * aheadWorks Co.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the EULA
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://ecommerce.aheadworks.com/AW-LICENSE.txt
 *
 * =================================================================
 *                 MAGENTO EDITION USAGE NOTICE
 * =================================================================
 * This software is designed to work with Magento community edition and
 * its use on an edition other than specified is prohibited. aheadWorks does not
 * provide extension support in case of incorrect edition use.
 * =================================================================
 *
 * @category   AW
 * @package    AW_Blog
 * @version    tip
 * @copyright  Copyright (c) 2010-2012 aheadWorks Co. (http://www.aheadworks.com)
 * @license    http://ecommerce.aheadworks.com/AW-LICENSE.txt
 */


class AW_Blog_Block_Html_Pager extends Mage_Page_Block_Html_Pager
{

    public function getPagerUrl($params=array())
    {
        $urlParams = array();
        $urlParams['_escape'] = true;
        $urlParams['_use_rewrite'] = true;
        $urlParams['_query'] = $params;

        if ($this->getParentBlock()->getCurrentOrder()) {
            $urlParams['_query'][$this->getParentBlock()->getOrderVarName()] = $this->getParentBlock()->getCurrentOrder();
        }
        if ($this->getParentBlock()->getCurrentDirection()) {
            $urlParams['_query'][$this->getParentBlock()->getDirectionVarName()] = $this->getParentBlock()->getCurrentDirection();
        }
        if ($this->getParentBlock()->getLimit()) {
            $urlParams['_query'][$this->getParentBlock()->getLimitVarName()] = $this->getParentBlock()->getLimit();
        }

        return $this->getUrl('*/*/*', $urlParams);
    }

    protected function _getUrlModelClass()
    {
        return 'blog/url';
    }

}
