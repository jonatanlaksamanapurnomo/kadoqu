<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Product;
use App\ProductCart;
use App\ProductStock;
use App\Order;
use App\OrderItem;
use App\User;
use Carbon\Carbon;
use Validator;
use View;

class CartController extends Controller
{
    function addtocart(Request $request){
        $validator = Validator::make($request->all(), [
            'SKU' => 'required',
            'jumlah' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }
        $user = Auth::user();
        $product = Product::where('SKU',$request->SKU)->first();
        if($product != null){
            if($product->stock->available >= $request->jumlah){
                $pc = ProductCart::where('SKU',$request->SKU)->where('email',$user->email)->first();
                if($pc != null){
                    $pc->jumlah += $request->jumlah;
                }else{
                    $pc = new ProductCart;
                    $pc->SKU = $request->SKU;
                    $pc->jumlah = $request->jumlah;
                    $pc->email = $user->email;
                }
                $pc->total_harga =  $product->hargaJual * $pc->jumlah;
                $pc->save();
                return response()->json(['success'=>'Produk Telah Ditambahkan Ke Keranjang!'],200);
            }else{
                return response()->json(['error'=>'Stok Produk Kurang'],400);
            }
        }else{
            return response()->json(['error'=>'Produk Tidak Ditemukan'],400);
        }
    }
    function removefromcart(Request $request){
        $user = Auth::user();
        $pc = ProductCart::where('email',$user->email)->where('SKU',$request->SKU)->first();
        if($pc != null){
            $pc->delete();
            return response()->json(['success'=>"Berhasil Menghapus Produk Dari Keranjang"],200);
        }else{
            return response()->json(['error'=>"Produk Tidak Ditemukan Dikeranjang"],400);
        }
    }
    function editproduct(Request $request){
        $user = Auth::user();
        $product = Product::where('SKU',$request->SKU)->first();
        if($product != null){
            $pc = ProductCart::where('email',$user->email)->where('SKU',$request->SKU)->first();
            if($pc == null){
                $pc = new ProductCart;
                $pc->SKU = $request->SKU;
                $pc->email = $user->email;
            }
            $pc->jumlah = $request->jumlah;
            if($pc->jumlah == 0){
                $pc->delete();
                return response()->json(["success"=>"Produk Dikeranjang Telah Berhasil Dihapus"],200);
            }else{
                $pc->total_harga = $product->hargaJual * $request->jumlah;
                $pc->save();  
                return response()->json(["success"=>"Jumlah Produk Dikeranjang Berhasil Dirubah"],200);

            }  
        }else{
            return response()->json(["error"=>"Produk Tidak Ditemukan"],401);
        }
    }
    function checkout(Request $request){
        $validator = Validator::make($request->all(), [
            'metode_pembayaran' => 'required',
            'nama_penerima' => 'required',
            'alamat_penerima' => 'required',
            'metode_pengiriman' => 'required',
            'kurir' => 'required',
            'biaya_pengiriman' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }
        $user = Auth::user();
        $items = collect($user->cart);
        $errorproduct = collect();
        $successproduct = collect();
        foreach($items as $item){
            $product = Product::where('SKU',$item['SKU'])->first();
            $pc = ProductCart::where('SKU',$item['SKU'])->where('email',$user->email)->first();  
            if($product->stock->available < $item['jumlah'] || $pc == null){
                $message = array();
                $errorproduct->push(["item"=>$item,"message"=>"Stok Tidak Mencukupi / Produk Tidak Ditemukan Dikeranjang"]);
            }else{
                $successproduct->push($item);
            }
        }
        if($errorproduct->count() != 0){
            return response()->json(['error'=>$errorproduct],400);
        }else if($successproduct->count() > 0){
            //Buat ORDER
            $order = new Order;
            $date = Carbon::now()->format("dmy");
            $orderlast = Order::whereDate('created_at',Carbon::today())->orderBy("created_at","desc")->first();
            if($orderlast != null){
                $last = substr($orderlast->order_no,6,5);
                $order->order_no = $date.str_pad($last+1, 5, '0', STR_PAD_LEFT);
            }else{
                $order->order_no = $date.str_pad(1, 5, '0', STR_PAD_LEFT);
            }
            $order->email = $user->email;
            $order->metode_pembayaran = $request->metode_pembayaran;
            $order->nama_penerima = $request->nama_penerima;
            $order->alamat_penerima = $request->alamat_penerima;
            $order->no_telp = $user->no_telp;
            $order->metode_pengiriman = $request->metode_pengiriman;
            $order->kurir = $request->kurir;
            $order->biaya_pengiriman = $request->biaya_pengiriman;
            $order->total_bayar += $request->biaya_pengiriman;
            $order->save();
            foreach($successproduct as $item){
                $product = Product::where('SKU',$item['SKU'])->first();   
                $stock = ProductStock::where('SKU',$item['SKU'])->first();   
                $pc = ProductCart::where('SKU',$item['SKU'])->where('email',$user->email)->first();  
               
                $pc->delete();           
                //Order Item
                $oi = new OrderItem;
                $oi->SKU = $item['SKU'];
                $oi->jumlah = $item['jumlah'];
                $oi->harga_satuan = $product->hargaJual;
                $oi->harga_total = $product->hargaJual * $oi->jumlah;
                $oi->order_id = $order->id;
                $oi->save();
                $order->total_harga += $oi->harga_total;
                $order->total_bayar += $oi->harga_total;
                $order->save();
                $available = $stock->available - $item['jumlah'];
                $onhold = $stock->onhold + $item['jumlah'];
                $stock->onhold = $onhold;
                $stock->available = $available;
                $stock->save();
            }
            $user = User::where('email',$order->email)->first();
            if($user != null){
                $order->nama_penerima = $user->name;
            }
            $view = View::make('email.konfirmasi-pembayaran')->with(["order"=>$order]);
            $result =  \Guzzle::post('http://kadoqu.aegis.co.id/mailer/',[
                'json' => [
                    'to' => $user->email,
                    'subject' => 'Konfirmasi Pembayaran',
                    'body' => $view->render()
                ]
            ]);  
            if(json_decode($result->getBody()->getContents())->status == "success"){
                return response()->json(['success'=>$order],200);            
            }else{
                return response()->json(['error'=>$result["msg"]]);
            }
        }
    }
    function checkoutguest(Request $request){
        $validator = Validator::make($request->all(), [
            'metode_pembayaran' => 'required',
            'nama_penerima' => 'required',
            'alamat_penerima' => 'required',
            'no_telp' => 'required',
            'metode_pengiriman' => 'required',
            'kurir' => 'required',
            'biaya_pengiriman' => 'required',
            'email' => 'required|email',
            'cart' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }
        $items = collect($request->cart);
        $errorproduct = collect();
        $successproduct = collect();
        foreach($items as $item){
            $product = Product::where('SKU',$item['SKU'])->first();
            if($product->stock->available < $item['jumlah']){
                $message = array();
                $errorproduct->push(["item"=>$item,"message"=>"Stok Tidak Mencukupi"]);
            }else{
                $successproduct->push($item);
            }
        }
        if($errorproduct->count() != 0){
            return response()->json(['error'=>$errorproduct],400);
        }else if($successproduct->count() > 0){
            //Buat ORDER
            $order = new Order;
            $date = Carbon::now()->format("dmy");
            $orderlast = Order::whereDate('created_at',Carbon::today())->orderBy("created_at","desc")->first();
            if($orderlast != null){
                $last = substr($orderlast->order_no,6,5);
                $order->order_no = $date.str_pad($last+1, 5, '0', STR_PAD_LEFT);
            }else{
                $order->order_no = $date.str_pad(1, 5, '0', STR_PAD_LEFT);
            }
            $order->email = $request->email;
            $order->metode_pembayaran = $request->metode_pembayaran;
            $order->nama_penerima = $request->nama_penerima;
            $order->alamat_penerima = $request->alamat_penerima;
            $order->no_telp = $request->no_telp;
            $order->metode_pengiriman = $request->metode_pengiriman;
            $order->kurir = $request->kurir;
            $order->biaya_pengiriman = $request->biaya_pengiriman;
            $order->total_bayar += $request->biaya_pengiriman;
            $order->save();
            foreach($successproduct as $item){
                $product = Product::where('SKU',$item['SKU'])->first();   
                $stock = ProductStock::where('SKU',$item['SKU'])->first();   
                //Order Item
                $oi = new OrderItem;
                $oi->SKU = $item['SKU'];
                $oi->jumlah = $item['jumlah'];
                $oi->harga_satuan = $product->hargaJual;
                $oi->harga_total = $product->hargaJual * $oi->jumlah;
                $oi->order_id = $order->id;
                $oi->save();
                $order->total_harga += $oi->harga_total;
                $order->total_bayar += $oi->harga_total;
                $order->save();
                $available = $stock->available - $item['jumlah'];
                $onhold = $stock->onhold + $item['jumlah'];
                $stock->onhold = $onhold;
                $stock->available = $available;
                $stock->save();
            }
            $user = User::where('email',$order->email)->first();
            if($user != null){
                $order->nama_penerima = $user->name;
            }
            $view = View::make('email.konfirmasi-pembayaran')->with(["order"=>$order]);
            $result =  \Guzzle::post('http://kadoqu.aegis.co.id/mailer/',[
                'json' => [
                    'to' => $request->email,
                    'subject' => 'Konfirmasi Pembayaran',
                    'body' => $view->render()
                ]
            ]);  
            if(json_decode($result->getBody()->getContents())->status == "success"){
                return response()->json(['success'=>$order],200);            
            }else{
                return response()->json(['error'=>$result["msg"]]);
            }
        }
    }
    function order($id){
        $order = Order::where('id',$id)->first();
        if($order != null){
            return response()->json(['success'=>$order],200);
        }else{
            return response()->json(['error'=>'Data Tidak Ditemukan!'],400);
        }
    }
}