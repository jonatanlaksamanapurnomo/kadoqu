<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\EventReminder;
use App\Event;
use Validator;

class EventReminderController extends Controller
{
    public function create_event(Request $req){
        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'backgroundColor' => 'required',
            'borderColor' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }
        $event = new Event;
        $event->title = $req->title;
        $event->backgroundColor = $req->backgroundColor;
        $event->borderColor = $req->borderColor;
        $event->email = Auth::user()->email;
        if($event->save()){
            return response()->json(["success"=>"Berhasil Menambah Event"],200);
        }else{
            return response()->json(["success"=>"Gagal Menambah Event!"],500);
        }
        
    }
    public function delete_event($id){
        $user = Auth::user();
        $event = Event::where('id',$id)->where('email',$user->email)->first();
        if($event == null){
            return response()->json(["error"=>"Event Tidak Ditemukan"],400);
        }
        $event->delete();
        return response()->json(["success"=>"Berhasil Menghapus Event"],200);
    }
    public function store(Request $req){
        $validator = Validator::make($req->all(), [
            'start' => 'required|date',
            'end' => 'required|sometimes|date',
            'title' => 'required',
            'backgroundColor' => 'required',
            'borderColor' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }
        $event = new EventReminder;
        $event->title = $req->title;
        $event->start = $req->start;
        $event->end = $req->end;
        $event->backgroundColor = $req->backgroundColor;
        $event->borderColor = $req->borderColor;
        $event->email = Auth::user()->email;
        if($event->save()){
            return response()->json(["success"=>"Berhasil Menambah Event Reminder","event"=>$event],200);
        }else{
            return response()->json(["success"=>"Gagal Menambah Event Reminder!"],500);
        }
    }
    public function update(Request $req,$id){
        $validator = Validator::make($req->all(), [
            'start' => 'required|date',
            'end' => 'required|sometimes|date'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }
        $user = Auth::user();
        $event = EventReminder::where('id',$id)->where('email',$user->email)->first();
        if($event != null){
            $event->start = $req->start;
            $event->end = $req->end;
            if($event->save()){
                return response()->json(["success"=>"Berhasil Update Event Reminder"],200);
            }else{
                return response()->json(["success"=>"Gagal Update Event Reminder, Silahkan Cek ID / Akses User Anda!"],500);
            }
        }
    }
    public function delete($id){
        $user = Auth::user();
        $event = EventReminder::where('id',$id)->where('email',$user->email)->first();
        if($event == null){
            return response()->json(["error"=>"Event Reminder Tidak Ditemukan"],400);
        }
        $event->delete();
        return response()->json(["success"=>"Berhasil Menghapus Event Reminder"],200);
    }
}
