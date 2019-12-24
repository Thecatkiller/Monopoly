$(function () {

	var $write = $('.write'),
		shift = false,
		capslock = false;
	
	showKeyboardNumber = function( $keyboard ){
		$keyboard.empty();
		var classes = {
			1: 'border-left',  2: '', 3: 'border-right', 4: 'border-left', 
			5: 'border-left',  6: '', 7: 'border-right', 8: 'border-left', 
			9: 'border-right', 0: ''
		};

		var num = parseInt( Math.floor( (Math.random() * 9) + 0 ));
		keys = "";
		for( var i = 0; i<=9; i++ ){
			var borderClass = classes[i];
			$keyboard.append('<li class="symbol"><span class="off '+borderClass+'">'+num+'</span></li>');
			num = ( num >= 9 )?0:(num+1);
		}
		$keyboard.append('<li class="delete lastitem border-borrar"><i class="icon-borrar"></i><p>BORRAR</p></li>');
	};

	showKeyboard = function( $keyboard ){
		$keyboard.find('[data-number]').remove();
		var classes = {
			1: 'border-left',  2: '', 3: 'border-right', 4: 'border-left', 
			5: 'border-left',  6: '', 7: 'border-right', 8: 'border-left', 
			9: 'border-right', 0: ''
		};

		
		var num = parseInt( Math.floor( (Math.random() * 9) + 0 ));

		keys = "";
		for( var i = 0; i<=9; i++ ){
			var borderClass = classes[i];
			$keyboard.prepend('<li class="symbol" data-number><span class="off '+borderClass+'">'+num+'</span></li>');
			num = ( num >= 9 )?0:(num+1);
		}
	};

	getCardLength = function(){
		var cardlength = 0;
		$('.container-input input').each(function(){
	        cardlength = cardlength+$(this).val().length;
	    });

	    return cardlength;
	};

	getLength = function(){
	    var totallength = 0;
	    var cardlength = 0;
	    var writelength = 0;
	    cardlength = getCardLength();
	    writelength = $('.write').val().length;
	    totallength = cardlength+writelength;

    	return totallength
	};

	validateForm = function(){
        total = getLength();
        if( total == 20){
            $(".exito-pass").show();
            $(".disabled-btn-continuar").hide();
            $('.container-campos-ingreso .campo_valido').show();
            $('.container-detalle-teclado .campo_valido').show();
        }
        else{
            $(".exito-pass").hide();
            $(".disabled-btn-continuar").show();
            cardLength = getCardLength();
            if(cardLength == 16){
                $('.container-campos-ingreso .campo_valido').show();
            }
            else{
                $('.container-campos-ingreso .campo_valido').hide();
            }
            passLength = $('.write').val().length;
            if(passLength == 4){
                $('.container-detalle-teclado .campo_valido').show();
            }
            else{
                $('.container-detalle-teclado .campo_valido').hide();
            }
        }

        return (total == 20)?true:false;

	};

	$('body').on('click', '#keyboard li', function(){
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
            /*if( value.length == 0 ){
                $(".exito-pass").hide();
                $(".disabled-btn-continuar").show();
            }*/

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
        
		if( $write.val().length < $write.attr('maxlength') ){
			$write.val($write.val() + character);
			if( $write.val().length == $write.attr('maxlength') ){
				$write.trigger('keyup');
			}
		}
        	

	});

	function getCode(character){
		codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
		return codes[character];
	};
});


$(function () {
    var $write = $('.write2'),
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
        if (total == 20) {
            $(".exito-pass").show();
            $(".disabled-btn-continuar").hide();
            $('.container-campos-ingreso .campo_valido').show();
            $('.container-detalle-teclado .campo_valido').show();
        }
        else {
            $(".exito-pass").hide();
            $(".disabled-btn-continuar").show();
            cardLength = getCardLength();
            if (cardLength == 16) {
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
            value = html.substr(0, html.length - 1);
            /*if( value.length == 0 ){
                $(".exito-pass").hide();
                $(".disabled-btn-continuar").show();
            }*/

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

$(".container-teclado, .container-teclado2").mouseout(function () {
    window.t = setTimeout(function () {
        $(".container-teclado, .container-teclado2").removeClass("teclado-visible");
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
(function(a){a.fn.validCampoFranz=function(b){a(this).on({keypress:function(a){var c=a.which,d=a.keyCode,e=String.fromCharCode(c).toLowerCase(),f=b;(-1!=f.indexOf(e)||9==d||37!=c&&37==d||39==d&&39!=c||8==d||46==d&&46!=c)&&161!=c||a.preventDefault()}})}})(jQuery);