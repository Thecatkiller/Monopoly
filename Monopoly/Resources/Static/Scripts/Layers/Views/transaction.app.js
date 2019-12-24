/// Inicializar Controles

$("#Codigo").material_select();

$(".calendario__select").datepicker({
    format: "dd/mm/yyyy",
    show: true
});




$(".calendario__select2").datepicker({
    format: "dd/mm/yyyy",
    show: true,
});


/// Eventos sobre el icono calendario

$(".icon-calendario").on("click", function () {
    $(".calendario__select").datepicker({
        format: "dd/mm/yyyy",
       
        show: true,
    });
});

$(".icon-calendario2").on("click", function () {
    $(".calendario__select2").datepicker({
        format: "dd/mm/yyyy",
        show: true,
    });
});

/// Eventos Movimientos

$(document).on("click", ".buscar_movimientos", function () {
//$(".buscar_movimientos").on("click", function () {
    $(".container_filtros_tabs_tabs").slideToggle();
    $(".tabs_enviar").hide();
});



$(document).on("click", ".enviar_accordion", function () {
    $(".tabs_enviar").slideToggle();
    $(".container_filtros_tabs_tabs").hide();
});

$(document).on("click", ".enviar_email", function () {
    $(".tabs_enviar").slideToggle();
});

$(document).on("click", ".volver_click", function () {
    $(".container_filtros_tabs_tabs").slideToggle();    
});


$(document).on("click", ".atras_email", function () {
    $(".tabs_enviar").slideToggle();
});


//$(".descargar").on("click", function () {
//    $(this).next(".tool_descargar").fadeToggle('pop_active');
//    $(".container_overlight").toggle();
//});/*29/01/18*/

$(document).on('hidden.bs.modal', function (event) {
    if ($('.modal:visible').length) {
        $('body').addClass('modal-open');
    }
});