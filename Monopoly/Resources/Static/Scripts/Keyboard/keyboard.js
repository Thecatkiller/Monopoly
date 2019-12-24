function showKeyboardNumber($keyboard) {
    $keyboard.empty();
    var classes = {
        1: 'border-left', 2: '', 3: 'border-right', 4: 'border-left',
        5: 'border-left', 6: '', 7: 'border-right', 8: 'border-left',
        9: 'border-right', 0: ''
    };

    var num = parseInt(Math.floor((Math.random() * 9) + 0));
    for (var i = 0; i <= 9; i++) {
        var borderClass = classes[i];
        $keyboard.append('<li class="symbol"><span class="off ' + borderClass + '">' + num + '</span></li>');
        num = num >= 9 ? 0 : num + 1;
    }
    $keyboard.append('<li class="delete lastitem"><i class="icon-borrar"></i><p>BORRAR</p></li>');
}

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

    var numerosTeclado = ["0","1","2","3","4","5","6","7","8","9"];
    shuffle(numerosTeclado);

    for (var i = 0; i <= numerosTeclado.length - 1; i++) {
        var borderClass = classes[i];
        $keyboard.prepend('<li class="symbol" data-number><span class="off ' + borderClass + '">' + numerosTeclado[i] + '</span></li>');
    }

}

function validateKeyTextOnlyNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function changeEnableAcceptButtonFromSecureKeyboard($write, secureKeyboardMaxLength) {
    if ($write.val().length == secureKeyboardMaxLength) {
        var operationRow = $write.data('operationRow');
        $('.' + operationRow).find('.adminOperaciones--aceptar').removeClass("not-active disabledBtn");
        $('.container-detalle-teclado .campo_valido').show();
        $write.data('flagKeyboard3', true);
    }
    else if ($write.val().length != secureKeyboardMaxLength && $write.data('flagKeyboard3')) {
        var operationRow = $write.data('operationRow');
        $('.' + operationRow).find('.adminOperaciones--aceptar').addClass("not-active disabledBtn");
        $('.container-detalle-teclado .campo_valido').hide();
        $write.data('flagKeyboard3', false);
    }
}

function disableEditSecureKeyboard() {
    $(this).trigger('blur');
}

function enableSecureKeyboard($write, password) {
    if ($write != null) {
        
        if (typeof $write.data('flagKeyboard1') == 'undefined' || typeof $write.data('flagKeyboard2') == 'undefined') {
            $write.data('flagKeyboard1', true);
            $write.data('flagKeyboard2', true);
        }
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $write.data('flagKeyboard1', true);
            $write.data('flagKeyboard2', false);
            $('.container-teclado').removeClass('teclado-visible');
            $('.teclado-visible-input').removeClass('fondo__clave');
            console.log($write.data());
        } else {
            $write.data('flagKeyboard1', false);
            $write.data('flagKeyboard2', true);
            console.log($write.data());
        }

        if ($write.data('flagKeyboard2')) {
            $write.off('blur focus')
            .on('focus', disableEditSecureKeyboard);


            //$('.container-teclado').removeClass('teclado-visible');
            //$('.teclado-visible-input').removeClass('fondo__clave');

            $write.data('flagKeyboard1', true);
            $write.data('flagKeyboard2', false);
        }
        else if ($write.data('flagKeyboard1')) {
            $write.off('focus')
                        .on('focus', function () { getPassword($write, password); })
                        .on("blur", function () { hidePassword($write.val(), password, $write); });

            $write.data('flagKeyboard1', false);
            $write.data('flagKeyboard2', true);

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

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     //if ($(document).width() <= 990) {
        $('.container-teclado').removeClass('teclado-visible');
        $('.teclado-visible-input').removeClass('fondo__clave');
    }
    else {
        $('.container-teclado').addClass('teclado-visible');
        $('.teclado-visible-input').addClass('fondo__clave');
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

    //changeEnableAcceptButtonFromSecureKeyboard($write, secureKeyboardMaxLength);
}

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

function setVartoGlobal(name, value) {
    window[name] = value;
}

function deleteVartoGlobal(name) {
    delete window[name];
}

$(function () {
    var $containerSecureKeyboard = $('.containerSecureKeyboard');
    var $write = $('#' + $containerSecureKeyboard.data('inputkeyboard'));
    var $secureKeyboard = $containerSecureKeyboard.find('#keyboard');
    var secureKeyboardMaxLength = $write.data('maxlength');
    var password = { value: '' };
    var timeouts = [];

    // Habilita o Desabilita el teclado seguro, segun el ancho de la pagina
    //$(window).on('resize', function () {
    //    enableSecureKeyboard($write, password);

    //    $write.on('focus', function () {
    //        for (var i = 0; i < timeouts.length; i++) {
    //            clearTimeout(timeouts[i]);
    //        }
    //        timeouts = [];
    //        $(".icon-clave-ojo").fadeIn();
    //        $(".icon-clave-ojo2").hide();
    //        getPassword($write, password);
    //    });
    //});
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     //   $("#Password").removeClass('pointerEvents');
    } else {
       // $("#Password").addClass('pointerEvents');
    }


    $write.on('click', function () {
        generateKeyboard($secureKeyboard, $write, password, secureKeyboardMaxLength);
    });

    enableSecureKeyboard($write, password);

  
    $write.on('focus', function () {
        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = [];
        $(".icon-clave-ojo").fadeIn();
        $(".icon-clave-ojo2").hide();
        getPassword($write, password);
    });

    $('.icon-clave-ojo').on('click', function () {
        getPassword($write, password);
        $(this).hide();
        $('.icon-clave-ojo2').show();
        $(".teclado").attr("type", "text");
    });

    $('.icon-clave-ojo2').on('click', function () {
        getPassword($write, password);
        $(this).hide();
        $('.icon-clave-ojo').show();
        $(".teclado").attr("type", "password");
        hidePassword($write.val(), password, $write);
    });

 
    // LOGIN
    $('#btnLogin').on('click', function () {
        getPassword($write, password);
        $("#idmensaje").html("");      
        if ($("#headerBanca__form").valid()) {
            $("#btnLogin").attr('disabled', true);
            $("#DivLoading").show();
            $("#btnLogin").html('Ingresando..');
            $("#headerBanca__form").submit();
        } else {
            if ($("#Username").hasClass("error_form") && $("#Password").hasClass("error_form")) {
                console.log("error total");
                $(".container__verclave").css("bottom", "30px");
            } else if ($("#Username").hasClass("error_form") && !($("#Password").hasClass("error_form"))) {
                console.log("error 2");
                $(".container__verclave").css("bottom", "6px");
            } else if (!$("#Username").hasClass("error_form") && $("#Password").hasClass("error_form")) {
                console.log("error 1");
                $(".container__verclave").css("bottom", "30px");
            }
            
        }
    });
});