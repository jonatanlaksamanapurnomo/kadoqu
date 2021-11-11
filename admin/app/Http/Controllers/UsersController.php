<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Role;
use App\Permission;
use Yajra\Datatables\Datatables;
Use Illuminate\Support\Facades\Mail;
use Spatie\Activitylog\Models\Activity;
use DB;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view ('backend.user.index');
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
        $this->validate($request,[
            'name'  => 'required',
            'email' => 'required|email',
        ]);
        $password           = str_random(6);
        $data               = new User();
        $data->id           = $request->id;
        $data->name         = $request->name;
        $data->email        = $request->email;
        $data->password     = bcrypt($password);
        $data->is_verified  = $request->is_verified;
        $data->images       = 'icons8-male-user-50.png';
        $role               = $request->role;

        $data->save;
        $data->sendVerification();

        //SetRole
        $memberRole         = Role::where('name',$role)->first();
        $data->attachRole($memberRole);

        //sendMail
        Mail::send('auth.emails.invite',compact('data','password'), function ($m) use ($data){
            $m->to($data->email, $data->name)->subject('Anda Telah di Daftarkan oleh Admin Kami:)');
        });
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
       
        // $data = User::find($id);
        // $data = User::with('Role')->where('Role.id','=',1)->first();
        // $data = Role::find($id)->users()->get();
        $data = User::with('roles')->get();
        $ganteng = $data->where('id','=',$id)->first();
        return $ganteng;       
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
        $data = User::find($id);
        $data->id = $request->id;
        $data->name = $request->name;
        $data->email = $request->email;
        $data->is_verified = $request->is_verified;
        $data->images = $request->images;
        $data->update();

        $role               = $request->role;
        $memberRole         = Role::where('name',$role)->first();
        $data->roles()->sync($memberRole);
        if ($memberRole == true) {
        }
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
       $data = User::destroy($id);
        return $data;
    }


    public function userLog()
    {
        return view('backend.user.loguser');
    }

    public function deleteUserLog($id)
    {
       $data = Activity::destroy($id);
        return $data;
    }


    //Api User
    public function apiUsers() 
    {
         // $data = DB::table('users')->join('permission_role','users.id','=','permission_role.role_id')->join('permissions','permission_role.permission_id','=','permissions.id')->select('users.name','users.email','users.images','users.is_verified','users.id','permission_role.permission_id','permissions.name as permission_role')->get();
        $data = User::all();
        // $data = DB::table('users')->join('role_user','users.id','=','role_user.role_id')->join('roles','role_user.role_id','=','roles.id')->select('users.name','users.email','users.images','users.is_verified','users.id','roles.name as role_name')->get();        
         return Datatables::of($data)
         ->addColumn('action', function($users) {
            return
            '<a onclick="editForm('. $users->id .')" href="#" class="btn m-btn--pill m-btn--air btn-warning"><i class="flaticon-edit-1"></i> EDIT </a> '.
            '<a onclick="deleteData('. $users->id .')" href="#" class="btn m-btn--pill m-btn--air btn-danger"><i class="   flaticon-delete-1"></i> Delete </a>';
         })->make(true);
    }

    //Api UserLog
    public function apiUserLog() {
        // $data = Activity::where('subject_id',2)->take(1000000)->get();
        $data = Activity::all();
        return Datatables::of($data)
         ->addColumn('action', function($logs) {
            return
            '<a onclick="deleteData('. $logs->id .')" href="#" class="btn m-btn--pill m-btn--air btn-danger"><i class="   flaticon-delete-1"></i> Delete </a>';
         })->rawColumns(['description', 'action'])->make(true);;
    }
}
