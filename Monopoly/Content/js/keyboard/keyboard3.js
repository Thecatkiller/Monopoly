function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function showKeyboard($keyboard) {
    $keyboard.find('.letter').remove();
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    shuffle(letters);

    for (var i = 0; i <= letters.length - 1; i++) {
        $keyboard.prepend('<li class="notranslate letter">' + letters[i] + '</li>');
    }

    $keyboard.find('[data-number]').remove();
    var classes = {
        1: 'border-left', 2: '', 3: 'border-right', 4: 'border-left',
        5: 'border-left', 6: '', 7: 'border-right', 8: 'border-left',
        9: 'border-right', 0: ''
    };


    var numerosTeclado = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    shuffle(numerosTeclado);

    for (var i = 0; i <= numerosTeclado.length - 1; i++) {
        var borderClass = classes[i];
        $keyboard.prepend('<li class="symbol" data-number><span class="off ' + borderClass + '">' + numerosTeclado[i] + '</span></li>');
    }
}


function disableEditSecureKeyboard() {
    $(this).trigger('blur');
}

function enableSecureKeyboard($write, password) {
    if ($write !== null) {
        if (typeof $write.data('flagKeyboard1') == 'undefined' || typeof $write.data('flagKeyboard2') == 'undefined') {
            $write.data('flagKeyboard1', true);
            $write.data('flagKeyboard2', true);
        }
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $write.data('flagKeyboard1', true);
            $write.data('flagKeyboard2', false);
           
            console.log($write.data());
        } else {
            $write.data('flagKeyboard1', false);
            $write.data('flagKeyboard2', true);
            console.log($write.data());
        }
        if ($write.data('flagKeyboard2')) {
            $write.off('blur focus keyup')
            .on('focus', disableEditSecureKeyboard);


            $write.data('flagKeyboard1', true);
            $write.data('flagKeyboard2', false);

        }
        else if ($write.data('flagKeyboard1')) {
            $write.off('focus')
                        .on('focus', function () { getPassword($write, password); })
                        .on('blur', function () { hidePassword($write.val(), password, $write); });
            
            
            $write.data('flagKeyboard1', false);
            $write.data('flagKeyboard2', true);

            $('.container-teclado').removeClass('teclado-visible');
            $('.teclado-visible-input').removeClass('fondo__clave');

            if (password.value != '') {
                getPassword($write, password);
            }

            hidePassword($write.val(), password, $write);

            $write.trigger('blur');
        }
    }
}

function generateKeyboard($secureKeyboard, $write, password, secureKeyboardMaxLength) {
    showKeyboard($secureKeyboard);

    //if ($(document).width() <= 990) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //$('.container-teclado').removeClass('teclado-visible');
        //$('.teclado-visible-input').removeClass('fondo__clave');
    }
    else {
        //$('.container-teclado').addClass('teclado-visible');
        //$('.teclado-visible-input').addClass('fondo__clave');

        $secureKeyboard.find('li').off('click').on('click', function () {
            editInputFromSecureKeyboard($(this), $write, password, secureKeyboardMaxLength);
        });
    }
}

function editInputFromSecureKeyboard(self, $write, password, secureKeyboardMaxLength) {
    var character = self.html();

    // Delete
    if (self.hasClass('delete')) {
        password.value = password.value.slice(0, -1);
        $write.val(password.value);
    }
    else {
        if (self.hasClass('symbol')) {
            character = $('span:visible', self).html();
        }

        // Add
        if ($write.val().length < secureKeyboardMaxLength) {
            hidePassword(password.value + character, password, $write);
        }
    }
}

function hidePassword(passwordNewValue, passwordOld, $write) {
    passwordOld.value = passwordNewValue;
    passwordNewValue = '';

    for (var i = 0; i < passwordOld.value.length; i++)
        passwordNewValue += '*';

    $write.val(passwordNewValue);
    //var $backupwrite = $write.val(password.value);
}

function getPassword($write, password) {
    $write.val(password.value);
    $write.attr('type', 'password');
}

function setVisibledSecureKeyboard($secureKeyboard, $write) {
    $(".container-teclado").addClass("teclado-visible");
    $(".teclado-visible-input").addClass("fondo__clave");

    $('body').on('mousemove', function (event) {
        var $div1 = $('.teclado-visible-input');
        var elementTop1 = $div1.offset().top;
        var elementBottom1 = elementTop1 + $div1.outerHeight();
        var elementLeft1 = $div1.offset().left;
        var elementRight1 = elementLeft1 + $div1.outerWidth();

        var $div2 = $secureKeyboard;
        var elementTop2 = $div2.offset().top;
        var elementBottom2 = elementTop2 + $div2.outerHeight();
        var elementLeft2 = $div2.offset().left;
        var elementRight2 = elementLeft2 + $div2.outerWidth();

        var positionCursorX = event.pageX;
        var positionCursorY = event.pageY;

        //var IsNotDiv1Region = positionCursorY > elementBottom1 || positionCursorY < elementTop1 || positionCursorX > elementRight1 || positionCursorX < elementLeft1;
        //var IsNotDiv2Region = positionCursorY > elementBottom2 || positionCursorY < elementTop2 || positionCursorX > elementRight2 || positionCursorX < elementLeft2;

        /*
        if (IsNotDiv1Region && IsNotDiv2Region && $write.val().length == $write.data('maxlength')) {
            $(".container-teclado").removeClass("teclado-visible");
            $(".teclado-visible-input").removeClass("fondo__clave");
            $('body').off('mousemove');
        }
        */

        var IsNotDiv1Region = positionCursorY < elementTop1 || positionCursorX > elementRight1 || positionCursorX < elementLeft1;
        var IsNotDiv2Region = positionCursorY > elementBottom2;

        if ((IsNotDiv1Region || IsNotDiv2Region)) {
            $(".container-teclado").removeClass("teclado-visible");
            $(".teclado-visible-input").removeClass("fondo__clave");
            $('body').off('mousemove');
        }
    });
}

//funcion solo numeros y letras
(function (a) { a.fn.validCampoFranz = function (b) { a(this).on({ keypress: function (a) { var c = a.which, d = a.keyCode, e = String.fromCharCode(c).toLowerCase(), f = b; (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault() } }) } })(jQuery);

function inicializeSecureKeyboard($write, password, $secureKeyboard, secureKeyboardMaxLength) {
    // Habilita o Desabilita el teclado seguro, segun el ancho de la pagina
    $(window).on('resize', function () {
        enableSecureKeyboard($write, password);

        $write.on('focus', function () {
            getPassword($write, password);
        });
    });

    $write.on('click', function () {
        generateKeyboard($secureKeyboard, $write, password, secureKeyboardMaxLength);
        //setVisibledSecureKeyboard($secureKeyboard, $write);
    });

    enableSecureKeyboard($write, password);

    $write.on('click', function () {
        getPassword($write, password);
    });
}

function checkConsecutiveChars(str, limit) {
    var lastDigit = str.charCodeAt(0), num = 1, val, delta;
    for (var i = 1; i < str.length; i++) {
        val = str.charCodeAt(i);
        ++num;
        if (num === 2) {
            // calc delta and remember it
            delta = val - lastDigit;
            // see if we have a two char sequence now
            if (Math.abs(delta) !== 1) {
                // not sequential, start over
                num = 1;
            }
        } else {
            // see if consecutive sequence continues and exceeds limit
            if (val === (lastDigit + delta)) {
                if (num >= limit) {
                    return (false);
                }
            } else {
                // sequence stopped
                num = 1;
            }
        }
        lastDigit = val;
    }
    return (true);
}

function checkDuplicate(str) {
    re = /(\b(?:([A-Za-z0-9])(?!\2{1}))+\b)/;
    return re.test(str);
}

function checkAlphanumeric(str) {
    re = /^[a-z0-9]+$/i;
    return re.test(str);
}


$(document).ready(function () {

    // Teclado 1
    var $containerSecureKeyboard2 = $('.containerSecureKeyboard2');
    var $write2 = $('#' + $containerSecureKeyboard2.data('inputkeyboard'));
    var $secureKeyboard2 = $('#' + $containerSecureKeyboard2.data('keyboard'));
    var secureKeyboardMaxLength2 = $write2.data('maxlength');
    var password2 = { value: '' };

    // Teclado 2
    var $containerSecureKeyboard1 = $('.containerSecureKeyboard1');
    var $write1 = $('#' + $containerSecureKeyboard1.data('inputkeyboard'));
    var $secureKeyboard1 = $('#' + $containerSecureKeyboard1.data('keyboard'));
    var secureKeyboardMaxLength1 = $write1.data('maxlength');
    var password1 = { value: '' };


    inicializeSecureKeyboard($write1, password1, $secureKeyboard1, secureKeyboardMaxLength1);
    inicializeSecureKeyboard($write2, password2, $secureKeyboard2, secureKeyboardMaxLength2);

    $("#btnAcceptGo").on("click", function () {
        getPassword($write1, password1);
        getPassword($write2, password2);
    });

    var maskpass1 = true;
    var maskpass2 = true;


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

    var teclado = $("input.teclado2");
    var teclado2 = $("input.teclado");
  
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

    $secureKeyboard2.on("click", "li", function () {
        var tecladoLength2 = $write2.val().length;
        var telselected;
        var claveInc = $("#keyboard").closest(".container-campos-ingreso").find(".clave-incorrecta");
        var iconCheck = $("#keyboard").closest(".container-campos-ingreso").find(".campo-check-pass");
        var iconCheck2 = $("#keyboard2").closest(".container-campos-ingreso").find(".campo-check-pass");
        var equal = $("#keyboard").closest(".container-formulario").find(".clave-noequal");
        var addIcon = $write2.closest(".container-campos-ingreso");

        if (tecladoLength2 == 11) {
            return false;
        }

        if (tecladoLength2 >= 6) {
            telselected = password2.value;
            var checkPass1 = true;
            var checkPass2 = true;
            var checkPass3 = checkAlphanumeric(telselected);
            if (checkPass1 == true && checkPass2 == true && checkPass3 == true) {
                iconCheck.removeClass('campo_Invalido iconcancel-circled').addClass("iconok-circled campo_valido").show();
                claveInc.hide();
                $write2.addClass("valid").addClass("checkpass").removeClass("error");
                addIcon.addClass("add-icon");
                //si la confirmacion es mayor que 6
                if ($write1.val().length >= 6) {
                    if (telselected === password1.value) {
                        equal.addClass("valid").removeClass("error").hide();
                        claveInc.hide();
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
                $write2.addClass("error").removeClass("valid").removeClass("checkpass");
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

        if (activateBtn == true && activateUser == true && $write1.hasClass("valid") == true && $write2.hasClass("valid") == true && telselected === $write1.val()) {
            $(".paso-siguiente").removeClass("disabled_boton-general");
        } else {
            $(".paso-siguiente").addClass("disabled_boton-general");
        }

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

    $secureKeyboard1.on("click", "li", function () {
        var tecladoLength1 = $write1.val().length;
        var telselected;
        var claveInc = $("#keyboard2").closest(".container-campos-ingreso").find(".clave-incorrecta");
        var iconCheck = $("#keyboard2").closest(".container-campos-ingreso").find(".campo-check-pass");
        var iconCheck2 = $("#keyboard").closest(".container-campos-ingreso").find(".campo-check-pass");
        var equal = $("#keyboard2").closest(".container-formulario").find(".clave-noequal");
        var addIcon = $write1.closest(".container-campos-ingreso");

        if (tecladoLength1 == 11) {
            return false;
        }

        if (tecladoLength1 >= 6) {
            telselected = password1.value;
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
                $write1.addClass("error").removeClass("valid").removeClass("checkpass");
                equal.addClass("valid").removeClass("error").hide();
                claveInc.show().html("Ingresa una clave segura");
                iconCheck.removeClass('iconok-circled campo_valido').addClass("campo_Invalido iconcancel-circled").show();
                addIcon.addClass("add-icon");
                if ($write2.hasClass("checkpass")) {
                    $write2.addClass("valid").removeClass("error");
                    iconCheck2.removeClass('campo_Invalido iconcancel-circled').addClass("iconok-circled campo_valido").show();

                }
            }
        } else {
            $write1.addClass("error").removeClass("valid");
            equal.addClass("valid").removeClass("error").hide();
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
    });

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

    //$("[name='terms_conditions'], [name='check_terms']").change(function () {
    //    getPassword($write1, password1);
    //    $(".eye2").hide();
    //    $(".eye1").show();
    //    $(".eye1").prev().attr('type', 'password');
    //    $(".eye1").prev().removeClass("class-tipo");
    //    getPassword($write2, password2);
    //    $(".eye4").hide();
    //    $(".eye3").show();
    //    $(".eye3").prev().attr('type', 'password');
    //    $(".eye3").prev().removeClass("class-tipo");

    //});

});