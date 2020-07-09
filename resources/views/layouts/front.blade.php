<!DOCTYPE html>
<html lang="en">

<head>
    <title>Register Page</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,700|Anton" rel="stylesheet">


    <link rel="stylesheet" href="fonts/icomoon/style.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/magnific-popup.css">
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/owl.theme.default.min.css">
    <link rel="stylesheet" href="css/aos.css">
    <link rel="stylesheet" href="css/style.css">

    <link href="{{ asset('css/jquery.datetimepicker.css') }}" rel="stylesheet">

</head>

<body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">

    <div class="site-wrap" id="home-section">

        <div class="site-mobile-menu site-navbar-target">
            <div class="site-mobile-menu-header">
                <div class="site-mobile-menu-close mt-3">
                    <span class="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
            <div class="site-mobile-menu-body"></div>
        </div>


        <header class="site-navbar js-sticky-header site-navbar-target" role="banner">

            <div class="container">
                <div class="row align-items-center position-relative">
                    <div class="site-logo">
                        <a href="{{ route('home') }}" class="text-black"><span class="text-primary">Register Page</a>
                    </div>

                    <nav class="site-navigation text-center ml-auto" role="navigation">
                        <ul class="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
                            <li><a href="{{ route('home') }}" class="nav-link">Home</a></li>
                            @guest
                            <li>
                                <button data-toggle="modal" data-target="#login_modal" style="width: 100%" type="button"
                                    class=" btn btn-danger">Sign In</button>
                            </li>
                            @else
                            <li>
                                <a href="{{ route('profile') }}">{{ Auth::user()->name }}</a>
                            </li>
                            <li>
                                <form action="{{ route('logout') }}" method="POST">
                                    @csrf
                                    <button style="width: 100%" class="btn btn-danger">Logout</button>
                                </form>
                            </li>
                            @endguest
                        </ul>
                    </nav>

                    <div class="toggle-button d-inline-block d-lg-none"><a href="#"
                            class="site-menu-toggle py-5 js-menu-toggle text-black"><span
                                class="icon-menu h3"></span></a></div>
                </div>
            </div>
        </header>

        <div class="site-section" id="team-section">
            @show
            @yield('content')

        </div>
        <footer class="site-footer">
            <div class="container">
                <div class="row text-center">
                    <div class="col-md-12">
                        <div class="border-top pt-4 pb-4">
                            <p class="m-0">
                                Made By <i>Sergey Gabrielyan</i>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    </div>



    <!--Login User Modal -->
    <form id="login-form" class="form" method="POST" action="{{ route('login') }}" aria-label="{{ __('Login') }}">
        @csrf
        <div class="modal fade" id="login_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Sign In</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group form_div">
                            <label for="email">Email address</label>
                            <input id="email" type="text" class="form-control" name="email" value="{{ old('email') }}"
                                placeholder="Enter Email">
                        </div>

                        <div class="form-group form_div">
                            <label for="password">Password</label>
                            <input id="password" type="password" class="form-control" placeholder="Password"
                                name="password">
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="remember" name="remember"
                                    {{ old('remember') ? 'checked' : '' }}>
                                <label class="custom-control-label" for="remember">Remember Me</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <button id="sign_up" aria-label="Close" data-target="#register_modal" data-toggle="modal"
                                data-dismiss="modal" type="button" class="btn btn-info">Sign Up</button>

                            <button aria-label="Close" data-target="#activation_email_modal" data-toggle="modal"
                                data-dismiss="modal" type="button" class="act_email_btn btn btn-warning">Activation Email</button>


                            <button class="btn btn-dark" aria-label="Close" data-toggle="modal"
                                data-target="#password_reset_modal" data-dismiss="modal" type="button">I forgot my
                                password</button>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button aria-hidden="true" type="button" class="btn btn-secondary"
                            data-dismiss="modal">Close</button>
                        <button class="btn btn-primary">Sign In</button>
                    </div>
                </div>
            </div>

        </div>
    </form>
    <!--end Login User Modal -->


    <!--Register User Modal -->
    <form id="register-form" class="form " method="POST" action="{{ route('register') }}"
        aria-label="{{ __('Login') }}">
        @csrf
        <div class="modal fade" id="register_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-row">
                            <div class="form-group col-md-6 form_div">
                                <label for="name">Full Name</label>

                                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}"
                                    placeholder="Enter Full Name">
                            </div>
                            <div class="form-group col-md-6 form_div">
                                <label for="email">Email</label>
                                <input id="email" type="text" class="form-control" name="email"
                                    value="{{ old('email') }}" placeholder="Enter Email">

                            </div>
                            <div class="form-group col-md-6 form_div">
                                <label for="password">Password</label>
                                <input id="password" type="password" class="form-control" name="password"
                                    placeholder="Enter Password">
                            </div>
                            <div class="form-group col-md-6 form_div">
                                <label for="password_confirmation">Password Confimation</label>

                                <input id="password_confirmation" type="password" name="password_confirmation"
                                    class="form-control" placeholder="Confirm password">
                            </div>
                            <div class="form-group col-md-12 form_div">
                                <select name="country" id="country" class="form-control">
                                    <option value="">Select Country</option>
                                    @foreach($countries as $country)
                                    <option value="{{$country->id}}">{{$country->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group col-md-6 form_div">
                                <label for="phone">Phone</label>

                                <input id="phone" type="text" name="phone" class="form-control"
                                    placeholder="Enter Phone Number">
                            </div>
                            <div class="form-group col-md-6 form_div">
                                <label for="date_of_birth">Date Of Bitrh</label>

                                <input id="date_of_birth" type="text" id="date_of_birth" name="date_of_birth"
                                    class="form-control" placeholder="Date Of Birth">
                            </div>
                            <div class="form-group col-md-12 form_div">
                                <p class="form-contol">Gender</p>
                                <div id='gender' class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="male" name="gender" class="custom-control-input" value="0">
                                    <label class="custom-control-label" for="male">Male</label>
                                </div>
                                <div id='gender' class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="female" name="gender" class="custom-control-input"
                                        value="1">
                                    <label class="custom-control-label" for="female">Female</label>
                                </div>

                            </div>
                            <div class="form-group col-md-12 form_div">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                                    <label class="custom-control-label" for="customCheck1">Remember Me</label>
                                </div>
                            </div>

                            <div class="form-group col-md-12">
                                <button id="sign_up" aria-label="Close" data-target="#login_modal" data-toggle="modal"
                                    data-dismiss="modal" type="button" class="btn btn-success mr-1">Sign In</button>

                                <button aria-label="Close" data-target="#activation_email_modal" data-toggle="modal"
                                    data-dismiss="modal" type="button" class="act_email_btn btn btn-warning mr-1">Activation
                                    Email</button>

                                <button class="btn btn-dark" aria-label="Close" data-toggle="modal"
                                    data-target="#password_reset_modal" data-dismiss="modal" type="button">I forgot my
                                    password</button>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button aria-hidden="true" type="button" class="btn btn-secondary"
                                data-dismiss="modal">Close</button>
                            <button class="btn btn-primary">Sign Up</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </form>
    <!--end Register User Modal -->


    <!--Activation Email User Modal -->
    <form id="activation_email" class="form" method="POST" action="{{ route('postActivationEmail') }}"
        aria-label="{{ __('Login') }}">
        @csrf
        <div id="activation_email_modal" class="modal fade" id="activation_email_modal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Activation Email</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group form_div">
                            <label for="email">Email</label>

                            <input id="email" type="text" class="form-control" name="email" value="{{ old('email') }}"
                                placeholder="Enter Email">
                        </div>
                        <div class="form-group">
                            <button id="sign_up" aria-label="Close" data-target="#login_modal" data-toggle="modal"
                                data-dismiss="modal" type="button" class="btn btn-success mr-1">Sign In</button>

                            <button id="sign_up" aria-label="Close" data-target="#register_modal" data-toggle="modal"
                                data-dismiss="modal" type="button" class="btn btn-info mr-1">Sign Up</button>

                            <button class="btn btn-dark" aria-label="Close" data-toggle="modal"
                                data-target="#password_reset_modal" data-dismiss="modal" type="button">I forgot my
                                password</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button aria-hidden="true" type="button" class="btn btn-secondary"
                            data-dismiss="modal">Close</button>
                        <button id="activation_submit" type="submit" class="btn btn-primary pull-right">
                            <i class="fa fa-btn fa-envelope"></i> Go Ahead
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <!-- end activation Email User Modal -->


    <!-- OTP-->
    <form id="OTP" class="form" method="POST" action="{{ route('postActivation') }}">
        @csrf
        <div id="OTP_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Activation</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group has-feedback form_div">
                            <label for="activation_token">Activation Token</label>
                            <input id="activation_token" type="text" class="form-control" name="activation_token"
                                value="{{ old('activation_token') }}" placeholder="Enter Activation Token">
                        </div>
                        <div class="form-group">
                            <button id="sign_in" aria-label="Close" data-target="#login_modal" data-toggle="modal"
                                data-dismiss="modal" type="button" class="btn btn-info">Sign In</button>
                            <button id="sign_up" aria-label="Close" data-target="#register_modal" data-toggle="modal"
                                data-dismiss="modal" type="button" class="btn btn-success">Sign Up</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button aria-hidden="true" type="button" class="btn btn-secondary"
                            data-dismiss="modal">Close</button>
                        <button id="activation_submit" type="submit" class="btn btn-primary pull-right">
                            <i class="fa fa-btn fa-envelope"></i> Activate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <!-- end OTP -->



    <!--Password Reset User Modal -->
    <form id="password_reset" class="form" method="POST" action="{{ route('forgottenPost') }}"
        aria-label="{{ __('Login') }}">
        @csrf
        <div class="modal fade" id="password_reset_modal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Reset Password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group form_div">
                            <label for="email">Email</label>

                            <input id="email" type="text" class="form-control" name="email" value="{{ old('email') }}"
                                placeholder="Enter Email">
                        </div>
                        <div class="form-group">
                            <button aria-label="Close" data-target="#login_modal" data-toggle="modal"
                                data-dismiss="modal" type="button" class="btn btn-info">Sign In</button>
                            <button id="sign_up" aria-label="Close" data-target="#register_modal" data-toggle="modal"
                                data-dismiss="modal" type="button" class="btn btn-success">Sign Up</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button aria-hidden="true" type="button" class="btn btn-secondary"
                            data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary pull-right">
                            <i class="fa fa-btn fa-envelope"></i> Go Ahead
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </form>
    <!-- end Password Reset User Modal -->


    <!-- OTP Reset Password -->
    <form id="OTP_reset" class="form" method="POST" action="{{ route('postVerifyToken') }}">
        @csrf
        <div id="OTP_reset_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Reset Password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group form_div">
                            <label for="activation_token">Activation Token</label>

                            <input id="activation_token" type="text" class="form-control" name="activation_token"
                                value="{{ old('activation_token') }}" placeholder="Enter Activation Token">
                        </div>
                        <div class="form-group">
                            <button aria-label="Close" data-target="#login_modal" data-toggle="modal"
                                data-dismiss="modal" type="button" class="btn btn-info">Sign In</button>
                            <button id="sign_up" aria-label="Close" data-target="#register_modal" data-toggle="modal"
                                data-dismiss="modal" type="button" class="btn btn-success">Sign Up</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button aria-hidden="true" type="button" class="btn btn-secondary"
                            data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary pull-right">
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <!-- end OTP Reset Password -->


    <!-- OTP New Password -->
    <form id="OTP_new" class="form" method="POST" action="">
        @csrf
        @method('PUT')
        <div id="OTP_new_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Reset Password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="token" name="token" value="">

                        <div class="form-group form_div">
                            <input id='email' type="text" class="form-control" name="email" value="{{ old('email') }}"
                                placeholder="Email">
                        </div>

                        <div class="form-group form_div">
                            <input id='password' type="password" class="form-control" name="password"
                                placeholder="Password">
                        </div>

                        <div class="form-group form_div">
                            <input id='password_confirmation' type="password" name="password_confirmation"
                                class="form-control" placeholder="Confirm password">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button aria-hidden="true" type="button" class="btn btn-secondary"
                            data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary pull-right">
                            Create New Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <!-- end OTP New Password  -->


    <div id="wrap">
        <div class="loader"></div>
    </div>

    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/jquery.magnific-popup.min.js"></script>
    <script src="js/jquery.sticky.js"></script>
    <script src="js/aos.js"></script>
    <script src="js/main.js"></script>
    <script src="{{asset('js/script.js')}}"></script>
    <script src="{{asset('js/jquery.datetimepicker.full.js')}}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>
</body>




<style>

</style>


</html>