<?php
    class Biztech_Easymaintanance_IndexController extends Mage_Core_Controller_Front_Action
    {
        const XML_PATH_EMAIL_RECIPIENT  = 'easymaintanance/contactus/from_mail';
        const XML_PATH_EMAIL_SENDER     = 'contacts/email/sender_email_identity';
        const XML_PATH_EMAIL_CONTACTS     = 'contacts/email/recipient_email';

        public function indexAction()
        {
            $this->loadLayout();     
            $this->getLayout()->getBlock('head')->setTitle(Mage::helper('customer')->__('Contact Us Form'));
            $this->renderLayout();

        }     

        public function postnotifyAction(){
            $post = $this->getRequest()->getPost();
            $notifyname = $post['notifyuname'];
            $notifyemail = $post['notifymail'];

            if($post){

                // Check if user with the same email already exist in the database
                
                $userInNotifyList = Mage::getResourceModel('easymaintanance/notification_collection')
                                    ->isUserNotificationEnabled($notifyemail);
                
                if ($userInNotifyList) {
                    $var1 = array(
                         'result'  => 'error',
                         'message' => Mage::helper('easymaintanance')->__(
                             'An user with same email address has already registered for Notification.'
                         ),
                     );
                     $notifydata = json_encode($var1);
                     $this->getResponse()->setBody($notifydata);
                     return;
                 }
                else{
                    try{
                        $notification = Mage::getModel('easymaintanance/notification');
                        $notification
                             ->setName($notifyname)
                             ->setEmail($notifyemail)
                             ->save();
 
                         $var1 = array(
                             'result'  => 'success',
                             'message' => Mage::helper('easymaintanance')->__(
                                 'You are registered successfully for notification.'
                             ),
                         );
                         $notifydata = json_encode($var1);
                         $this->getResponse()->setBody($notifydata);
                         return;
                    }
                    catch (Exception $e) {
                        $var1 = array(
                            'result' => 'error',
                        );
                        $message = $e->getMessage();
                        if ($message == '') {
                            $var1['message'] = Mage::helper('easymaintanance')->__(
                                'Unable to submit your request. Please, try again later'
                            );
                        } else {
                            $var1['message'] = $message;
                        }
                        $notifydata = json_encode($var1);
                        $this->getResponse()->setBody($notifydata);
                        return;
                    }
                }
            }
            else{
                $var1 = array(
                     'result'  => 'error',
                     'message' => 'Unable to submit your request. Please, try again later',
                );
                $notifydata = json_encode($var1);
                $this->getResponse()->setBody($notifydata);
 
                return;
            }
        }                                       

        public function postFeedbackAction(){
       {  
                $post = $this->getRequest()->getPost();
                if ($post) {
                    $translate = Mage::getSingleton('core/translate');
                    /* @var $translate Mage_Core_Model_Translate */
                    $translate->setTranslateInline(false);
                    try {
                        $postObject = new Varien_Object();
                        $post['feedbackdetails'] = nl2br($post['feedbackdetails']);
                        if($post['feedbackheard'] == null || $post['feedbackheard'] == '')
                        {
                            $post['feedbackheard'] = 'N/A';
                        }
                        $postObject->setData($post);

                        $error = false;
                        if(!empty($post['feedbackbuname'])){
                            if (!Zend_Validate::is(trim($post['feedbackbuname']) , 'NotEmpty')) {
                                $error = true;
                            }    
                        }
                        if (!Zend_Validate::is(trim($post['feedbackmail']), 'EmailAddress')) {
                            $error = true;
                        }
                        if(!empty($post['feedbackdetails'])){
                            if (!Zend_Validate::is(trim($post['feedbackdetails']) , 'NotEmpty')) {
                                $error = true;
                            }    
                        }

                        if ($error) {
                            throw new Exception($e);
                        }
                        $recipient="";
                        if(Mage::getStoreConfig(self::XML_PATH_EMAIL_RECIPIENT)==""){
                            $recipient=Mage::getStoreConfig(self::XML_PATH_EMAIL_CONTACTS);
                        }else{
                            $recipient=Mage::getStoreConfig(self::XML_PATH_EMAIL_RECIPIENT);
                        }
                        $store=Mage::app()->getStore();
                        $mailTemplate = Mage::getModel('core/email_template');
                        /* @var $mailTemplate Mage_Core_Model_Email_Template */
                   
                        
                        
                        $mailTemplate->setDesignConfig(array('area' => 'frontend'))
                        ->setReplyTo($post['feedback_email'])
                        ->sendTransactional(
                            'feedback_email_template',
                            Mage::getStoreConfig(self::XML_PATH_EMAIL_SENDER),
                            $recipient,
                            null,
                            array(
                                'data' => $postObject,
                                'store'=> $store
                            )
                        );

                        if (!$mailTemplate->getSentSuccess()) {
                            throw new Exception($e);
                        }
                        $translate->setTranslateInline(true);
                        $var1["result"]="success";
                        $var1["message"]='Your request has been sent';
                        $data=json_encode($var1);
                        $this->getResponse()->setBody($data);
                        return;

                    } catch (Exception $e) {
                        $var1["result"]="error";
                        $message=$e->getMessage();
                        if($message==""){
                            $var1["message"]="Unable to submit your request. Please, try again later";    
                        }else{
                            $var1["message"]=$message;
                        }
                        $data=json_encode($var1);
                        $this->getResponse()->setBody($data);
                        return;
                    }

                } 
                else {
                    $var1["result"]="error";
                    $var1["message"]="Unable to submit your request. Please, try again later";
                    $data=json_encode($var1);
                    $this->getResponse()->setBody($data);
                    return;
                }
            }
        }


        public function checkTimerAction() {

            $storeId = Mage::app()->getStore()->getStoreId();
            $isEnabled = Mage::getStoreConfig('easymaintanance/general/enabled', $storeId);
            $timerEnabled = Mage::getStoreConfig('easymaintanance/timer/timer_enabled', $storeId);
            $makesiteEnabled = Mage::getStoreConfig('easymaintanance/timer/site_enabled', $storeId);

            if ($isEnabled == 1 && $timerEnabled == 1 && $makesiteEnabled == 1) {

               
                    $timerConfig = new Mage_Core_Model_Config();
                    $timerConfig->saveConfig('easymaintanance/general/enabled', "0");
                    $timerConfig->saveConfig('easymaintanance/timer/timer_enabled', "0");
                    Mage::app()->getCacheInstance()->flush(); 

                echo true;
            }
        }

    }
