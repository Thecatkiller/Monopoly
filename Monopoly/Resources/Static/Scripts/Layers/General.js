function validarFechas() {
    var fechaInicio = $(".fecha_nac-dp1").val();
    fechaInicio = fechaInicio.substr(3, 2) + '/' + fechaInicio.substr(0, 2) + '/' + fechaInicio.substr(6, 4);
    $(".fecha_nac-dp1").attr('readonly', true);
    var fechaInicioDate = new Date(fechaInicio);
    fechaInicioDate = fechaInicioDate.getTime();
    var fechaFin = $(".fecha_nac-dp2").val();
    fechaFin = fechaFin.substr(3, 2) + '/' + fechaFin.substr(0, 2) + '/' + fechaFin.substr(6, 4);
    $(".fecha_nac-dp2").attr('readonly', true);
    var fechaFinDate = new Date(fechaFin);
    fechaFinDate = fechaFinDate.getTime();
    if (fechaInicioDate > fechaFinDate) {
        __ShowInformation('Por favor, ingresar una fecha válida.');
        return false;
    }
    else {
        return true;
    }


}

function validarFechasE() {
    var fechaInicio = $(".fecha_nac-dp1E").val();
    fechaInicio = fechaInicio.substr(3, 2) + '/' + fechaInicio.substr(0, 2) + '/' + fechaInicio.substr(6, 4);
    $(".fecha_nac-dp1E").attr('readonly', true);
    var fechaInicioDate = new Date(fechaInicio);
    fechaInicioDate = fechaInicioDate.getTime();
    var fechaFin = $(".fecha_nac-dp2E").val();
    fechaFin = fechaFin.substr(3, 2) + '/' + fechaFin.substr(0, 2) + '/' + fechaFin.substr(6, 4);
    $(".fecha_nac-dp2E").attr('readonly', true);
    var fechaFinDate = new Date(fechaFin);
    fechaFinDate = fechaFinDate.getTime();
    if (fechaInicioDate > fechaFinDate) {
        __ShowInformation('Por favor, ingresar una fecha válida.');
        return false;
    }
    else {
        return true;
    }


}

function validarFechasTA() {
    var fechaInicio = $(".fecha_nac-dp1TA").val();
    fechaInicio = fechaInicio.substr(3, 2) + '/' + fechaInicio.substr(0, 2) + '/' + fechaInicio.substr(6, 4);
    $(".fecha_nac-dp1TA").attr('readonly', true);
    var fechaInicioDate = new Date(fechaInicio);
    fechaInicioDate = fechaInicioDate.getTime();
    var fechaFin = $(".fecha_nac-dp2TA").val();
    fechaFin = fechaFin.substr(3, 2) + '/' + fechaFin.substr(0, 2) + '/' + fechaFin.substr(6, 4);
    $(".fecha_nac-dp2TA").attr('readonly', true);
    var fechaFinDate = new Date(fechaFin);
    fechaFinDate = fechaFinDate.getTime();
    if (fechaInicioDate > fechaFinDate) {
        __ShowInformation('Por favor, ingresar una fecha válida.');
        return false;
    }
    else {
        return true;
    }
}

function validarFechasCH() {
    var fechaInicio = $("#fecha1").val();
    fechaInicio = fechaInicio.substr(3, 2) + '/' + fechaInicio.substr(0, 2) + '/' + fechaInicio.substr(6, 4);
    $("#fecha1").attr('readonly', true);
    var fechaInicioDate = new Date(fechaInicio);
    fechaInicioDate = fechaInicioDate.getTime();
    var fechaFin = $("#fecha2").val();
    fechaFin = fechaFin.substr(3, 2) + '/' + fechaFin.substr(0, 2) + '/' + fechaFin.substr(6, 4);
    $("#fecha2").attr('readonly', true);
    var fechaFinDate = new Date(fechaFin);
    fechaFinDate = fechaFinDate.getTime();
    if (fechaInicioDate > fechaFinDate) {
        __ShowInformation('Por favor, ingresar una fecha válida.');
        return false;
    }
    else {
        return true;
    }
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

(function (a) { a.fn.validCampoFranz = function (b) { a(this).on({ keypress: function (a) { var c = a.which, d = a.keyCode, e = String.fromCharCode(c).toLowerCase(), f = b; (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault() } }) } })(jQuery);