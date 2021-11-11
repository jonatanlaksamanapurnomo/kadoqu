<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BrandController extends Controller
{
    protected $primayKey = "idBrand";
    public function index(){
        return view("brand.index");
    }
}
