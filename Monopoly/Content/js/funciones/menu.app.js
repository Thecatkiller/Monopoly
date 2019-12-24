// -----------------------------------------------------//
// FUNCIONES SOLO DEL MENU CON LAS INTERACCIONES
// PROPIAS COMO EL ALIAS DESPLEGAR CADA ELEMENTO DEL MENU
// EFECTO RODAR MENU PARA MOSTRAR MENU
// EFECTO AGREGAR FOTO DE PERFIL
// -----------------------------------------------------//

jQuery.extend(jQuery.easing,
   {
       easeInOutMaterial: function (x, t, b, c, d) {
           if ((t /= d / 2) < 1) return c / 2 * t * t + b;
           return c / 4 * ((t -= 2) * t * t + 2) + b;
       }
   });

//CARGA DEL HEADER
$(".cerrarHover").click(function (e) {
    e.preventDefault();
    $(this)
 		.parent()
 		.addClass("abajox")
 		.delay(1000).queue(function () {
 		    $(this).removeClass("abajox");
 		});
})


/*** MENU MOBILE **/

$(".header__mobileHamburgerMenuContenedor").on("click", function () {
    $(".container_menu_mobile").toggleClass('container_menu_mobile--active');
    $(".container_overlight3").fadeIn();
});

$(".menu_deplegable i").on("click", function () {
    $(".container_menu_mobile").toggleClass('container_menu_mobile--active');
    $(".container_overlight3").fadeOut();
    $(".collapsible-header").removeClass("active");
    $(".collapsible-body").hide();
});

$(".cambiar_img").on("click", function () {
    $(".editar__fotoPerfil, .container_overlight")
        .fadeToggle();
});

$(".container_overlight").on("click", function () {
    $(this).fadeOut("fast");
});


$(".select select").change(function () {
    if ($(this).val() == "opcion-5") {
        $(".telefono").attr("disabled", true);
    } else {
        $(".telefono").attr("disabled", false);
    }
})



$(".menu-kebab").click(function () {
    $(".container__menu-mobile").addClass("menu-mobile--apear");
})

$(".cerrarDatos").click(function () {
    $(".container__menu-mobile").removeClass("menu-mobile--apear");
})



// MENU PC 

$('.collapsible').collapsible({
    // accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
});

if ($(window).width() > 992) {
    setTimeout(function () {
        $("#example-one").append("<li id='magic-line'></li>");
        /* Cache it */
        var $magicLine = $("#magic-line");
        $el = $(".current_page_item a");
        var $magicLine = $("#magic-line");

        $magicLine
        .width($el.parent().width())
        //.css("left", $el.position().left + ($el.parent().width() / 2) - 3)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());

        $("#example-one li").find("a").hover(function () {
            $el = $(this);
            leftPos = $el.position().left + ($el.parent().width() / 2) - 3;
            newWidth = $el.parent().width();

            $magicLine.stop().animate({
                left: leftPos,
                width: newWidth
            });
        }, function () {
            $magicLine.stop().animate({
                left: $magicLine.data("origLeft"),
                width: $magicLine.data("origWidth")
            });
        });
    }, 100);
}


//PELOTA MAGICA DEL MENÚ EN QUE NECESITAS
var $menuNav = $(".menu__Open");
if ($("body").hasClass("detalleProductos")) {
    $menuNav.children().removeClass("current_page_item");
    $menuNav.find(".tutito").addClass("current_page_item");
}




//FUNCIONES POPOVER MENU HEADER
$(".icon_editar").on("click", function () {
    $(".icon_editar + .modificar__alias").fadeToggle('pop_active');
});
//OCULTAR POPOVER
$(".volver_popover").on("click", function () {
    $(".modificar__alias").fadeOut();
    $(".container_overlight").fadeOut();
    $(".container_overlight_menu").fadeOut();
    
    var texto_toolt = $(this).parent().parent().find(".texto_toolt");
    var dataName = texto_toolt.attr("data-name");
    texto_toolt.text(dataName);

});
//VALIDACION BASICA DE CAMPO DE ALIAS PARA CUANDO ESTA VACIO
$(".boton-alias").on("click", function () {
    if ($(".modificar__alias input").val() == "") {
        $(".modificar__alias input").addClass("error_campos");
    }
    else {
        $(this).parent().fadeOut();
        $(".modificar__alias input").removeClass("error_campos");
        $(".container_overlight").fadeOut();
    }
});


//FUNCION CLONAR CAMPOS DE ALIAS
$(".container-buenasTardes .modificar__alias input").keyup(function () {
    var value = $(this).val();
    $("#alias_menu").val(value);
}).keyup();

$(".container_alias_gastos .tool_alias input").keyup(function () {
    var value = $(this).val();
    $(".texto_toolt").text(value);
}).keyup();

$(".alias__prestamos .tool_alias input").keyup(function () {
var value = $(this).val();
$(".texto_toolt").text(value);
}).keyup();

$(".icon-flecha-right.up");

var goUp = $('#back-top');
if (goUp.length) {
    var scrollTrigger = 75, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {           
                goUp.addClass('show');
               
            } else {
                goUp.removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    goUp.on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });
}

//tooltip prestamo
//$(".prestamos_alias").keyup(function () {
//    var value = $(this).val();
//    $(this).parent().prev().prev().text(value);
//}).keyup();





//ACCION DEL ENTER EN EL FORMULARIO DEL MENU ALIAS
$(".modificar__alias input").keypress(function (event) {
    if (event.which == 13) {
        event.preventDefault();
        if ($(".modificar__alias input").val() == "") {
            $(".modificar__alias input").addClass("error_campos");
        }
        else {
            $(".modificar__alias").fadeOut();
            $(".modificar__alias input").removeClass("error_campos");
        }
    }
});
$(".tool_alias a input").keypress(function (event) {
    if (event.which == 13) {
        event.preventDefault();
        if ($(".modificar__alias input").val() == "") {
            $(".modificar__alias input").addClass("error_campos");
        }
        else {
            $(".tool_alias").removeClass("error_campos");
            $(".container_overlight").fadeOut();
            $(".tool_alias").fadeOut();
        }
    }
});



//FUNCION DEL DESPLIEGUE DEL MENU PRINCIPAL
$(".menu_Inicio").on("click", function () {
    $(this).addClass('active_menu');
    $(".container_menu").addClass('container_menu--extendOpen');
    $(".container_menu--extend").addClass('container_menu--Open');

    $(".container_menu").removeClass('container_menu--extendClose');
    $(".container_menu").removeClass('container_menu--Close');

    setTimeout(function () {
        $(".menu_Inicio").hide();
        $(".menu__Inicio2").show();
        $el = $(".current_page_item a");
        var $magicLine = $("#magic-line");
        $magicLine
    .width($el.parent().width())
    //.css("left", $el.position().left + ($el.parent().width() / 2) - 3)
    .data("origLeft", $magicLine.position().left)
    .data("origWidth", $magicLine.width());
    }, 600);
});


$(".menu__Inicio2").on("click", function () {
    $(this).parent().addClass('container_menu--extendClose');
    $(this).parent().next().removeClass('container_menu--Close');

    $(this).parent().removeClass('container_menu--extendOpen');
    $(this).parent().next().removeClass('container_menu--Open');
    $(".container__subMenu").hide();
    $(".container_overlight3").fadeOut("fast");
    $("ul.menu__Open li").find("a").removeClass('active__classMenu');
    setTimeout(function () {
        $(".menu_Inicio").show();
        $(".menu__Inicio2").hide();
    }, 100);
});



//FUNCION ACTIVE MENU
$("ul.menu__Open li").find("a").click(function () {

    $(".container_overlight3").fadeToggle(function () {
        if ($(".container__subMenu").is(":visible")) {
            $(".container_overlight3").show();
        } else {
            $(".container_overlight3").hide();
            $(".menu__Open li a").removeClass("active__classMenu");
        }
    });

    $("ul.menu__Open li").find("a").removeClass('active__classMenu');

    $(this).addClass('active__classMenu');

});



//FUNCION MENU DESPLEGAR SUBMENU
$(".cuenta__menu").on("click", function () {
    $(".menu_inicio")
        .slideToggle("fast")
        .siblings(".container__subMenu")
        .hide();
});


$(".tarjetas__menu").on("click", function () {
    $(".menu__tarjetas")
        .slideToggle("fast")
        .siblings(".container__subMenu")
        .hide();
});


$(".prestamos__menu").on("click", function () {
    $(".menu__prestamos")
        .slideToggle("fast")
        .siblings(".container__subMenu")
        .hide();
});


$(".transferencias__menu").on("click", function () {
    $(".menu_transferencias")
        .slideToggle("fast")
        .siblings(".container__subMenu")
        .hide();
});


$(".seguros__menu").on("click", function () {
    $(".menu__seguros")
        .slideToggle("fast")
        .siblings(".container__subMenu")
        .hide();
});

$(".container_overlight3").on("click", function () {
    $(this).fadeOut();
    $(".container__subMenu").slideUp();
    $(".menu__Open li a").removeClass("active__classMenu");
});
//CERRAR POPOVER CON LA CRUZ DEL CAMBIAR IMAGEN DE PERFIL
$(".cerrar_popover").on("click", function () {
    $(".editar__fotoPerfil").fadeToggle();
});


