<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();
Route::get('/pjax', function () {
    return view('testing.welcome');
});
Route::get('/pjax/about', function () {
    return view('testing.about');
});
Route::get('/pjax/contact', function () {
    return view('testing.contact');
});

Route::get('/pjax/test', function () {
    return view('testing.test');
});
Route::get('/', 'GuestsController@index');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/admin', 'HomeController@index')->name('home');
Route::get('auth/verify/{token}', 'Auth\RegisterController@verify');

Route::get('/admin-l', 'GuestsController@login');
//AdminRole
Route::group(['middleware' => 'web'], function () {
	Route::group(['prefix'=>'admin', 'middleware'=>['auth', 'role:admin|suadmin']], function () {
		Route::resource('dashboard', 'AdminsController');
		//CategoriesRoute
		Route::resource('product-setting', 'CategoriesController');
		//UserManagement
		Route::resource('users', 'UsersController');
		Route::get('api/users', 'UsersController@apiUsers')->name('api.users');
		Route::get('userLog', 'UsersController@userLog')->name('loguser.users');
		Route::delete('userLog/{id}', 'UsersController@deleteUserLog')->name('deleteloguser.users');
		Route::get('apiUserLog', 'UsersController@apiUserLog')->name('apiloguser.users');
		//Temporary Permissions
		Route::resource('permissions', 'PermissionsTemporaryController');
		Route::get('api/permissions', 'PermissionsTemporaryController@apiPermissions')->name('api.permissions');
	
		Route::get('order','OrderController@index')->name('orders.index');
		Route::get('order/{id}','OrderController@detail');
		Route::get('konfirmasi-pembayaran','OrderController@konfirmasi_pembayaran');
		Route::put('order/{id}','OrderController@update')->name('orders.update');
		Route::get('products','ProductsController@index')->name('products.index');	
		Route::get('products/check_images','ProductsController@check_images')->name('products.check_images');	
		Route::get('products/create','ProductsController@create')->name('products.create');		
		Route::post('products','ProductsController@store')->name('products.store');	
		Route::get('products/{sku}','ProductsController@show');		
		Route::put('products/{sku}','ProductsController@update')->name('products.update');		
		Route::delete('products/{sku}','ProductsController@destroy')->name('products.delete');		

		Route::get('banners','BannerController@index')->name('banners.index');
		Route::get('banners/create','BannerController@create')->name('banners.create');
		Route::post('banners','BannerController@store')->name('banners.store');
		Route::get('banners/{id}','BannerController@edit')->name('banners.edit');
		Route::put('banners/{id}','BannerController@update')->name('banners.update');
		Route::delete('banners/{id}','BannerController@delete')->name('banners.delete');

		Route::get('subscriber','SubscriberController@index')->name('subscriber.index');
		Route::get('brands','BrandController@index')->name('brands.index');
		Route::Get('report',function(){
			return view("backend.admin.report");
		});
	});
});

//Super Admin ROle
Route::group(['middleware' => 'web'], function () {
	Route::group(['prefix'=>'suadmin', 'middleware'=>['auth', 'role:suadmin']], function () {
		Route::resource('dashboard', 'AdminsController');
		 //Disini
	});
});

Route::get('testdropzone','TestController@loading');
Route::get('log', 'UsersController@apiUserLog');
Route::get('image-view','TestController@index');
Route::post('admin/image-store','TestController@store');
Route::get('data','DataController@index');