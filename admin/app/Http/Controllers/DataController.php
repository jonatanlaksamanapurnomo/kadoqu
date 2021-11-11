<?php

namespace App\Http\Controllers;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Product;
use App\Order;
use App\ProductImages;
use App\ProductStock;
use App\SubCategoryStore;
use App\CategoryStore;
use App\CategoryGift;
use App\User;
use App\Brand;
use Mail;
use View;
use Carbon\Carbon;
use File;
use Analytics;
use Spatie\Analytics\Period;

class DataController extends Controller
{
    public function index(){
        return Analytics::fetchVisitorsAndPageViews(Period::days(7));        
    }
    public function upload(){
        return view('testing.testing');
    }
    public function save(Request $request){
        $error = array();
        foreach($request->gambar as $image){
            $gmbr = $image->getClientOriginalName();
            $gambar = explode("_",$image->getClientOriginalName());
            $current = "";
            if(sizeof($gambar) > 2 ){
                $current = $gambar[1]." ".$gambar[2];
            }else{
                $current = $gambar[1];
            }
            $kategori = explode(".",$current)[0];
            $master = CategoryStore::where('kategoriStore',$kategori)->first();
            if($master==null){
                $master = CategoryGift::where('nameKategoriGift',$kategori)->first();
            }
            if($master==null){
                array_push($error,$kategori);
            }else{    
                $master->banner = $gmbr;
                $master->save();
            }
        }
        return $error;
    }
}
