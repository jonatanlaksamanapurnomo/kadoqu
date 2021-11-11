<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GuestsController extends Controller
{
    public function login()
    {
        return view('auth.login');
    }

    public function index()
    {
    	return view('welcome');
    }

    public function errors()
    {
    	return view('errors.404');
    }
}
