<?php class ShopShark_ThemeConfig_Model_Designvariation
{
    public function toOptionArray()
    {
        return array(
            array('value'=>0, 'label'=>Mage::helper('ThemeConfig')->__('Milano White')),
            array('value'=>1, 'label'=>Mage::helper('ThemeConfig')->__('Milano Black')),
        );
    }

}?>