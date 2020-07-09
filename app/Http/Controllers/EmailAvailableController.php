<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class EmailAvailableController extends Controller
{
    function check(Request $request){

        $email_available = User::where('email',$request->email)->count();

        if($email_available > 0){
            echo 'not_unique';
        }else{
            echo 'unique';
        }
 
    }
}
