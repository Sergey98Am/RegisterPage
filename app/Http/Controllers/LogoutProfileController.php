<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Session;

class LogoutProfileController extends Controller
{
    public function logout(Request $request)
    {
      
       Session::flush();
        $request->session()->invalidate();
    }
}
