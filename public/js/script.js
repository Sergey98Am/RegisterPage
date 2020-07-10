$(document).ready(function () {

    
    //Login System
    function loginSystem() {
        //Login

        $('.site-menu button').on('click', function () {
            $("#login-form .modal-title").text('Sign In').css({'color': '#212529'});
        })

        function login() {
            $('#login-form').on('submit', function (e) {
                e.preventDefault()
                var form = $(this);
                $.ajax({
                    url: form.attr('action'),
                    method: 'post',
                    data: form.serialize(),
                    beforeSend: function () {
                        $('#wrap').addClass('wrap');
                        form.find('.help-block').detach()
                    },
                    success: function (response) {
                        $('#wrap').removeClass('wrap');
                        location.reload()
                    },
                    error: function (xhr) {
                        $('#wrap').removeClass('wrap');

                        var response = xhr.responseJSON;
                        var errors = response.errors;

                        $.each(errors, (key, value) => {
                            $(`#login-form #${key}`).addClass('input_border')
                                .closest(
                                    '.form_div').append(
                                    `<p class="help-block m-0">${value.join(", ")}</p>`
                                )
                        })

                    }
                })
            })

            //Login Validation
            function loginValidation() {
                //Email valdiation
                $('#login-form #email').on('blur', function () {
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The email field is required.</p>`)
                    } else {
                        var email = $('#login-form #email').val();
                        var _token = $('input[name="_token"]').val();
                        $.ajax({
                            url: '/active_email',
                            method: 'POST',
                            data: {
                                email: email,
                                _token: _token
                            },
                            success: function (response) {
                                if (response == 'active is false') {
                                    $('#login-form #email').addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block m-0">Email is not active.</p>`)
                                } else {
                                    $('#login-form #email').removeClass('input_border')

                                }
                            }
                        })
                    }

                })
                //end Email valdiation
            }
            loginValidation()
            //end Login Validation
        }
        login()
        //end Login

        //Register
        function register() {
            $('#register-form').on('submit', function (e) {
                e.preventDefault()
                var form = $(this);
                $.ajax({
                    url: form.attr('action'),
                    method: 'post',
                    data: form.serialize(),
                    beforeSend: function () {
                        $('#wrap').addClass('wrap');
                        form.find('.help-block').detach()
                    },
                    success: function () {
                        $('#wrap').removeClass('wrap');
                        $('#register_modal').modal('hide')
                        $('#OTP_modal').modal('show')
                        $('#OTP_modal #activation_token').attr("placeholder",
                            "Please Wait");
                        $('#OTP_modal #activation_token').attr("placeholder",
                            "Code has been sent to your email, Please Enter Here"
                        );
                    },
                    error: function (xhr) {
                        $('#wrap').removeClass('wrap');

                        var response = xhr.responseJSON;
                        var errors = response.errors;

                        $.each(errors, (key, value) => {
                            $(`#register-form #${key}`).addClass('input_border')
                                .closest(
                                    '.form_div').append(
                                    `<p class="help-block m-0">${value.join(", ")}</p>`
                                )
                        })

                    }
                })

            })

            //Register Validation
            function registerValidation() {
                //name Validation
                $('#register-form #name').on('blur', function () {
                    var regex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The name field is required.</p>`)
                    } else if (!regex.test($(this).val())) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The name format is invalid.</p>`)
                    } else {
                        $(this).removeClass('input_border')
                            .addClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block_1 m-0">The name field is available.</p>`)
                    }
                });
                //end name Validation


                //email Validation
                $('#register-form #email').on('blur', function () {
                    var regex =
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The name field is required.</p>`)
                    } else if (!regex.test($(this).val())) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The email format is invalid.</p>`)
                    } else {
                        $(this).addClass('input_is_not_empty')
                        $(this).removeClass('input_border')
                        var email = $('#register-form #email').val();
                        var _token = $('input[name="_token"]').val();
                        $.ajax({
                            url: '/email_available',
                            method: 'POST',
                            data: {
                                email: email,
                                _token: _token
                            },
                            success: function (response) {
                                $('#register-form .help-block_1').detach()
                                $('#register-form .help-block').detach()
                                if (response == 'not_unique') {
                                    $('#register-form #email').addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(
                                            `<p class="help-block m-0">The email has already been taken.</p>`
                                        )
                                } else {
                                    $('#register-form #email').removeClass('input_border')
                                        .addClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block_1 m-0">The email field is available.</p>`)
                                }
                            }
                        })
                    }
                });
                //end email Validation

                //password Validation
                $('#register-form #password').on('blur', function () {
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password field is required.</p>`)
                    } else if ($(this).val().length < 8 && $(this).val() == $('#register-form #password_confirmation').val()) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password must be at least 8 characters.</p>`)
                    } else if ($(this).val().length < 8 && $(this).val() != $('#register-form #password_confirmation').val()) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password must be at least 8 characters., The password confirmation does not match.</p>`)
                    } else if ($(this).val().length >= 8 && $(this).val() != $('#register-form #password_confirmation').val()) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password confirmation does not match.</p>`)
                    } else {
                        $(this).removeClass('input_border').addClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block_1 m-0">The password field is available.</p>`)
                    }
                })
                //end password Validation

                //password Confirmation Validation
                $('#register-form #password_confirmation').on('blur', function () {
                    $('#register-form #password').closest('.form_div').children('.help-block').detach()
                    $('#register-form #password').closest('.form_div').children('.help-block_1').detach()
                    if ($('#register-form #password').val().length == 0) {
                        $('#register-form #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password field is required.</p>`)
                    } else if ($('#register-form #password').val().length < 8 && $('#register-form #password').val() == $(this).val()) {
                        $('#register-form #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password must be at least 8 characters.</p>`)
                    } else if ($('#register-form #password').val().length < 8 && $('#register-form #password').val() != $(this).val()) {
                        $('#register-form #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password must be at least 8 characters., The password confirmation does not match.</p>`)
                    } else if ($('#register-form #password').val().length >= 8 && $('#register-form #password').val() != $(this).val()) {
                        $('#register-form #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password confirmation does not match.</p>`)
                    } else {
                        $('#register-form #password').removeClass('input_border').addClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block_1 m-0">The password field is available.</p>`)
                    }
                })
                //end password Confirmation Validation

                //end Country Validation
                $('#register-form #country').on('blur', function () {
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The country field is required.</p>`)
                    } else {
                        $(this).removeClass('input_border')
                            .addClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block_1 m-0">The country field is available.</p>`)
                    }
                })
                //end Country Validation

                //phone Validation
                $('#register-form #phone').on('blur', function () {
                    var regex = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{13}$)/;
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The country field is required.</p>`)
                    } else if (!regex.test($(this).val())) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The phone format is invalid.</p>`)
                    } else {
                        $(this).removeClass('input_border')
                            .addClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block_1 m-0">The phone field is available.</p>`)
                    }
                })
                //end phone Validation


                //date of birth Validation
                $('#register-form #date_of_birth').on('blur', function () {
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The date of birth field is required.</p>`)
                    } else {
                        $(this).removeClass('input_border')
                            .addClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block_1 m-0">The date of birth field is available.</p>`)
                    }
                })
                //end date of birth Validation


                //end Register Validation
            }
            registerValidation()
            //end Register Validation
        }
        register()
        //end Register


        //Activation Email
        function activationEmail() {
            $('.act_email_btn').on('click', function () {
                $("#activation_email .modal-title").text('Activation Email').css({'color': '#212529'});
            })


            $('#activation_email').on('submit', function (e) {
                e.preventDefault()
                var form = $(this);
                $.ajax({
                    url: form.attr('action'),
                    method: 'post',
                    data: form.serialize(),
                    beforeSend: function () {
                        $('#wrap').addClass('wrap');
                        form.find('.help-block').detach()
                    },
                    success: function (response) {
                        if (response == false) {
                            $('#wrap').removeClass('wrap');
                            $('#activation_email_modal').modal('hide')
                            $('#OTP_modal').modal('show')
                            $('#OTP_modal #activation_token').attr(
                                'placeholder', 'Please Wait')
                            $('#OTP_modal #activation_token').attr(
                                'placeholder',
                                'A code has been sent to your email, Please Enter Here'
                            );
                        } else {
                            $('#wrap').removeClass('wrap');
                            $('#activation_email_modal').modal('hide')
                            $('#login-form .modal').modal('show')
                            $('#login_modal .modal-title').text(
                                    "This profile is active, you can sign in to your profile")
                                .css({
                                    'color': 'green'
                                });
                        }

                    },
                    error: function (xhr) {
                        $('#wrap').removeClass('wrap');

                        var response = xhr.responseJSON;
                        var errors = response.errors;

                        $.each(errors, (key, value) => {
                            $(`#activation_email #${key}`).addClass('input_border')
                                .closest(
                                    '.form_div').append(
                                    `<p class="help-block m-0">${value.join(", ")}</p>`
                                )
                        })

                    }
                })

            })

            //Activation Email Validation
            function activationEmailValidation() {
                $('#activation_email #email').on('blur', function () {
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The email field is required.</p>`)
                    } else {
                        $(this).addClass('input_is_not_empty')
                        $(this).removeClass('input_border')
                        var email = $('#activation_email #email').val();
                        var _token = $('input[name="_token"]').val();
                        $.ajax({
                            url: '/email_available',
                            method: 'POST',
                            data: {
                                email: email,
                                _token: _token
                            },
                            success: function (response) {
                                if (response == 'unique') {
                                    $('#activation_email #email').addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(
                                            `<p class="help-block m-0">The selected email is invalid.</p>`
                                        )
                                } else {
                                    $('#activation_email #email').removeClass('input_border')
                                        .addClass('input_is_not_empty')
                                }
                            }
                        })
                    }
                })
            }
            activationEmailValidation()
            //end Activation Email Validation
        }
        activationEmail()
        //end Activation Email


        //Activation User
        function activationUser() {
            $('#OTP').on('submit', function (e) {
                e.preventDefault()
                var form = $(this);
                $.ajax({
                    url: form.attr('action'),
                    method: 'post',
                    data: form.serialize(),
                    beforeSend: function () {
                        $('#wrap').addClass('wrap');
                        form.find('.help-block').detach()
                    },
                    success: function (response) {
                        if (response) {
                            $('#wrap').removeClass('wrap');
                            $('#OTP_modal').modal('hide')
                            $('#login_modal').modal('show')
                            $('#login_modal #activation_token').attr(
                                "placeholder",
                                "Please Wait");
                            $('#login_modal .modal-title').text(
                                    "Registration successfully completed!")
                                .css({
                                    'color': 'green'
                                });
                        } else {
                            $('#wrap').removeClass('wrap');
                            $(`#OTP #activation_token`).closest(
                                '.form-group').append(
                                `<span class="help-block">Doesn't match</span>`
                            )
                        }

                    },
                    error: function (xhr) {
                        $('#wrap').removeClass('wrap');

                        var response = xhr.responseJSON;
                        var errors = response.errors;

                        $.each(errors, (key, value) => {
                            $(`#OTP #${key}`).addClass('input_border')
                                .closest(
                                    '.form_div').append(
                                    `<p class="help-block m-0">${value.join(", ")}</p>`
                                )
                        })
                    }
                })
            })
            //Activation User Validation
            function activationUserValidation() {
                $('#OTP #activation_token').on('blur', function () {
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    var activation_token = $('#OTP #activation_token').val();
                    var _token = $('input[name="_token"]').val();
                    $.ajax({
                        url: '/at_available',
                        method: 'POST',
                        data: {
                            activation_token: activation_token,
                            _token: _token
                        },
                        success: function (response) {

                            if (response == 'is false') {
                                $(this).addClass('input_is_not_empty')
                                $(this).removeClass('input_border')

                                $('#OTP #activation_token').addClass('input_border')
                                    .removeClass('input_is_not_empty')
                                    .closest('.form_div')
                                    .append(
                                        `<p class="help-block m-0">Doesn't match.</p>`
                                    )
                            } else {
                                $('#OTP #activation_token').removeClass('input_border')
                                    .addClass('input_is_not_empty')
                                    .closest('.form_div')
                                    .append(`<p class="help-block_1 m-0">It's true</p>`)
                            }
                        }
                    })
                })


            }
            activationUserValidation()
            //end Activation User Validation
        }
        activationUser()
        //end Activation User


        //Password Reset
        function passwordReset() {
            $('#password_reset').on('submit', function (e) {
                e.preventDefault()
                var form = $(this);
                $.ajax({
                    url: form.attr('action'),
                    method: 'post',
                    data: form.serialize(),
                    beforeSend: function () {
                        $('#wrap').addClass('wrap');
                        form.find('.help-block').detach()
                    },
                    success: function (response) {
                        console.log(response == true)
                        if (response) {
                            $('#wrap').removeClass('wrap');
                            $('#password_reset_modal').modal('hide')
                            $('#OTP_reset_modal').modal('show')
                            $('#OTP_reset_modal #activation_token').attr(
                                "placeholder",
                                "Please Wait");
                            $('#OTP_reset_modal #activation_token').attr(
                                    "placeholder",
                                    "Has been reset successfully")
                                .css({
                                    'color': 'green'
                                });
                        } else {
                            $('#wrap').removeClass('wrap');
                            $('#password_reset_modal').modal('hide')
                            $('#activation_email .modal').modal('show')
                            $('#activation_email .modal-title').text(
                                "This profile isn't active, activate it")
                            .css({
                                'color': 'red'
                            });
                        }
                    },
                    error: function (xhr) {
                        $('#wrap').removeClass('wrap');

                        var response = xhr.responseJSON;
                        var errors = response.errors;

                        $.each(errors, (key, value) => {
                            $(`#password_reset #${key}`).addClass('input_border')
                                .closest(
                                    '.form_div').append(
                                    `<p class="help-block m-0">${value.join(", ")}</p>`
                                )
                        })

                    }
                })

            })
            //Password Reset Validation
            function passwordResetValidation() {
                $('#password_reset #email').on('blur', function () {
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The email field is required.</p>`)
                    } else {
                        $(this).addClass('input_is_not_empty')
                        $(this).removeClass('input_border')
                        var email = $('#password_reset #email').val();
                        var _token = $('input[name="_token"]').val();
                        $.ajax({
                            url: '/email_available',
                            method: 'POST',
                            data: {
                                email: email,
                                _token: _token
                            },
                            success: function (response) {
                                $('#password_reset .help-block_1').detach()
                                $('#password_reset .help-block').detach()
                                if (response == 'unique') {
                                    $('#password_reset #email').addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(
                                            `<p class="help-block m-0">The selected email is invalid.</p>`
                                        )
                                } else {
                                    $('#password_reset #email').removeClass('input_border')
                                        .addClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block_1 m-0">If this email is active, you will receive activation code</p>`)
                                }
                            }
                        })
                    }
                })
            }
            passwordResetValidation()
            //end Password Reset Validation
        }
        passwordReset()
        //end Password Reset


        //OTP Reset
        function OTPReset() {
            $('#OTP_reset').on('submit', function (e) {
                e.preventDefault()
                var form = $(this);
                $.ajax({
                    url: form.attr('action'),
                    method: 'post',
                    data: form.serialize(),
                    beforeSend: function () {
                        $('#wrap').addClass('wrap');
                    },
                    success: function (response) {
                        $('#wrap').removeClass('wrap');

                        if (response) {
                            $('#OTP_reset_modal').modal('hide')
                            $('#OTP_new_modal').modal('show')
                            $("#OTP_new").attr("action",
                                "http://register_page.loc/reset_password/" +
                                response.activation_token),
                            $("#OTP_new_modal #token").val(response.activation_token);
                        } else {
                            $("#OTP_reset .help-block").text("Doesn't match").css({
                                'color': 'red'
                            });
                        }
                    },
                })

            })
            //OTP Reset Validation
            function OTPResetValidation() {
                $('#OTP_reset #activation_token').on('blur', function () {
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    var activation_token = $('#OTP_reset #activation_token').val();
                    var _token = $('input[name="_token"]').val();
                    $.ajax({
                        url: '/at_available',
                        method: 'POST',
                        data: {
                            activation_token: activation_token,
                            _token: _token
                        },
                        success: function (response) {

                            if (response == 'is false') {
                                $(this).addClass('input_is_not_empty')
                                $(this).removeClass('input_border')

                                $('#OTP_reset #activation_token').addClass('input_border')
                                    .removeClass('input_is_not_empty')
                                    .closest('.form_div')
                                    .append(
                                        `<p class="help-block m-0">Doesn't match.</p>`
                                    )
                            } else {
                                $('#OTP_reset #activation_token').removeClass('input_border')
                                    .addClass('input_is_not_empty')
                                    .closest('.form_div')
                                    .append(`<p class="help-block_1 m-0">It's true</p>`)
                            }
                        }
                    })
                })

            }
            OTPResetValidation()
            //end OTP Reset Validation
        }
        OTPReset()
        //end OTP Reset

        //OTP new password
        function OTPNew() {
            $('#OTP_new').on('submit', function (e) {
                e.preventDefault()
                var form = $(this);
                $.ajax({
                    url: form.attr('action'),
                    method: 'post',
                    data: form.serialize(),
                    beforeSend: function () {
                        $('#wrap').addClass('wrap');
                        form.find('.help-block').detach()
                    },
                    success: function (response) {
                        if (response) {
                            $('#wrap').removeClass('wrap');
                            $('#OTP_new_modal').modal('hide')
                            $('#login_modal').modal('show')
                            $("#login-form .modal-title").text('Sign In');
                        } else {
                            $('#wrap').removeClass('wrap');
                        }
                    },
                    error: function (xhr) {
                        $('#wrap').removeClass('wrap');

                        var response = xhr.responseJSON;
                        var errors = response.errors;

                        $.each(errors, (key, value) => {
                            $(`#OTP_new #${key}`).addClass('input_border')
                                .closest(
                                    '.form_div').append(
                                    `<p class="help-block m-0">${value.join(", ")}</p>`
                                )
                        })

                    }
                })

            })
            //OTP new password Validation
            function OTPNewValidation() {
                //email Validation
                $('#OTP_new #email').on('blur', function () {
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The email field is required.</p>`)
                    } else {
                        $(this).addClass('input_is_not_empty')
                        $(this).removeClass('input_border')
                        var email = $('#OTP_new #email').val();
                        var _token = $('input[name="_token"]').val();
                        $.ajax({
                            url: '/email_available',
                            method: 'POST',
                            data: {
                                email: email,
                                _token: _token
                            },
                            success: function (response) {
                                $('#OTP_new .help-block_1').detach()
                                $('#OTP_new .help-block').detach()
                                if (response == 'unique') {
                                    $('#OTP_new #email').addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(
                                            `<p class="help-block m-0">The selected email is invalid.</p>`
                                        )
                                } else {
                                    $('#OTP_new #email').removeClass('input_border')
                                        .addClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block_1 m-0">The email field is available.</p>`)
                                }
                            }
                        })
                    }
                });
                //end email Validation

                //password Validation
                $('#OTP_new #password').on('blur', function () {
                    $(this).closest('.form_div').children('.help-block').detach()
                    $(this).closest('.form_div').children('.help-block_1').detach()
                    if ($(this).val().length == 0) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password field is required.</p>`)
                    } else if ($(this).val().length < 8 && $(this).val() == $('#OTP_new #password_confirmation').val()) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password must be at least 8 characters.</p>`)
                    } else if ($(this).val().length < 8 && $(this).val() != $('#OTP_new #password_confirmation').val()) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password must be at least 8 characters., The password confirmation does not match.</p>`)
                    } else if ($(this).val().length >= 8 && $(this).val() != $('#OTP_new #password_confirmation').val()) {
                        $(this).addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password confirmation does not match.</p>`)
                    } else {
                        $(this).removeClass('input_border').addClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block_1 m-0">The password field is available.</p>`)
                    }
                })
                //end password Validation

                //password Confirmation Validation
                $('#OTP_new #password_confirmation').on('blur', function () {
                    $('#OTP_new #password').closest('.form_div').children('.help-block').detach()
                    $('#OTP_new #password').closest('.form_div').children('.help-block_1').detach()
                    if ($('#OTP_new #password').val().length == 0) {
                        $('#OTP_new #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password field is required.</p>`)
                    } else if ($('#OTP_new #password').val().length < 8 && $('#OTP_new #password').val() == $(this).val()) {
                        $('#OTP_new #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password must be at least 8 characters.</p>`)
                    } else if ($('#OTP_new #password').val().length < 8 && $('#OTP_new #password').val() != $(this).val()) {
                        $('#OTP_new #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password must be at least 8 characters., The password confirmation does not match.</p>`)
                    } else if ($('#OTP_new #password').val().length >= 8 && $('#OTP_new #password').val() != $(this).val()) {
                        $('#OTP_new #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password confirmation does not match.</p>`)
                    } else {
                        $('#OTP_new #password').removeClass('input_border').addClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block_1 m-0">The password field is available.</p>`)
                    }
                })
                //end password Confirmation Validation

            }
            OTPNewValidation()
            //end OTP new password Validation
        }
        OTPNew()
        //end OTP new password
    }

    loginSystem()
    //end Login System


    //DateTime
        function dateTime(){
            $('#date_of_birth').datetimepicker({
                format: 'd-m-y',
            });
        }
        dateTime()
    //end DateTime


    //ModalScroll
        function modalScroll(){
            $('.modal').on('show.bs.modal', function (e) {
                $('body').removeClass('offcanvas-menu');
        
            })
        
            $('.modal').on("hidden.bs.modal", function (e) {
                if ($('.modal:visible').length) {
                    $('body').addClass('modal-open');
                }
            })
        }
        modalScroll()
    //end ModalScroll


    //Profile
        function profile(){
            //end Avatar
            $('#user_avatar').on('change', function () {

                var img_info = new FormData($('#form-img')[0])
        
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
        
                $.ajax({
                    url: location.origin + '/avatar',
                    method: 'POST',
                    data: img_info,
                    processData: false,
                    cache: false,
                    contentType: false,
                    beforeSend: function () {
                        $('#wrap').addClass('wrap');
                        $('#form-img').find('.help-block_2').detach()
                    },
                    success: function (data) {
                        $('#wrap').removeClass('wrap');
                        if(data){
                            $('.image-area form').detach();
                            $('#form-img').css({'display':'none'})
                            $('#avatar').attr('src', location.origin + '/images/' + data);
                            $('.image-area').append('<form action="http://register_page.loc/delete_avatar" method="post"><input id="del-avatar" type="hidden" name="avatar" value="'+data+'"><input type="submit" class="remove-image" style="display: inline;" value="×"></form>');
                        }
                       
                    },
                    error: function (xhr) {
                        $('.image-area form').detach();
                        $('#wrap').removeClass('wrap');
                        var response = xhr.responseJSON;
                        var errors = response.errors;
                        $.each(errors, (key, value) => {
                            $(`#form-img`)
                                .closest(
                                    '#form-img').append(
                                    `<p class="help-block_2 m-0">${value.join(", ")}</p>`
                                )
                        })
                        $('#avatar').attr('src',location.origin + '/images/file_error.png');
                    }
                })
        
            })
            //end Avatar

            //Upload image 
                function upload(){
                $('#upload').on('click', function(){
                    $('#user_avatar').click();
                });
                }
                upload()
            //end Upload image 

            //Delete avatar
                $(document).on('submit', '.image-area form', function (e) {
                    e.preventDefault()
                    var form = $(this);
                    var avatar = $('#del-avatar').val();
                    var token = $("meta[name='csrf-token']").attr("content");
                    $.ajax({
                        url: form.attr('action'),
                        method: 'post',
                        data: {
                            "avatar": avatar,
                            "_token": token,
                        },
                        beforeSend: function () {
                            $('#wrap').addClass('wrap');
                            $('#form-img').find('.help-block').detach()
                        },
                        success: function (response) {
                            $('#form-img').css({'display':'inline-block'})
                            $('#wrap').removeClass('wrap');
                            $('.image-area form').detach()
                        $('#user_avatar').val('');
                            
                        
                            $('.image-area img').attr('src','http://register_page.loc/images/avatar.png')
                        },
                        
            
                    })
                
                })
            //end Delete avatar

            //Update profile
                function editProfile(){
                    $('#edit form').on('submit', function (e) {
                        e.preventDefault()
                        var form = $(this);
                        $.ajax({
                            url: form.attr('action'),
                            method: 'post',
                            data: form.serialize(),
                            beforeSend: function () {
                                $('#wrap').addClass('wrap');
                                form.find('.help-block').detach()
                                form.find('.help-block_1').detach()
                            },
                            success: function (response) {
                                $('#wrap').removeClass('wrap');
                                $('.changes').append('<span class="help-block_1 ml-2">The Changes Have Been Saved</span>');
                                $.each($('.form_div .form-control'), (key, value) => {
                                    $(value).removeClass('input_border').removeClass('input_is_not_empty');
                                })
                            },
                            error: function (xhr) {
                                $('#wrap').removeClass('wrap');
        
                                var response = xhr.responseJSON;
                                var errors = response.errors;
        
                                $.each(errors, (key, value) => {
                                    $(`#edit form #${key}`).addClass('input_border')
                                        .closest(
                                            '.form_div').append(
                                            `<p class="help-block m-0">${value.join(", ")}</p>`
                                        )
                                })
        
                            }
                        })
                    })

                    //Update profile Validation
                    function editProfileValidation(){
                        //name Validation
                            $('#edit #name').on('blur', function () {
                                var regex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
                                $(this).closest('.form_div').children('.help-block').detach()
                                $(this).closest('.form_div').children('.help-block_1').detach()
                                if ($(this).val().length == 0) {
                                    $(this).addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block m-0">The name field is required.</p>`)
                                } else if (!regex.test($(this).val())) {
                                    $(this).addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block m-0">The name format is invalid.</p>`)
                                } else {
                                    $(this).removeClass('input_border')
                                        .addClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block_1 m-0">The name field is available.</p>`)
                                }
                            }); 
                        //end name Validation

                        //phone Validation
                            $('#edit #phone').on('blur', function () {
                                    var regex = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{13}$)/;
                                    $(this).closest('.form_div').children('.help-block').detach()
                                    $(this).closest('.form_div').children('.help-block_1').detach()
                                    if ($(this).val().length == 0) {
                                        $(this).addClass('input_border')
                                            .removeClass('input_is_not_empty')
                                            .closest('.form_div')
                                            .append(`<p class="help-block m-0">The country field is required.</p>`)
                                    } else if (!regex.test($(this).val())) {
                                        $(this).addClass('input_border')
                                            .removeClass('input_is_not_empty')
                                            .closest('.form_div')
                                            .append(`<p class="help-block m-0">The phone format is invalid.</p>`)
                                    } else {
                                        $(this).removeClass('input_border')
                                            .addClass('input_is_not_empty')
                                            .closest('.form_div')
                                            .append(`<p class="help-block_1 m-0">The phone field is available.</p>`)
                                    }
                            })
                        //end phone Validation

                         //end Country Validation
                            $('#edit #country').on('blur', function () {
                                $(this).closest('.form_div').children('.help-block').detach()
                                $(this).closest('.form_div').children('.help-block_1').detach()
                                if ($(this).val().length == 0) {
                                    $(this).addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block m-0">The country field is required.</p>`)
                                } else {
                                    $(this).removeClass('input_border')
                                        .addClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block_1 m-0">The country field is available.</p>`)
                                }
                            })
                        //end Country Validation

                        //password Validation
                            $('#edit #password').on('blur', function () {
                                $(this).closest('.form_div').children('.help-block').detach()
                                $(this).closest('.form_div').children('.help-block_1').detach()
                                
                                if ($(this).val().length == 0) {
                                    $(this).removeClass('input_border')
                                        .removeClass('input_is_not_empty')
                                } else if ($(this).val().length < 8 && $(this).val() == $('#edit #password_confirmation').val()) {
                                    $(this).addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block m-0">The password must be at least 8 characters.</p>`)
                                } else if ($(this).val().length < 8 && $(this).val() != $('#edit #password_confirmation').val()) {
                                    $(this).addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block m-0">The password must be at least 8 characters., The password confirmation does not match.</p>`)
                                } else if ($(this).val().length >= 8 && $(this).val() != $('#edit #password_confirmation').val()) {
                                    $(this).addClass('input_border')
                                        .removeClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block m-0">The password confirmation does not match.</p>`)
                                } else {
                                    $(this).removeClass('input_border').addClass('input_is_not_empty')
                                        .closest('.form_div')
                                        .append(`<p class="help-block_1 m-0">The password field is available.</p>`)
                                }
                            })
                        //end password Validation

                        //password Confirmation Validation
                            $('#edit #password_confirmation').on('blur', function () {
                    $('#edit #password').closest('.form_div').children('.help-block').detach()
                    $('#edit #password').closest('.form_div').children('.help-block_1').detach()
                    if ($('#edit #password').val().length == 0) {
                        $('#edit #password').removeClass('input_border')
                            .removeClass('input_is_not_empty')
                    }else if ($('#edit #password').val().length < 8 && $('#edit #password').val() == $(this).val()) {
                        $('#edit #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password must be at least 8 characters.</p>`)
                    } else if ($('#edit #password').val().length < 8 && $('#edit #password').val() != $(this).val()) {
                        $('#edit #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password must be at least 8 characters., The password confirmation does not match.</p>`)
                    } else if ($('#edit #password').val().length >= 8 && $('#edit #password').val() != $(this).val()) {
                        $('#edit #password').addClass('input_border')
                            .removeClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block m-0">The password confirmation does not match.</p>`)
                    } else {
                        $('#edit #password').removeClass('input_border').addClass('input_is_not_empty')
                            .closest('.form_div')
                            .append(`<p class="help-block_1 m-0">The password field is available.</p>`)
                    }
                    })
                    //end password Confirmation Validation
                    }
                    editProfileValidation()
                    //end Update profile Validation
                }
                editProfile()
            //end Update profile
        }
        profile()
    //end Profile


    //Reset Modal
    function resetModal(){
        $('body').on('hidden.bs.modal', '.modal', function (e) {
            $('.modal').parent()[0].reset();
    
            $.each($('.modal'), (key, value) => {
                $(value).parent()[0].reset();
            })
    
            $.each($('.form_div .form-control'), (key, value) => {
                $(value).removeClass('input_border').removeClass('input_is_not_empty');
            })
    
            $(".help-block").remove();
            $(".help-block_1").remove();
        })
     }
     resetModal()
    //end Reset Modal
})