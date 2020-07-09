<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Events\Auth\ActivationEmail;
use Response;
use Validator;

class ActivationEmailController extends Controller
{
    public function postActivationEmail(Request $request){

        $this->validate($request,[
            'email' => ['required', 'string', 'max:255', 'exists:users'],
        ]);
        
        $user = User::where('email',$request->email)->first();

        if($user->active == false){
            function generateNumericOTP($n) { 
                $generator = "1357902468"; 
              
                $result = ""; 
              
                for ($i = 1; $i <= $n; $i++) { 
                    $result .= substr($generator, (rand()%(strlen($generator))), 1); 
                } 
                return $result; 
            } 
            $user->activation_token =  generateNumericOTP(6);
            $user->update();
            event(new ActivationEmail($user));
        }else{
            return response::json($user->active);
        }
    }
}
