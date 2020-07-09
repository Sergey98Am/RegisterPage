<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Auth;
use App\User;
use Validator;
use Response;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    public function update(Request $request, $activation_token){
        
        $this->validate($request,[
            'email' => 'required|email|exists:users',
            'password' => 'required|min:8|confirmed'
        ]);

        $user = User::where('activation_token',$activation_token)->first();

        if($request->email == $user->email){
            $user->password = bcrypt($request->password);
            $user->activation_token = null;
            $user->update();
            return response::json($user);
        }
    }
}
