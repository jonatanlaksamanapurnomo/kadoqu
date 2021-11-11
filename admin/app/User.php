<?php

namespace App;;

use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Mail;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use LaratrustUserTrait;
    use Notifiable;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $attributes = ['images' => '/images/assets/icons8-male-user-50.png']; 
    protected $with = ['cart','order','event','event_reminder'];
    protected $fillable = [
    'name', 'email', 'password','alamat','no_telp',
    ];
    protected $appends = array('orders');
    public function getOrdersAttribute(){
        return 
        [
            "0"=>$this->order->where("status",0),
            "1"=>$this->order->where("status",1),
            "2"=>$this->order->where("status",2),
            "3"=>$this->order->where("status",3),
            "4"=>$this->order->where("status",4),
            "5"=>$this->order->where("status",5)
        ];
    }
    public function role()
    {
        return $this->belongsTo('App\Role');
    }
    public function cart(){
        return $this->hasMany('App\ProductCart','email','email');
    }
    public function order(){
        return $this->hasMany('App\Order','email','email')->orderBy("created_at","desc");
    }
    public function event_reminder(){
        return $this->hasMany('App\EventReminder','email','email')->orderBy("created_at","desc");
    }
    public function event(){
        return $this->hasMany('App\Event','email','email')->orderBy("created_at","desc");
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    'password', 'remember_token',
    ];

    protected $casts = [
    'is_verified' => 'boolean',
    ];

    public function sendVerification()
    {
        $user = $this;
        $token = str_random(40);
        $user->verification_token = $token;
        $user->save();
        Mail::send('auth.emails.verification', compact('user', 'token'), function ($m) use ($user) {
            $m->to($user->email, $user->name)->subject('Verifikasi Akun');
        });
    }

    public function verify()
    {
        $this->is_verified = 1;
        $this->verification_token = null;
        $this->save();
    }

}
