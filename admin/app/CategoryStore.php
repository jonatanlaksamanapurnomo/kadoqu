<?php

namespace App;;
use App\Product;
use Illuminate\Database\Eloquent\Model;

class CategoryStore extends Model
{
    public $with = ["sub_category"];
    protected $primaryKey = "idKategoriStore";  
    public function sub_category(){
        return $this->belongsToMany('App\SubCategoryStore','sub_categories','idKategoriStore','idSubKategoriStore');
    }
}
