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
$(".btnNavegacionMobile").on("click", function () {
    $("#bs-example-navbar-collapse-1").toggleClass('container_menu_mobile--active');
});

$(".cambiar_img").on("click", function () {
    $('.image_picker_selector .thumbnail').removeClass('selected');

    var ruta = $('#idLogoUsuario').attr('src');
    $('.image_picker_selector img[src="' + ruta + '"]').parent().addClass('selected');

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

// MENU PC 

$(".btnUserInfo").on("click", function () { // hola
    $(".header-bienvenida").toggleClass("menu-mobile--apear");
});

$('.collapsible').collapsible({
    // accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
});

//FUNCION DEL DESPLIEGUE DEL MENU PRINCIPAL
$(".menu_Inicio").on("click", function () {
    $(this).addClass('active_menu');
    //hide tooltips
    $(".container_overlight").fadeOut("fast");
    $(".container_tooltip_ayuda, .container__popoverdrag").removeClass("config__visible ayuda__toolActive");

    $(".container__tooltip-alias").hide();

    $(".container_menu").addClass('container_menu--extendOpen');
    $(".container_menu--extend").addClass('container_menu--Open');

    $(".container_menu").removeClass('container_menu--extendClose');
    $(".container_menu").removeClass('container_menu--Close');

    setTimeout(function () {
        $(".menu_Inicio").hide();
        $(".menu__Inicio2").show();
    }, 600);
});


//PELOTA MAGICA DEL MENÚ EN QUE NECESITAS
var $menuNav = $(".menu__Open");
if ($("body").hasClass("detalleProductos")) {
    $menuNav.children().removeClass("current_page_item");
    $menuNav.find(".tutito").addClass("current_page_item");
}




//FUNCIONES POPOVER MENU HEADER
$(".icon_editar").on("click", function () {
    var parent = $(this).parent();
    parent.find("#txtAlias").val(parent.find("#alias_menu").text());
    $(".icon_editar + .modificar__alias").fadeToggle('pop_active');
    $(".container_overlight_menu").toggle();
});

$(".container_overlight_menu").on("click", function () {
    $(".modificar__alias").fadeOut();
    $(".container_overlight_menu").fadeOut();
    var texto_toolt = $(".container-buenasTardes .texto_toolt");
    var dataName = texto_toolt.attr("data-name");
    texto_toolt.text(dataName);
});

//OCULTAR POPOVER
$(".volver_popover").on("click", function () {
    $("#txtAlias").removeClass("ErrorFormulario-transferencias");
    $("#txtalias").removeClass("error_campos");
    $(".modificar__alias").fadeOut();
    $(".container_overlight").fadeOut();
    $(".container_overlight_menu").fadeOut();
    var texto_toolt = $(this).parent().parent().find(".texto_toolt");
    var dataName = texto_toolt.attr("data-name");
    if (texto_toolt.attr("type")) {
        texto_toolt.val(dataName);
    }
    else {
        texto_toolt.text(dataName);
    }
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
    $("#alias_menu").text(value);
});

$(".container_alias_gastos .tool_alias input").keyup(function () {
    var value = $(this).val();
    $(".container_alias_gastos .texto_toolt").text(value);
}).keyup();

$(".alias__prestamos .tool_alias input").keyup(function () {
    var value = $(this).val();
    $(".alias__prestamos .texto_toolt").text(value);
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
$(".prestamos_alias").keyup(function () {
    var value = $(this).val();
    $(this).parent().prev().prev().text(value);
}).keyup();


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

$(".cuenta__menu").on("click", function () {
    //$(".menu_inicio")
    //    .slideToggle("fast")
    //    .siblings(".container__subMenu")
    //    .hide();


    //hide tooltips
    $(".container_overlight").fadeOut("fast");
    $(".container_tooltip_ayuda, .container__popoverdrag").removeClass("config__visible ayuda__toolActive");

    $(".container__tooltip-alias").hide();
});

$(".tarjetas__menu").on("click", function () {
    $(".menu__tarjetas")
        .slideToggle("fast")
        .siblings(".container__subMenu")
        .hide();


    //hide tooltips
    $(".container_overlight").fadeOut("fast");
    $(".container_tooltip_ayuda, .container__popoverdrag").removeClass("config__visible ayuda__toolActive");

    $(".container__tooltip-alias").hide();
});


$(".prestamos__menu").on("click", function () {
    $(".menu__prestamos")
        .slideToggle("fast")
        .siblings(".container__subMenu")
        .hide();

    //hide tooltips
    $(".container_overlight").fadeOut("fast");
    $(".container_tooltip_ayuda, .container__popoverdrag").removeClass("config__visible ayuda__toolActive");

    $(".container__tooltip-alias").hide();
});


$(".transferencias__menu").on("click", function () {
    $(".menu_transferencias")
        .slideToggle("fast")
        .siblings(".container__subMenu")
        .hide();

    //hide tooltips
    $(".container_overlight").fadeOut("fast");
    $(".container_tooltip_ayuda, .container__popoverdrag").removeClass("config__visible ayuda__toolActive");

    $(".container__tooltip-alias").hide();
});


$(".seguros__menu").on("click", function () {
    $(".menu__seguros")
        .slideToggle("fast")
        .siblings(".container__subMenu")
        .hide();

    //hide tooltips
    $(".container_overlight").fadeOut("fast");
    $(".container_tooltip_ayuda, .container__popoverdrag").removeClass("config__visible ayuda__toolActive");

    $(".container__tooltip-alias").hide();
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

$(document).ready(function () {
    if ($(window).width() > 767) {
        resize_menudesktop();
    } else {
        resize_menumobile();
    }
});

function resize_menudesktop() {
    //desktop
    console.log("desktop");
    $("nav .navbar-nav li").each(function () {
        var classUl = $(this).attr("id");
        $("nav .navbar-nav li ul").hide();
        //$(this).click(function () {
        //    return false;
        //});
        $(this).mouseover(function () {
            $("nav .navbar-nav li ul").hide();
            $("nav .navbar-nav li ul." + classUl).show();
        });

        $(this).mouseout(function () {
            $("nav .navbar-nav li ul." + classUl).hide();
        });

        $("nav .navbar-nav li ul").mouseover(function () {
            $("nav .navbar-nav li ul." + classUl).show();
        });
    });

    $("nav .navbar-nav li ul").mouseout(function () {
        $("nav .navbar-nav li ul").hide();
    });
}


function resize_menumobile() {
    //mobile
    console.log("mobile");
    $("nav .navbar-nav li").each(function () {
        var classUl = $(this).attr("id");
        //$("nav .navbar-nav li ul").hide();
        $(this).click(function () {
            return true;
        });
        $(this).mouseover(function () {
            return false;
            //$("nav .navbar-nav li ul").hide();
            //$("nav .navbar-nav li ul." + classUl).show();
        });

        $(this).mouseout(function () {
            //$("nav .navbar-nav li ul").hide();
            //$("nav .navbar-nav li ul." + classUl).show();
            return false;
        });

        $("nav .navbar-nav li ul").mouseover(function () {
            return false;
            //$("nav .navbar-nav li ul." + classUl).show();
        });

        $("nav .navbar-nav li ul").mouseout(function () {
            return false;
            //$("nav .navbar-nav li ul." + classUl).show();
        });
    });
}