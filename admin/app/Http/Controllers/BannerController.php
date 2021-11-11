<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UploadBannerRequest;
use Validator;
use App\Banner;

class BannerController extends Controller
{
    public function index(){
        return view("banner.index");
    }
    public function create(){
        return view("banner.create");
    }
    public function store(UploadBannerRequest $req){
        function generateName($title,$ext){
            $filename = md5($title. time()).".".$ext;
            if(file_exists(public_path().$filename)){
                generateName($title,$ext);
            }else{
                return $filename;
            }
        }
        $banner = new Banner;
        $banner->title = $req->title;
        $unique_name = generateName($req->title,$req->banner->getClientOriginalExtension());
        $banner->url = "/banner/".$unique_name;
        $req->banner->move(public_path("banner"),$unique_name);
        if($req->status == 1){
            $banner->status = $req->status;
        }
        $banner->save();
        return redirect()->back()->with(["success"=>"Banner Created!"]);
    }
    public function edit($id){
        $banner = Banner::find($id);
        if($banner == null){
            abort(404);
        }else{
            return view("banner.detail",["banner"=>$banner]);
        }
    }
    public function update($id, UploadBannerRequest $req){
        function generateName($title,$ext){
            $filename = md5($title. time()).".".$ext;
            if(file_exists(public_path().$filename)){
                generateName($title,$ext);
            }else{
                return $filename;
            }
        }
        $banner = Banner::find($id);
        $banner->title = $req->title;
        if($req->banner != null){
            unlink(public_path().$banner->url);
            $unique_name = generateName($req->title,$req->banner->getClientOriginalExtension());
            $banner->url = "/banner/".$unique_name;
            $req->banner->move(public_path("banner"),$unique_name);
        }
        if($req->status == 1){
            $banner->status = $req->status;
        }else{
            $banner->status = 0;
        }
        $banner->save();
        return redirect()->back()->with(["success"=>"Banner Updated!"]);
    }
    public function delete($id){
        $banner = Banner::find($id);
        if($banner == null){
            abort(404);
        }else{
            if(file_exists(public_path().$banner->url)){
                unlink(public_path().$banner->url);
            }
            $banner->delete();
        }
        return redirect()->back()->with(["success"=>"Banner Deleted"]);
    }
}
