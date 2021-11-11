<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\User;
class Order extends Model
{
    public $with = ['item'];
    protected $appends = array('date',"statusinfo");
    public function item(){
        return $this->hasMany('App\OrderItem','order_id','id');
    }
    public function konfirmasi_pembayaran(){
        return $this->hasOne('App\KonfirmasiPembayaran','order_no','order_no');
    }
    public function getDateAttribute(){
        return Carbon::createFromFormat('Y-m-d H:i:s',$this->created_at)->format('d/m/Y H:i:s');
    }
    public function getStatusinfoAttribute()
    {
        $status = ["Menunggu Konfirmasi Pembayaran","Sudah Konfirmasi","Sudah Dibayar","Barang Dikirim","Barang Diterima"];
        return $status;
    }
}
