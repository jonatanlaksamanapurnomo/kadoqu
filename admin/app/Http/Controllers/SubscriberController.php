<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subscriber;
class SubscriberController extends Controller
{
    public function index(){
        return view("subscriber.index");
    }
}
