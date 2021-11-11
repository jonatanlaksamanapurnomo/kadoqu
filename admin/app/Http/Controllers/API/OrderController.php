<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use App\KonfirmasiPembayaran;
use Carbon\Carbon;
use Validator;
use View;

class OrderController extends Controller
{
    public function konfirmasi_pembayaran(Request $request, $order_no){
        $validator = Validator::make($request->all(), [
            'file' => 'required|image',
            'bank' => 'required',
            'atas_nama' => 'required',
            'nominal' => 'required',
            'tanggal_transfer' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }
        if(Order::where('order_no',$order_no)->first() == null){
            return response()->json(['error'=>"Order No Tidak Ditemukan!"], 400);            
        }
        $order = Order::where('order_no',$order_no)->first();
        $order->status = 1;
        $order->save();
        $view = View::make('email.konfirmasi-pembayaran-diterima')->with(["order"=>$order]);
        $result =  \Guzzle::post('http://kadoqu.aegis.co.id/mailer/',[
            'json' => [
                'to' => $order->email,
                'subject' => 'Konfirmasi Pembayaran Anda Sudah Diterima!',
                'body' => $view->render()
            ]
        ]);
        $fileName = $order_no.".".$request->file->getClientOriginalExtension();
        $request->file->move(public_path("uploads"),$fileName);
        $kp = new KonfirmasiPembayaran;
        if(KonfirmasiPembayaran::where('order_no',$order_no)->first() != null){
            $kp = KonfirmasiPembayaran::where('order_no',$order_no)->first();
        }
        $kp->order_no = $order_no;
        $kp->bukti_transfer = $fileName;
        $kp->bank = $request->bank;
        $kp->atas_nama = $request->atas_nama;
        $kp->nominal = $request->nominal;
        $kp->tanggal_transfer = Carbon::parse($request->tanggal_transfer);
        $kp->save();
        return response()->json(["success"=>$kp],200);
    }
}
