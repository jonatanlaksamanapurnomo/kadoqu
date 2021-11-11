<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class KonfirmasiPembayaran extends Model
{
    protected $table = "konfirmasi_pembayaran";
    public $with = ["order"];
    protected $appends = array('date');
    public function getDateAttribute(){
        return Carbon::createFromFormat('Y-m-d H:i:s',$this->updated_at)->format('d/m/Y H:i:s');
    }
    public function order(){
        return $this->hasOne('App\Order','order_no','order_no');
    }
}
