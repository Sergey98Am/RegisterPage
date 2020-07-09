@extends('layouts.front')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-lg-4">
            <div class="profile-card-4 z-depth-3">
                <div class="card">
                    <div class="card-body text-center bg-primary rounded-top">
                        <div class="user-box">
                            <div class="image-area form_div">
                                @if(Auth::user()->avatar)
                                <img src="/images/{{ Auth::user()->avatar }}" id="avatar">
                                <form action="{{ route('delete_avatar') }}" method="post">
                                    <input id='del-avatar' type="hidden" name='avatar'
                                        value='{{ Auth::user()->avatar }}'>
                                    <input type="submit" class="remove-image" style="display: inline;" value="&#215;">
                                </form>
                                @else
                                <img src="http://register_page.loc/images/avatar.png" id="avatar">
                                @endif
                            </div>
                                <form action="#" method="post" enctype="multipart/form-data" id="form-img" style='{{ Auth::user()->avatar == null ?  'display: inline-block' : 'display: none'}}'>
                                    <input type="hidden" name="user_id" value="1">
                                    <input type="file" name="user_avatar" id="user_avatar" hidden="hidden" > 
                                    <button type="button" id="upload">Choose image</button>
                                </form>
                        </div>
                        
                        <h5 class="mb-1 text-white">{{ Auth::user()->name }}</h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-group shadow-none">
                            <li class="list-group-item">
                                <div class="list-icon">
                                    <i class="fa fa-envelope"></i>
                                </div>
                                <div class="list-details">
                                    <span>{{ Auth::user()->email }}</span>
                                    <small>Email Address</small>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card z-depth-3">
                <div class="card-body">
                    <ul class="nav nav-pills nav-pills-primary nav-justified">
                        <li class="nav-item">
                            <a href="javascript:void();" data-target="#profile" data-toggle="pill"
                                class="nav-link active show"><i class="icon-user"></i> <span
                                    class="hidden-xs">Profile</span></a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void();" data-target="#edit" data-toggle="pill" class="nav-link"><i
                                    class="icon-note"></i> <span class="hidden-xs">Edit</span></a>
                        </li>
                    </ul>
                    <div class="tab-content p-3">
                        <div class="tab-pane active show" id="profile">
                            <div class="row">
                                <div class="col-md-12">
                                    <h5 class="mt-2 mb-3"><span class="fa fa-clock-o ion-clock float-right"></span>
                                        Personal information</h5>
                                    <table class="table table-hover table-striped">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Phone Number:
                                                    <strong>`{{ Auth::user()->phone }}`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Gender:
                                                    @if(Auth::user()->gender == 0)
                                                    <strong>`Male`</strong>
                                                    @else
                                                    <strong>`Female`</strong>
                                                    @endif

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Date Of Birth:
                                                    <strong>` {{ Auth::user()->date_of_birth }} `</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Country:
                                                    <strong>` {{ $userCountry->name }} `</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!--/row-->
                        </div>
                        <div class="tab-pane" id="edit">
                            <form action='{{route('update_profile')}}' method="post">
                                @csrf
                                <div class="form-group row">
                                    <label for='name' class="col-lg-3 col-form-label form-control-label">First/Last
                                        Name</label>
                                    <div class="col-lg-9 form_div">
                                        <input id='name' name='name' class="form-control" type="text"
                                            value="{{ Auth::user()->name }}">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for='email' class="col-lg-3 col-form-label form-control-label">Email</label>
                                    <div class="col-lg-9">
                                        <input id='email' class="form-control" type="text"
                                            value="{{ Auth::user()->email }}" >
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for='phone' class="col-lg-3 col-form-label form-control-label">Phone</label>
                                    <div class="col-lg-9 form_div">
                                        <input id='phone' name='phone' class="form-control" type="text"
                                            value="{{ Auth::user()->phone }}">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for='country'
                                        class="col-lg-3 col-form-label form-control-label">Country</label>
                                    <div class="col-lg-9 form_div">
                                        <select name="country" id="country" class="form-control">
                                            <option value="">Select Country</option>
                                            @foreach($countries as $country)
                                            <option value="{{$country->id}}"
                                                {{ Auth::user()->country == $country->id ? 'selected' : '' }}>
                                                {{$country->name}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for='password'
                                        class="col-lg-3 col-form-label form-control-label">Password</label>
                                    <div class="col-lg-9 form_div">
                                        <input id='password' name='password' class="form-control" type="password"
                                            value="">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for='password_confirmation'
                                        class="col-lg-3 col-form-label form-control-label">Confirm password</label>
                                    <div class="col-lg-9 form_div">
                                        <input id='password_confirmation' name='password_confirmation'
                                            class="form-control" type="password" value="">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9 changes">
                                        <input type="submit" class="btn btn-primary" value="Save Changes">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
@endsection