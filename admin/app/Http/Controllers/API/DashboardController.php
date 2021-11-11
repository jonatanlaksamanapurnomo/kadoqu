<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use App\OrderItem;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(){
        $date = request("date");
        $filter = "all";
        $startDate = request("start_date");
        $endDate = request("end_date");
        if($date == "today"){
            $filter = Carbon::now()->toDateString();
        }else if($date == "week"){
            $startDate = Carbon::now()->startOfWeek();
            $endDate = Carbon::now()->endOfWeek();
        }else if($date == "month"){
            $startDate = Carbon::now()->startOfMonth();
            $endDate = Carbon::now()->endOfMonth();
        }else if($date == "year"){
            $startDate = Carbon::now()->startOfYear();
            $endDate = Carbon::now()->endOfYear();
        }
        
        $totalorder = 0;
        $totalitem = 0;
        $revenue = 0;
        $neworder = ["count"=>0,"revenue"=>0];
        $konfirmasi_user = ["count"=>0,"revenue"=>0];
        $konfirmasi_admin = ["count"=>0,"revenue"=>0];
        $barang_dikirim = ["count"=>0,"revenue"=>0];
        $barang_selesai = ["count"=>0,"revenue"=>0];
        $allorder = Order::get();
        if($date == "today"){
            $allorder = Order::whereDate("updated_at",$filter)->get();
        }else if(!isset($date)){
            $startDate = Carbon::createFromFormat("m/d/Y",$startDate)->toDateString();
            $endDate = Carbon::createFromFormat("m/d/Y",$endDate)->toDateString();
            $allorder = Order::whereDate("updated_at",">=",$startDate)->whereDate("updated_at","<=",$endDate)->get();
        }
        $totalorder = count($allorder);
        $neworder["count"] = $allorder->where("status",0)->count();
        $konfirmasi_user["count"] = $allorder->where("status",1)->count();
        $konfirmasi_admin["count"] = $allorder->where("status",2)->count();
        $barang_dikirim["count"] = $allorder->where("status",3)->count();
        $barang_selesai["count"] = $allorder->where("status",4)->count();
        foreach($allorder as $order){
            $totalitem += count($order->item);
            if($order->status == 0){
                $neworder["revenue"] += $order->total_bayar;
            }else if($order->status == 1){
                $konfirmasi_user["revenue"] += $order->total_bayar;
            }else if($order->status >= 2){
                $revenue+=$order->total_bayar;
                if($order->status == 2){
                    $konfirmasi_admin["revenue"] += $order->total_bayar;
                }else if($order->status == 3){
                    $barang_dikirim["revenue"] += $order->total_bayar;
                }else if($order->status == 4){
                    $barang_selesai["revenue"] += $order->total_bayar;
                }
            }
        }
        return response()->json([
                "order"=>$totalorder,
                "item"=>$totalitem,
                "revenue"=>$revenue,
                "new_order"=>$neworder,
                "konfirmasi_user"=>$konfirmasi_user,
                "konfirmasi_admin"=>$konfirmasi_admin,
                "barang_dikirim"=>$barang_dikirim,
                "barang_diterima"=>$barang_selesai
            ]);
    }
}
