<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laratrust\LaratrustFacade as Laratrust;
use illuminate\Support\Facades\Auth;
use App\User;
use Spatie\Activitylog\Models\Activity;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(Laratrust::hasRole('suadmin')) return $this->adminDashboard();
        if(Laratrust::hasRole('admin')) return $this->adminDashboard();
        if(Laratrust::hasRole('member')) return $this->memberDashboard();  
        return view('home');
    }
    protected function adminDashboard(){
        $name =Auth::user()->name;
        $id =Auth::user()->id;
        $user =User::find($id);
        activity()
           ->performedOn($user)
           ->causedBy($user)
           ->withProperties(['customProperty' => $name])
           ->log($name.' Has Login');
           
        $lastLoggedActivity = Activity::all()->last();

        $lastLoggedActivity->subject; //returns an instance of an eloquent model
        $lastLoggedActivity->causer; //returns an instance of your user model
        $lastLoggedActivity->getExtraProperty('customProperty'); //returns 'customValue'
        $lastLoggedActivity->description; //returns 'Look mum, I logged something' 
        return view('backend/admin/index');
    }
    protected function memberDashboard(){
        $name =Auth::user()->name;
        $id =Auth::user()->id;
        $user =User::find($id);
        activity()
           ->performedOn($user)
           ->causedBy($user)
           ->withProperties(['customProperty' => $name])
           ->log($name.' Has Login');
           
        $lastLoggedActivity = Activity::all()->last();

        $lastLoggedActivity->subject; //returns an instance of an eloquent model
        $lastLoggedActivity->causer; //returns an instance of your user model
        $lastLoggedActivity->getExtraProperty('customProperty'); //returns 'customValue'
        $lastLoggedActivity->description; //returns 'Look mum, I logged something'
        return view('frontend/index');
    }
}
