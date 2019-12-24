
console.log('Homebanking 2017 - Functions: Library.ls cargada... ');

var re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var re_celular = /^9[0-9]{8}$/;

// Configuración JQUERY AJAX --

$.ajaxSetup({ cache: false });

var objDialog;

$(document).ajaxStart(function () {
    
    /*
        Incluir configuración AJAX
    */

});

$(document).ajaxSend(function (event, xhr, options) {
    //console.log('begin Ajax SEND... ');
    //console.log(event);
    //console.log(xhr);
    //console.log(options);
})

$(document).ajaxComplete(function (event, request, set) {
    console.log('Homebanking 2017 - Request complete. ');
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


//Funciones Generales - Front End

function _disabledEnabledButton(_button, _disabled, _class)
{
    if (stringToBoolean(_disabled))
    {
        _button.removeClass('');
    }
}

//
function __ShowInformation(message)
{
    var modal = $('#ModalMessage');
    modal.modal('show');
    $('#DivMessage').html('<h4>' +  message + '</h4>');

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

