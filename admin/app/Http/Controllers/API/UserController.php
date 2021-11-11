<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hash;
use App\PasswordReset;
use Carbon\Carbon;
use Validator;
use App\User;
use Mail;
use View;


class UserController extends Controller
{
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('authentication')->accessToken;
            return response()->json(['success' => $success], 200);
        }
        else{
            return response()->json(['error'=>'Unauthorized'], 401);
        }
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'confirm_password' => 'required|same:password',
            'alamat' => 'required|min:10',
            'no_telp' => 'required|min:11'
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('authentication')->accessToken;
        return response()->json(['success'=>$success], 200);
    }
    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], 200);
    }
    public function update(Request $request,$jenis)
    {
        $user_id = Auth::user()->id;
        $user = User::find($user_id);
        if($jenis == "data_diri"){
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'alamat' => 'required',
                'jenis_kelamin' => 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 401);            
            }

            $user->name = $request->name;
            $user->alamat = $request->alamat;
            $user->jenis_kelamin = $request->jenis_kelamin;
            $user->no_telp = $request->no_telp;
            $user->tanggal_lahir = $request->tanggal_lahir;
            $user->save();
        }
        else if($jenis == "password"){
            $validator = Validator::make($request->all(), [
                'old_password' => 'required',
                'password' => 'required|min:6',
                'confirm_password' => 'required|same:password',
            ]);

            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 401);            
            }
            if (Hash::check($request->old_password, $user->password)) {
                $user->password = bcrypt($request->password);
                $user->save();
            }else{
                return response()->json(["error"=>"Wrong Password"],400);
            }
        }
        else if($jenis == "image"){
            function getName($ext){
                $name = "profil-".str_random(10).".".$ext;
                if(User::where("images",$name)->first() != null){
                    getName($ext);
                }else{
                    return $name;
                }
            }
            $fileName = getName($request->file->getClientOriginalExtension());
            $request->file->move(public_path("uploads"),$fileName);
            $user->images = "/uploads/".$fileName;
            $user->save();
        }
        else{
            return response()->json(["error"=>"Parameter Not Found!"],400);
        }

        return response()->json(['success' => $user], 200);
    }
    public function forgot_password($email){
        $user = User::where('email',$email)->first();
        if($user != null){
            function generatePassword(){
                $token = str_random(8);
                return $token;
            }
            $token = generatePassword();
            $user->password = bcrypt($token);
            $user->save();
            $view = View::make('auth.reset', ['user'=>$user,'token' => $token]);
            $html = $view->render();

            $result =  \Guzzle::post('http://kadoqu.aegis.co.id/mailer/',[
                'json' => [
                    'to' => $email,
                    'subject' => 'Reset Password Kadoqu',
                    'body' => $html
                ]
            ]);  
            if(json_decode($result->getBody()->getContents())->status == "success"){
                return response()->json(['success'=>'Sent!, Please Check Your Email!'],200);
            }else{
                return response()->json(['error'=>$result["msg"]]);
            }
        }else{
            return response()->json(['error' => 'Email Not Found'],401);
        }
    }
    public function check_token($token){
        $reset = PasswordReset::where('token',$token)->first();
        if($reset != null){
            $active_date = new Carbon($reset->updated_at);
            $user = User::where('email',$reset->email)->first();
            if($active_date->diffInHours(Carbon::now()) > 24){
                return response()->json(['error'=> 'Code Expired'],417);
            }else{
                return response()->json(['success'=> $user]);
            }
        }else{
            return Response()->json(['error' => 'Not Found'],404);
        }
    }
    public function reset_password(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
            'confirm_password' => 'required|same:password',
            'token' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }

        $user = User::where('email',$request->email)->first();
        $reset = PasswordReset::where('email',$request->email)->where('token',$request->token)->first();
        $active_date = new Carbon($reset->updated_at);
        if($active_date->diffInHours(Carbon::now()) > 24){
            return response()->json(['error'=> 'Code Expired'],417);
        }else{
            $user->password = bcrypt($request->password);
            $user->save();
            $reset->delete();
            return response()->json(['success'=> 'Success, Password Changed!']);
        }
    }
}
