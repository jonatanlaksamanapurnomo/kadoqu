<?php

namespace App;;

use Laratrust\LaratrustRole;

class Role extends LaratrustRole
{
    public function user()
	{
	    return $this->belongsTo(User::class);
	}

}
