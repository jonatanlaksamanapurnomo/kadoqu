<?php

    class Biztech_Easymaintanance_Model_Mysql4_Notification_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract
    {
        public function _construct()
        {        
            parent::_construct();
            $this->_init('easymaintanance/notification');
        }
        
        /**
        * checks if user is already registered for notification
        *
        * @param string $email - email address of user
        * @return bool - user is registered
        */
        
        public function isUserNotificationEnabled($email)
        {
            $select = $this->getSelect()
                        ->reset('colums')
                        ->where('email=?', $email);
            
            $result = $this->getConnection()->query($select)->fetchAll();
            
            return (bool)count($result);
        }
}