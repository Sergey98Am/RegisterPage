<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AtAvailableController extends Controller
{
    function check(Request $request){

        $at_available = User::where('activation_token',$request->activation_token)->count();

        if($at_available > 0){
            echo 'is true';
        }else{
            echo 'is false';
        }
        
    }
}
