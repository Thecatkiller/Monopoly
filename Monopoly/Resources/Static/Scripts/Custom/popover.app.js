

// -----------------------------------------------------//
//ESTA HOJA DE JAVASCRIPT (CON LA LIBRERIA JQUERY) PERMITE
//HACER APARECER LOS TOOLTIP Y LOS POPOVER DEL SITIO 
//PRIVADO
// -----------------------------------------------------//


//FUNCION CERRAR TOOLTIP AYUDA EN LA SECCION DE MI DINERO
$(".tooltip_pregunta1").on("click", function(){
	$(".tooltippregunta1").toggleClass('ayuda__toolActive');
	$(".container_overlight").toggle();
	$(".preguntas").toggleClass('Zindex__popover');
});
$(".tooltip_pregunta2").on("click", function(){
	$(".tooltippregunta2").toggleClass('ayuda__toolActive');
	$(".container_overlight").toggle();
	$(".preguntas").toggleClass('Zindex__popover');
});
$(".tooltip_pregunta3").on("click", function(){
	$(".tooltippregunta3").toggleClass('ayuda__toolActive');
	$(".container_overlight").toggle();
	$(".preguntas").toggleClass('Zindex__popover');
});
$(".tooltip_pregunta4").on("click", function(){
	$(".tooltippregunta4").toggleClass('ayuda__toolActive');
	$(".container_overlight").toggle();
	$(".preguntas").toggleClass('Zindex__popover');
});

//FUNCION CERRAR POPOVER OVERLIGHT
$(".container_overlight").on("click", function () {
    var texto_toolt = $(".container_alias_gastos .texto_toolt");
    var dataName = texto_toolt.attr("data-name");
    texto_toolt.text(dataName);

    if ($(".drag_dinero").hasClass('config__visible') == true) {
        document.getElementById("drag_dinero").reset();
        $(".drag_dinero").removeClass('config__visible');
        $(".drag_dinero").removeClass('Zindex__popover');
        return false;
    }
    if ($(".drag_dinero2").hasClass('config__visible') == true) {
        document.getElementById("drag_dinero2").reset();
        $(".drag_dinero2").removeClass('config__visible');
        $(".drag_dinero2").removeClass('Zindex__popover');
        return false;
    }
    if ($(".drag_dinero3").hasClass('config__visible') == true) {
        document.getElementById("drag_dinero3").reset();
        $(".drag_dinero3").removeClass('config__visible');
        $(".drag_dinero3").removeClass('Zindex__popover');
        return false;
    }
    $(".tooltippregunta1").removeClass('ayuda__toolActive');
    $(".tooltippregunta2").removeClass('ayuda__toolActive');
    $(".tooltippregunta3").removeClass('ayuda__toolActive');
    $(".tooltippregunta4").removeClass('ayuda__toolActive');
    $(".preguntas").removeClass('Zindex__popover');








    $(".editar__fotoPerfil").fadeOut();
    $(".tool_descargar").fadeOut();
    $(".tool_alias").fadeOut();
    $(".tool_trea").fadeOut();
    $(".tool_descargar").fadeOut();
    $(".tooltip_numero-cuenta").fadeOut();
    $(".toolconteiner").fadeOut();
    $(".toolconteiner_prestamos").fadeOut();
    $(".credito__tooltips").fadeOut();
    $(".tooltip_numero-cuenta_bancario").fadeOut();
    $(".container_tooltip_actualizar").removeClass('config__visible');
    $(".container_tooltip_actualizar").removeClass('Zindex__popover');


});
//cerrar popover cambio de foto
$(".cerrar_popover").on("click", function(){
	$(this).parent().hide();
	$(".container_overlight").hide();
});

//FUNCION CERRAR EL TOOLTIP DE DRAG AND DROP DE MI DINERO  1
$(".container__configIcon .icon_drag1").on("click", function(){
	$(".drag_dinero").toggleClass('config__visible');
	$(".container_overlight").toggle();
	$(".drag_dinero").addClass('Zindex__popover');
});
//cerrar drag an drop
$(".cerrar_drag").on("click", function(){
	$(this).parent().removeClass('config__visible');
	$(".container_overlight").fadeOut();
	$(".drag_dinero").removeClass('Zindex__popover');
});

$(".no__aplicar").on("click", function(){
	$(this).parent().parent().removeClass('config__visible');
	$(".container_overlight").fadeOut();
	$(".drag_dinero").removeClass('Zindex__popover');
});


//FUNCION CERRAR EL TOOLTIP DE DRAG AND DROP DE MI DINERO  2
$(".container__configIcon .icon-drag2").on("click", function(){
	$(".drag_dinero2").toggleClass('config__visible');
	$(".container_overlight").toggle();
	$(".drag_dinero2").addClass('Zindex__popover');
});
//cerrar drag an drop
$(".cerrar_drag").on("click", function(){
	$(this).parent().removeClass('config__visible');
	$(".container_overlight").fadeOut();
	$(".drag_dinero2").removeClass('Zindex__popover');
});

$(".no__aplicar").on("click", function(){
	$(this).parent().parent().removeClass('config__visible');
	$(".container_overlight").fadeOut();
	$(".drag_dinero2").removeClass('Zindex__popover');
});


//FUNCION CERRAR EL TOOLTIP DE DRAG AND DROP DE MI DINERO  2
$(".container__configIcon .icon-drag3").on("click", function(){
	$(".drag_dinero3").toggleClass('config__visible');
	$(".container_overlight").toggle();
	$(".drag_dinero3").addClass('Zindex__popover');
	$(".drag_dinero3").fadeIn();    
});
//cerrar drag an drop
$(".cerrar_drag").on("click", function(){
	$(this).parent().removeClass('config__visible');
	$(".container_overlight").fadeOut();
	$(".drag_dinero3").removeClass('Zindex__popover');
});

$(".no__aplicar").on("click", function(){
	$(this).parent().parent().removeClass('config__visible');
	$(".container_overlight").fadeOut();
	$(".drag_dinero3").removeClass('Zindex__popover');
});


//FUNCION CERRAR EL TOOLTIP DE DRAG AND DROP DE MI DINERO  2
$(".container__configIcon .icon-drag4").on("click", function(){
	$(".drag_dinero4").toggleClass('config__visible');
	$(".container_overlight").toggle();
	$(".drag_dinero4").addClass('Zindex__popover');
});
//cerrar drag an drop
$(".cerrar_drag").on("click", function(){
	$(this).parent().removeClass('config__visible');
	$(".container_overlight").fadeOut();
	$(".drag_dinero4").removeClass('Zindex__popover');
});

$(".no__aplicar").on("click", function(){
	$(this).parent().parent().removeClass('config__visible');
	$(".container_overlight").fadeOut();
	$(".drag_dinero4").removeClass('Zindex__popover');
});
//FUNCION CERRAR EL TOOLTIP DE DRAG AND DROP DE MI DINERO  2
$(".container__configIcon .icon-drag5").on("click", function(){
	$(".drag_dinero5").toggleClass('config__visible');
	$(".container_overlight").toggle();
	$(".drag_dinero5").addClass('Zindex__popover');
});
//cerrar drag an drop
$(".cerrar_drag").on("click", function(){
	$(this).parent().removeClass('config__visible');
	$(".container_overlight").fadeOut();
	$(".drag_dinero5").removeClass('Zindex__popover');
});

$(".no__aplicar").on("click", function(){
	$(this).parent().parent().removeClass('config__visible');
	$(".container_overlight").fadeOut();
	$(".drag_dinero5").removeClass('Zindex__popover');
});



// tooltip prestamos
//$(".tooltip__detalle").click(function(){
//	$(".toolconteiner").fadeToggle("fast");
//})
//$(".tooltip__detalle2").click(function(){
//	$(".toolconteiner_prestamos").fadeToggle("fast");
//})


/**alias editar detalle de productos*/
$(".container_datos_cuentas .alias_cuenta_gastos").on("click", function(){
    var parent = $(this).parent();
    parent.parent().find("#txtalias").val(parent.find(".texto_toolt").attr("data-name"));
    $(".tool_alias").fadeToggle('pop_active');
	$(".container_overlight").toggle();
});

//$(".alias_cuenta_gastos").on("click", function(){
// 	$(".container_overlight").toggle();
// });

$(".volver__alias").on("click", function(){
	$(".credito__tooltips").fadeOut();
	$(".container_overlight").hide();
});

/* Tooltips TREA*/
$(".trea").on("click", function(){
	$(".tool_trea").fadeToggle('pop_active');
	$(".container_overlight").toggle();
});

//POPOVER ACTUALIZAR
$(".actualizar_icon").on("click", function(){
    $(".container_tooltip_actualizar").toggleClass('config__visible Zindex__popover');
	$(".container_overlight").toggle();
});

//select acalendario
/*$(".container_container_select").on("click", function(){
	$(".container_listado_dropdown").slideToggle();
})*/

//$(document).on("click", ".container_container_select", function () {
//    $(".container_listado_dropdown").slideToggle();
//});

//$(".descargar").on("click", function(){
//	$(this).next(".tool_descargar").fadeToggle('pop_active');
//	$(".container_overlight").toggle();
//});






