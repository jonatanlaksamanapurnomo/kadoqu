<?php
/**
 * Class DigitalPianism_ProductExport_Adminhtml_ProductexportController
 */
class DigitalPianism_ProductExport_Adminhtml_ProductexportController extends Mage_Adminhtml_Controller_Action
{
    /**
     * @return mixed
     */
    protected function _isAllowed()
    {
        return Mage::getSingleton('admin/session')->isAllowed('catalog/products');
    }

    public function massExportAction()
    {
        $productIds = $this->getRequest()->getParam('product');
        $store = $this->_getStore();
        if (!is_array($productIds)) {
            $this->_getSession()->addError($this->__('Please select product(s).'));
            $this->_redirect('adminhtml/catalog_product/index');
        }
        else {
            //write headers to the csv file
            $content = "id,name,url,sku,price,special_price,description,short_description,main_image,qty\n";
            try {

                $collection = Mage::getResourceModel('catalog/product_collection')
                    ->addFieldToFilter('entity_id', array($productIds))
                    ->addAttributeToSelect('entity_id')
                    ->addAttributeToSelect('sku')
                    ->addAttributeToSelect('product_url');

                if (Mage::helper('catalog')->isModuleEnabled('Mage_CatalogInventory')) {
                    $collection->joinField('qty',
                        'cataloginventory/stock_item',
                        'qty',
                        'product_id=entity_id',
                        '{{table}}.stock_id=1',
                        'left');
                }

                if ($store->getId()) {
                    $collection->addStoreFilter($store);
                    $collection->joinAttribute(
                        'name',
                        'catalog_product/name',
                        'entity_id',
                        null,
                        'inner',
                        $store->getId()
                    );
                    $collection->joinAttribute(
                        'description',
                        'catalog_product/description',
                        'entity_id',
                        null,
                        'inner',
                        $store->getId()
                    );
                    $collection->joinAttribute(
                        'short_description',
                        'catalog_product/short_description',
                        'entity_id',
                        null,
                        'inner',
                        $store->getId()
                    );
                    $collection->joinAttribute(
                        'image',
                        'catalog_product/image',
                        'entity_id',
                        null,
                        'inner',
                        $store->getId()
                    );
                    $collection->joinAttribute(
                        'price',
                        'catalog_product/price',
                        'entity_id',
                        null,
                        'left',
                        $store->getId()
                    );
                    $collection->joinAttribute(
                        'special_price',
                        'catalog_product/price',
                        'entity_id',
                        null,
                        'left',
                        $store->getId()
                    );
                } else {
                    $collection->addAttributeToSelect(array('name','price','special_price','description','short_description','image'));
                }

                foreach ($collection as $product) {
                    if ("no_selection" == $product->getImage()) {
                        $productImage = "";
                    } else {
                        $productImage = Mage::getModel('catalog/product_media_config')->getMediaUrl($product->getImage());
                    }
                    $content .= "\"{$product->getId()}\",\"{$product->getName()}\",\"{$product->setStoreId($store->getId())->getProductUrl()}\",\"{$product->getSku()}\",\"{$product->getPrice()}\",\"{$product->getSpecialPrice()}\",\"{$product->getDescription()}\",\"{$product->getShortDescription()}\",\"{$productImage}\",\"{$product->getQty()}\"\n";
                }
            } catch (Exception $e) {
                $this->_getSession()->addError($e->getMessage());
                $this->_redirect('adminhtml/catalog_product/index');
            }
            $this->_prepareDownloadResponse('export.csv', $content, 'text/csv');
        }

    }

    protected function _getStore()
    {
        $storeId = (int) $this->getRequest()->getParam('store', 0);
        return Mage::app()->getStore($storeId);
    }
}