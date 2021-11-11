<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;
use App\Product;
use App\ProductStock;
use App\ProductImages;
use App\CategoryGift;
use App\CategoryStore;
use App\Brand;
use App\Size;
use App\Color;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Validator;
use Illuminate\Validation\Rule;

class ProductsController extends Controller
{
    public function index()
    {
        return view('backend.categories.index_product');
    }
    public function check_images(){
        $pi = ProductImages::get();
        $success = 0;
        $error = 0;
        $errorList = [];
        foreach($pi as $images){
            if(file_exists(public_path()."/produk/".$images->gambar)){
                $success++;
            }else{
                $error++;
                array_push($errorList,$images->gambar);
            }
        }
        return response()->json(["success"=>$success,"error"=>$error,"errorList"=>$errorList]);

    }
    public function create()
    {
        $brand = Brand::get();
        $size = Size::get();
        $color = Color::get();
        $store_category = CategoryStore::get();
        $gift_category = CategoryGift::get();

        return view('product.create',["brand"=>$brand,"size"=>$size,"color"=>$color,"store"=>$store_category,"gift"=>$gift_category]);
    }
    public function store(Request $request)
    {
        if($request->category_gift_1 == ""){
            $request->request->remove('category_gift_1');
        } 
        if($request->category_gift_2 == ""){
            $request->request->remove('category_gift_2');
        } 
        $validator = Validator::make($request->all(), [
            'SKU' => 'required|unique:products',
            'tags' => 'required',
            'nama' => 'required',
            'brand' => 'required|exists:brands,idBrand',
            'prettyUrl' => 'required|unique:products',
            'store_category_1' => 'sometimes|exists:category_stores,idKategoriStore',
            'store_category_2' => 'sometimes|exists:category_stores,idKategoriStore',
            'sub_category_1' => 'sometimes|exists:sub_categories,idSubKategoriStore,idKategoriStore,'.$request->store_category_1,
            'sub_category_2' => 'sometimes|exists:sub_categories,idSubKategoriStore,idKategoriStore,'.$request->store_category_2,
            'category_gift_1' => 'sometimes|exists:category_gifts,idKategoriGift',
            'category_gift_2' => 'sometimes|exists:category_gifts,idKategoriGift',
            'ukuran' => 'required|exists:sizes,idUkuran',
            'color' => 'required|exists:colors,idColor',
            'weight' => 'required',
            'hargaDasar' => 'required',
            'hargaJual' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }
        $produk = new Product;
        $produk->SKU = $request->SKU;
        $produk->namaProduk = $request->nama;
        $produk->idBrand = $request->brand;
        $produk->prettyURL = $request->prettyUrl;
        $produk->idKategoriStore = $request->store_category_1;
        $produk->idKategoriStore2 = $request->store_category_2;
        $produk->idSubKategoriStore = $request->sub_category_1;
        $produk->idSubKategoriStore2 = $request->sub_category_2;
        $produk->idKategoriGift = $request->category_gift_1;
        $produk->idKategoriGift2 = $request->category_gift_2;
        $produk->idUkuran = $request->ukuran;
        $produk->idColor = $request->color;
        $produk->weight = $request->weight;
        $produk->hargaDasar = $request->hargaDasar;
        $produk->hargaJual = $request->hargaJual;
        $produk->hargaDiscount = $request->hargaDiscount;
        $produk->tags = join(",",$request->tags);
        $produk->description = $request->description;
        $produk->metaTitle = $request->metaTitle;
        $produk->metaDescription = $request->metaDescription;
        $produk->metaKeyword = $request->metaKeyword;
        if($request->status_product == ""){
            $produk->status_product = 0;
        }else{
            $produk->status_product = $request->status_product;
        }
        if($request->status_discount == ""){
            $produk->status_product = 0;
        }else{
            $produk->status_discount = $request->status_discount;
        }
        $produk->save();

        $ps = new ProductStock;
        $ps->SKU = $produk->SKU;
        $ps->stock = $request->stock;
        $ps->available = $request->stock;
        $ps->save();

        foreach($request->file('file') as $file){
            $fileName = $request->SKU.Carbon::now()->format('dmYHisu').".".$file->getClientOriginalExtension();
            $file->move(public_path("produk/".$ps->SKU),$fileName);

            $pi = new ProductImages;
            $pi->SKU = $produk->SKU;
            $pi->gambar = $ps->SKU."/".$fileName;
            $pi->save();
        }
        return response()->json(['success'=>$produk], 203);            

    }

    public function show($sku)
    {
        $product = Product::where('SKU',$sku)->first();
        $brand = Brand::get();
        $size = Size::get();
        $color = Color::get();
        $store_category = CategoryStore::get();
        $gift_category = CategoryGift::get();
        return view("product.detail",["data"=>$product, "brand"=>$brand,"size"=>$size,"color"=>$color,"store"=>$store_category,"gift"=>$gift_category]);
    }
    public function edit($id)
    {
        $data = Product::find($id);

        return $data;
    }
    public function update(Request $request, $sku)
    {
        $failed = false;
        if($request->category_gift_1 == ""){
            $request->request->remove('category_gift_1');
        } 
        if($request->category_gift_2 == ""){
            $request->request->remove('category_gift_2');
        } 
        if($request->store_category_1 == ""){
            $request->request->remove('store_category_1');
        } 
        if($request->store_category_2 == ""){
            $request->request->remove('store_category_2');
        } 
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'tags' => 'required',
            'brand' => 'required|exists:brands,idBrand',
            'store_category_1' => 'sometimes|exists:category_stores,idKategoriStore',
            'store_category_2' => 'sometimes|exists:category_stores,idKategoriStore',
            'sub_category_1' => 'sometimes|exists:sub_categories,idSubKategoriStore,idKategoriStore,'.$request->store_category_1,
            'sub_category_2' => 'sometimes|exists:sub_categories,idSubKategoriStore,idKategoriStore,'.$request->store_category_2,
            'category_gift_1' => 'sometimes|exists:category_gifts,idKategoriGift',
            'category_gift_2' => 'sometimes|exists:category_gifts,idKategoriGift',
            'ukuran' => 'required|exists:sizes,idUkuran',
            'color' => 'required|exists:colors,idColor',
            'weight' => 'required',
            'hargaDasar' => 'required',
            'hargaJual' => 'required',
        ]);
        
        if(Product::where('prettyURL',$request->prettyUrl)->where('SKU','!=',$sku)->first() != null){
            $validator->getMessageBag()->add('PrettyURL', 'Pretty URL Sudah dipakai'); 
            $failed = true;  
        }
        $produk = Product::where("SKU",$sku)->first();
        if($produk == null){
            $validator->getMessageBag()->add('SKU', 'Produk Tidak Ditemukan');  
            $failed = true;  
        }
        if ($validator->fails() || $failed) {
            if($request->fromAPI){
                return response()->json(['error'=>$validator->errors()], 400);            
            }else{
                return redirect()->back()->withErrors($validator->errors());
            }
        }
        $produk->namaProduk = $request->nama;
        $produk->idBrand = $request->brand;
        $produk->prettyURL = $request->prettyUrl;
        $produk->idKategoriStore = $request->store_category_1;
        $produk->idKategoriStore2 = $request->store_category_2;
        $produk->idSubKategoriStore = $request->sub_category_1;
        $produk->idSubKategoriStore2 = $request->sub_category_2;
        $produk->idKategoriGift = $request->category_gift_1;
        $produk->idKategoriGift2 = $request->category_gift_2;
        $produk->idUkuran = $request->ukuran;
        $produk->idColor = $request->color;
        $produk->weight = $request->weight;
        $produk->hargaDasar = $request->hargaDasar;
        $produk->hargaJual = $request->hargaJual;
        $produk->hargaDiscount = $request->hargaDiscount;
        $produk->tags = join(",",$request->tags);
        $produk->description = $request->description;
        $produk->metaTitle = $request->metaTitle;
        $produk->metaDescription = $request->metaDescription;
        $produk->metaKeyword = $request->metaKeyword;
        if($request->status_product == ""){
            $produk->status_product = 0;
        }else{
            $produk->status_product = $request->status_product;
        }
        if($request->status_discount == ""){
            $produk->status_product = 0;
        }else{
            $produk->status_discount = $request->status_discount;
        }
        $produk->save();

        $ps = ProductStock::where("SKU",$produk->SKU)->first();
        $ps->stock = $request->stockTotal;
        $ps->available = $request->stockAvailable;
        $ps->onhold = $request->stockOnhold;
        $ps->save();

        if($request->file != null){
            foreach($request->file('file') as $file){
                $fileName = $sku.Carbon::now()->format('dmYHisu').".".$file->getClientOriginalExtension();
                $file->move(public_path("produk/".$sku."/"),$fileName);
    
                $pi = new ProductImages;
                $pi->SKU = $produk->SKU;
                $pi->gambar = $sku."/".$fileName;
                $pi->save();
            }
        }
        if($request->fromAPI){
            return response()->json(['success'=>$produk], 203);            
        }else{
            return redirect()->back()->with("success","Produk Berhasil Diedit!");
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($sku)
    {
        $product = Product::where("SKU",$sku)->first();
        if($product != null){
            foreach($product->images as $image){
                $path = public_path() . "/produk/" . $image->gambar;
                if(file_exists($path)) {
                    unlink($path);
                }
            }
            $product->delete();
            return redirect("/admin/products")->with(["success"=>"Berhasil Menghapus Produk"]);
        }
    }

    function apiProductsBrand()
    {
        $data = Brand::all();

        return $data;
    }
    function apiProductsCategory()
    {
        $data = Category::all();

        return $data;
    }
    function apiProductsAge()
    {
        $data = Agegender::all();

        return $data;
    }
    function apiProductsSize()
    {
        $data = Sizesetting::all();

        return $data;
    }
    function apiProductsColor()
    {
        $data = Colorsetting::all();

        return $data;
    }

    public function apiProducts() 
    {
        $data = Product::with('brand','agegender','sizesetting','colorsetting');

         return Datatables::of($data)
         ->addColumn('action', function($products) {
            return '<div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Action
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 35px, 0px);">
                    <a class="dropdown-item" href="#">
                        <i class="la la-eye"></i>
                        Show
                    </a>
                    <a class="dropdown-item" onclick="editFormProduct('. $products->id .')" href="#">
                        <i class="la la-edit"></i>
                        Edit
                    </a>
                    <a class="dropdown-item" onclick="deleteDataProduct('. $products->id .')" href="#">
                        <i class="la la-trash"></i>
                        Delete
                    </a>
                </div>
            </div>';
         })->rawColumns(['action','description'])->make(true);
    }
}
