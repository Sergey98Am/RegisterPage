<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\User;
use Validator;
use Response;

class VerifyTokenController extends Controller
{
    public function verifyToken(){
        return view('auth.passwords.verify_token');
    }

    public function postVerifyToken(Request $request){

        $user = User::where('activation_token',$request->activation_token)->first();
        
        if($user){
            return response::json($user);
        }
    }
}