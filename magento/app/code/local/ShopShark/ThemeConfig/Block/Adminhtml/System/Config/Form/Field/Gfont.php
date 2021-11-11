<?php
/**
 * @version   1.0 06.10.2013
 * @author    ShopShark http://www.shopshark.net <info@shopshark.net>
 * @copyright Copyright (C) 2010 - 2013 ShopShark
 */

class ShopShark_ThemeConfig_Block_Adminhtml_System_Config_Form_Field_Gfont extends Mage_Adminhtml_Block_System_Config_Form_Field
{
    /**
     * Override field method to add js
     *
     * @param Varien_Data_Form_Element_Abstract $element
     * @return String
     */
    protected function _getElementHtml(Varien_Data_Form_Element_Abstract $element)
    {
        $selector_id = $element->getHtmlId();
        // Get the default HTML for this option
        $html = parent::_getElementHtml($element);

        $html .= '<br/><div id="preview_'.$selector_id.'" style="font-size:20px; margin-top:5px;">The quick brown fox jumps over the lazy dog</div>
		<script>
        var googleFontPreviewModel_'.$selector_id.' = Class.create();

        googleFontPreviewModel_'.$selector_id.'.prototype = {
            initialize : function()
            {
                this.fontElement = $("'.$element->getHtmlId().'");
                this.previewElement = $("preview_'.$selector_id.'");
                this.loadedFonts = "";

                this.refreshPreview();
                this.bindFontChange();
            },
            bindFontChange : function()
            {
                Event.observe(this.fontElement, "change", this.refreshPreview.bind(this));
                Event.observe(this.fontElement, "keyup", this.refreshPreview.bind(this));
                Event.observe(this.fontElement, "keydown", this.refreshPreview.bind(this));
            },
        	refreshPreview : function()
            {
                if ( (this.fontElement.value == 0) || this.loadedFonts.indexOf( this.fontElement.value ) > -1 ) {
                    this.updateFontFamily();
                    return;
                }

        		var ss = document.createElement("link");
        		ss.type = "text/css";
        		ss.rel = "stylesheet";
        		ss.href = "//fonts.googleapis.com/css?family=" + this.fontElement.value;
        		document.getElementsByTagName("head")[0].appendChild(ss);

                this.updateFontFamily();

                this.loadedFonts += this.fontElement.value + ",";
            },
            updateFontFamily : function()
            {
                if(this.fontElement.value == 0) $(this.previewElement).hide();
				else $(this.previewElement).show().setStyle({ fontFamily: this.fontElement.value.split(":")[0].replace(/\+/g," ") });
            }
        }

        googleFontPreview_'.$selector_id.' = new googleFontPreviewModel_'.$selector_id.'();
		</script>
        ';
        return $html;
    }
}