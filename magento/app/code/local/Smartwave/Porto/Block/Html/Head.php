<?php
class Smartwave_Porto_Block_Html_Head extends Mage_Page_Block_Html_Head
{
    /**
     * Initialize template
     *
     */
    protected function _construct()
    {
        $this->setTemplate('page/html/head.phtml');
    }


    /**
     * Add HEAD External Item
     *
     * Allowed types:
     *  - js
     *  - js_css
     *  - skin_js
     *  - skin_css
     *  - rss
     *
     * @param string $type
     * @param string $name
     * @param string $params
     * @param string $if
     * @param string $cond
     * @return Mage_Page_Block_Html_Head
     */
    public function addExternalItem($type, $name, $params=null, $if=null, $cond=null)
    {
    	parent::addItem($type, $name, $params=null, $if=null, $cond=null);
    }

    /**
     * Remove External Item from HEAD entity
     *
     * @param string $type
     * @param string $name
     * @return Mage_Page_Block_Html_Head
     */
    public function removeExternalItem($type, $name)
    {
    	parent::removeItem($type, $name);
    }
    
     public function addMultipleConditionItem($type, $name, $params=null, $if=null, $cond=null, $sep=null, $if_2=null, $cond_2=null)
    {
        $val_if = Mage::getStoreConfig($if);
        if(!isset($val_if) || !$val_if)
            $val_if = 0;
        $val_if_2 = Mage::getStoreConfig($if_2);
        if(!isset($val_if_2) || !$val_if_2)
            $val_if_2 = 0;
        if($sep == 'and') {
            if($val_if == $cond && $val_if_2 == $cond_2)
                parent::addItem($type, $name, $params=null, null, null);
        }
        if($sep == 'or') {
            if($val_if == $cond || $val_if_2 == $cond_2)
                parent::addItem($type, $name, $params=null, null, null);
        }
    }

    public function removeMultipleConditionItem($type, $name)
    {
        parent::removeItem($type, $name);
    }
    
    /**
     * Classify HTML head item and queue it into "lines" array
     *
     * @see self::getCssJsHtml()
     * @param array &$lines
     * @param string $itemIf
     * @param string $itemType
     * @param string $itemParams
     * @param string $itemName
     * @param array $itemThe
     */
    protected function _separateOtherHtmlHeadElements(&$lines, $itemIf, $itemType, $itemParams, $itemName, $itemThe)
    {
        $params = $itemParams ? ' ' . $itemParams : '';
        $href   = $itemName;
        switch ($itemType) {
            case 'rss':
                $lines[$itemIf]['other'][] = sprintf('<link href="%s"%s rel="alternate" type="application/rss+xml" />',
                    $href, $params
                );
                break;
            case 'link_rel':
                $lines[$itemIf]['other'][] = sprintf('<link%s href="%s" />', $params, $href);
                break;
            
           	case 'external_js':
                $lines[$itemIf]['other'][] = sprintf('<script type="text/javascript" src="%s" %s></script>', $href, $params);
                break;
                            
          	case 'external_css':
                $lines[$itemIf]['other'][] = sprintf('<link rel="stylesheet" type="text/css" href="%s" %s/>', $href, $params);
                break;
        }
    }

}
