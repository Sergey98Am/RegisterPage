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
                    } else if ($(this).val().length == 8 && $(this).val() != $('#register-form #password_confirmation').val()) {
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
                    } else if ($('#register-form #password').val().length == 8 && $('#register-form #password').val() != $(this).val()) {
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
                    } else if ($(this).val().length == 8 && $(this).val() != $('#OTP_new #password_confirmation').val()) {
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
                    } else if ($('#OTP_new #password').val().length == 8 && $('#OTP_new #password').val() != $(this).val()) {
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
                                } else if ($(this).val().length == 8 && $(this).val() != $('#edit #password_confirmation').val()) {
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
                    } else if ($('#edit #password').val().length == 8 && $('#edit #password').val() != $(this).val()) {
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



    // $('.register-box #date_of_birth').datetimepicker({
    //     format: 'YYYY-MM-DD',
    //     useCurrent: false,
    // })
    // //General
    // //Classes
    // $('body').on('hidden.bs.modal', '#class-add-modal', function (e) {
    //     $('#class-add-form')[0].reset();
    // })

    // $('#class-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var class_name = button.data('class_name');
    //     var class_code = button.data('class_code');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var class_id = button.data('class_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View class information');
    //     modal.find('.modal-body #class_name').val(class_name);
    //     modal.find('.modal-body #class_code').val(class_code);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #class_id').val(class_id);
    // })

    // $('#class-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var class_id = button.data('class_id')
    //     var class_name = button.data('class_name');
    //     var class_code = button.data('class_code');
    //     var modal = $(this);


    //     modal.find('.modal-title').text('Edit Class');
    //     modal.find('.modal-body #class_id').val(class_id);
    //     modal.find('.modal-body #class_name').val(class_name);
    //     modal.find('.modal-body #class_code').val(class_code);

    // })

    // $('body').on('hidden.bs.modal', '#class-edit-modal', function (e) {
    //     $('#class-edit-form')[0].reset();
    // })
    // //end Classes


    // //Classrooms
    // $('body').on('hidden.bs.modal', '#classroom-add-modal', function (e) {
    //     $('#create-classroom-form')[0].reset();
    // })

    // $('#classroom-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var classroom_name = button.data('classroom_name');
    //     var classroom_code = button.data('classroom_code');
    //     var status = button.data('status');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var classroom_id = button.data('classroom_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View classroom information');
    //     modal.find('.modal-body #classroom_name').val(classroom_name);
    //     modal.find('.modal-body #classroom_code').val(classroom_code);
    //     modal.find('.modal-body #status').val(status);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #classroom_id').val(classroom_id);
    // })

    // $('#classroom-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var classroom_id = button.data('classroom_id')
    //     var classroom_name = button.data('classroom_name');
    //     var classroom_code = button.data('classroom_code');
    //     var classroom_description = button.data('classroom_description');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Class');
    //     modal.find('.modal-body #classroom_id').val(classroom_id);
    //     modal.find('.modal-body #classroom_name').val(classroom_name);
    //     modal.find('.modal-body #classroom_code').val(classroom_code);
    //     modal.find('.modal-body #classroom_description').val(classroom_description);


    //     if (button.data('classroom_status')) {
    //         $(e.target).find("input[type='checkbox']").attr('checked', 'checked')

    //         console.log(e.target)
    //     } else {
    //         $(this).find("input[type='checkbox']").removeAttr('checked')

    //     }
    // })

    // $('body').on('hidden.bs.modal', '#classroom-edit-modal', function (e) {
    //     $('#edit-classroom-form')[0].reset();
    // })
    // //end Classrooms


    // //levels
    // $('body').on('hidden.bs.modal', '#level-add-modal', function (e) {
    //     $('#create-level-form')[0].reset();
    // })

    // $('#level-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var level = button.data('level');
    //     var course_id = button.data('course_id');
    //     var level_description = button.data('level_description');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var level_id = button.data('level_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View level information');
    //     modal.find('.modal-body #level').val(level);
    //     modal.find('.modal-body #course_id').val(course_id);
    //     modal.find('.modal-body #level_description').val(level_description);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #level_id').val(level_id);
    // })

    // $('#level-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var level_id = button.data('level_id');
    //     var level = button.data('level');
    //     var course_id = button.data('course_id');
    //     var level_description = button.data('level_description');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Level');
    //     modal.find('.modal-body #level_id').val(level_id);
    //     modal.find('.modal-body #level').val(level);
    //     modal.find('.modal-body #course_id').val(course_id);
    //     modal.find('.modal-body #level_description').val(level_description);
    // })

    // $('body').on('hidden.bs.modal', '#level-edit-modal', function (e) {
    //     $('#edit-level-form')[0].reset();
    // })
    // //end Levels


    // //Batches
    // $('body').on('hidden.bs.modal', '#batch-add-modal', function (e) {
    //     $('#create-batch-form')[0].reset();
    // })

    // $('#batch-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var batch_year = button.data('batch_year');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var batch_id = button.data('batch_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View batch information');
    //     modal.find('.modal-body #batch_year').val(batch_year);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #batch_id').val(batch_id);
    // })

    // $('#batch-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var batch_id = button.data('batch_id');
    //     var batch_year = button.data('batch_year');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Class');
    //     modal.find('.modal-body #batch_id').val(batch_id);
    //     modal.find('.modal-body #batch_year').val(batch_year);
    // })

    // $('body').on('hidden.bs.modal', '#batch-edit-modal', function (e) {
    //     $('#edit-batch-form')[0].reset();
    // })
    // //end Batches


    // //Shifts
    // $('body').on('hidden.bs.modal', '#shift-add-modal', function (e) {
    //     $('#create-shift-form')[0].reset();
    // })

    // $('#shift-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var shift = button.data('shift');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var shift_id = button.data('shift_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View shift information');
    //     modal.find('.modal-body #shift').val(shift);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #shift_id').val(shift_id);
    // })

    // $('#shift-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var shift_id = button.data('shift_id');
    //     var shift = button.data('shift');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Shift');
    //     modal.find('.modal-body #shift_id').val(shift_id);
    //     modal.find('.modal-body #shift').val(shift);
    // })

    // $('body').on('hidden.bs.modal', '#shift-view-modal', function (e) {
    //     $('#edit-shift-form')[0].reset();
    // })
    // //end Shifts


    // //Courses
    // $('body').on('hidden.bs.modal', '#add-course-modal', function (e) {
    //     $('#create-course-form')[0].reset();
    // })

    // $('#course-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var course_name = button.data('course_name');
    //     var course_code = button.data('course_code');
    //     var course_description = button.data('course_description');
    //     var status = button.data('status');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var course_id = button.data('course_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View course information');
    //     modal.find('.modal-body #course_name').val(course_name);
    //     modal.find('.modal-body #course_code').val(course_code);
    //     modal.find('.modal-body #course_description').val(course_description);
    //     modal.find('.modal-body #course_status').val(status);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #course_id').val(course_id);
    // })


    // $('#course-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var course_id = button.data('course_id');
    //     var course_name = button.data('course_name');
    //     var course_code = button.data('course_code');
    //     var course_description = button.data('course_description');
    //     var status = button.data('status');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Course');
    //     modal.find('.modal-body #course_id').val(course_id);
    //     modal.find('.modal-body #course_name').val(course_name);
    //     modal.find('.modal-body #course_code').val(course_code);
    //     modal.find('.modal-body #description').val(course_description);

    //     if (status) {
    //         $(e.target).find("input[type='checkbox']").attr('checked', 'checked')


    //     } else {
    //         $(e.target).find("input[type='checkbox']").removeAttr('checked')

    //     }
    // })

    // $('body').on('hidden.bs.modal', '#course-edit-modal', function (e) {
    //     $('#edit-course-form')[0].reset();
    // })
    // //end Courses

    // //Times
    // $('body').on('hidden.bs.modal', '#time-add-modal', function (e) {
    //     $('#create-time-form')[0].reset();
    // })

    // $('#time-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var time = button.data('time');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var time_id = button.data('time_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View time information');
    //     modal.find('.modal-body #time').val(time);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #time_id').val(time_id);
    // })


    // $('#time-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var time_id = button.data('time_id');
    //     var time = button.data('time');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Time');
    //     modal.find('.modal-body #time_id').val(time_id);
    //     modal.find('.modal-body #time').val(time);
    // })

    // $('body').on('hidden.bs.modal', '#time-edit-modal', function (e) {
    //     $('#edit-time-form')[0].reset();
    // })
    // //end Times


    // //Academics
    // $('body').on('hidden.bs.modal', '#add-academic-modal', function (e) {
    //     $('#create-academic-form')[0].reset();
    // })

    // $('#academic-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var academic_year = button.data('academic_year');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var academic_id = button.data('academic_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View academic information');
    //     modal.find('.modal-body #academic_year').val(academic_year);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #academic_id').val(academic_id);
    // })



    // $('#academic-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var academic_id = button.data('academic_id');
    //     var academic_year = button.data('academic_year');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Time');
    //     modal.find('.modal-body #academic_id').val(academic_id);
    //     modal.find('.modal-body #academic_year').val(academic_year);
    // })

    // $('body').on('hidden.bs.modal', '#academic-edit-modal', function (e) {
    //     $('#edit-academic-form')[0].reset();
    // })
    // //end Academics


    // //Days
    // $('body').on('hidden.bs.modal', '#day-add-modal', function (e) {
    //     $('#create-day-form')[0].reset();
    // })

    // $('#day-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var day = button.data('day');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var day_id = button.data('day_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View day information');
    //     modal.find('.modal-body #day').val(day);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #day_id').val(day_id);
    // })


    // $('#day-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var day_id = button.data('day_id');
    //     var name = button.data('day');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Day');
    //     modal.find('.modal-body #day_id').val(day_id);
    //     modal.find('.modal-body #name').val(name);
    // })

    // $('body').on('hidden.bs.modal', '#day-edit-modal', function (e) {
    //     $('#edit-day-form')[0].reset();
    // })
    // //end Days


    // //Semesters
    // $('body').on('hidden.bs.modal', '#semester-add-modal', function (e) {
    //     $('#create-semester-form')[0].reset();
    // })

    // $('#semester-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var semester_name = button.data('semester_name');
    //     var semester_code = button.data('semester_code');
    //     var semester_duration = button.data('semester_duration');
    //     var semester_description = button.data('semester_description');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var semester_id = button.data('semester_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View semester information');
    //     modal.find('.modal-body #semester_name').val(semester_name);
    //     modal.find('.modal-body #semester_code').val(semester_code);
    //     modal.find('.modal-body #semester_duration').val(semester_duration);
    //     modal.find('.modal-body #semester_description').val(semester_description);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #semester_id').val(semester_id);
    // })


    // $('#semester-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var semester_id = button.data('semester_id');
    //     var semester_name = button.data('semester_name');
    //     var semester_code = button.data('semester_code');
    //     var semester_duration = button.data('semester_duration');
    //     var semester_description = button.data('semester_description');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Semester');
    //     modal.find('.modal-body #semester_id').val(semester_id);
    //     modal.find('.modal-body #semester_name').val(semester_name);
    //     modal.find('.modal-body #semester_code').val(semester_code);
    //     modal.find('.modal-body #semester_duration').val(semester_duration);
    //     modal.find('.modal-body #semester_description').val(semester_description);
    // })

    // $('body').on('hidden.bs.modal', '#semester-edit-modal', function (e) {
    //     $('#edit-semester-form')[0].reset();
    // })
    // //end Semesters
    // //end General


    // //Schedule
    // //Class Schedules
    // $('#class_schedule-create-modal').on('show.bs.modal', function (e) {
    //     $("#class_schedule-create-modal #level_id").empty();
    //     $("#class_schedule-create-modal #level_id").append('<option selected value="">Level</option>')
    // })

    // $('#class_schedule-create-modal #start_date').datetimepicker({
    //     format: 'YYYY-MM-DD HH:mm:ss',
    //     useCurrent: false,
    // })
    // $('#class_schedule-create-modal #end_date').datetimepicker({
    //     format: 'YYYY-MM-DD',
    //     useCurrent: false,
    // })

    // $("#class_schedule-create-modal #course_id").on('change', function () {

    //     var course_id = $("#class_schedule-create-modal #course_id").val();
    //     if (!course_id) {
    //         $("#class_schedule-create-modal #level_id").empty();
    //         $("#class_schedule-create-modal #level_id").append('<option selected value="">Level</option>')
    //     } else {
    //         $.ajax({
    //             url: location.origin + '/dynamicLevel',
    //             method: 'GET',
    //             data: {
    //                 course_id: course_id
    //             },
    //             success: function (response) {
    //                 $("#class_schedule-create-modal #level_id").empty();
    //                 $.each(response, function (index, level) {
    //                     $("#class_schedule-create-modal #level_id").append(
    //                         '<option value="' + level.id + '">' + level
    //                         .level + '</option>')
    //                 })
    //                 if (response == '')(
    //                     $("#class_schedule-create-modal #level_id").append('<option value="" selected>There Is No Result Yet</option>')
    //                 )
    //             }
    //         })
    //     }
    // })
    // $('body').on('hidden.bs.modal', '#class_schedule-create-modal', function (e) {
    //     $('#class_schedule-create-form')[0].reset();
    // })


    // $('#class_schedule-edit-modal #start_date').datetimepicker({
    //     format: 'YYYY-MM-DD HH:mm:ss',
    //     useCurrent: false,
    // })
    // $('#class_schedule-edit-modal #end_date').datetimepicker({
    //     format: 'YYYY-MM-DD',
    //     useCurrent: false,
    // })

    // $('#class_schedule-show-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var course_id = button.data('course_id');
    //     var class_id = button.data('class_id');
    //     var level_id = button.data('level_id');
    //     var shift_id = button.data('shift_id');
    //     var classroom_id = button.data('classroom_id');
    //     var batch_id = button.data('batch_id');
    //     var day_id = button.data('day_id');
    //     var time_id = button.data('time_id');
    //     var semester_id = button.data('semester_id');
    //     var start_date = button.data('start_date');
    //     var end_date = button.data('end_date');
    //     var status = button.data('status');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View Class Schedule information');
    //     modal.find('.modal-body #course_id').val(course_id);
    //     modal.find('.modal-body #class_id').val(class_id);
    //     modal.find('.modal-body #level_id').val(level_id);
    //     modal.find('.modal-body #shift_id').val(shift_id);
    //     modal.find('.modal-body #classroom_id').val(classroom_id);
    //     modal.find('.modal-body #batch_id').val(batch_id);
    //     modal.find('.modal-body #day_id').val(day_id);
    //     modal.find('.modal-body #time_id').val(time_id);
    //     modal.find('.modal-body #semester_id').val(semester_id);
    //     modal.find('.modal-body #start_date').val(start_date);
    //     modal.find('.modal-body #end_date').val(end_date);
    //     modal.find('.modal-body #status').val(status);
    // })



    // $('#class_schedule-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var class_schedule_id = button.data('class_schedule_id');
    //     var course_id = button.data('course_id');
    //     var class_id = button.data('class_id');

    //     var shift_id = button.data('shift_id');
    //     var classroom_id = button.data('classroom_id');
    //     var batch_id = button.data('batch_id');
    //     var day_id = button.data('day_id');
    //     var time_id = button.data('time_id');
    //     var semester_id = button.data('semester_id');
    //     var start_date = button.data('start_date');
    //     var end_date = button.data('end_date');
    //     var status = button.data('status');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Class Schedule');
    //     modal.find('.modal-body #class_schedule_id').val(class_schedule_id);
    //     modal.find('.modal-body #course_id').val(course_id);
    //     modal.find('.modal-body #class_id').val(class_id);

    //     modal.find('.modal-body #shift_id').val(shift_id);
    //     modal.find('.modal-body #classroom_id').val(classroom_id);
    //     modal.find('.modal-body #batch_id').val(batch_id);
    //     modal.find('.modal-body #day_id').val(day_id);
    //     modal.find('.modal-body #time_id').val(time_id);
    //     modal.find('.modal-body #semester_id').val(semester_id);
    //     modal.find('.modal-body #start_date').val(start_date);
    //     modal.find('.modal-body #end_date').val(end_date);

    //     if (status) {
    //         $(e.target).find("input[type='checkbox']").attr('checked', 'checked')
    //     } else {
    //         $(this).find("input[type='checkbox']").removeAttr('checked')

    //     }

    //     $.ajax({
    //         url: location.origin + '/dynamicLevel',
    //         method: 'GET',
    //         data: {
    //             course_id: course_id
    //         },
    //         success: function (response) {
    //             $("#class_schedule-edit-modal #level_id").empty();
    //             $.each(response, function (index, level) {
    //                 if (level.level == button.data('level')) {
    //                     $("#class_schedule-edit-modal #level_id").append(
    //                         '<option selected value="' + level.id + '">' +
    //                         level.level + '</option>')
    //                 } else {
    //                     $("#class_schedule-edit-modal #level_id").append(
    //                         '<option value="' + level.id + '">' + level
    //                         .level + '</option>')
    //                 }
    //             })
    //         }
    //     })


    // })

    // $("#class_schedule-edit-modal #course_id").on('change', function () {

    //     var course_id = $("#class_schedule-edit-modal #course_id").val();
    //     if (!course_id) {
    //         $("#class_schedule-edit-modal #level_id").empty();
    //         $("#class_schedule-edit-modal #level_id").append('<option selected>Level</option>')
    //     } else {
    //         $.ajax({
    //             url: location.origin + '/dynamicLevel',
    //             method: 'GET',
    //             data: {
    //                 course_id: course_id
    //             },
    //             success: function (response) {
    //                 $("#class_schedule-edit-modal #level_id").empty();
    //                 $.each(response, function (index, level) {
    //                     $("#class_schedule-edit-modal #level_id").append(
    //                         '<option value="' + level.id + '">' + level
    //                         .level + '</option>')
    //                 })
    //                 if (response == '')(
    //                     $("#class_schedule-edit-modal #level_id").append('<option selected value="">There Is No Result Yet</option>')
    //                 )
    //             }
    //         })
    //     }
    // })

    // $('body').on('hidden.bs.modal', '#class_schedule-edit-modal', function (e) {
    //     $('#edit-class_schedule-form')[0].reset();
    // })
    // //end Class Schedules
    // //end Schedule


    // //Faculty
    // //Faculties
    // $('body').on('hidden.bs.modal', '#faculty-add-modal', function (e) {
    //     $('#create-faculty-form')[0].reset();
    // })

    // $('#faculty-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var faculty_name = button.data('faculty_name');
    //     var faculty_code = button.data('faculty_code');
    //     var faculty_status = button.data('faculty_status');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var faculty_id = button.data('faculty_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View faculty information');
    //     modal.find('.modal-body #faculty_name').val(faculty_name);
    //     modal.find('.modal-body #faculty_code').val(faculty_code);
    //     modal.find('.modal-body #faculty_status').val(faculty_status);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #faculty_id').val(faculty_id);
    // })


    // $('#faculty-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var faculty_id = button.data('faculty_id');
    //     var faculty_name = button.data('faculty_name');
    //     var faculty_code = button.data('faculty_code');
    //     var faculty_status = button.data('faculty_status');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Course');
    //     modal.find('.modal-body #faculty_id').val(faculty_id);
    //     modal.find('.modal-body #faculty_name').val(faculty_name);
    //     modal.find('.modal-body #faculty_code').val(faculty_code);


    //     if (faculty_status) {
    //         $(e.target).find("input[type='checkbox']").attr('checked', 'checked')
    //     } else {
    //         $(e.target).find("input[type='checkbox']").removeAttr('checked')

    //     }
    // })

    // $('body').on('hidden.bs.modal', '#faculty-edit-modal', function (e) {
    //     $('#edit-faculty-form')[0].reset();
    // })
    // //end Faculties

    // //Depratments
    // $('body').on('hidden.bs.modal', '#department-add-modal', function (e) {
    //     $('#create-department-form')[0].reset();
    // })

    // $('#department-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var department_name = button.data('department_name');
    //     var department_code = button.data('department_code');
    //     var faculty_id = button.data('faculty_id');
    //     var department_description = button.data('department_description');
    //     var department_status = button.data('department_status');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var department_id = button.data('department_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View department information');
    //     modal.find('.modal-body #department_name').val(department_name);
    //     modal.find('.modal-body #department_code').val(department_code);
    //     modal.find('.modal-body #faculty_id').val(faculty_id);
    //     modal.find('.modal-body #department_description').val(department_description);
    //     modal.find('.modal-body #department_status').val(department_status);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #department_id').val(department_id);
    // })


    // $('#department-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var department_id = button.data('department_id');
    //     var department_name = button.data('department_name');
    //     var department_code = button.data('department_code');
    //     var faculty_id = button.data('faculty_id');
    //     var department_description = button.data('department_description');
    //     var department_status = button.data('department_status');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Department');
    //     modal.find('.modal-body #department_id').val(department_id);
    //     modal.find('.modal-body #department_name').val(department_name);
    //     modal.find('.modal-body #department_code').val(department_code);
    //     modal.find('.modal-body #faculty_id').val(faculty_id);
    //     modal.find('.modal-body #department_description').val(department_description);


    //     if (department_status) {
    //         $(e.target).find("input[type='checkbox']").attr('checked', 'checked')
    //     } else {
    //         $(e.target).find("input[type='checkbox']").removeAttr('checked')

    //     }
    // })

    // $('body').on('hidden.bs.modal', '#department-edit-modal', function (e) {
    //     $('#edit-department-form')[0].reset();
    // })
    // //end Departments


    // //Admissions
    // $('#admission-add-modal').on('show.bs.modal', function (e) {
    //     $("#admission-add-modal #department_id").empty();
    //     $("#admission-add-modal #department_id").append('<option selected value="">Department</option>')
    // })

    // $('body').on('hidden.bs.modal', '#admission-add-modal', function (e) {
    //     $('#admission-add-form')[0].reset();
    //     $('.student-image').attr('src', 'http://student.loc/student_images/user.png')
    // })

    // $('#admission-add-modal #dob').datetimepicker({
    //     format: 'YYYY-MM-DD',
    //     useCurrent: false,
    // })

    // $("#admission-add-modal #faculty_id").on('change', function () {

    //     var faculty_id = $("#admission-add-modal #faculty_id").val();
    //     if (!faculty_id) {
    //         $("#admission-add-modal #department_id").empty();
    //         $("#admission-add-modal #department_id").append('<option selected value="">Department</option>')
    //     } else {
    //         $.ajax({
    //             url: location.origin + '/dynamicDepartment',
    //             method: 'GET',
    //             data: {
    //                 faculty_id: faculty_id
    //             },
    //             success: function (response) {
    //                 $("#admission-add-modal #department_id").empty();
    //                 $.each(response, function (index, department) {
    //                     $("#admission-add-modal #department_id").append(
    //                         '<option value="' + department.id + '">' + department
    //                         .department_name + '</option>')
    //                 })
    //                 if (response == '')(
    //                     $("#admission-add-modal #department_id").append('<option selected value="">There Is No Result Yet</option>')
    //                 )
    //             }
    //         })
    //     }
    // })

    // $('#admission-add-modal #browse_file').on('click', function () {
    //     $('#admission-add-modal #image').click();
    // });

    // $("#admission-add-modal #image").on('change', function (e) {
    //     showFile(this, '#admission-add-modal #show-image');
    // })


    // function showFile(fileInput, img) {
    //     if (fileInput.files[0]) {
    //         var reader = new FileReader();
    //         //    console.log(fileInput)
    //         //    console.log(fileInput.files[0])
    //         //    console.log(reader)
    //         reader.onload = function (e) {
    //             $(img).attr('src', e.target.result);
    //             console.log(e.target)

    //         }
    //         reader.readAsDataURL(fileInput.files[0])
    //         //    console.log(reader)
    //     }
    // }

    // $('#admission-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var image = button.data('image');
    //     var first_name = button.data('first_name');
    //     var last_name = button.data('last_name');
    //     var father_name = button.data('father_name');
    //     var father_phone = button.data('father_phone');
    //     var mother_name = button.data('mother_name');
    //     var gender = button.data('gender');
    //     var status = button.data('status');
    //     var email = button.data('email');
    //     var dob = button.data('dob');
    //     var phone = button.data('phone');
    //     var passport = button.data('passport');
    //     var address = button.data('address');
    //     var current_address = button.data('current_address');
    //     var nationality = button.data('nationality');
    //     var faculty_id = button.data('faculty_id');
    //     var department_id = button.data('department_id');
    //     var batch_id = button.data('batch_id');
    //     var user_id = button.data('user_id');
    //     var date_registered = button.data('date_registered');

    //     var modal = $(this);

    //     modal.find('.modal-body .profile-user-img').attr('src', '/student_images/' + image);
    //     modal.find('.modal-body .profile-username').text(first_name + ' ' + last_name);
    //     modal.find('.modal-body #first_name').val(first_name);
    //     modal.find('.modal-body #last_name').val(last_name);
    //     modal.find('.modal-body #father_name').val(father_name);
    //     modal.find('.modal-body #father_phone').val(father_phone);
    //     modal.find('.modal-body #mother_name').val(mother_name);
    //     if (gender == 0) {
    //         $('#gender').text('Male');
    //     } else {
    //         $('#gender').text('Female');
    //     }
    //     if (status == 0) {
    //         $('#status').text('Single');
    //     } else {
    //         $('#status').text('Married');
    //     }
    //     modal.find('.modal-body #email').val(email);
    //     modal.find('.modal-body #dob').val(dob);
    //     modal.find('.modal-body #phone').val(phone);
    //     modal.find('.modal-body #passport').val(passport);
    //     modal.find('.modal-body #address').val(address);
    //     modal.find('.modal-body #current_address').val(current_address);
    //     modal.find('.modal-body #nationality').val(nationality);
    //     modal.find('.modal-body #faculty_id').val(faculty_id);
    //     modal.find('.modal-body #department_id').val(department_id);
    //     modal.find('.modal-body #batch_id').val(batch_id);
    //     modal.find('.modal-body #user_id').val(user_id);
    //     modal.find('.modal-body #date_registered').val(date_registered);

    // })




    // $('#admission-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var admission_id = button.data('admission_id');
    //     var image = button.data('image');
    //     var first_name = button.data('first_name');
    //     var last_name = button.data('last_name');
    //     var gender = button.data('gender');
    //     var status = button.data('status');
    //     var email = button.data('email');
    //     var dob = button.data('dob');
    //     var phone = button.data('phone');
    //     var passport = button.data('passport');
    //     var address = button.data('address');
    //     var current_address = button.data('current_address');
    //     var nationality = button.data('nationality');
    //     var date_registered = button.data('date_registered');
    //     var father_name = button.data('father_name');
    //     var father_phone = button.data('father_phone');
    //     var mother_name = button.data('mother_name');
    //     var faculty_id = button.data('faculty_id');
    //     var department_id = button.data('department_id');
    //     var batch_id = button.data('batch_id');
    //     var user_id = button.data('user_id');

    //     var modal = $(this);

    //     modal.find('.modal-body #show-image').attr('src', '/student_images/' + image);
    //     modal.find('.modal-body #admission_id').val(admission_id);
    //     modal.find('.modal-body #first_name').val(first_name);
    //     modal.find('.modal-body #last_name').val(last_name);
    //     if (gender == 0) {
    //         $('#gender').text('Male');
    //         $('.male').attr('checked', 'checked');
    //     } else {
    //         $('#gender').text('Female');
    //         $('.female').attr('checked', 'checked');
    //     }
    //     if (status == 0) {
    //         $('#status').text('Single');
    //         $('.single').attr('checked', 'checked');
    //     } else {
    //         $('.married').attr('checked', 'checked');
    //         $('#status').text('Married');
    //     }
    //     modal.find('.modal-body #email').val(email);
    //     modal.find('.modal-body #dob').val(dob);
    //     modal.find('.modal-body #phone').val(phone);
    //     modal.find('.modal-body #passport').val(passport);
    //     modal.find('.modal-body #address').val(address);
    //     modal.find('.modal-body #current_address').val(current_address);
    //     modal.find('.modal-body #nationality').val(nationality);
    //     modal.find('.modal-body #date_registered').val(date_registered);
    //     modal.find('.modal-body #father_name').val(father_name);
    //     modal.find('.modal-body #father_phone').val(father_phone);
    //     modal.find('.modal-body #mother_name').val(mother_name);
    //     modal.find('.modal-body #faculty_id').val(faculty_id);
    //     modal.find('.modal-body #department_id').val(department_id);
    //     modal.find('.modal-body #batch_id').val(batch_id);
    //     modal.find('.modal-body #user_id').val(user_id);


    //     $.ajax({
    //         url: location.origin + '/dynamicDepartment',
    //         method: 'GET',
    //         data: {
    //             faculty_id: faculty_id
    //         },
    //         success: function (response) {
    //             $("#admission-edit-modal #department_id").empty();
    //             $.each(response, function (index, department) {
    //                 if (department.department_name == button.data('department_name')) {
    //                     $("#class_schedule-edit-modal #department_id").append(
    //                         '<option selected value="' + department.id + '">' +
    //                         department.department_name + '</option>')
    //                 } else {
    //                     $("#admission-edit-modal #department_id").append(
    //                         '<option value="' + department.id + '">' + department
    //                         .department_name + '</option>')
    //                 }
    //             })
    //         }
    //     })
    // })

    // $('#admission-edit-modal #dob').datetimepicker({
    //     format: 'YYYY-MM-DD',
    //     useCurrent: false,
    // })


    // $('#admission-edit-modal #browse_file').on('click', function () {
    //     $('#admission-edit-modal #image').click();
    // });

    // $("#admission-edit-modal #image").on('change', function (e) {
    //     showFile(this, '#admission-edit-modal #show-image');
    // })

    // function showFile(fileInput, img) {
    //     if (fileInput.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             $(img).attr('src', e.target.result);
    //         }
    //         reader.readAsDataURL(fileInput.files[0])
    //     }
    // }



    // $("#admission-edit-modal #faculty_id").on('change', function () {

    //     var faculty_id = $("#admission-edit-modal #faculty_id").val();
    //     if (!faculty_id) {
    //         $("#admission-edit-modal #department_id").empty();
    //         $("#admission-edit-modal #department_id").append('<option selected value="">Department</option>')
    //     } else {
    //         $.ajax({
    //             url: location.origin + '/dynamicDepartment',
    //             method: 'GET',
    //             data: {
    //                 faculty_id: faculty_id
    //             },
    //             success: function (response) {
    //                 $("#admission-edit-modal #department_id").empty();
    //                 $.each(response, function (index, department) {
    //                     $("#admission-edit-modal #department_id").append(
    //                         '<option value="' + department.id + '">' + department
    //                         .department_name + '</option>')
    //                 })
    //                 if (response == '')(
    //                     $("#admission-edit-modal #department_id").append('<option selected value="">There Is No Result Yet</option>')
    //                 )
    //             }
    //         })
    //     }
    // })


    // $('body').on('hidden.bs.modal', '#admission-edit-modal', function (e) {
    //     $('#admission-edit-form')[0].reset();

    //     $('.admission-image').attr('src', '/student_images/' + $("#admission-rel-target").data('image'))
    // })
    // //end Admissions


    // //Teachers
    // $('body').on('hidden.bs.modal', '#teacher-add-modal', function (e) {
    //     $('#teacher-add-form')[0].reset();

    //     $('.teacher-image').attr('src', 'http://student.loc/teacher_images/user.png')
    // })

    // $('#teacher-add-modal #dob').datetimepicker({
    //     format: 'YYYY-MM-DD',
    //     useCurrent: false,
    // })


    // $('#teacher-add-modal #browse_file').on('click', function () {
    //     $('#teacher-add-modal #image').click();
    // });

    // $("#teacher-add-modal #image").on('change', function (e) {
    //     showFile(this, '#teacher-add-modal #show-image');
    // })

    // function showFile(fileInput, img) {
    //     if (fileInput.files[0]) {
    //         var reader = new FileReader();
    //         //    console.log(fileInput)
    //         //    console.log(fileInput.files[0])
    //         //    console.log(reader)
    //         reader.onload = function (e) {
    //             $(img).attr('src', e.target.result);
    //             console.log(e.target)

    //         }
    //         reader.readAsDataURL(fileInput.files[0])
    //         //    console.log(reader)
    //     }
    // }

    // $('#teacher-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var image = button.data('image');
    //     var first_name = button.data('first_name');
    //     var last_name = button.data('last_name');
    //     var gender = button.data('gender');
    //     var status = button.data('status');
    //     var email = button.data('email');
    //     var dob = button.data('dob');
    //     var phone = button.data('phone');
    //     var passport = button.data('passport');
    //     var address = button.data('address');
    //     var nationality = button.data('nationality');
    //     var date_registered = button.data('date_registered');
    //     var user_id = button.data('user_id');

    //     var modal = $(this);

    //     modal.find('.modal-body .profile-user-img').attr('src', '/teacher_images/' + image);
    //     modal.find('.modal-body .profile-username').text(first_name + ' ' + last_name);
    //     modal.find('.modal-body #first_name').val(first_name);
    //     modal.find('.modal-body #last_name').val(last_name);
    //     if (gender == 0) {
    //         $('#gender').text('Male');
    //     } else {
    //         $('#gender').text('Female');
    //     }
    //     if (status == 0) {
    //         $('#status').text('Single');
    //     } else {
    //         $('#status').text('Married');
    //     }
    //     modal.find('.modal-body #email').val(email);
    //     modal.find('.modal-body #dob').val(dob);
    //     modal.find('.modal-body #phone').val(phone);
    //     modal.find('.modal-body #passport').val(passport);
    //     modal.find('.modal-body #address').val(address);
    //     modal.find('.modal-body #nationality').val(nationality);
    //     modal.find('.modal-body #date_registered').val(date_registered);
    //     modal.find('.modal-body #user_id').val(user_id);

    // })



    // $('#teacher-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var teacher_id = button.data('teacher_id');
    //     var image = button.data('image');
    //     var first_name = button.data('first_name');
    //     var last_name = button.data('last_name');
    //     var gender = button.data('gender');
    //     var status = button.data('status');
    //     var email = button.data('email');
    //     var dob = button.data('dob');
    //     var phone = button.data('phone');
    //     var passport = button.data('passport');
    //     var address = button.data('address');
    //     var nationality = button.data('nationality');
    //     var date_registered = button.data('date_registered');
    //     var user_id = button.data('user_id');

    //     var modal = $(this);

    //     modal.find('.modal-body #show-image').attr('src', '/teacher_images/' + image);
    //     modal.find('.modal-body #teacher_id').val(teacher_id);
    //     modal.find('.modal-body #first_name').val(first_name);
    //     modal.find('.modal-body #last_name').val(last_name);
    //     if (gender == 0) {
    //         $('.male').attr('checked', 'checked');
    //     } else {
    //         $('.female').attr('checked', 'checked');
    //     }
    //     if (status == 0) {

    //         $('.single').attr('checked', 'checked');
    //     } else {
    //         $('.married').attr('checked', 'checked');
    //     }
    //     modal.find('.modal-body #email').val(email);
    //     modal.find('.modal-body #dob').val(dob);
    //     modal.find('.modal-body #phone').val(phone);
    //     modal.find('.modal-body #passport').val(passport);
    //     modal.find('.modal-body #address').val(address);
    //     modal.find('.modal-body #nationality').val(nationality);
    //     modal.find('.modal-body #date_registered').val(date_registered);
    //     modal.find('.modal-body #user_id').val(user_id);

    // })

    // $('#teacher-edit-modal #dob').datetimepicker({
    //     format: 'YYYY-MM-DD',
    //     useCurrent: false,
    // })


    // $('#teacher-edit-modal #browse_file').on('click', function () {
    //     $('#teacher-edit-modal #image').click();
    // });

    // $("#teacher-edit-modal #image").on('change', function (e) {
    //     showFile(this, '#teacher-edit-modal #show-image');
    // })

    // function showFile(fileInput, img) {
    //     if (fileInput.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             $(img).attr('src', e.target.result);
    //         }
    //         reader.readAsDataURL(fileInput.files[0])
    //     }
    // }

    // $('body').on('hidden.bs.modal', '#teacher-edit-modal', function (e) {
    //     $('#teacher-edit-form')[0].reset();

    //     $('.teacher-image').attr('src', '/teacher_images/' + $("#teacher-rel-target").data('image'))

    // })
    // //end Teachers


    // //Roles 
    // $('body').on('hidden.bs.modal', '#role-add-modal', function (e) {
    //     $('#role-add-form')[0].reset();
    // })

    // $('#role-view-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var name = button.data('name');
    //     var created_at = button.data('created_at');
    //     var updated_at = button.data('updated_at');
    //     var role_id = button.data('role_id');

    //     var modal = $(this);

    //     modal.find('.modal-title').text('View role information');
    //     modal.find('.modal-body #name').val(name);
    //     modal.find('.modal-body #created_at').val(created_at);
    //     modal.find('.modal-body #updated_at').val(updated_at);
    //     modal.find('.modal-body #role_id').val(role_id);
    // })


    // $('#role-edit-modal').on('show.bs.modal', function (e) {
    //     var button = $(e.relatedTarget);
    //     var role_id = button.data('role_id');
    //     var name = button.data('name');
    //     var modal = $(this);

    //     modal.find('.modal-title').text('Edit Role');
    //     modal.find('.modal-body #role_id').val(role_id);
    //     modal.find('.modal-body #name').val(name);
    // })

    // $('body').on('hidden.bs.modal', '#role-edit-modal', function (e) {
    //     $('#edit-role-form')[0].reset();
    // })
    // //end Roles
})