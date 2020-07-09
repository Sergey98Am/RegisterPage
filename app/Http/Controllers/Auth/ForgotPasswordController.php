<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Auth;
use App\User;
use Validator;
use App\Events\Auth\ForgotActivationEmail;
use Response;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;


    public function forgottenPost(Request $request){
        
        $this->validate($request,[
            'email' => ['required', 'string', 'max:255', 'exists:users'],
        ]);

        $user = User::where('email',$request->email)->first();

        if($user->active == true){
            function generateNumericOTP($n) { 
                $generator = "1357902468"; 
              
                $result = ""; 
              
                for ($i = 1; $i <= $n; $i++) { 
                    $result .= substr($generator, (rand()%(strlen($generator))), 1); 
                } 
                return $result; 
            } 
            $user->activation_token = generateNumericOTP(6);
            $user->update();
            event(new ForgotActivationEmail($user));
            return response::json($user->active);
        }
    }
}
