<?php

namespace App;;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    public $primaryKey = "idBrand";
    public function products(){
        return $this->hasMany('App\Product','idBrand','idBrand');
    }
}
