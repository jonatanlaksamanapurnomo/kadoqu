<?php

namespace App\Http\Controllers;

use App\PermissionsTemporary;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;
use illuminate\Support\Facades\Auth;
use App\User;
use Spatie\Activitylog\Models\Activity;

class PermissionsTemporaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('backend.role.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name'   =>  'required'
            ]);
        $data = new PermissionsTemporary();
        $data->id = $request->id;
        $data->name = $request->name;
        
        //Create Log
        $name   =Auth::user()->name;
        $id     =Auth::user()->id;
        $user   =User::find($id);
        activity()
           ->performedOn($user)
           ->causedBy($user)
           ->withProperties(['customProperty' => $name])
           ->log($name.' Success Create Data Permissions <b><u>'.$data->name.'</u></b>');
        $lastLoggedActivity = Activity::all()->last();
        $lastLoggedActivity->subject; //returns an instance of an eloquent model
        $lastLoggedActivity->causer; //returns an instance of your user model
        $lastLoggedActivity->getExtraProperty('customProperty'); //returns 'customValue'
        $lastLoggedActivity->description; //returns 'Look mum, I logged something' 
        // dd(Activity::all());

        $data->save();
        return $data; 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = PermissionsTemporary::find($id);
        return $data;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = PermissionsTemporary::find($id);
        $data->id = $request->id;
        $data->name = $request->name;

        //Create Log
        //Create Log
        $name   =Auth::user()->name;
        $id     =Auth::user()->id;
        $user   =User::find($id);
        activity()
           ->performedOn($user)
           ->causedBy($user)
           ->withProperties(['customProperty' => $name])
           ->log($name.' Success Edit Data Permissions <b><u>'.$data->name.'</u></b>');
        $lastLoggedActivity = Activity::all()->last();
        $lastLoggedActivity->subject; //returns an instance of an eloquent model
        $lastLoggedActivity->causer; //returns an instance of your user model
        $lastLoggedActivity->getExtraProperty('customProperty'); //returns 'customValue'
        $lastLoggedActivity->description; //returns 'Look mum, I logged something' 

        $data->update();

        return $data;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = PermissionsTemporary::where('id', '=', $id)->delete();

      //Create Log
        $name   =Auth::user()->name;
        $id     =Auth::user()->id;
        $user   =User::find($id);
        activity()
           ->performedOn($user)
           ->causedBy($user)
           ->withProperties(['customProperty' => $name])
           ->log($name.' Success Delete Data Permissions');
        $lastLoggedActivity = Activity::all()->last();
        $lastLoggedActivity->subject; //returns an instance of an eloquent model
        $lastLoggedActivity->causer; //returns an instance of your user model
        $lastLoggedActivity->getExtraProperty('customProperty'); //returns 'customValue'
        $lastLoggedActivity->description; //returns 'Look mum, I logged something' 

        return $data;
    }

    public function apiPermissions() 
    {
        $data = PermissionsTemporary::all();

         return Datatables::of($data)
         ->addColumn('action', function($permissions) {
            return '<a href="#" class="btn m-btn--pill m-btn--air btn-info"><i class="flaticon-eye"></i> Show </a> '.
            '<a onclick="editForm('. $permissions->id .')" href="#" class="btn m-btn--pill m-btn--air btn-warning"><i class="flaticon-edit-1"></i> EDIT </a> '.
            '<a onclick="deleteData('. $permissions->id .')" href="#" class="btn m-btn--pill m-btn--air btn-danger"><i class="   flaticon-delete-1"></i> Delete </a>';
         })->make(true);
    }
}
