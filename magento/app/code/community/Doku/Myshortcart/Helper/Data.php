<?php


class Doku_Myshortcart_Helper_Data extends Mage_Core_Helper_Abstract
{
    //Get total price
	public function getTotalPrice() {
		$session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
		$order = Mage::getModel('sales/order')->loadByIncrementId($session);
		$baseCode = Mage::app()->getBaseCurrencyCode();      
		$allowedCurrencies = Mage::getModel('directory/currency')->getConfigAllowCurrencies(); 
		$rates = Mage::getModel('directory/currency')->getCurrencyRates($baseCode, array_values($allowedCurrencies));
		  if($rates['IDR'] == 0){
                    $rates['IDR'] = 1 ;
                }
                $totalPrice = $order->getBaseGrandTotal()*$rates['IDR'];
		return $totalPrice.'.00';
	}
	
	//Get ordered product names and Qty
	public function getProducts() {
		$session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
		$order = Mage::getModel('sales/order')->loadByIncrementId($session);
                
                $allowedCurrencies = Mage::getModel('directory/currency')->getConfigAllowCurrencies(); 
		$rates = Mage::getModel('directory/currency')->getCurrencyRates($baseCode, array_values($allowedCurrencies));
                
                if($rates['IDR'] == 0){
                    $rates['IDR'] = 1 ;
                }
                
                $Shipping = $order->getBaseShippingAmount()*$rates['IDR'] ;
                $Discount = $order->getBaseDiscountAmount()*$rates['IDR'] ;
                $Tak = $order->getBaseTaxAmount()*$rates['IDR'] ;
                $ShipDesc = $order->getShippingDescription();
		$items = $order->getAllVisibleItems();

		$products = "";
	 
		foreach ($items as $item) {
                        $products .= $item->getName() . ',';
                        $products .= ($item->getBasePrice()*$rates['IDR'] ).'.00,';
			$products .= $item->getQtyToInvoice().',';
                        $products .= ($item->getQtyToInvoice()*$item->getBasePrice()).'.00;';
		}
                
                if($Tak > 0){
                    $products .= 'Total Taxs,';
                    $products .= $Tak.'.00,';
                    $products .= '1,';
                    $products .= $Tak.'.00;';
                }
                
                if($Discount < 0){
                    $products .= 'Total Discount,';
                    $products .= $Discount.'.00,';
                    $products .= '1,';
                    $products .= $Discount.'.00;';
                }
                
                $products .= $ShipDesc . ',';
                $products .= $Shipping.'.00,';
                $products .= '1,';
                $products .= $Shipping.'.00';
		
		return $products;
	}
	
	public function getUserName() {
        // if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
        //     return '';
        // }
        // $customer = Mage::getSingleton('customer/session')->getCustomer();
        // return trim($customer->getName());
        $session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
        $order = Mage::getModel('sales/order')->loadByIncrementId($session); 
        $name = $order->getCustomerName();
        return $name;
    }

    public function getUserEmail()
    {
        // if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
        //     return '';
        // }
        // $customer = Mage::getSingleton('customer/session')->getCustomer();
        // return $customer->getEmail();
        $session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
        $order = Mage::getModel('sales/order')->loadByIncrementId($session); 
        $email = $order->getCustomerEmail();
        return $email;
    }
    
     public function getUserPhone()
    {
        //  if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
        //     return '';
        // } 
        $session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
        $order = Mage::getModel('sales/order')->loadByIncrementId($session); 
        $billing = $order->getShippingAddress();
        return $billing->getTelephone();
    }
    
     public function getUserFax()
    {
       // if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
       //      return '';
       //  }   
      $session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
        $order = Mage::getModel('sales/order')->loadByIncrementId($session); 
        $billing = $order->getShippingAddress();
        return $billing->getFax();
    }
    
    public function getUserAddress()
    {
        // if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
        //     return '';
        // } 
       $session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
        $order = Mage::getModel('sales/order')->loadByIncrementId($session); 
        $billing = $order->getShippingAddress();
        return $billing->getStreet(1).$billing->getStreet(2);
    }

    public function getUserCity()
    {
        // if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
        //     return '';
        // } 
       $session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
        $order = Mage::getModel('sales/order')->loadByIncrementId($session); 
        $billing = $order->getShippingAddress();
        return $billing->getCity();
    }

    public function getUserState()
    {
        // if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
        //     return '';
        // } 
       $session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
        $order = Mage::getModel('sales/order')->loadByIncrementId($session); 
        $billing = $order->getShippingAddress();
        return $billing->getRegion();
    }
    
    public function getUserZip()
    {
        //  if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
        //     return '';
        // }
       $session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
        $order = Mage::getModel('sales/order')->loadByIncrementId($session); 
        $billing = $order->getShippingAddress();
        return $billing->getPostcode();
    }

    public function getUserCountry()
    {
        //  if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
        //     return '';
        // }
       $session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
        $order = Mage::getModel('sales/order')->loadByIncrementId($session); 
        $billing = $order->getShippingAddress();
        $countryId = $billing->getCountry();

        $country_arr = array(
            'AF' => '4',
            'AL' => '8',
            'AQ' => '10',
            'DZ' => '12',
            'AS' => '16',
            'AD' => '20',
            'AO' => '24',
            'AG' => '28',
            'AZ' => '31',
            'AR' => '32',
            'AU' => '36',
            'AT' => '40',
            'BS' => '44',
            'BH' => '48',
            'BD' => '50',
            'AM' => '51',
            'BB' => '52',
            'BE' => '56',
            'BM' => '60',
            'BT' => '64',
            'BO' => '68',
            'BA' => '70',
            'BW' => '72',
            'BV' => '74',
            'BR' => '76',
            'BZ' => '84',
            'IO' => '86',
            'SB' => '90',
            'VG' => '92',
            'BN' => '96',
            'BG' => '100',
            'MM' => '104',
            'BI' => '108',
            'BY' => '112',
            'KH' => '116',
            'CM' => '120',
            'CA' => '124',
            'CV' => '132',
            'KY' => '136',
            'CF' => '140',
            'LK' => '144',
            'TD' => '148',
            'CL' => '152',
            'CN' => '156',
            'TW' => '158',
            'CX' => '162',
            'CC' => '165',
            'CO' => '170',
            'KM' => '174',
            'YT' => '175',
            'CG' => '178',
            'CD' => '180',
            'CK' => '184',
            'CR' => '188',
            'HR' => '191',
            'CU' => '192',
            'CY' => '196',
            'CZ' => '203',
            'BJ' => '204',
            'DK' => '208',
            'DM' => '212',
            'DO' => '214',
            'EC' => '218',
            'SV' => '222',
            'GQ' => '226',
            'ET' => '230',
            'ER' => '232',
            'EE' => '233',
            'FO' => '234',
            'FK' => '238',
            'GS' => '239',
            'FJ' => '242',
            'FI' => '246',
            'AX' => '248',
            'FR' => '250',
            'GF' => '254',
            'PF' => '258',
            'TF' => '260',
            'DJ' => '262',
            'GA' => '266',
            'GE' => '268',
            'GM' => '270',
            'PS' => '275',
            'DE' => '276',
            'GH' => '288',
            'GI' => '292',
            'KI' => '296',
            'GR' => '300',
            'GL' => '304',
            'GD' => '308',
            'GP' => '312',
            'GU' => '316',
            'GT' => '320',
            'GN' => '324',
            'GY' => '328',
            'HT' => '332',
            'HM' => '334',
            'VA' => '336',
            'HN' => '340',
            'HK' => '344',
            'HU' => '348',
            'IS' => '358',
            'IN' => '356',
            'ID' => '360',
            'IR' => '364',
            'IQ' => '368',
            'IE' => '372',
            'IL' => '376',
            'IT' => '380',
            'CI' => '384',
            'JM' => '388',
            'JP' => '392',
            'KZ' => '398',
            'JO' => '400',
            'KE' => '404',
            'KP' => '408',
            'KR' => '410',
            'KW' => '414',
            'KG' => '417',
            'LA' => '418',
            'LB' => '422',
            'LS' => '426',
            'LV' => '428',
            'LR' => '430',
            'LY' => '434',
            'LI' => '438',
            'LT' => '440',
            'LU' => '442',
            'MO' => '446',
            'MG' => '450',
            'MW' => '454',
            'MY' => '458',
            'MV' => '462',
            'ML' => '466',
            'MT' => '470',
            'MQ' => '474',
            'MR' => '478',
            'MU' => '480',
            'MX' => '484',
            'MC' => '492',
            'MN' => '496',
            'MD' => '498',
            'ME' => '499',
            'MS' => '500',
            'MA' => '504',
            'MZ' => '508',
            'OM' => '512',
            'NA' => '516',
            'NR' => '520',
            'NP' => '524',
            'NL' => '528',
            'AN' => '530',
            'AW' => '533',
            'NC' => '540',
            'VU' => '548',
            'NZ' => '554',
            'NI' => '558',
            'NE' => '562',
            'NG' => '566',
            'NU' => '570',
            'NF' => '574',
            'NO' => '578',
            'MP' => '580',
            'FM' => '583',
            'MH' => '584',
            'PW' => '585',
            'PK' => '586',
            'PA' => '591',
            'PG' => '598',
            'PY' => '600',
            'PE' => '604',
            'PH' => '608',
            'PN' => '612',
            'PL' => '616',
            'PT' => '620',
            'GW' => '624',
            'TL' => '626',
            'PR' => '630',
            'QA' => '634',
            'RE' => '638',
            'RO' => '642',
            'RU' => '643',
            'RW' => '646',
            'BL' => '652',
            'SH' => '654',
            'KN' => '659',
            'AI' => '660',
            'LC' => '662',
            'MF' => '663',
            'PM' => '666',
            'VC' => '670',
            'SM' => '674',
            'ST' => '678',
            'SA' => '682',
            'SN' => '686',
            'RS' => '688',
            'SC' => '690',
            'SL' => '694',
            'SG' => '702',
            'SK' => '703',
            'VN' => '704',
            'SI' => '705',
            'SO' => '706',
            'ZA' => '710',
            'ZW' => '716',
            'ES' => '724',
            'EH' => '732',
            'SD' => '736',
            'SR' => '740',
            'SJ' => '744',
            'SZ' => '748',
            'SE' => '752',
            'CH' => '756',
            'SY' => '760',
            'TJ' => '762',
            'TH' => '764',
            'TG' => '768',
            'TK' => '772',
            'TO' => '776',
            'TT' => '780',
            'AE' => '784',
            'TN' => '788',
            'TR' => '792',
            'TM' => '795',
            'TC' => '796',
            'TV' => '798',
            'UG' => '800',
            'UA' => '804',
            'MK' => '807',
            'EG' => '818',
            'GB' => '826',
            'GG' => '831',
            'JE' => '832',
            'IM' => '833',
            'TZ' => '834',
            'US' => '840',
            'VI' => '850',
            'BF' => '854',
            'UY' => '858',
            'UZ' => '860',
            'VE' => '862',
            'WF' => '876',
            'WS' => '882',
            'YE' => '887',
            'ZM' => '894'
        );

        if(isset($country_arr[$countryId]))
        {
            return $country_arr[$countryId];
        }
        else
        {
            return '360';
        }

    }
    
    public function getUserInvoice()
    {
        // if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
        //     return '';
        // } 
       $session = Mage::getSingleton('checkout/session')->getLastRealOrderId();
       return  $session;
    }
    
}
?>
