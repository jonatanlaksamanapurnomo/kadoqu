<?php

namespace App;;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];
    public $with = ["images","stock"];
    protected $primaryKey = "SKU";
    public $incrementing = false;
    public function stock(){
        return $this->hasOne('App\ProductStock','SKU','SKU')->select(['SKU','stock','available','onhold']);
    }
    public function images(){
        return $this->hasMany('App\ProductImages','SKU','SKU')->select(['SKU','gambar']);
    }
    public function category_store_1(){
        return $this->belongsTo('App\CategoryStore','idKategoriStore','idKategoriStore');
    }
    public function category_store_2(){
        return $this->belongsTo('App\CategoryStore','idKategoriStore2','idKategoriStore');
    }
    public function sub_category_store_1(){
        return $this->belongsTo('App\SubCategoryStore','idSubKategoriStore','idSubKategoriStore');
    }
    public function sub_category_store_2(){
        return $this->belongsTo('App\SubCategoryStore','idSubKategoriStore2','idSubKategoriStore');
    }
    public function category_gift_1(){
        return $this->belongsTo('App\CategoryGift','idKategoriGift','idKategoriGift');
    }
    public function category_gift_2(){
        return $this->belongsTo('App\CategoryGift','idKategoriGift2','idKategoriGift');
    }
    public function size(){
        return $this->belongsTo('App\Size','idUkuran','idUkuran');
    }
    public function color(){
        return $this->belongsTo('App\Color','idColor','idColor');
    }
    public function brand(){
        return $this->belongsTo('App\Brand','idBrand','idBrand');
    }
}
