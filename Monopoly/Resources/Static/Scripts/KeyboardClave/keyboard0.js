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
        $keyboard.append('<li class="delete lastitem"><i class="icon-borrar"></i><p>BORRAR</p></li>');
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
    getLength = function () {
        var totallength = 0;
        var cardlength = 0;
        var writelength = 0;
        cardlength = getCardLength();
        writelength = $('.write').val().length;
        totallength = cardlength + writelength;

        return totallength
    };

    validateForm = function () {
        total = getLength();
        if (total == 18) {
            $(".exito-pass").show();
            $(".disabled-btn-continuar").hide();
            $('.container-campos-ingreso .campo_valido').show();
            $('.container-detalle-teclado .campo_valido').show();
        }
        else {
            $(".exito-pass").hide();
            $(".disabled-btn-continuar").show();
            cardLength = getCardLength();
            if (cardLength == 14) {
                $('.container-campos-ingreso .campo_valido').show();
            }
            else {
                $('.container-campos-ingreso .campo_valido').hide();
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
            if (value.length <= 5) {
                $(".paso-siguiente").hide();
                $(".btn-aceptar-terminos").show();
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

    /*$('.container-input input').keyup(function(e){
	    $self = $(this);
	    keyCode = e.which || e.keyCode();
	    $container = $(this).parents('.container-input');
	    index = $self.index('input');
	    next = index+1;
	    prev = index-1;
	    if( keyCode != 8){
		    if( $self.val().length >= 4 && next <= 2 ){
		    	//$('.container-input input:eq('+next+')').focus();
		    }
		    else if( $self.val().length >= 4 && next == 2  ){
		    	$('.clave-input input').focus();
				//$('.container-input input:eq('+next+')').focus();
		    }
		    else{
		    	$('.container-input input:eq('+prev+')').data('deleteable', false);
		    }
		}
		else{
			if( $self.val().length == 0 && prev >= 0 ){
				$('.container-input input:eq('+prev+')').data('deleteable', true);
				$('.container-input input:eq('+prev+')').focus();
			}
		}
	});
	$('body').on('keydown', '[size]', function(e){
	    keyCode = e.which || e.keyCode();
	    if( keyCode == 8 ){
	    	return true;
	    }
		if($(this).val().length >= parseInt( $(this).attr('size')) ){
			if( $(this).data('deleteable') == true ){
				$(this).data('deleteable', false);
				return true;
			}
			e.preventDefault();
			e.stopPropagation();
			$(this).blur();
			return false;
		}
		else{
			return true;
		}
	});
	$('.write, .write2').focus(function(e){
		$self = $(this);
		if( $(document).width() <= 750 ){
			$(window).scrollTop($('.container-campos-ingreso').offset().top-10);
			$('body').css('overflow', 'hidden');
			$self.data('inputnumber').focus();
		}
	});
	$('body').on('keyup', 'input.hide-number', function(e){
		$self = $(this);
		val = $self.val();
	    keyCode = e.which || e.keyCode();
		if( $(document).width() <= 750 ){
			$self.data('input').val(val);
			$self = $(this);
		    $container = $self.data('input').parents('.container-input');
		    index = $self.data('input').index('input');
		    next = index+1;
		    prev = index-1;
		    if( keyCode != 8 ){
			    if( $self.val().length >= 4 && next <= 3 ){
			    	$self.data('input').parents('.container-input')
			    	.find('input:eq('+next+')').focus();
			    }
			    validateForm();
		    }
		    else{
				if( $self.val().length == 0 && prev >= 0 ){
					$prev = $self.data('input').parents('.container-input')
			    	.find('input:eq('+prev+')');
			    	if( $prev.data('inputnumber') ){
			    		console.log( $prev.data('inputnumber') );
						//$('.container-input input:eq('+prev+')').data('deleteable', true);
						$prev.data('inputnumber').focus();
			    	}

				}
		    }
		}
	});
	$('body').on('blur', 'input.hide-number', function(e){
		$('body').css('overflow', 'auto');
	});
	var enableSecureKeyboard = function(e){
		if( $(window).width() <= 750 ){

			//$('.write, .write2').prop('readonly', false);
			$('.write, .write2').each(function(i){
				$item = $(this);
				$item.data('number', true);
				if( !$item.data('inputnumber') ){
					$item.prop('readonly', true);
					$number = $("<input/>").prop('type', 'text').addClass('hide-number');
					$number.css({position: 'fixed', right: '20000px'});
					$number.attr({size: $item.attr('size'), maxlength: $item.attr('maxlength')});
					$item.data('inputnumber', $number);
					$number.data('input', $item);
					$('body').append($number);

				}
			});
			//$('.write, .write2, .numeros').prop('type', 'text');
			$('.container-input .numeros').prop('type', 'text');
		}
		else{
			$('.write, .write2').each(function(i){
				$item = $(this);
				$item.data('number', false);
				if( $item.data('inputnumber') ){
					$item.data('inputnumber').empty();
				}
			});
			$('.container-input .numeros').prop('type', 'text');
		}
	};
	$(window).resize(enableSecureKeyboard);
	enableSecureKeyboard();*/
});
$(function () {
    var $write = $('.write3'),
		shift = false,
		capslock = false;

    $('body').on('click', '#keyboard3 li', function () {

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
        $('.write3').trigger('keyup');
    });

    $('.container-input input').keyup(function (e) {
        $self = $(this);
        keyCode = e.which || e.keyCode();
        $container = $(this).parents('.container-input');
        index = $self.index('input');
        next = index + 1;
        prev = index - 1;
        if (keyCode != 8) {
            if ($self.val().length >= 4 && next <= 2) {
                //$('.container-input input:eq('+next+')').focus();
            }
            else if ($self.val().length >= 4 && next == 2) {
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
    //$('.write, .write2, write3').focus(function(e){
    //	$self = $(this);
    //	if( $(document).width() <= 750 ){
    //		$(window).scrollTop($('.container-campos-ingreso').offset().top(-10));
    //		$('body').css('overflow', 'hidden');
    //		$self.data('inputnumber').focus();
    //	}
    //});
    $('body').on('keyup', 'input.hide-number', function (e) {
        $self = $(this);
        val = $self.val();
        keyCode = e.which || e.keyCode();
        //if ($(document).width() <= 750) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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
        //if ($(window).width() <= 750) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //$('.write, .write2').prop('readonly', false);
            $('.write, .write2, .write3').each(function (i) {
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
            $('.write, .write2, .write3').each(function (i) {
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

$(function () {
    var $write = $('.write4'),
		shift = false,
		capslock = false;

    $('body').on('click', '#keyboard4 li', function () {

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
        $('.write4').trigger('keyup');
    });

    $('.container-input input').keyup(function (e) {
        $self = $(this);
        keyCode = e.which || e.keyCode();
        $container = $(this).parents('.container-input');
        index = $self.index('input');
        next = index + 1;
        prev = index - 1;
        if (keyCode != 8) {
            if ($self.val().length >= 4 && next <= 2) {
                //$('.container-input input:eq('+next+')').focus();
            }
            else if ($self.val().length >= 4 && next == 2) {
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


    //$('.write, .write2, .write3, .write4').focus(function(e){
    //	$self = $(this);
    //	if( $(document).width() <= 750 ){
    //		$(window).scrollTop($('.container-campos-ingreso').offset().top-10);
    //		$('body').css('overflow', 'hidden');
    //		$self.data('inputnumber').focus();
    //	}
    //});

    $('body').on('keyup', 'input.hide-number', function (e) {
        $self = $(this);
        val = $self.val();
        keyCode = e.which || e.keyCode();
        //if ($(document).width() <= 750) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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
        //if ($(window).width() <= 750) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //$('.write, .write2').prop('readonly', false);
            $('.write, .write2,  .write3, .write4').each(function (i) {
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
            $('.write, .write2, .write3, .write4').each(function (i) {
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
//funcion solo numeros y letras
(function (a) { a.fn.validCampoFranz = function (b) { a(this).on({ keypress: function (a) { var c = a.which, d = a.keyCode, e = String.fromCharCode(c).toLowerCase(), f = b; (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault() } }) } })(jQuery);
