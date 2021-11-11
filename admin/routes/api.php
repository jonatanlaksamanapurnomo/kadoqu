<?php

use Illuminate\Http\Request;
use App\Product;
use App\ProductImages;
use App\CategoryStore;
use App\CategoryGift;
use App\SubCategoryStore;
use App\Brand;
use App\Color;
use App\Size;
use App\Order;
use App\Subscriber;
use App\KonfirmasiPembayaran;
use App\Banner;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::delete('images',function(Request $request){
    $image = ProductImages::where("gambar",$request->image)->first();
    $image->delete();
    $path = public_path() . "/produk/" . $request->image;
    if(file_exists($path)) {
        unlink($path);
    }
    return response()->json(["success"=>"Berhasil Dihapus"],200);
});
Route::get('products',function(){
    $page = request('page');
    $store_category_id = request('store_category');
    $subcategory = request('sub_category_store');
    $gift_category_id = request('gift_category');
    $brand_id = request('brand');
    $ukuran_id = request('ukuran');
    $color_id = request('color');
    $min = request('min');
    $max = request('max');
    $keyword = request('keyword');
    $limit = request('limit');
    $orderBy = request('orderBy');
    $sortBy = request('sortBy');
    if($orderBy == null){
        $orderBy = "no";
    }
    if($sortBy == null){
        $sortBy = "asc";
    }
    if($limit == null){
        $limit = 6;
    }
    $product = Product::with(
        'category_store_1',
        'category_store_2',
        'sub_category_store_1',
        'sub_category_store_2',
        'category_gift_1',
        'category_gift_2',
        'size',
        'color',
        'brand'
    )->where("status_product",1);
    if(isset($min)){
        $product = $product->where('hargaJual','>=', $min);
    }
    if(isset($max)){
        $product = $product->where('hargaJual','<=',$max);
    }
    if(isset($ukuran_id)){
        $product = $product->where('idUkuran',$ukuran_id);
    }
    if(isset($color_id)){
        $product = $product->where('idColor',$color_id);
    }
    if(isset($brand_id)){
        if(gettype($brand_id) != "array"){
            $product = $product->where('idBrand',$brand_id);
        }else{
            $product = $product->whereIn('idBrand',$brand_id);
        }
    }
    
    if(isset($store_category_id)){
        $product = $product->where(function($query) use ($store_category_id){
            $query->where('idKategoriStore',$store_category_id)->orWhere('idKategoriStore2',$store_category_id);
        });
    }
    if(isset($subcategory)){
        $product = $product->where(function($query) use ($subcategory){
            $query->where('idSubKategoriStore',$subcategory)->orWhere('idSubKategoriStore2',$subcategory);
        });
    }
    if(isset($gift_category_id)){
        $product = $product->where(function($query) use ($gift_category_id){
            $query->where('idKategoriGift',$gift_category_id)->orWhere('idKategoriGift2',$gift_category_id);
        });
    }
    if(isset($keyword)){
        $product = $product->where(function($query) use ($keyword){
            $query->where('namaProduk','like','%'.$keyword.'%')->orWhere('SKU','like','%'.$keyword.'%');
        });
    }
    if($page != null && $limit != null){
        return $product->orderBy($orderBy,$sortBy)->paginate($limit);
    }else{
        return $product->orderBy($orderBy,$sortBy)->get();  
    }
});

Route::get('product/{sku}',function($sku){
    return Product::with(
        'category_store_1',
        'category_store_2',
        'sub_category_store_1',
        'sub_category_store_2',
        'category_gift_1',
        'category_gift_2',
        'size',
        'color',
        'brand'
    )->where('SKU',$sku)->get();
});

//Store Category
Route::get('store_category',function(){
    return CategoryStore::all();
});
Route::get('store_category/products',function(){
    $page = request('page');
    $store_category_id = request('store_category');
    $subcategory = request('sub_category_store');
    $gift_category_id = request('gift_category');
    $brand_id = request('brand');
    $ukuran_id = request('ukuran');
    $color_id = request('color');
    $min = request('min');
    $max = request('max');
    $keyword = request('keyword');
    $limit = request('limit');
    $orderBy = request('orderBy');
    $sortBy = request('sortBy');
    if($orderBy == null){
        $orderBy = "no";
    }
    if($sortBy == null){
        $sortBy = "asc";
    }
    if($limit == null){
        $limit = 12;
    }
    $product = Product::with(
        'category_store_1',
        'category_store_2',
        'sub_category_store_1',
        'sub_category_store_2',
        'category_gift_1',
        'category_gift_2',
        'size',
        'color',
        'brand'
    )->where("status_product",1);
    if(isset($min)){
        $product = $product->where('hargaJual','>=', $min);
    }
    if(isset($max)){
        $product = $product->where('hargaJual','<=',$max);
    }
    if(isset($ukuran_id)){
        $product = $product->where('idUkuran',$ukuran_id);
    }
    if(isset($color_id)){
        $product = $product->where('idColor',$color_id);
    }
    if(isset($brand_id)){
        if(gettype($brand_id) != "array"){
            $product = $product->where('idBrand',$brand_id);
        }else{
            $product = $product->whereIn('idBrand',$brand_id);
        }
    }
    
    if(isset($store_category_id)){
        $product = $product->where(function($query) use ($store_category_id){
            $query->where('idKategoriStore',$store_category_id)->orWhere('idKategoriStore2',$store_category_id);
        });
    }
    if(isset($subcategory)){
        $product = $product->where(function($query) use ($subcategory){
            $query->where('idSubKategoriStore',$subcategory)->orWhere('idSubKategoriStore2',$subcategory);
        });
    }
    if(isset($gift_category_id)){
        $product = $product->where(function($query) use ($gift_category_id){
            $query->where('idKategoriGift',$gift_category_id)->orWhere('idKategoriGift2',$gift_category_id);
        });
    }
    if(isset($keyword)){
        $product = $product->where(function($query) use ($keyword){
            $query->where('namaProduk','like','%'.$keyword.'%')->orWhere('SKU','like','%'.$keyword.'%');
        });
    }
    if($page != null && $limit != null){
        return $product->where(function($query){
            $query->WhereNotNull('idKategoriStore')->orWhereNotNull('idKategoriStore2');
        })->orderBy($orderBy,$sortBy)->paginate($limit);
    }else{
        return $product->where(function($query){
            $query->WhereNotNull('idKategoriStore')->orWhereNotNull('idKategoriStore2');
        })->orderBy($orderBy,$sortBy)->get();  
    }
});
Route::get('store_category/{id}',function($id){
    return CategoryStore::where('idKategoriStore',$id)->first();
});
Route::get('store_category/{id}/products',function($id){ 
    $page = request('page');
    if($page != null){
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idKategoriStore',$id)->orWhere('idKategoriStore2',$id)->paginate(12);
    }else{
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idKategoriStore',$id)->orWhere('idKategoriStore2',$id)->get();
    }
    
});

//Gift Category
Route::get('gift_category',function(){
    return CategoryGift::all();
});
Route::get('gift_category/products',function(){
    $page = request('page');
    $store_category_id = request('store_category');
    $subcategory = request('sub_category_store');
    $gift_category_id = request('gift_category');
    $brand_id = request('brand');
    $ukuran_id = request('ukuran');
    $color_id = request('color');
    $min = request('min');
    $max = request('max');
    $keyword = request('keyword');
    $limit = request('limit');
    $orderBy = request('orderBy');
    $sortBy = request('sortBy');
    if($orderBy == null){
        $orderBy = "no";
    }
    if($sortBy == null){
        $sortBy = "asc";
    }
    if($limit == null){
        $limit = 12;
    }
    $product = Product::with(
        'category_store_1',
        'category_store_2',
        'sub_category_store_1',
        'sub_category_store_2',
        'category_gift_1',
        'category_gift_2',
        'size',
        'color',
        'brand'
    )->where("status_product",1);
    if(isset($min)){
        $product = $product->where('hargaJual','>=', $min);
    }
    if(isset($max)){
        $product = $product->where('hargaJual','<=',$max);
    }
    if(isset($ukuran_id)){
        $product = $product->where('idUkuran',$ukuran_id);
    }
    if(isset($color_id)){
        $product = $product->where('idColor',$color_id);
    }
    if(isset($brand_id)){
        if(gettype($brand_id) != "array"){
            $product = $product->where('idBrand',$brand_id);
        }else{
            $product = $product->whereIn('idBrand',$brand_id);
        }
    }
    
    if(isset($store_category_id)){
        $product = $product->where(function($query) use ($store_category_id){
            $query->where('idKategoriStore',$store_category_id)->orWhere('idKategoriStore2',$store_category_id);
        });
    }
    if(isset($subcategory)){
        $product = $product->where(function($query) use ($subcategory){
            $query->where('idSubKategoriStore',$subcategory)->orWhere('idSubKategoriStore2',$subcategory);
        });
    }
    if(isset($gift_category_id)){
        $product = $product->where(function($query) use ($gift_category_id){
            $query->where('idKategoriGift',$gift_category_id)->orWhere('idKategoriGift2',$gift_category_id);
        });
    }
    if(isset($keyword)){
        $product = $product->where(function($query) use ($keyword){
            $query->where('namaProduk','like','%'.$keyword.'%')->orWhere('SKU','like','%'.$keyword.'%');
        });
    }
    if($page != null && $limit != null){
        return $product->where(function($query){
            $query->WhereNotNull('idKategoriGift')->orWhereNotNull('idKategoriGift2');
        })->orderBy($orderBy,$sortBy)->paginate($limit);
    }else{
        return $product->where(function($query){
            $query->WhereNotNull('idKategoriGift')->orWhereNotNull('idKategoriGift2');
        })->orderBy($orderBy,$sortBy)->get();  
    }
});
Route::get('gift_category/{id}',function($id){
    return CategoryGift::where('idKategoriGift',$id)->first();
});
Route::get('gift_category/{id}/products',function($id){
    $page = request('page');
    if($page != null){
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idKategoriGift',$id)->orWhere('idKategoriGift2',$id)->paginate(12);
    }else{
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idKategoriGift',$id)->orWhere('idKategoriGift2',$id)->get();
    }
});

Route::get('sub_category_store',function(){
    return SubCategoryStore::all();
});
Route::get('sub_category_store/{id}',function($id){
    return SubCategoryStore::where('idSubKategoriStore',$id)->first();
});
Route::get('sub_category_store/{id}/products',function($id){
    $page = request('page');
    if($page != null){
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idSubKategoriStore',$id)->orWhere('idSubKategoriStore2',$id)->paginate(12);
    }else{
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idSubKategoriStore',$id)->orWhere('idSubKategoriStore2',$id)->get();
    }
});
Route::get('brands',function(){
    $page = request('page');
    $limit = request('limit');
    if(!isset($limit)){
        $limit = 6;
    }
    if(isset($page)){
        return Brand::with('products')->paginate($limit);
    }else{
        return Brand::with('products')->get();
    }
});
Route::get('brands/favorite',function(){
    
    $page = request('page');
    $limit = request('limit');
    if(!isset($limit)){
        $limit = 6;
    }
    if(isset($page)){
        return Brand::with('products')->where('fav',1)->paginate($limit);
    }else{
        return Brand::with('products')->where('fav',1)->get();
    }
});
Route::get('brands/{id}',function($id){
    return Brand::with('products')->where('idBrand',$id)->first();
});
Route::get('brands/{id}/products',function($id){
    $page = request('page');
    if($page != null){
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idBrand',$id)->paginate(12);   
    }else{
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idBrand',$id)->get();
    }
});
Route::post('brands/{id}',function($id){
    $brand = Brand::find($id);
    if($brand->fav == 1){
        $brand->fav = 0;
    }else{
        $brand->fav = 1;
    }
    $brand->save();
    return response()->json(["success"=>$brand]);
});
Route::get('sizes',function(){
    return Size::with('products')->get();
});
Route::get('sizes/{id}',function($id){
    return Size::with('products')->where('idUkuran',$id)->first();
});
Route::get('sizes/{id}/products',function($id){
    $page = request('page');
    if($page != null){
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idUkuran',$id)->paginate(12);
    }else{
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idUkuran',$id)->get();
    }
    
});
Route::get('colors',function(){
    return Color::with('products')->get();
});
Route::get('colors/{id}',function($id){
    return Color::with('products')->where('idColor',$id)->first();
});
Route::get('colors/{id}/products',function($id){
    $page = request('page');
    if($page != null){
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idColor',$id)->paginate(12);
    }else{
        return Product::with(
            'category_store_1',
            'category_store_2',
            'sub_category_store_1',
            'sub_category_store_2',
            'category_gift_1',
            'category_gift_2',
            'size',
            'color',
            'brand')
            ->where('idColor',$id)->get();
    }
});

Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');
Route::get('forgot_password/{email}','API\UserController@forgot_password');
Route::get('check_token/{token}','API\UserController@check_token');
Route::post('reset_password','API\UserController@reset_password');
Route::post('checkoutguest','API\CartController@checkoutguest');
Route::get('order/{id}','API\CartController@order');
Route::get('order',function(){
    return Order::orderBy("updated_at","desc")->get();
});
Route::get('konfirmasi_pembayaran',function(){
    return KonfirmasiPembayaran::orderBy("updated_at","desc")->get();
});
Route::group(['middleware' => 'auth:api'], function(){
    Route::post('details', 'API\UserController@details');
    Route::post('addtocart','API\CartController@addtocart');
    Route::post('removefromcart','API\CartController@removefromcart');
    Route::post('editproduct','API\CartController@editproduct');
    Route::post('checkout','API\CartController@checkout');
    Route::post('user/update/{jenis}', 'API\UserController@update');
    Route::put('event_reminder/{id}','API\EventReminderController@update');
    Route::post('event_reminder/','API\EventReminderController@store');
    Route::delete('event_reminder/{id}','API\EventReminderController@delete');
    Route::post('event/','API\EventReminderController@create_event');
    Route::delete('event/{id}','API\EventReminderController@delete_event');
});

Route::get('province',function(){
    $id = request('id');
    $result = \Guzzle::get("https://pro.rajaongkir.com/api/province?id=".$id."&key=53da861f73b2c780ab5b029075d7a6ca");
    return $result;
});
Route::get('city',function(){
    $id = request('id');
    $province = request('province');
    $result = \Guzzle::get("https://pro.rajaongkir.com/api/city?id=".$id."&province=".$province."&key=53da861f73b2c780ab5b029075d7a6ca");
    return $result;
});
Route::get('subdistrict',function(){
    $id = request('id');
    $city = request('city');
    $result = \Guzzle::get("https://pro.rajaongkir.com/api/subdistrict?id=".$id."&city=".$city."&key=53da861f73b2c780ab5b029075d7a6ca");
    return $result;
});
Route::post('cost',function(Request $request){
    $result = \Guzzle::post("https://pro.rajaongkir.com/api/cost",[
        'json' => [
            'key' => '53da861f73b2c780ab5b029075d7a6ca',
            'origin' => $request->origin,
            'originType' => $request->originType,
            'destination' => $request->destination,
            'destinationType' => $request->destinationType,
            'weight' => $request->weight,
            'courier' => $request->courier,
            'length' => $request->length,
            'width' => $request->width,
            'height' => $request->height,
            'diameter' => $request->diameter
        ]
    ]);
    return $result;
});
Route::post('waybill',function(Request $request){
    $result = \Guzzle::post("https://pro.rajaongkir.com/api/waybill",[
        'json' => [
            'key' => '53da861f73b2c780ab5b029075d7a6ca',
            'courier' => $request->courier,
            'waybill' => $request->waybill
        ]
    ]);
    return $result;
});

Route::post('subscribe',function(Request $request){
    $validator = Validator::make($request->all(), [
        'email' => 'required|email|unique:subscriber'
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 400);            
    }
    $subscribe = new Subscriber;
    $subscribe->email = $request->email;
    $subscribe->status = 1;
    if($subscribe->save()){
        $view = View::make('email.subscriber');
        $result =  \Guzzle::post('http://kadoqu.aegis.co.id/mailer/',[
            'json' => [
                'to' => $request->email,
                'subject' => 'Terimakasih Telah Subscribe!',
                'body' => $view->render()
            ]
        ]);  
        if(json_decode($result->getBody()->getContents())->status == "success"){
            return response()->json(['success'=>"Sukses Subscribe!"],200);            
        }else{
            return response()->json(['error'=>$result["msg"]]);
        }
    }else{
        return response()->json(['error'=>"Gagal"], 400);            
    }
});

Route::post('konfirmasi_pembayaran/{order_no}','API\OrderController@konfirmasi_pembayaran');
Route::get('banner',function(){
    return Banner::get();
});
Route::get('banner/active',function(){
    return Banner::where('status',1)->get();
});
Route::get('dashboard','API\DashboardController@index');
Route::get('subscriber',function(){
    return Subscriber::orderBy("updated_at","desc")->get();
});