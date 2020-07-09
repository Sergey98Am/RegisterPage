<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Response;

class ActivationUserController extends Controller
{
    public function activation(){
        return view('auth.activation');
    }


    public function postActivation(Request $request){

        $user = User::where('activation_token',$request->activation_token)->first();

        if($user){
            $user->active = true;
            $user->activation_token = NULL;
            $user->update();
            return response::json($user);
        }
    }
}
