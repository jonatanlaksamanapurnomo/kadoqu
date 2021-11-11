<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    protected $table = 'password_resets';
    protected $primaryKey = 'email';
    protected $guarded = [];
    public $incrementing = false;
}
