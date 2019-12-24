$(function () {
    var $write = $('.write'),
		shift = false,
		capslock = false;

    showKeyboardNumber = function ($keyboard) {
        $keyboard.empty();
        var classes = {
            1: 'border-left', 2: '', 3: 'border-right', 4: 'border-left',
            5: 'border-left', 6: '', 7: 'border-right', 8: 'border-left',
            9: 'border-right', 0: ''
        };

        var num = parseInt(Math.floor((Math.random() * 9) + 0));
        keys = "";
        for (var i = 0; i <= 9; i++) {
            var borderClass = classes[i];
            $keyboard.append('<li class="symbol"><span class="off ' + borderClass + '">' + num + '</span></li>');
            num = (num >= 9) ? 0 : (num + 1);
        }
        $keyboard.append('<li class="delete lastitem border-borrar"><i class="icon-borrar"></i><p>BORRAR</p></li>');
    };

    showKeyboard = function ($keyboard) {
        $keyboard.find('[data-number]').remove();
        var classes = {
            1: 'border-left', 2: '', 3: 'border-right', 4: 'border-left',
            5: 'border-left', 6: '', 7: 'border-right', 8: 'border-left',
            9: 'border-right', 0: ''
        };


        var num = parseInt(Math.floor((Math.random() * 9) + 0));

        keys = "";
        for (var i = 0; i <= 9; i++) {
            var borderClass = classes[i];
            $keyboard.prepend('<li class="symbol" data-number><span class="off ' + borderClass + '">' + num + '</span></li>');
            num = (num >= 9) ? 0 : (num + 1);
        }
    };


    getCardLength = function () {
        var cardlength = 0;
        $('.container-input input').each(function () {
            cardlength = cardlength + $(this).val().length;
        });

        return cardlength;
    };

    getCard = function () {
        var card = "";
        $('.container-input input').each(function () {
            card = card.toString() + $(this).val().toString();
        });

        return card;
    };

    getLength = function () {
        var totallength = 0;
        var cardlength = 0;
        var writelength = 0;
        cardlength = getCardLength();
        writelength = $('.write').val().length;
        totallength = cardlength + writelength;

        return totallength
    };

    var __validTC;

    validateForm = function () {


        total = getLength();

        if (total == 20) {
            var cardNumnber = getCard();
            __validTC = $.payment.validateCardNumber(cardNumnber);

            if (__validTC) {

                $(".exito-pass").removeClass("disabled_boton-general");
                //$(".disabled-btn-continuar").hide();
                $('.container-campos-ingreso .campo_valido').show();
                $('.container-detalle-teclado .campo_valido').show();

                __validTC = true; // Validar paso de Tarjeta -- MMAV 
                $(".container-input").removeClass("errorInputsClaves");
                $(".container-input").parent().addClass("add-icon-cruz").removeClass("add-icon-check");
                $(".checkCard").removeClass('campo_Invalido iconcancel').addClass("iconok campo_valido").show();
                $(".clave-incorrecta").hide();

            } else {
                $(".container-input").addClass("errorInputsClaves");
                $(".container-input").parent().addClass("add-icon-check").removeClass("add-icon-cruz");
                $(".exito-pass").addClass("disabled_boton-general");
                //$(".disabled-btn-continuar").show();

                $(".checkCard").removeClass('iconok campo_valido').addClass("campo_Invalido icon-cruz").show();
                $(".clave-incorrecta").show();

                __validTC = false; // Validar paso de Tarjeta -- MMAV 
            }
        }
        else {
            $(".exito-pass").addClass("disabled_boton-general");

            //$(".disabled-btn-continuar").show();

            cardLength = getCardLength();

            if (cardLength == 16) {

                var cardNumnber = getCard();

                var validCard = $.payment.validateCardNumber(cardNumnber);
                if (!validCard) {
                    $(".container-input").addClass("errorInputsClaves");
                    $(".container-input").parent().addClass("add-icon");
                    $(".exito-pass").addClass("disabled_boton-general");
                    //$(".disabled-btn-continuar").show();

                    $(".checkCard").removeClass('iconok campo_valido').addClass("campo_Invalido icon-cruz").show();
                    $(".clave-incorrecta").show();

                    __validTC = false; // Validar paso de Tarjeta -- MMAV 
                } else {
                    __validTC = true; // Validar paso de Tarjeta -- MMAV 
                    $(".container-input").removeClass("errorInputsClaves");
                    $(".container-input").parent().addClass("add-icon");
                    $(".checkCard").removeClass('campo_Invalido icon-cruz').addClass("iconok campo_valido").show();
                    $(".clave-incorrecta").hide();
                }


            }
            else {
                __validTC = false;
                $(".container-input").parent().removeClass("add-icon");
                $('.container-campos-ingreso .campo_valido').hide();
                $(".checkCard").hide();
            }
            passLength = $('.write').val().length;

            if (passLength == 4) {

                $('.container-detalle-teclado .campo_valido').show();
            }
            else {
                $('.container-detalle-teclado .campo_valido').hide();
            }
        }

        return (total == 20) ? true : false;

    };

    $('body').on('click', '#keyboard li', function () {
        var $this = $(this),
			character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();

            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }

        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.letter').toggleClass('uppercase');
            capslock = true;
            return false;
        }

        // Delete
        if ($this.hasClass('delete')) {
            var html = $write.val();

            $write.val(html.substr(0, html.length - 1));
            value = html.substr(0, html.length - 1);
            if (value.length == 0) {
                $(".exito-pass").hide();
                $(".disabled-btn-continuar").show();
            }

            return false;
        }

        // Special characters
        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "\n";

        // Uppercase letter
        if ($this.hasClass('uppercase')) character = character.toUpperCase();

        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false) $('.letter').toggleClass('uppercase');

            shift = false;
        }
        if ($write.val().length < $write.attr('maxlength')) {          
            $write.val($write.val() + character);
            if ($write.val().length == $write.attr('maxlength')) {
                $write.trigger('keyup');            
                _closeTeclado($this);
            }
        }
    });

    function getCode(character) {
        codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        return codes[character];
    };
});
$(function () {
    var $write = $('.write2'),
		shift = false,
		capslock = false;

    $('body').on('click', '#keyboard2 li', function () {
        var $this = $(this),
			character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();

            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }

        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.letter').toggleClass('uppercase');
            capslock = true;
            return false;
        }

        // Delete
        if ($this.hasClass('delete')) {
            var html = $write.val();

            $write.val(html.substr(0, html.length - 1));
            return false;
        }

        // Special characters
        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "\n";

        // Uppercase letter
        if ($this.hasClass('uppercase')) character = character.toUpperCase();

        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false) $('.letter').toggleClass('uppercase');

            shift = false;
        }

        // Add the character
        if ($write.val().length < 10) {
            $write.val($write.val() + character);
        }
        $('.write2').trigger('keyup');
    });

    $('.container-input input').keyup(function (e) {
        $self = $(this);
        keyCode = e.which || e.keyCode();
        $container = $(this).parents('.container-input');
        index = $self.index('input');
        next = index + 1;
        prev = index - 1;
        if (keyCode != 8) {
            if ($self.val().length >= 4 && next <= 3) {
                $('.container-input input:eq(' + next + ')').focus();
            }
            else if ($self.val().length >= 4 && next == 3) {
                $('.clave-input input').focus();
                //$('.container-input input:eq('+next+')').focus();
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
    });
    $('body').on('keydown', '[size]', function (e) {
        keyCode = e.which || e.keyCode();
        if (keyCode == 8) {
            return true;
        }
        if ($(this).val().length >= parseInt($(this).attr('size'))) {
            if ($(this).data('deleteable') == true) {
                $(this).data('deleteable', false);
                return true;
            }
            e.preventDefault();
            e.stopPropagation();
            $(this).blur();
            return false;
        }
        else {
            return true;
        }
    });
    $('.write, .write2').focus(function (e) {
        $self = $(this);
        if ($(document).width() <= 750) {

            var myObj = $('.container-campos-ingreso');

            if (myObj.length) {
                $(window).scrollTop($('.container-campos-ingreso').offset().top - 10);
                $('body').css('overflow', 'hidden');
                $self.data('inputnumber').focus();
            }
        }
    });
    $('body').on('keyup', 'input.hide-number', function (e) {
        $self = $(this);
        val = $self.val();
        keyCode = e.which || e.keyCode();
        if ($(document).width() <= 750) {
            $self.data('input').val(val);
            $self = $(this);
            $container = $self.data('input').parents('.container-input');
            index = $self.data('input').index('input');
            next = index + 1;
            prev = index - 1;
            if (keyCode != 8) {
                if ($self.val().length >= 4 && next <= 3) {
                    $self.data('input').parents('.container-input')
			    	.find('input:eq(' + next + ')').focus();
                }
                validateForm();
            }
            else {
                if ($self.val().length == 0 && prev >= 0) {
                    $prev = $self.data('input').parents('.container-input')
			    	.find('input:eq(' + prev + ')');
                    if ($prev.data('inputnumber')) {
                        console.log($prev.data('inputnumber'));
                        //$('.container-input input:eq('+prev+')').data('deleteable', true);
                        $prev.data('inputnumber').focus();
                    }

                }
            }
        }
    });
    $('body').on('blur', 'input.hide-number', function (e) {
        $('body').css('overflow', 'auto');
    });
    var enableSecureKeyboard = function (e) {
        if ($(document).width() <= 750) {
            //$('.write, .write2').prop('readonly', false);
            $('.write, .write2').each(function (i) {
                $item = $(this);
                $item.data('number', true);
                if (!$item.data('inputnumber')) {
                    $item.prop('readonly', true);
                    $number = $("<input/>").prop('type', 'text').addClass('hide-number');
                    $number.css({ position: 'fixed', right: '20000px' });
                    $number.attr({ size: $item.attr('size'), maxlength: $item.attr('maxlength') });
                    $item.data('inputnumber', $number);
                    $number.data('input', $item);
                    $('body').append($number);

                }
            });
            //$('.write, .write2, .numeros').prop('type', 'text');
            $('.container-input .numeros').prop('type', 'text');
        }
        else {
            $('.write, .write2').each(function (i) {
                $item = $(this);
                $item.data('number', false);
                if ($item.data('inputnumber')) {
                    $item.data('inputnumber').empty();
                }
            });
            $('.container-input .numeros').prop('type', 'text');
        }
    };
    $(window).resize(enableSecureKeyboard);
    enableSecureKeyboard();
});

$(".container-teclado, .container-teclado2").mouseout(function () {
    window.t = setTimeout(function () {
        $(".container-teclado, .container-teclado2").removeClass("teclado-visible").removeClass("teclado-visible-campos");
        $(".teclado-visible-input, .teclado-visible-input2").removeClass("fondo__clave").removeClass("fondo__clave2")
    }, 500);
})
.mouseover(function () {
    if (window.t) {
        clearTimeout(window.t);
        window.t = undefined;
    } else {
        //Do your menu popup thing here
    }
});

//funcion solo numeros y letras
(function (a) { a.fn.validCampoFranz = function (b) { a(this).on({ keypress: function (a) { var c = a.which, d = a.keyCode, e = String.fromCharCode(c).toLowerCase(), f = b; (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault() } }) } })(jQuery);