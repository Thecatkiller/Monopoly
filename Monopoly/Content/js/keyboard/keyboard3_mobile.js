function hidePassword(passwordNewValue, passwordOld, $write) {
    passwordOld.value = passwordNewValue;
    passwordNewValue = '';
    for (var i = 0; i < passwordOld.value.length; i++)
        passwordNewValue += '*';
    $write.val(passwordNewValue);
}

function getPassword($write, password) {
    $write.val(password.value);
    $write.attr('type', 'password');
}


function disableEditSecureKeyboard() {
    $(this).trigger('blur');
}


(function (a) { a.fn.validCampoFranz = function (b) { a(this).on({ keypress: function (a) { var c = a.which, d = a.keyCode, e = String.fromCharCode(c).toLowerCase(), f = b; (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault() } }) } })(jQuery);


function checkDuplicate(str) {
    re = /(\b(?:([A-Za-z0-9])(?!\2{1}))+\b)/;
    return re.test(str);
}

function checkAlphanumeric(str) {
    re = /^[a-z0-9]+$/i;
    return true;
    //return re.test(str);
}


$(document).ready(function () {
    var maskpass1 = true;
    var maskpass2 = true;

    // Teclado 1
    var $containerSecureKeyboard2 = $('.containerSecureKeyboard2');
    var $write2 = $('#' + $containerSecureKeyboard2.data('inputkeyboard'));
    var password2 = { value: '' };

    // Teclado 2
    var $containerSecureKeyboard1 = $('.containerSecureKeyboard1');
    var $write1 = $('#' + $containerSecureKeyboard1.data('inputkeyboard'));
    var password1 = { value: '' };

    $write1.on('focus', function () {
        getPassword($write1, password1);
    });
    $write2.on('focus', function () {
        getPassword($write2, password2);
    });

    $write1.off('focus')
        .on('focus', function () { getPassword($write1, password1); })
        .on('blur', function () { hidePassword($write1.val(), password1, $write1); });

    $write2.off('focus')
        .on('focus', function () { getPassword($write2, password2); })
        .on('blur', function () { hidePassword($write2.val(), password2, $write2); });

    $(".eye2").on('click', function () {
        console.log(maskpass1);
        var $this = $(this);
        $this.toggleClass("icon-clave-ojo");
        $this.toggleClass("icon-clave-ojo2");
        if ($this.hasClass("icon-clave-ojo")) {
            maskpass1 = true;
        } else if ($this.hasClass("icon-clave-ojo2")) {
            maskpass1 = false;
        }
        if (maskpass1 == true) {
            getPassword($write2, password2);
            $(this).prev().attr('type', 'text');
        } else {
            //   getPassword($write2, password2);
            $(this).prev().attr('type', 'password');
            hidePassword($write2.val(), password2, $write2);
        }


    });

    $(".eye").on('click', function () {
        var $this = $(this);
        $this.toggleClass("icon-clave-ojo");
        $this.toggleClass("icon-clave-ojo2");
        var x = document.getElementById("pwd");
        if ($this.hasClass("icon-clave-ojo")) {
            maskpass2 = true;
        } else if ($this.hasClass("icon-clave-ojo2")) {
            maskpass2 = false;
        }
        if (maskpass2 == true) {
            getPassword($write1, password1);
            $(this).prev().attr('type', 'text');
        } else {
            // getPassword($write1, password1);
            $(this).prev().attr('type', 'password');
            hidePassword($write1.val(), password1, $write1);
        }
    });




    $("#btnAcceptGo").on("click", function () {
        getPassword($write1, password1);
        getPassword($write2, password2);
    });




    $("#pwd2").on('click focus', function () {
        $(".eye2").removeClass("icon-clave-ojo");
        $(".eye2").addClass("icon-clave-ojo2");
        $(".eye2").prev().attr('type', 'password');
    });
    $("#pwd").on('click focus', function () {
        $(".eye").removeClass("icon-clave-ojo");
        $(".eye").addClass("icon-clave-ojo2");
        $(".eye").prev().attr('type', 'password');
    });


    $write2.keyup(function () {
        console.log($write2);
        var tecladoLength2 = $write2.val().length;
        var claveInc = $("#pwd2").closest(".container-campos-ingreso").find(".clave-incorrecta");
        var claveInc2 = $("#pwd").closest(".container-campos-ingreso").find(".clave-incorrecta");
        var iconCheck = $("#pwd2").closest(".container-campos-ingreso").find(".campo-check-pass");
        var iconCheck2 = $("#pwd").closest(".container-campos-ingreso").find(".campo-check-pass");
        var equal = $("#pwd2").closest(".container-formulario").find(".clave-noequal");
        var addIcon = $write2.closest(".container-campos-ingreso");

        var telselected;

        limitText(this, $(this).attr("maxlength"));


        delay(function () {
            if (tecladoLength2 == 11) {
                return false;
            }

            if (tecladoLength2 >= 6) {
                telselected = $write2.val();
                /*var checkPass1 = checkConsecutiveChars(telselected, 3);
                var checkPass2 = checkDuplicate(telselected);*/
                var checkPass1 = true;
                var checkPass2 = true;

                var checkPass3 = checkAlphanumeric(telselected);
                if (checkPass1 == true && checkPass2 == true && checkPass3 == true) {
                    iconCheck.removeClass('campo_Invalido iconcancel-circled').addClass("iconok-circled campo_valido").show();
                    claveInc.hide();
                    $write2.addClass("valid").addClass("checkpass").removeClass("error");
                    addIcon.addClass("add-icon");
                    if ($write1.val().length >= 6) {
                        if (telselected === password1.value) {
                            equal.addClass("valid").removeClass("error").hide();
                            claveInc.hide();
                            $write2.addClass("valid").removeClass("error");
                            $write1.addClass("valid").removeClass("error");
                            iconCheck.removeClass('campo_Invalido iconcancel-circled').addClass("iconok-circled campo_valido").show();
                            iconCheck2.removeClass('campo_Invalido iconcanel').addClass("iconok-circled campo_valido").show();

                        } else {
                            equal.addClass("error").removeClass("valid").show();
                            $write2.addClass("error").removeClass("valid");
                            $write1.addClass("error").removeClass("valid");
                            iconCheck.removeClass('iconok-circled campo_valido').addClass("campo_Invalido iconcancel-circled").show();
                            iconCheck2.removeClass('iconok-circled campo_valido').addClass("campo_Invalido iconcancel-circled").show();

                        }
                    }
                } else {
                    $write2.addClass("error").removeClass("checkpass").removeClass("valid");
                    claveInc.show().html("Ingresa una clave segura");
                    equal.addClass("valid").removeClass("error").hide();
                    iconCheck.removeClass('iconok-circled campo_valido').addClass("campo_Invalido iconcancel-circled").show();
                    addIcon.addClass("add-icon");
                    if ($write1.hasClass("checkpass")) {
                        $write1.addClass("valid").removeClass("error");
                        iconCheck2.removeClass('campo_Invalido iconcancel-circled').addClass("iconok-circled campo_valido").show();

                    }
                }
            } else {
                $write2.addClass("error").removeClass("valid");
                claveInc.show().html("Ingresa una clave de m&#237;nimo 6 caracteres.");
                iconCheck.removeClass('iconok-circled campo_valido').addClass("campo_Invalido iconcancel-circled").show();
                addIcon.addClass("add-icon");
            }

            if (tecladoLength2 == 0) {
                claveInc2.hide();
                equal.removeClass("valid").removeClass("error").hide();
                $write1.removeClass("valid").removeClass("checkpass").removeClass("error");
                iconCheck2.removeClass('campo_Invalido iconcancel-circled iconok-circled campo_valido')
                addIcon.removeClass("add-icon");
                $(".paso-siguiente").addClass("disabled_boton-general");
                $write1.val("");
                password1.value = '';

                //  $write1.prop("disabled", true);
            }


            if (activateBtn == true && activateUser == true && $write1.hasClass("valid") == true && $write2.hasClass("valid") == true && telselected === $write1.val()) {
                //$(".btn-aceptar-terminos").hide();
                $(".paso-siguiente").removeClass("disabled_boton-general");
            } else {
                //$(".btn-aceptar-terminos").show();
                $(".paso-siguiente").addClass("disabled_boton-general");
            }

        }, 500);
    });


    //----------------------------------------------------------------------------------------------------------------------------------
    $write1.keyup(function () {

        var tecladoLength1 = $write1.val().length;
        var telselected;
        var claveInc = $("#pwd").closest(".container-campos-ingreso").find(".clave-incorrecta");
        var iconCheck = $("#pwd").closest(".container-campos-ingreso").find(".campo-check-pass");
        var iconCheck2 = $("#pwd2").closest(".container-campos-ingreso").find(".campo-check-pass");
        var equal = $("#pwd2").closest(".container-formulario").find(".clave-noequal");
        var addIcon = $write1.closest(".container-campos-ingreso");

        limitText(this, $(this).attr("maxlength"));

        delay(function () {

            if (tecladoLength1 == 11) {
                return false;
            }

            if (tecladoLength1 >= 6) {
                telselected = $write1.val();
                /*var checkPass1 = checkConsecutiveChars(telselected, 3);
                var checkPass2 = checkDuplicate(telselected);*/

                var checkPass1 = true;
                var checkPass2 = true;

                var checkPass3 = checkAlphanumeric(telselected);
                if (checkPass1 == true && checkPass2 == true && checkPass3 == true) {
                    iconCheck.removeClass('campo_Invalido iconcancel-circled').addClass("iconok-circled campo_valido").show();
                    claveInc.hide();
                    $write1.addClass("valid").addClass("checkpass").removeClass("error");
                    addIcon.addClass("add-icon");
                    if ($write2.val().length >= 6) {
                        if (telselected === password2.value) {
                            claveInc.hide();
                            equal.addClass("valid").removeClass("error").hide();
                            $write2.addClass("valid").removeClass("error");
                            $write1.addClass("valid").removeClass("error");
                            iconCheck.removeClass('campo_Invalido iconcancel-circled').addClass("iconok-circled campo_valido").show();
                            iconCheck2.removeClass('campo_Invalido iconcancel-circled').addClass("iconok-circled campo_valido").show();

                        } else {
                            equal.addClass("error").removeClass("valid").show();
                            $write2.addClass("error").removeClass("valid");
                            $write1.addClass("error").removeClass("valid");
                            iconCheck.removeClass('iconok-circled campo_valido').addClass("campo_Invalido iconcancel-circled").show();
                            iconCheck2.removeClass('iconok-circled campo_valido').addClass("campo_Invalido iconcancel-circled").show();

                        }
                    }
                } else {
                    $write1.addClass("error").removeClass("checkpass").removeClass("valid");
                    claveInc.show().html("Ingresa una clave segura");
                    equal.addClass("valid").removeClass("error").hide();
                    iconCheck.removeClass('iconok-circled campo_valido').addClass("campo_Invalido iconcancel-circled").show();
                    addIcon.addClass("add-icon");
                    if ($write2.hasClass("checkpass")) {
                        $write2.addClass("valid").removeClass("error");
                        iconCheck2.removeClass('campo_Invalido iconcancel-circled').addClass("iconok-circled campo_valido").show();

                    }
                }
            } else {
                $write1.addClass("error").removeClass("valid");
                claveInc.show().html("Ingresa una clave de m&#237;nimo 6 caracteres.");
                iconCheck.removeClass('iconok-circled campo_valido').addClass("campo_Invalido iconcancel-circled").show();
                addIcon.addClass("add-icon");
            }


            if (checked == true && activateBtn == true && activateUser == true && $write1.hasClass("valid") == true && $write2.hasClass("valid") == true && telselected === $write2.val()) {
                //$(".btn-aceptar-terminos").hide();
                $(".paso-siguiente").removeClass("disabled_boton-general");
            } else {
                //$(".btn-aceptar-terminos").show();
                $(".paso-siguiente").addClass("disabled_boton-general");
            }
        }, 500);
    });

});