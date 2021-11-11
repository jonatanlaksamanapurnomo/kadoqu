<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductCart extends Model
{
    public $with = ['product'];
    public $timestamps = false;
    public function product(){
        return $this->hasOne('App\Product','SKU','SKU');
    }
}
