//funcion para hacer aparecer en la pagina de pago-tarjeta.html en la seccion
//de importe a pagar otros monto
$(".OtrosMontos").on("click", function () {
    $(".ingresoOtro--monto").fadeIn();
});
$(".pagosFijos").on("click", function () {
    $(".ingresoOtro--monto").fadeOut();
});


//validacion de formulario
$("#NuevoCelularFormulario").validate({
    rules: {
        numberMobile: "required",
        //alias: "required",
    },
    messages: {
        numberMobile: "Debes ingresar un número celular válido",
        //alias: "Debes ingresar un alias"
    },

    highlight: function (element, errorClass, validClass) {
        $(element).addClass('ErrorFormulario-transferencias');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('ErrorFormulario-transferencias');
    }
});

$("#selecttest").validate();

//funcion degirar icono de la tabla
$(document).on("click", ".slide_tr", function (flechita) {
    $(this).next().toggle();
    $(this).children(flechita).children('i').toggleClass('rotateIcon');
});

//cuenta destino
$('#accordion').collapse({
    toggle: true
})


//tooltip cuenta importe
$('.tooltipped').tooltip({ delay: 50 });



//select
//$('[data-select="select"] select').material_select(function () {
//    $('input.select-dropdown').dropdown();
//});
//select
$('[data-select="select"] select').material_select(function () {
    $('input.select-dropdown').trigger('close');
});

var onMouseDown = function (e) {
    // preventing the default still allows the scroll, but blocks the blur.
    // We're inside the scrollbar if the clientX is >= the clientWidth.
    if (e.clientX >= e.target.clientWidth || e.clientY >= e.target.clientHeight) {
        e.preventDefault();
    }
};
$('[data-select="select"] select').siblings('input.select-dropdown').on('mousedown', onMouseDown);


$("[name='origen']").on("click", function () {
    // $(".transferencias_inmediatas").fadeOut("fast");
    if ($(".cuentas_importe").is(":checked")) {
        $(".cuentas_importe").attr("checked", false);
    }
})


//FUNCION CHECKED CUENTA ORIGEN A CUENTA DESTINO
$("[name='origen'], [name='origen01'], [name='origen03']").on("click", function () {
    if ($(this).is(":checked")) {
        $(".container_box-destinos").fadeIn("fast");
        $(this).parent().parent().addClass("active_checked");
        $(this).parent().parents().siblings().removeClass("active_checked");
        // $(this).parent().parents().parent().parent().children('ul').children('li').removeClass("active_checked");
        $(".Destinos").fadeOut("fast");
    }
    else {
        $(".container_box-destinos").fadeOut("fast");
    }
});

//check recarga celular
$(".CheckedCelularCuenta").on("click", function () {
    $(".continuar__botonCelular").addClass('recargaCelular');
});

//FUNCION CHECKED CUENTA DESTINO A CUENTA IMPORTE Y DESCRIPCIÓN 
$("[name='destino']").on("click", function () {

    if ($(this).is(":checked")) {
        $(".transferencias_inmediatas").fadeIn("fast");
        $(this).parent().parent().addClass("active_checked");
        $(this).parent().parent().siblings().removeClass("active_checked");
    }
    else {
        $(".transferencias_inmediatas").fadeOut("fast");
    }
});

$(".radioOrigin").click(function () {
    _OnLoadCardSelectAccount();
    $(".CajaTres").fadeIn("fast");
});

// scroll en los tabs del acordeon que contiene una tabla en el dashboard inicial
(function ($) {
    $(window).on("load", function () {
        $(".tabs_tablas").mCustomScrollbar({
            setHeight: 228,
            theme: "dark",
            advanced: { autoExpandHorizontalScroll: true }

        });




        /*$(".listado_accordion").mCustomScrollbar({
			setHeight:189,
			theme:"dark"
		});*/

        $(".listados_deudas_vencidas").mCustomScrollbar({
            setHeight: 260,
            theme: "dark"
        });

        $(".listado_cuentas_origenes").mCustomScrollbar({
            setHeight: 313,
            theme: "dark"
        });


    });
})(jQuery);

$('.importe_input-valor').number(true, 2);
//$('.importe_input').number( true, 2 );
$('.format-number').number(true, 2);


function activarBoton() {
    // if( $( ".importe_input" ).val().length > 0 && $("[name='cuentas_importe']").is(":checked")){
    if ($(".importe_input").val().length > 0) {

        $(".continuar__boton")
			//.addClass('siguiente__pasos--active')
			.removeClass('disabled_boton-general');
    }
    else {
        $(".continuar__boton")
			.removeClass('siguiente__pasos--active')
			.addClass('disabled_boton-general');
    }

}

function validaCheck() {
    if ($("[name='cuentas_importe']").is(":checked")) {
        $(".transferencias_inmediatas")
			.find("header")
			.css("background", "#FEFAC4");
    }
    else {
        $(".transferencias_inmediatas")
			.find("header")
			.css("background", "red");
    }
}



$("[name='cuentas_importe']").click(function () {
    activarBoton();
    // validaCheck();	
});

//Comentado solo para transferencias
// TODO: MMAV

//$( ".importe_input" ).on({
//	keyup: function(){
//		activarBoton();
//		if ($(this).val() != "") {
//			$(this).css("border-color", "#666")
//		}
//	},
//	blur: function(){
//		activarBoton();
//		// validaCheck();
//		if ($(this).val() == "") {
//			$(this).css("border-color", "red")
//		}else{
//			$(this).css("border-color", "#666")
//		}
//	}

//});





$(".apagar").keyup(function () {
    if ($(this).val().length < 1) {
        $(".CajaTres").fadeOut("fast")
    }
    else {
        $(".CajaTres").fadeIn("fast")
    }
});




// validacion pago tarjetas
$("[name='origen03']").on("click", function () {
    if ($(this).is(":checked")) {
        $(".continuar__boton")
			.addClass('siguiente__pasos--active')
			.removeAttr('disabled', false);
    }
    else {
        $(".continuar__boton")
			.removeClass('siguiente__pasos--active')
			.attr('disabled', true);

    }
});

//VALIDACION FORMULARIO CUENTA IMPORTE
//$(".importe_input").numeric();
$(".numero_noti").numeric();
$(".onlyNumber").numeric();



$(".nuemeroCuentaDestino").keyup(function () {
    if ($(".nuemeroCuentaDestino").val().length == 12) {
        $(".destinoSeleccionado").fadeIn();
    }
    else {
        $(".destinoSeleccionado").fadeOut();
    }
});
//cancelar seleccionado
$(".Seleccionado").on("click", function () {
    $(".DestinatarioSeleccionado").hide();
    $(".transferencias_inmediatas").hide();
    $(".BuscarContactos").fadeIn();
});

$(".boton_accionesSiguientes").on("click", function () {
    if ($(".emaildesTinatario").val() == "") {
        $('.modal-nuevo-destinatario').modal('hide');
        $(".BuscarContactos").hide();
        $(".DestinatarioSeleccionado").fadeIn();
        $(".transferencias_inmediatas").fadeIn();
    }
    else {
        // Expresion regular para validar el correo
        var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        // Se utiliza la funcion test() nativa de JavaScript
        if (regex.test($('.emaildesTinatario').val().trim())) {
            $(".emaildesTinatario").removeClass('ErrorFormulario-transferencias');
            $('.modal-nuevo-destinatario').modal('hide');
            $(".BuscarContactos").hide();
            $(".DestinatarioSeleccionado").fadeIn();
            $(".transferencias_inmediatas").fadeIn();
        } else {
            $(".emaildesTinatario").addClass('ErrorFormulario-transferencias');
        }
    }

});
//modal de nueva cuenta
$(".boton_NuevaCuentas").on("click", function () {


    $(".campo").each(function () {
        if ($(this).val() == "") {
            $(this).addClass('ErrorFormulario-transferencias');
        }
        else {
            $(this).removeClass('ErrorFormulario-transferencias');
        }
    });

    if ($(".campo").val() == "") {
        $(".ExitoCuentaCorrecta").fadeOut();
    }
    else {

        $(".ExitoCuentaCorrecta").fadeIn();
    }

});

$(".campofinal").keyup(function () {
    if ($(".campofinal").val().length == 2) {
        $(".otroctanuevo").fadeIn();
    }
    else {
        $(".otroctanuevo").fadeOut();
    }
});

//campofinalnuevo
$(".campofinalnuevo").keyup(function () {
    if ($(".campofinalnuevo").val().length == 2) {
        $(".ctanuevo").fadeIn();
    }
    else {

        $(".ctanuevo").fadeOut();
    }
});


$(".destinatarios_buscar").keyup(function () {

    if ($(".tt-dropdown-menu").is(":visible")) {
        $(".container_overlight3").fadeIn("fast");
    }
    else {
        $(".container_overlight3").fadeOut("fast");
    }

});

//pagos de servicios
$(".checkAll").change(function () {
    $("input:checkbox").prop('checked', $(this).prop("checked"));
});
$(".checkImportePagar").on("click", function () {
    $(this).parent().parent().parent().toggleClass('campoSelectedImporte');
});
$(".OrigenPagos").on("click", function () {
    $(".continuar__boton").addClass("siguiente__pasos--active")
    $(".continuar__boton").removeClass('disabled_boton-general');
});
$(".pagoServicios").on("click", function () {
    //window.location.assign("confirmar-pago-servicios-pagos.html");
});




$(".selectCuentasOrigenes").change(function () {
    if ($(this).val() == 2) {
        $(".CuentasGastosSlect").show();
        //$(".selectCuentasOrigenes").hide();
        $(".continuar__boton").addClass('siguiente__pasos--active');
    }
});


//destino prestamo terceros
$(".campoPrestamoDestinatario").on("keyup", function () {
    if ($(this).val().length == 8) {
        $(".SeleccionTicket").fadeIn();
    }
    else {
        $(".SeleccionTicket").fadeOut();
    }
});

//Secuencia recarga celular
$(".ListadoAliasCelular").on("click", function () {
    $(".CamposRecarga").fadeIn();
});
$(".montoRecarga").on("keyup", function () {
    if ($(".montoRecarga").val().length >= 1) {
        //$(".listadoCuentasCelular").fadeIn();
    }
    else {
        $(".listadoCuentasCelular").fadeOut();
    }
});


//TECLADO ACTUALIZACION DE DATOS PERSONALES

$(".teclado").on("click", function () {
    $(".container-teclado").addClass("teclado-visible");
    $(".teclado-visible-input").addClass("fondo__clave");
});

$(".teclado").click(function () {
    showKeyboardNumber($('#keyboard'));
});
$('body').on('click', '#keyboard li', function () {
    /*validateForm();*/
});



//modal recibos a pagar
$(".boton_modalPagos").on("click", function () {
    $(".container_box-destinos").fadeIn();
});
$(".boton_modalPagos").on("click", function () {
    $(".listadosPagos").fadeIn();
    $(".seleccionPagos").hide();
});
$(".cerrarCuentaPagar").on("click", function () {
    $(this).parent().parent().hide();
    $(this).parent().parent().prev().show();
    $(this).parent().parent().prev().children().children('#test6').removeAttr('checked');
    $(".container_box-destinos").fadeOut();
    $(".Destinos").fadeOut();
    $(".detalleCuentasSeleccionadas").fadeOut();
    $(".pagoServicios").removeClass('siguiente__pasos--active');
    $('[type="checkbox"]').removeAttr('checked');
    $('[name="origen"]').removeAttr('checked');
    $(".tabla_importePagar tr").removeClass("campoSelectedImporte");
    $(".listado_cuentas_origenes .OrigenPagos p input").removeAttr('checked');
});

// FUNCION DE IMPORTE A PAGAR TARJETAS
$(".valorPagoTarjeta").keyup(function () {
    if ($(this).val().length > 0) {
        $(".valorPagoTarjeta").parent().parent().parent().addClass('boxActive');
        $(".listadoCuentasCelular").fadeIn();
    }
    else {
        $(".valorPagoTarjeta").parent().parent().parent().removeClass('boxActive');
        $(".listadoCuentasCelular").fadeOut();
    }
});


// FUNCION DE IMPORTE A PAGAR TARJETA DINERS
$(".valorPagoTarjeta").keyup(function () {
    if ($(this).val().length > 0) {
        $(".valorPagoTarjeta").parent().parent().parent().addClass('boxActive');
        $(".CajaTres").fadeIn();
    }
    else {
        $(".valorPagoTarjeta").parent().parent().parent().removeClass('boxActive');
        $(".CajaTres").fadeOut();
    }
});

//FUNCION PAGAR TARJETAS
$(".prestamosListadosSinPagar").on("click", function () {
    $(".pagoDiners").removeClass('boxActive');
    $(".importePagarCuentas").fadeIn("fast");
    $(".importePagarDiners").hide();
    $(".serviciosTarjeta").fadeIn("fast");
    $(".importePagarTarjeta, .CajaTres").hide();
    $(".ServiciosPagostarjeta").hide();
});


//FUNCION PAGAR TARJETA DINNERS
$(".prestamosListadosSinPagarDiners").on("click", function () {
    $(".valorPagoTarjeta").val("");
    $(".importePagarCuentas").hide();
    $(".importePagarDiners").fadeIn("fast");
    $(".serviciosTarjeta").fadeIn("fast");
    $(".importePagarTarjeta, .CajaTres").hide();
    $(".ServiciosPagostarjeta").hide();
});


$(".cuentasDiners").on("click", function () {
    $(".continuar__botonCelular").removeAttr('disabled');
});
$(".continuarDiners").on("click", function () {
    window.location.assign("confirmar-pagos-tarjeta-diners.html");
});


$(".numerico").numeric();


$(".cerrarCuentaPagarNueva").click(function () {
    $(".transferencias_inmediatas").fadeOut("fast");
})










