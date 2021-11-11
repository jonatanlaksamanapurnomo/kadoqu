<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    public $timestamps = false;
    public $with = ['product'];
    public function product(){
        return $this->hasOne('App\Product','SKU','SKU');
    }
}
