<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventReminder extends Model
{
    protected $hidden = ['user_id'];
}
