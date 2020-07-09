<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class ActiveEmailController extends Controller
{
    function check(Request $request){

        $email_available = User::where('email',$request->email)->first();

        if($email_available){
            if($email_available->active){
                echo 'active is true';
            }
        }else{
            echo 'active is false';
        }
 
    } 
}
