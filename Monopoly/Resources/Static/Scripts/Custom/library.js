

console.log('/******* Homebanking 2017 - Functions: Library.js cargada *******/ ');

var re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var re_celular = /^9[0-9]{8}$/;
$.ajaxSetup({
    cache: false,
    error: function (event, request, settings) {
        console.log('ajaxSetup::Error');
        console.log('event::Error::' + event);
        console.log('event::request::' + request);
        console.log('event::settings::' + settings);
    }
});

var objDialog;
var ObjectHTMLAjax;
var Page = '';
var onLoad = true;

var HTMLHeaderMovimientos = '<div class="head_tabla"><span class="red-text-alert btn-block text-center">No se encontraron movimientos</span></div>';

window.onerror = function (message, name) {

    console.log(message);

    switch (Page) {
        case 'Cuenta.Movimientos':
            ObjectHTMLAjax.html(HTMLHeaderMovimientos);
            break;
        default:

    }

    /// Manejar y Log de Errores
    console.log('/******* Library.js BFP.jextension.js ERROR *******/');

    return false;
}


$(document).ajaxStart(function () {
});

$(document).ajaxSend(function (event, xhr, options) {
})

$(document).ajaxComplete(function (event, request, set) {
});

$(document).ajaxError(function (e, xhr, settings, exception) {

    var message = '';
    if (xhr.status == 500) {
        console.log(xhr.responseText);
    }

    if (xhr.status == 0) {
        message = 'Esta desconectado de la red o la red es innacesible \n Revisar las conexiones.';
        console.log(message);
    }

});


/// Funciones Error

function callBackjQuery(responseTxt, statusTxt, xhr, object) {
}

// Funcion de Redireccion Layout 
// _OnMenuClick

function _OnMenuClick(url) {
    if (onLoad) {
        onLoad = false;
        window.location.href = url;
    } else {
        notificacion('Transacción en proceso, espere un momento ... ');
    }
}

//Funciones Generales - Front End

function _disabledEnabledButton(_button, _disabled, _class) {
    if (stringToBoolean(_disabled)) {
        _button.removeClass('');
    }
}

// Notificaciones



function notificacion(message) {

    $.notifyDefaults({
        placement: {
            from: "bottom",
            align: "center",
        },
        animate: {
            enter: "animated fadeInUp",
            exit: "animated fadeOutDown"
        }
    });

    $.notify({
        icon: '',
        title: 'Banco Pichincha',
        message: message
    }, {
        type: 'minimalist',
        delay: 3000,
        icon_type: 'image',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} " role="alert" style="background-color:#FFFFFF">' +
            '<img data-notify="icon" class="img-circle pull-left">' +
            '<span data-notify="title" style="color:#0062AE">{1}</span>' +
            '<span data-notify="message" style="color:#000000">{2}</span>' +
        '</div>'
    });
}


function __ShowInformation(message) {
    var modal = $('#ModalMessage');
    modal.modal('show');
    $('#DivMessage').html('<h4>' + message + '</h4>');

}

function __ShowError(message) {
    var modal = $('#ModalError');
    modal.modal('show');
    $('#messageModalError').html('<h4>' + message + '</h4>');
}

function __ShowProcessing(message) {
    var modal = $('#ModalLoading');
    modal.modal('show');
    $('#messageModalLoading').html('<h4>' + message + '</h4>');
}


function stringToBoolean(string) {
    if (typeof string === "undefined") {
        console.log("stringToBoolean Undefined Error");
        return false;
    }
    if (typeof string === "boolean") return string;
    switch (string.toLowerCase()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return false;
    }
}

$.fn.isBound = function (type, fn) {
    //var data = this.data('events')[type];
    var data = jQuery._data(this[0], 'events')[type];
    if (data === undefined || data.length === 0) {
        return false;
    }

    return -1 !== $.inArray(fn, data);
}