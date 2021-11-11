<?php
/**
 * This file is part of ImportExportAttributes extension.
 *
 * ImportExportAttributes is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ImportExportAttributes is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ImportExportAttributes.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @category    IteraResearch
 * @package     IteraResearch_ImportExportAttributes
 * @copyright   Copyright (c) 2003-2015 Itera Research, Inc. All rights reserved. (http://www.itera-research.com/)
 * @license     http://www.gnu.org/licenses Lesser General Public License
 */

$installer = $this;
/* @var $installer Mage_Core_Model_Resource_Setup */

$installer->startSetup();

$nl = "\r\n";

/**
 * Dataflow advanced profile data
 */
$dataflowData = array(
    array(
        'name'         => 'Export Product Attributes',
        'actions_xml'  => '<action type="importexportattributes/convert_adapter_product_attribute" method="load">' . $nl . '    <var name="store"><![CDATA[0]]></var>' . $nl . '</action>' . $nl . $nl . '<action type="importexportattributes/convert_parser_product_attribute" method="unparse">' . $nl . '    <var name="store"><![CDATA[0]]></var>' . $nl . '</action>' . $nl . $nl . '<action type="dataflow/convert_mapper_column" method="map">' . $nl . '</action>' . $nl . $nl . '<action type="dataflow/convert_parser_csv" method="unparse">' . $nl . '    <var name="delimiter"><![CDATA[;]]></var>' . $nl . '    <var name="enclose"><![CDATA["]]></var>' . $nl . '</action>' . $nl . $nl . '<action type="dataflow/convert_adapter_io" method="save">' . $nl . '    <var name="type">file</var>' . $nl . '    <var name="path">var/export</var>' . $nl . '    <var name="filename"><![CDATA[export_product_attributes.csv]]></var>' . $nl . '</action>' . $nl . $nl,
        'store_id'     => 0
    ),
    array(
        'name'         => 'Import Product Attributes',
        'actions_xml'  => '<action type="dataflow/convert_adapter_io" method="load">' . $nl . '    <var name="type">file</var>' . $nl . '    <var name="path">var/import</var>' . $nl . '    <var name="filename"><![CDATA[import_product_attributes.csv]]></var>' . $nl . '    <var name="format"><![CDATA[csv]]></var>' . $nl . '</action>' . $nl . $nl . '<action type="dataflow/convert_parser_csv" method="parse">' . $nl . '    <var name="delimiter"><![CDATA[;]]></var>' . $nl . '    <var name="enclose"><![CDATA["]]></var>' . $nl . '    <var name="fieldnames">true</var>' . $nl . '    <var name="store"><![CDATA[0]]></var>' . $nl . '    <var name="number_of_records">1</var>' . $nl . '    <var name="adapter">importexportattributes/convert_adapter_product_attribute</var>' . $nl . '</action>',
        'store_id'     => 0
    )
);

foreach ($dataflowData as $bind) {
    Mage::getModel('dataflow/profile')->setData($bind)->save();
}

$installer->endSetup();
