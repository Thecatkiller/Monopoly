
//// Library
(function (a) { a.fn.validCampoFranz = function (b) { a(this).on({ keypress: function (a) { var c = a.which, d = a.keyCode, e = String.fromCharCode(c).toLowerCase(), f = b; (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault() } }) } })(jQuery);

//$("#Username").validCampoFranz('qwertyuiopasdfghjklñzxcvbnm1234567890');
$('.numeros').validCampoFranz('0123456789');

/// 1. Cokies Extensions 

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) { }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
          
            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                result = read(cookie, value);
                break;
            }

            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        var isSecure = false;

        if (isSecureConection === 'true')
        {
            isSecure = true;
        }

        $.cookie(key, '', $.extend({}, options, { expires: -1, secure: isSecure }));
        return !$.cookie(key);
    };

}));


function SetAlreadyVisit() {
    //$.cookie('AlreadyVisit', true); 

    $.ajax({
        type: "POST",
        url: varURL  + "/Security/SetAlreadyVisit" ,
        success: function (data) {
            console.log(data);
        }
    });

}

if ($.cookie('AlreadyVisit') == null) {
    showmodaldemo();
}



/// --------------------------------------

//// 2. Resize Browsers

$(document).ready(function () {

    //if ($("#Password").hasClass("error_form")) {
    //    console.log("if");
    //    $(".container__verclave").css("bottom", "30px");
    //}


    /*
    $(".icon-clave-ojo").on("click", function () {
        $(this).hide();
        $(".icon-clave-ojo2").fadeIn();

        $("#Password")
        .val(window['password'])
        .attr("type", "text");

        setTimeout(function () {
            $(".teclado").attr("type", "password");
            $(".icon-clave-ojo").fadeIn();
            $(".icon-clave-ojo2").hide();
            setVartoGlobal('ok', 'ok');
        }, 3000);
    });
    */

    /*
    $('#btnLogin').on('click', function () {
        jsValidaLogin();
    });
    */

});

/// --------------------------------------


//// 3. Eventos de los controles 

$inputs = $('.container-input input');

$inputs.focusin(function () {
    $(this).attr('placeholder', '');
}).focusout(function () {
    $inputs.attr('placeholder', 'xxxx');
});

/// --------------------------------------

/// 4. Funciones de Validación de Usuario


function ForgetPasswor() {
    var URL = urlOlvidaPassword;
    window.Location = URL;
}

///// 5. Funciones de Validación


$("#headerBanca__form").validate({
    rules: {
        Username: {
            required: true,
            minlength: 1
        },
        Password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        Username: {
            required: "Ingresa tu usuario",
            minlength: "Ingresa almenos 1 caracter"
        },
        Password: {
            required: "Ingresa tu clave digital",
            minlength: "Ingresa una clave de mínimo 6 caracteres"
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('error_form');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('error_form');
    }
});


$('[data-toggle="tooltip"]').tooltip();

$(".modal-ayuda").on("click", function () {
    $('#modal-ayuda').modal({
        backdrop: 'static'
    });
});

$(document).on('click', function (event) {
    if (!$(event.target).closest('#keyboard').length && !$(event.target).closest('#teclado').length) {
        if (!$(event.target).closest('#Password').length) {
            $(".container-teclado").removeClass("teclado-visible");
            $(".teclado-visible-input").removeClass("fondo__clave");
        } else {
            $(".container-teclado").addClass("teclado-visible");
            $(".teclado-visible-input").addClass("fondo__clave");
        }
    }
});
