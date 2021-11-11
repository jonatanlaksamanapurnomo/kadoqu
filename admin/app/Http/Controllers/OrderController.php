<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\KonfirmasiPembayaran;
use App\User;
use View;

class OrderController extends Controller
{
    public function index(){
        return view('order.index');
    }
    public function detail($id){
        $order = Order::with("konfirmasi_pembayaran")->where('order_no',$id)->first();
        if($order == null){
            abort(404);
        }
        return View('order.detail',["order"=>$order]);
    }
    public function update(Request $request,$id){
        $order = Order::where('id',$id)->first();
        $konfirmasi_pesanan = KonfirmasiPembayaran::where('order_no',$order->order_no)->first();
        $order->status = $request->status;
        $order->save();
        if($request->resi != null){
            $order->no_resi = $request->no_resi;        
        }
        $user = User::where('email',$order->email)->first();
        if($user != null){
            $order->nama_penerima = $user->name;
        }
        if($request->old_status != $request->status && $request->old_status < $request->status){
            if($order->status == 2){
                $view = View::make('email.konfirmasi-proses')->with(["order"=>$order,"konfirmasi_pesanan"=>$konfirmasi_pesanan]);
                $result =  \Guzzle::post('http://kadoqu.aegis.co.id/mailer/',[
                    'json' => [
                        'to' => $order->email,
                        'subject' => 'Pesanan Sedang Diproses',
                        'body' => $view->render()
                    ]
                ]);
            }else if($order->status == 3){
                $view = View::make('email.konfirmasi-pengiriman')->with(["order"=>$order]);
                $result =  \Guzzle::post('http://kadoqu.aegis.co.id/mailer/',[
                    'json' => [
                        'to' => $order->email,
                        'subject' => 'Pesanan Dikirim',
                        'body' => $view->render()
                    ]
                ]);
            }
        }
        return redirect()->back()->with(["success"=>"Berhasil Update!"]);
    }
    public function konfirmasi_pembayaran(){
        return view('order.konfirmasi_pembayaran');
    }
}
