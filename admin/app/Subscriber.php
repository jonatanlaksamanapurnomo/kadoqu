<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Subscriber extends Model
{
    public $table = "subscriber";
    protected $appends = array('date');
    public function getDateAttribute(){
        return Carbon::createFromFormat('Y-m-d H:i:s',$this->created_at)->format('d/m/Y H:i:s');
    }
}
