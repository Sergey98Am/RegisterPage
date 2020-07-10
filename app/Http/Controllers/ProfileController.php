<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Country;
use Illuminate\Support\Facades\Auth;
use App\User;
use Response;

class ProfileController extends Controller
{
    function index(){
        $countries = Country::all();
        $userCountry = Country::where('id',Auth::user()->country)->first();
        return view('profile',compact('countries','userCountry'));
    }

    function change_avatar(Request $request){

        $this->validate($request,[
            'user_avatar' => ['mimes:jpeg,jpg,png,gif|max:10240']
        ]);

        if ($request->hasFile('user_avatar')){
            $file = $request->file('user_avatar');
            $file_name = time().$file->getClientOriginalName();
            $file->move(public_path().'/images/',$file_name);
            $user = Auth::user();
            $user->avatar = $file_name;
            $user->update();
            return response::json($user->avatar);
        }
    }

    function deleteAvatar(Request $request){
        $destroy = User::where('avatar',$request->avatar)->first();
            \File::delete(public_path().'/images/'.$destroy->avatar);
            $destroy->avatar = null;
            $destroy->update();
            return response::json($destroy);
    }


    public function update(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string',"regex:/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/"],
            'password' => 'sometimes|nullable|string|min:8|confirmed',
            'country' => ['required'],
            'phone' => ['required', 'string', "regex:/(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{13}$)/"],
        ]);

        $user = auth()->user();
        $input = $request->except('password', 'password_confirmation');

        if (!$request->filled('password')) {
            $user->fill($input)->save();

            return;
        }

        $user->password = bcrypt($request->password);
        $user->fill($input)->save();

        return;

    }
}
