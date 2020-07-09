<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Country;


class FrontController extends Controller
{
    function index(){
        $countries = Country::all();
        return view('index',compact('countries'));
    }
}
