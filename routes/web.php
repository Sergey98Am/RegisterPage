<?php



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','FrontController@index');
Route::get('/home', 'FrontController@index')->name('home');
Route::get('/profile','ProfileController@index')->name('profile');

Auth::routes(['verify' => true]);

//Change avatar
Route::post('/avatar','ProfileController@change_avatar')->name('avatar');
//end Change avatar

//Delete avatar
Route::post('/delete_avatar','ProfileController@deleteAvatar')->name('delete_avatar');
//end Delete avatar

//Update profile
Route::post('/update_profile','ProfileController@update')->name('update_profile');
//end Update profile

//Activation User
Route::get('/activation', 'Auth\ActivationUserController@activation')->name('activation');
Route::post('/postActivation', 'Auth\ActivationUserController@postActivation')->name('postActivation');
//end Activation User

//Activation Email
Route::post('/postActivationEmail', 'Auth\ActivationEmailController@postActivationEmail')->name('postActivationEmail');
//end Activation Email

//Email Available
Route::post('/email_available', 'EmailAvailableController@check')->name('emailAvailable');
//end Email Available

//end At Available
Route::post('/at_available', 'AtAvailableController@check')->name('atAvailable');
//end At Available

//Active Email
Route::post('/active_email', 'ActiveEmailController@check')->name('activeEmail');
//end Active Email

//Login Password
Route::post('/login_password', 'LoginPasswordController@check')->name('loginPassword');
//end Login Password

//User Reset Password
Route::post('/forgotten_post', 'Auth\ForgotPasswordController@forgottenPost')->name('forgottenPost');
Route::get('/verify_token', 'Auth\VerifyTokenController@verifyToken')->name('verifyToken');
Route::post('/post_verify_token', 'Auth\VerifyTokenController@postVerifyToken')->name('postVerifyToken');
Route::resource('/reset_password', 'Auth\ResetPasswordController');
//end User Reset Password


