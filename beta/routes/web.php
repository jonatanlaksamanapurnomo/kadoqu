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


Route::get('/', function () {
    return view('Parent.index');
});
Route::get('product-category-grid', function() {
 	return view('Pages.product-category-grid');
});
Route::get('product-detail', function() {
 	return view('Pages.product-detail');
});
Route::get('shop-cart', function (){
	return view('Pages.shop-cart');
});
Route::get('shop-checkout', function() {
    return view('Pages.shop-checkout');
});
Route::get('shop-checkout-success', function() {
    return view('Pages.shop-checkout-success');
});
Route::get('user-profile', function () {
	return view('Pages.user-profile');
});
Route::get('event-reminder', function() {
    return view('Pages.event-reminder');
});
Route::get('daftar-favorit', function() {
    return view('Pages.daftar-favorit');
});
Route::get('faq', function() {
    return view('Pages.faq');
});
Route::get('gida', function() {
    return view('Pages.gida-help');
});
Route::get('riwayat-belanja', function() {
    return view('Pages.riwayat-belanja');
});
Route::get('status-pembelian', function() {
    return view('Pages.status-pembelian');
});
Route::get('login-mobile', function() {
    return view('Pages.login-mobile');
});
Route::get('register-mobile', function() {
    return view('Pages.register-mobile');
});
Route::get('gida-wrapping', function() {
    return view('Pages.gida-wrapping');
});


Route::get('modals', function() {
    return view('Pages.modals');
});

Route::get('test', function() {
    return view('testing.testing');
});
Route::get('komponen1', function() {
    return view('testing.Testkomponen1');
});
Route::get('komponen2', function() {
    return view('testing.Testkomponen2');
});