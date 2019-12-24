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
        num = (num >= 9) ? 0 : (num + 1);
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

    shuffle(numerosTeclado);

    for (var i = 0; i <= numerosTeclado.length - 1; i++) {
        var borderClass = classes[i];
        $keyboard.prepend('<li class="symbol" data-number><span class="off ' + borderClass + '">' + numerosTeclado[i] + '</span></li>');
    }
}

function validateKeyTextOnlyNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) off
    return false;
    return true;
}

function disableEditSecureKeyboard() {
    $(this).trigger('blur');
}

function enableSecureKeyboard($write, password, $form, $btnSubmit) {
    if ($write != null) {
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

            //$write.on('keypress', validateKeyTextOnlyNumber);

            $write.data('flagKeyboard1', true);
            $write.data('flagKeyboard2', false);

        }
        else if ($write.data('flagKeyboard1')) {

            $write.off('focus')
                .on('focus', function () { getPassword($write, password); })
                .on('blur', function () { hidePassword($write.val(), password, $write); })
                .on('keyup', function () { enableButtonForm($form, $btnSubmit); });
            $write.data('flagKeyboard1', false);
            $write.data('flagKeyboard2', true);

            $('.container-teclado').removeClass('teclado-visible');
            $('.teclado-visible-input').removeClass('fondo__clave');

            if (password.value != '') {
                getPassword($write, password);
            }

            hidePassword($write.val(), password, $write);

            $write.trigger('blur');
            //$write.attr('type', 'password');
            //$write.removeClass('pass');
        }
    }
}

function generateKeyboard($secureKeyboard, $write, password, secureKeyboardMaxLength, $form, $btnSubmit, isOnlyNumeric) {
    if (isOnlyNumeric) {
        showKeyboardNumber($secureKeyboard);
    }
    else {
        showKeyboard($secureKeyboard);
    }

    //if ($(document).width() <= 990) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //$('.container-teclado').removeClass('teclado-visible');
        //$('.teclado-visible-input').removeClass('fondo__clave');
    }
    else {
        //$('.container-teclado').addClass('teclado-visible');
        //$('.teclado-visible-input').addClass('fondo__clave');

        $secureKeyboard.find('li').off('click').on('click', function () {
            editInputFromSecureKeyboard($(this), $write, password, secureKeyboardMaxLength, $form, $btnSubmit);
        });
    }
}

function editInputFromSecureKeyboard(self, $write, password, secureKeyboardMaxLength, $form, $btnSubmit) {
    var character = self.html();

    // Delete
    if (self.hasClass('delete')) {
        password.value = password.value.slice(0, -1);
        $write.val(password.value);
        enableButtonForm($form, $btnSubmit);
    }
    else {
        if (self.hasClass('symbol')) {
            character = $('span:visible', self).html();
        }

        // Add
        if ($write.val().length < secureKeyboardMaxLength) {
            hidePassword(password.value + character, password, $write);
            enableButtonForm($form, $btnSubmit);
        }
    }
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

function getCardLength() {
    var cardlength = 0;
    $('.container-input input').each(function () {
        cardlength = cardlength + $(this).val().length;
    });

    return cardlength;
}

function getCard() {
    var card = "";
    $('.container-input input').each(function () {
        card = card.toString() + $(this).val().toString();
    });
    return card;
}

function getInputKeysTotalLength($form) {
    var inputs = $form.find("input:not([type=hidden])");
    var totallength = 0;

    inputs.each(function (e) {
        totallength = totallength + parseInt(this.value.length);
    });

    return totallength;
}

function getInputKeysMinTotalLength($form) {
    var inputs = $form.find("input:not([type=hidden])");
    var totallength = 0;

    inputs.each(function (e) {
        var self = $(this);
        totallength = totallength + parseInt(self.data("minlength"));
    });

    return totallength;
}

function enableButtonForm($form, $btnSubmit) {
    var total1 = getInputKeysMinTotalLength($form);
    var total2 = getInputKeysTotalLength($form);

    if (total2 >= total1) {
        if ($form.find(".inputHasError").length == 0) {
            $btnSubmit.removeClass("disabled_boton-general");
        }
        else {
            $btnSubmit.addClass("disabled_boton-general");
        }
    }
    else {
        $btnSubmit.addClass("disabled_boton-general");
    }
}

$(document).ready(function () {

    var $form = $('#' + $('body').data('formid'));
    var $btnSubmit = $('#' + $('body').data('submitid'));

    $('#pwd').keyup(function (e) {

        enableButtonForm($form, $btnSubmit);
    });

    $btnSubmit.on("click", function () {
        getPassword($write, password);
    });


});

var checkMobil = false;
window.mobilecheck = function () {

    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            checkMobil = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return checkMobil;
};

function setVisibledSecureKeyboard($secureKeyboard, $write) {
    $(".container-teclado").addClass("teclado-visible");
    $(".teclado-visible-input").addClass("fondo__clave");

    $('body').on('click', function (event) {
        var $div1 = $('.teclado-visible-input');
        var elementTop1 = $div1.offset().top;
        var elementBottom1 = elementTop1 + $div1.outerHeight();
        var elementLeft1 = $div1.offset().left;
        var elementRight1 = elementLeft1 + $div1.outerWidth();

        var $div2 = $secureKeyboard;
        var elementTop2 = $div2.offset().top;
        var elementBottom2 = elementTop2 + $div2.outerHeight() + 40;
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
            $('body').off('click');
        }
    });
}

//boton cerrar teclado
$(".close-securekeyboard").on("click", function () {
    $(".container-teclado").removeClass("teclado-visible");
    $(".teclado-visible-input").removeClass("fondo__clave");
});

//funcion solo numeros y letras
(function (a) { a.fn.validCampoFranz = function (b) { a(this).on({ keypress: function (a) { var c = a.which, d = a.keyCode, e = String.fromCharCode(c).toLowerCase(), f = b; (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault() } }) } })(jQuery);

function inicializeSecureKeyboard($write, password, $form, $btnSubmit, $secureKeyboard, secureKeyboardMaxLength, isOnlyNumeric) {
    // Habilita o Desabilita el teclado seguro, segun el ancho de la pagina
    $(window).on('resize', function () {
        enableSecureKeyboard($write, password, $form, $btnSubmit);

        $write.on('focus', function () {
            getPassword($write, password);
        });
    });

    $write.on('click', function () {
        console.log(checkMobil);
        generateKeyboard($secureKeyboard, $write, password, secureKeyboardMaxLength, $form, $btnSubmit, isOnlyNumeric);

        if (checkMobil == false) {
            setVisibledSecureKeyboard($secureKeyboard, $write);
            return checkMobil;
        }
    });

    enableSecureKeyboard($write, password, $form, $btnSubmit);

    $write.on('focus', function () {
        getPassword($write, password);
    });
}

$(function () {
    var $containerSecureKeyboard = $('.containerSecureKeyboard');
    var $write = $('#' + $containerSecureKeyboard.data('inputkeyboard')); //pwd
    var $secureKeyboard = $containerSecureKeyboard.find('#keyboard');
    var secureKeyboardMaxLength = $write.data('maxlength');
    var password = { value: '' };
    var $form = $('#' + $('body').data('formid'));
    var $btnSubmit = $('#' + $('body').data('submitid'));

    //inicializeSecureKeyboard($write, password, $form, $btnSubmit, $secureKeyboard, secureKeyboardMaxLength, true);
   
    // Gestiona el movimiento de cursor en numero de tarjeta

    $('.container-input input').keyup(function (e) {
        $self = $(this);
        keyCode = e.which || e.keyCode();
        $container = $(this).parents('.container-input');
        index = $self.index('input') - 1;
        next = index + 1;
        prev = index - 1;
        if (keyCode != 8) {
            if ($self.val().length >= 4 && next <= 3) {
                $('.container-input input:eq(' + next + ')').focus();
            }
            else if ($self.val().length >= 4 && next == 3) {
                $('.clave-input input').focus();
            }
            else {
                $('.container-input input:eq(' + prev + ')').data('deleteable', false);
            }
        }
        else {
            if ($self.val().length == 0 && prev >= 0) {
                $('.container-input input:eq(' + prev + ')').data('deleteable', true);
                $('.container-input input:eq(' + prev + ')').focus();
            }
        }

        // verificar si el numero de tarjeta es valida
        if (getCardLength() == 16) {
            var cardNumnber = getCard();
            var validCard = $.payment.validateCardNumber(cardNumnber);
            if (validCard) {
                $(".container-input").removeClass("errorInputsClaves inputHasError");
                $(".checkCard").removeClass('campo_Invalido iconcancel-circled').addClass("campo_valido iconok-circled").show();
                $(".clave-incorrecta").hide();
                $(".numero-tarjeta4").trigger("blur");
            }
            else {
                $(".container-input").addClass("errorInputsClaves inputHasError");
                $(".checkCard").removeClass('campo_valido iconok-circled').addClass("campo_Invalido iconcancel-circled").show();
                $(".clave-incorrecta").show();
            }

        }
        else {
            $(".container-input").removeClass("errorInputsClaves inputHasError");
            $(".checkCard").removeClass('campo_valido iconok-circled').removeClass('campo_Invalido iconcancel-circled');
            $(".clave-incorrecta").hide();
        }

        enableButtonForm($form, $btnSubmit);
    });


    $btnSubmit.on("click", function () {
        getPassword($write, password);
    });


});

(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            }
            else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    };
}(jQuery));
// el numero de tarjeta solo permite numeros


$(".numeros").on("keypress keyup blur", function (event) {
    $(this).val($(this).val().replace(/[^\d].+/, ""));
    if ((event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

$(".numeric").on("keypress keyup blur", function (event) {
    $(this).val($(this).val().replace(/[^\d].+/, ""));
    if ((event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});