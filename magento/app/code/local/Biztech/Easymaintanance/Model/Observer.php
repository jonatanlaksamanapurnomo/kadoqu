<?php

class Biztech_Easymaintanance_Model_Observer {

    const XML_PATH_EMAIL_SENDER = 'contacts/email/sender_email_identity';

    public function initControllerRouters($request) {
        $adminFrontName = Mage::getConfig()->getNode('admin/routers/adminhtml/args/frontName');
        $redirect_url = array_map('trim', explode("\n", Mage::getStoreConfig('easymaintanance/general/redirecturl', Mage::app()->getStore())));
        
         $area = Mage::app()->getRequest()->getOriginalPathInfo();
         $requestUri = Mage::app()->getRequest()->getRequestUri();
         
         if($requestUri == "/index.php"){
            $area = "/";
         }
         
          if ((!preg_match('/' . $adminFrontName . '/', $area)) && (!preg_match('/postFeedback/', $area)) &&
                (!preg_match('/postnotify/', $area)) && (!in_array($area, $redirect_url)) && (!preg_match('/checkTimer/', $area)) &&
                Mage::app()->getRequest()->getBaseUrl() != "/downloader" && (strpos($requestUri ,'admin') <= 0)) {
           
            $storeId = Mage::app()->getStore()->getStoreId();
            $isEnabled = Mage::getStoreConfig('easymaintanance/general/enabled', $storeId);
            $timerEnabled = Mage::getStoreConfig('easymaintanance/timer/timer_enabled', $storeId);
            
            $date =  Mage::getStoreConfig('easymaintanance/timer/timer_start_date',$storeId);
            $hour = Mage::getStoreConfig('easymaintanance/timer/timer_start_hour',$storeId);
            $min = Mage::getStoreConfig('easymaintanance/timer/timer_start_min',$storeId);
            
            $end_date =  Mage::getStoreConfig('easymaintanance/timer/timer_end_date',$storeId);
            $end_hour = Mage::getStoreConfig('easymaintanance/timer/timer_end_hour',$storeId);
            $end_min = Mage::getStoreConfig('easymaintanance/timer/timer_end_min',$storeId);
            
            $start_time = strtotime($date." ".$hour.":".$min.":"."00");
            $end_time = strtotime($end_date." ".$end_hour.":".$end_min.":"."00");
            $current_time = strtotime(date("m/d/Y H:i:s", Mage::getModel('core/date')->timestamp(time())));
            $currentIP = '';    
            if ($isEnabled == 1) {   
                if($timerEnabled)
                {       
                    if($start_time <= $current_time && $end_time > $current_time)
                    {             
                        $allowedIPs = Mage::getStoreConfig('easymaintanance/general/allowedIPs', $storeId);
                        $allowedIPs = preg_replace('/ /', '', $allowedIPs);
                        $IPs = array();
                        if ('' !== trim($allowedIPs)) {
                            $IPs = explode(',', $allowedIPs);
                        }
                        $allowForAdmin = Mage::getStoreConfig('easymaintanance/general/allowforadmin', $storeId);
                        if($allowedIPs || $allowForAdmin)
                        {
                              $currentIP = $_SERVER['X-Forwarded-For'];
                              if(!$currentIP)
                                $currentIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
                              if(!$currentIP)
                                $currentIP = $_SERVER['REMOTE_ADDR'];  
                        }                                                                                        
                        $adminIp = null;
                        if ($allowForAdmin == 1) {
                            Mage::getSingleton('core/session', array('name' => 'adminhtml'));
                            $adminSession = Mage::getSingleton('admin/session');
                            if ($adminSession->isLoggedIn()) {
                                $adminIp = $adminSession['_session_validator_data']['x-forwarded-for'];
                                if(!$adminIp)
                                    $adminIp = $adminSession['_session_validator_data']['http_x_forwarded_for'];
                                if(!$adminIp)
                                    $adminIp = $adminSession['_session_validator_data']['remote_addr'];
                            }
                        }
                        if ($currentIP === $adminIp) {
                            $this->createLog('Access granted for admin with IP: ' . $currentIP . ' and store ' . $storeId, $storeId);
                        } else {
                            if (!in_array($currentIP, $IPs)) {
                                $this->createLog('Access denied  for IP: ' . $currentIP . ' and store ' . $storeId, $storeId);

                                $html = Mage::getSingleton('core/layout')->createBlock('core/template')->setTemplate('easymaintanance/easymaintanance.phtml')->toHtml();

                                if (Mage::getStoreConfig('easymaintanance/contactus/active', $storeId) == 1):
                                    $html .= Mage::getSingleton('core/layout')->createBlock('core/template')->setTemplate('easymaintanance/popup_html.phtml')->toHtml();                        
                                endif;
                                if (Mage::getStoreConfig('easymaintanance/notify/active', $storeId)):
                                    $html .= Mage::getSingleton('core/layout')->createBlock('core/template')->setTemplate('easymaintanance/notify.phtml')->toHtml();
                                endif;
                                
                                if ('' !== $html) {
                                    Mage::getSingleton('core/session', array('name' => 'front'));
                                    $response = $request->getEvent()->getFront()->getResponse();
                                    $response->setHeader('HTTP/1.1', '503 Service Temporarily Unavailable');
                                    $response->setHeader('Status', '503 Service Temporarily Unavailable');
                                    $response->setHeader('Retry-After', '5000');
                                    $response->setBody($html);
                                    $response->sendHeaders();
                                    $response->outputBody();
                                }
                                exit();
                            } else {
                                $this->createLog('Access granted for IP: ' . $currentIP . ' and store ' . $storeId, $storeId);
                            }
                        }
                    }
                }else{    
                    $allowedIPs = Mage::getStoreConfig('easymaintanance/general/allowedIPs', $storeId);
                    $allowedIPs = preg_replace('/ /', '', $allowedIPs);
                    $IPs = array();
                    if ('' !== trim($allowedIPs)) {
                        $IPs = explode(',', $allowedIPs);
                    }
                    $allowForAdmin = Mage::getStoreConfig('easymaintanance/general/allowforadmin', $storeId);
                    if($allowedIPs || $allowForAdmin)
                    {
                          $currentIP = $_SERVER['X-Forwarded-For'];    
                          if(!$currentIP)
                            $currentIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
                          if(!$currentIP)
                            $currentIP = $_SERVER['REMOTE_ADDR'];  
                    }                                                                                        
                    $adminIp = null;
                    if ($allowForAdmin == 1) {
                        Mage::getSingleton('core/session', array('name' => 'adminhtml'));
                        $adminSession = Mage::getSingleton('admin/session');
                        if ($adminSession->isLoggedIn()) {
                            $adminIp = $adminSession['_session_validator_data']['x-forwarded-for'];
                            if(!$adminIp)
                                $adminIp = $adminSession['_session_validator_data']['http_x_forwarded_for'];
                            if(!$adminIp)
                                $adminIp = $adminSession['_session_validator_data']['remote_addr'];
                        }
                    }
                    if ($currentIP === $adminIp) {
                        $this->createLog('Access granted for admin with IP: ' . $currentIP . ' and store ' . $storeId, $storeId);
                    } else {
                        if (!in_array($currentIP, $IPs)) {
                            $this->createLog('Access denied  for IP: ' . $currentIP . ' and store ' . $storeId, $storeId);

                            $html = Mage::getSingleton('core/layout')->createBlock('core/template')->setTemplate('easymaintanance/easymaintanance.phtml')->toHtml();

                            if (Mage::getStoreConfig('easymaintanance/contactus/active', $storeId) == 1):
                                $html .= Mage::getSingleton('core/layout')->createBlock('core/template')->setTemplate('easymaintanance/popup_html.phtml')->toHtml();                        
                            endif;
                            if (Mage::getStoreConfig('easymaintanance/notify/active', $storeId)):
                                $html .= Mage::getSingleton('core/layout')->createBlock('core/template')->setTemplate('easymaintanance/notify.phtml')->toHtml();
                            endif;
                            
                            if ('' !== $html) {
                                Mage::getSingleton('core/session', array('name' => 'front'));
                                $response = $request->getEvent()->getFront()->getResponse();
                                $response->setHeader('HTTP/1.1', '503 Service Temporarily Unavailable');
                                $response->setHeader('Status', '503 Service Temporarily Unavailable');
                                $response->setHeader('Retry-After', '5000');
                                $response->setBody($html);
                                $response->sendHeaders();
                                $response->outputBody();
                            }
                            exit();
                        } else {
                            $this->createLog('Access granted for IP: ' . $currentIP . ' and store ' . $storeId, $storeId);
                        }
                    }
                }
            }
        }
    }

    private function createLog($text, $storeId = null, $zendLevel = Zend_Log::DEBUG) {
        $logFile = trim(Mage::getStoreConfig('easymaintanance/general/logFileName', $storeId));
        if ('' === $logFile) {
            $logFile = 'easymaintenance.log';
        }
        Mage::log($text, $zendLevel, $logFile);
    }

    public function timeralert() {
        $storeId = Mage::app()->getStore()->getStoreId();
        $hour = Mage::getStoreConfig('easymaintanance/timer/timer_end_hour', $storeId);
        $min = Mage::getStoreConfig('easymaintanance/timer/timer_end_min', $storeId);

        $isEnabled = Mage::getStoreConfig('easymaintanance/general/enabled', $storeId);
        if ($isEnabled == 1) {
            
            $time1 = strtotime(Mage::getStoreConfig('easymaintanance/timer/timer_end_date',$storeId)." ".$hour.":".$min.":"."00");
            $time2 = strtotime(date("m/d/Y H:i:s", Mage::getModel('core/date')->timestamp(time())));
  
            $minutes_diff = (int)round(abs($time1 - $time2) / 60);
            
            $alert_min = Mage::getStoreConfig('easymaintanance/timer/timer_alert', $storeId);
            
            if ($minutes_diff <= $alert_min)
            {
                $fromEmail = Mage::getStoreConfig(self::XML_PATH_EMAIL_SENDER);
                $toEmail = Mage::getStoreConfig('easymaintanance/timer/timer_email');
                $message = Mage::getStoreConfig('easymaintanance/timer/timer_email_template');
                $subject = "Timer Alert";

                try {
                    $mail = new Zend_Mail();
                    $mail->setFrom($fromEmail);
                    $mail->addTo($toEmail);
                    $mail->setSubject($subject);
                    $mail->setBodyHtml($message);
                    $mail->send();
                   
                } catch (Exception $e) {
                    echo $e->getMassage();
                }
            }
        }
    }
}

?>
