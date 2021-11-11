<?php

class Doku_Myshortcart_PaymentController extends Mage_Core_Controller_Front_Action 
{
        
   public function redirectAction() {
//		$this->getResponse()->setBody($this->getLayout()->createBlock('myshortcart/payment_redirect'));
       if (isset($_POST['TRANSIDMERCHANT']) && isset($_POST['STATUSCODE']) && isset($_POST['RESULT']) && isset($_POST['AMOUNT']) && isset($_POST['PTYPE']) && isset($_POST['TRANSDATE']))
        {
            $transidmerchant = $_POST['TRANSIDMERCHANT']; 
            $statuscode = $_POST['STATUSCODE'];
            $transdate = $_POST['TRANSDATE'];
            $ptype = $_POST['PTYPE'];
            $amount = $_POST['AMOUNT'];
            $result = $_POST['RESULT'];
            $xtrainfo = $_POST['EXTRAINFO'];

            $dataverifikasi = array();
            $dataverifikasi['tranidmercant'] =  $transidmerchant;
            $dataverifikasi['statuscode'] = $statuscode;
            $dataverifikasi['transdate'] = $transdate;
            $dataverifikasi['ptype'] = $ptype;
            $dataverifikasi['amount'] = $amount;
            $dataverifikasi['result'] = $result;
            $dataverifikasi['xtrainfo'] = $xtrainfo;

//                if($this->request->server['REMOTE_ADDR'] == '103.10.128.11') {
                    $this->addRedirect($dataverifikasi);
                    if($dataverifikasi['statuscode'] == "00"){
                        $this->responseAction($dataverifikasi['ptype']);
                    }
                    elseif($dataverifikasi['ptype'] == "BANK TRANSFER"){
                        $this->responseAction('BANK TRANSFER','pending');
                    }
                    else{
                        $this->cancelAction();      
                    }
//                }
           }         
       
	}

    public function sendingAction() {
            $this->getResponse()->setBody($this->getLayout()->createBlock('myshortcart/sending')->toHtml());
    }
	
    public function noidrAction() {
            $this->loadLayout();
            $this->renderLayout();
    }
	
	public function notifyAction() {
            if (isset($_POST['TRANSIDMERCHANT']) && isset($_POST['RESULT']) && isset($_POST['AMOUNT']))
            {
                $tranidmerchant = $_POST['TRANSIDMERCHANT']; 
                $amount = $_POST['AMOUNT'];
                $result = $_POST['RESULT'];
      
                $dataverifikasi = array();
                $dataverifikasi['tranidmercant'] =  $tranidmerchant;
                $dataverifikasi['amount'] = $amount;
                $dataverifikasi['result'] = $result;
                
                //if($this->request->server['REMOTE_ADDR'] == '103.10.128.11') {
                    
                        if ( strtoupper( $result ) == "SUCCESS"){
                            $isTrue = TRUE;
                        }else{
                            $isTrue = FALSE; 
                        }                   
                        $hasilverifikasi = $this->getNotify($dataverifikasi);
                        if ($hasilverifikasi){
                            $this->addNotify($dataverifikasi, TRUE);
                            echo "Continue";
                        }else{
                            $this->addNotify($dataverifikasi, FALSE);
                            echo "Stop";
                        }
				//}
            }
            
	}
	
        
        public function verifyAction(){
            if (isset($_POST['TRANSIDMERCHANT']) && isset($_POST['STOREID']) && isset($_POST['AMOUNT']))
            {
                $tranidmerchant = $_POST['TRANSIDMERCHANT'];
                $amount = $_POST['AMOUNT'];
                $storeid = $_POST['STOREID'];
                
                $dataverifikasi = array();
                $dataverifikasi['tranidmercant'] =  $tranidmerchant;
                $dataverifikasi['amount'] = $amount;
                $dataverifikasi['storeid'] = $storeid;
                
           //if($this->request->server['REMOTE_ADDR'] == '103.10.128.11') {      
                $hasilverifikasi = $this->getVerifikasi($dataverifikasi);
                if ($hasilverifikasi){
                    $this->addVerifikasi($tranidmerchant, TRUE);
                    echo "Continue";
                }else{
                    $this->addVerifikasi($tranidmerchant, FALSE);
                    echo "Stop";
                }
            //}
            }
            
        }
	// The response action is triggered when myshortcart sends back a response after processing the customer's payment
	public function responseAction($type = 'CC',$state = NULL) {
		$orderId = Mage::getSingleton('checkout/session')->getLastRealOrderId();
		$order = Mage::getModel('sales/order');
		$order->loadByIncrementId($orderId);

        if(!empty($state) AND $state == "pending")
        {
            
            //$order->sendOrderUpdateEmail(true,'harap segera melakukan pembayaran maksimal 12 Jam setelah pemesanan. Pemesanan akan dibatalkan secara otomatis apabila anda belum melakukan pembayaran lebih dari 12 jam. Apabila anda sudah membayar, Find 7 akan kami kirim pada bulan Juli 2014.');
            $order->sendNewOrderEmail();
            $order->setEmailSent(true);
            $order->setState(Mage_Sales_Model_Order::STATE_PENDING_PAYMENT, true, 'myshortcart has make the payment ('.$type.').' ,true);
        }
        else if($state == NULL)
        {
            $order->sendNewOrderEmail();
            $order->setEmailSent(true);
            $order->setState(Mage_Sales_Model_Order::STATE_PROCESSING, true, 'myshortcart has processed the payment ('.$type.').' ,true);

        }
				
		$order->save();
			
		Mage::getSingleton('checkout/session')->unsQuoteId();
				
		Mage_Core_Controller_Varien_Action::_redirect('checkout/onepage/success', array('_secure'=>true));
	}
	
	// The cancel action is triggered when an order is to be cancelled
	public function cancelAction() {
        if (Mage::getSingleton('checkout/session')->getLastRealOrderId()) {
            $order = Mage::getModel('sales/order')->loadByIncrementId(Mage::getSingleton('checkout/session')->getLastRealOrderId());
            if($order->getId()) {
				// Flag the order as 'cancelled' and save it
				$order->cancel()->setState(Mage_Sales_Model_Order::STATE_CANCELED, true, 'myshortcart has declined the payment.')->save();
			}
        }
        Mage_Core_Controller_Varien_Action::_redirect('', array());
    }
        
     private function getVerifikasi($data){
                $sql = "SELECT * FROM myshortcart WHERE transidmerchant = '" . $data['tranidmercant'] . "' and amount = ". $data['amount'] . " and result_trx = 'Requested'";
                $result = Mage::getSingleton('core/resource')->getConnection('core_write')->query($sql);
		return $result;
     }   
     
      private function addVerifikasi($transidmerchent,$isTrue) {
         
         if($isTrue){
            $sql = "UPDATE myshortcart SET start_time = NOW() , result_trx = 'Verified'  WHERE transidmerchant = '" . $transidmerchent."'" ;
	    $result = Mage::getSingleton('core/resource')->getConnection('core_write')->query($sql);
         }else{
            $sql = "UPDATE myshortcart SET start_time = NOW() , result_trx = 'FAILED - INJECTION DETECTED'  WHERE transidmerchant = '" . $transidmerchent ."'" ;
	    $result = Mage::getSingleton('core/resource')->getConnection('core_write')->query($sql);
         }    
     }
        
     private function getNotify($data){
                $sql = "SELECT * FROM myshortcart WHERE transidmerchant = '" . $data['tranidmercant'] . "' and amount = ". $data['amount'] . " and result_trx = 'Verified'";
                $result = Mage::getSingleton('core/resource')->getConnection('core_write')->query($sql);
		return $result;
         
             }
             
         
     private function addNotify($data,$isTrue) {
         if($isTrue){
            $sql = "UPDATE myshortcart SET start_time = NOW() , result_trx = '". $data['result'] ."'  WHERE transidmerchant = '" . $data['tranidmercant'] ."'" ;
            $result = Mage::getSingleton('core/resource')->getConnection('core_write')->query($sql);

            //*update magento order
            $orderId = $data['tranidmercant'];
            $order = Mage::getModel('sales/order');
            $order->loadByIncrementId($orderId);
            
            $order->sendNewOrderEmail();
            $order->setEmailSent(true);
            $order->setState(Mage_Sales_Model_Order::STATE_PROCESSING, true, 'myshortcart notify has received payment.' ,true);

            $order->save();
            //*end update magento order

         }else{
            $sql = "UPDATE myshortcart SET start_time = NOW() , result_trx = 'FAILED - INJECTION DETECTED'  WHERE transidmerchant = '" . $data['tranidmercant']."'" ;
            $result = Mage::getSingleton('core/resource')->getConnection('core_write')->query($sql);
         }    
     }
             
    private function addRedirect($data) {
         $sql = "UPDATE myshortcart SET finish_time = NOW() , status_code = '". $data['statuscode'] ."', result_trx = '". $data['result'] ."', transdate = '". $data['transdate'] ."', ptype = '". $data['ptype'] ."', amount = ". $data['amount'] .", extrainfo = '". $data['xtrainfo'] ."'  WHERE transidmerchant = '" . $data['tranidmercant'] . "'";
	 $result = Mage::getSingleton('core/resource')->getConnection('core_write')->query($sql);
//         return $result;
     }
    
}

?>
