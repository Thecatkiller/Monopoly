
var pathname = window.location.pathname; // Returns path only
var url = window.location.href;


(function () {

  'use strict';

  // define variables



  var items = document.querySelectorAll(".timeline li");

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();


$(function(){


	//CONTADOR DE CARACTERES TEXTAREA
	var max_chars = 0;

    $('#max').html(max_chars);

    $('#comment').keyup(function() {
        var chars = $(this).val().length;
        var diff = max_chars + chars;
        $('#contador').html(diff);
    });







	//INCLUIR FROMULARIO PÁGINAS INTERNAS
    $(".hero__tarjetasFormInputsContainer").load(varURL + "/View/Security/formulario-interna.html", function () {
		$(".dni").focus();
		$(".ruc, .dni").numeric();
		//$('select').material_select();
		$('[data-select="select"] select').material_select(function () {
		    $('input.select-dropdown').trigger('close');
		});
		//validacion RUC DNI
		$("body").on("change", "#select_validacion", function () {	 
			if( $(this).val() == 1 ){
				$(".boton_dni").show();
				$(".boton_ruc").hide();
				$(".dni").show().focus();
				$(".ruc").hide();
				$("#ruc__internas-error").hide();
			}
			else{
				$("#dni__internas-error").hide();
				$(".boton_ruc").show();
				$(".boton_dni").hide();
				$(".dni").hide();
				$(".ruc").show().focus();;
			}
		});

		//VALIDACION FORMULARIO INTERNAS
		$( "#internasForm" ).validate( {

			messages: {
		    dni__internas: "Ingresa un DNI válido",
		    ruc__internas: "Ingresa un RUC válido"
		  },
			highlight: function ( element, errorClass, validClass ) {
				$(element).addClass('error_form');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('error_form');
			}
		});


	});

	//INCLUIR SIDEBAR
    $(".sidebar__help").load(varURL + "/Content/html/sidebar__help.html", function(){
		
		//SELECT MATERIALIZE
	  $('select').material_select();
		
		var $help = $("div.help__iconsContainer"),
				$helpCajaTextos = $("div.help__hover"),
				$helpClose = $(".help__close"),

				//ICONOS
				$helpIconBanca = $("div.help__iconBanca"),
				$helpIconHablemos = $("div.help__iconHablemos"),
				$helpIconChat = $("div.help__iconChat"),
				$helpIconOficinas = $("div.help__iconOficinas"),
				$helpIconTarifas = $("div.help__iconTarifas"),

				//ITEMS
				$helpItemBanca = $("li.help__hoverItemBanca"),
				$helpItemHablemos = $("li.help__hoverItemHablemos"),
				$helpItemChat = $("li.help__hoverItemChat"),
				$helpItemOficinas = $("li.help__hoverItemOficinas"),
				$helpItemTarifas = $("li.help__hoverItemTarifas"),

				//CAJAS DE AYUDA
				$helpCaja = $(".help__caja"),
				$helpCajaBanca = $(".help__bancaInternet"),
				$helpCajaChat = $(".help__chatEnLinea"),
				$helpCajaHablemos = $(".help__hablemos"),
				$helpCajaOficinas = $(".help__oficinas"),
				$helpCajaTarifas = $(".help__tarifas"),
				$helpOverlay = $(".help__overlay"),
				$helpDni = $("input.help__dni");


		
		//HOVER QUE HACE APARECER CAJA CON TEXTOS DE AYUDA
		$help
			.mouseenter(function(){
				if ($helpCaja.is(":visible")){
				}else{
					$helpCajaTextos.fadeIn("fast")
				}
			})
			.mouseleave(function(){
				$helpCajaTextos.fadeOut("fast")
			});




		//HOVER Y CLICK EN ÍCONO BANCA	
		$helpIconBanca
			.mouseenter(function(){
				$helpItemBanca.addClass("help__hoverItemMove")
			})

			.mouseleave(function(){
				$helpItemBanca.removeClass("help__hoverItemMove")
			})

			.click(function(){
				$(".bancaInternet__contenedor").fadeOut("fast");
				$(".bancaInternet__open").hide();
				$(".bancaInternet").show();
				$(".tuty").fadeOut("fast");
				$helpOverlay.show();
				$helpCajaTextos.fadeOut("fast");
				$helpCajaBanca.fadeIn("fast", function(){
					var $that = $(this);
					$that.find($helpDni).focus();
					$that.siblings(".help__caja").fadeOut("fast");
					$helpClose.click(function(){
						$that.fadeOut("fast");
						$helpOverlay.hide();
						$(".help_clock_mobile").removeClass("visibleclock");
					});
				});
			});






		//HOVER Y CLICK EN ÍCONO HABLEMOS	
		$helpIconHablemos
			.mouseenter(function(){
				$helpItemHablemos.addClass("help__hoverItemMove")
			})
			.mouseleave(function(){
				$helpItemHablemos.removeClass("help__hoverItemMove")
			})
			.click(function(){
				$(".bancaInternet__contenedor").fadeOut("fast");
				$(".bancaInternet__open").hide();
				$(".bancaInternet").show();
				$(".tuty").fadeOut("fast");
				$helpOverlay.show();
				$helpCajaTextos.fadeOut("fast");
				$helpCajaHablemos.fadeIn("fast", function(){
					var $that = $(this);
					console.log($that);
					$that.siblings(".help__caja").fadeOut("fast");
					$helpClose.click(function(){
						$that.fadeOut("fast");
						$helpOverlay.hide();
						$(".help_clock_mobile").removeClass("visibleclock");
					});
				});
			});








		//HOVER Y CLICK EN ÍCONO CHAT	
		$helpIconChat
			.mouseenter(function(){
				$helpItemChat.addClass("help__hoverItemMove")
			})
			.mouseleave(function(){
				$helpItemChat.removeClass("help__hoverItemMove")
			})
			.click(function(){
				$(".bancaInternet__contenedor").fadeOut("fast");
				$(".bancaInternet__open").hide();
				$(".bancaInternet").show();
				$(".tuty").fadeOut("fast");
				$helpOverlay.show();
				$helpCajaTextos.fadeOut("fast");
				$helpCajaChat.fadeIn("fast", function(){
					var $that = $(this);
					$that.find($helpDni).focus();
					$that.siblings(".help__caja").fadeOut("fast");
					$helpClose.click(function(){
						$that.fadeOut("fast");
						$helpOverlay.hide();
						$(".help_clock_mobile").removeClass("visibleclock");
					});
				});
			});








		//HOVER Y CLICK EN ÍCONO OFICINAS
		$helpIconOficinas
			.mouseenter(function(){
				$helpItemOficinas.addClass("help__hoverItemMove")
			})
			.mouseleave(function(){
				$helpItemOficinas.removeClass("help__hoverItemMove")
			})
			.click(function(){
				$(".bancaInternet__contenedor").fadeOut("fast");
				$(".bancaInternet__open").hide();
				$(".bancaInternet").show();
				$(".tuty").fadeOut("fast");
				$helpOverlay.show();
				$helpCajaTextos.fadeOut("fast");
				$helpCajaOficinas.fadeIn("fast", function(){
					var $that = $(this);
					console.log($that);
					$that.siblings(".help__caja").fadeOut("fast");
					$helpClose.click(function(){
						$that.fadeOut("fast");
						$helpOverlay.hide();
						$(".help_clock_mobile").removeClass("visibleclock");
					});
				});
			});








		//HOVER Y CLICK EN ÍCONO TARIFAS
		$helpIconTarifas
			.mouseenter(function(){
				$helpItemTarifas.addClass("help__hoverItemMove")
			})
			.mouseleave(function(){
				$helpItemTarifas.removeClass("help__hoverItemMove")
			})
			.click(function(){
				$(".bancaInternet__contenedor").fadeOut("fast");
				$(".bancaInternet__open").hide();
				$(".bancaInternet").show();
				$(".tuty").fadeOut("fast");
				$helpOverlay.show();
				$helpCajaTextos.fadeOut("fast");
				$helpCajaTarifas.fadeIn("fast", function(){
					var $that = $(this);
					console.log($that);
					$that.siblings(".help__caja").fadeOut("fast");
					$helpClose.click(function(){
						$that.fadeOut("fast");
						$helpOverlay.hide();
						$(".help_clock_mobile").removeClass("visibleclock");
					});
				});
			});

				//ACORDEÓN CAJA TARIFAS
			$(".help__acordion").on("click", function(){

				$(this)
					.next()
					.slideToggle("fast");
				
				$(this)
					.find('i.icono-right')
					.toggleClass('giro__accordionx');
				
				$(this)
					.siblings(".help__acordion")
					.next(".help_container_detalle:visible")
					.fadeOut("fast")
					.prev()
					.children('.icono-right')
					.toggleClass('giro__accordionx');

			});

			$helpOverlay.click(function(){
				$(this).fadeOut("fast");
				$helpCaja.fadeOut("fast");
			})

		

			$(".help__telefono").numeric();

			

			//VALIDACIONES SIDEBAR
			$( "#MiBancaForm" ).validate( {
				messages: {
			    help__dni: "Ingresa unUsuario válido",
			    help__password: "Ingresa una Clave válida"
			  },
				highlight: function ( element, errorClass, validClass ) {
					$(element).addClass('error_form');
				},
				unhighlight: function (element, errorClass, validClass) {
					$(element).removeClass('error_form');
				}
			});

			$( "#HablemosForm" ).validate( {
				messages: {
			    help__telefono: "Ingresa un Nº de teléfono válido"
			  },
				highlight: function ( element, errorClass, validClass ) {
					$(element).addClass('error_form');
				},
				unhighlight: function (element, errorClass, validClass) {
					$(element).removeClass('error_form');
				}
			});

			$( "#ChatForm" ).validate( {
				messages: {
			    help__dni: "Ingresa un DNI válido",
			    help__name: "Debes ingresar un nombre"
			  },
				highlight: function ( element, errorClass, validClass ) {
					$(element).addClass('error_form');
				},
				unhighlight: function (element, errorClass, validClass) {
					$(element).removeClass('error_form');
				}
			});


	}) 
	//FIN LLAMADA SIDEBAR

	//SLIDER HOME
	$('.slider').slider({
		full_width: true,
		height: 340
	});

	$(".icono-navegacion-slider-right").click(function(){
		$('.slider').slider('next');
	})
	$(".icono-navegacion-slider-left").click(function(){
		$('.slider').slider('prev');
	})
	 

	//INCLUIR MENÚ MOBILE Y FUNCIONES 
	$(".header__mobile").load(varURL + "/Content/html/menu-mobile.html", function () {
		
		// menu mobile
		$(".mobile_menu").on("click", function(){
			$(".container__deplegable").toggleClass('menu__mobile--active');
			$(".tuty").fadeIn();
		});			
		$(".cerrar_mobile").on("click", function(){
			$(".container__deplegable").removeClass('menu__mobile--active');
			$(".tuty").fadeOut();
		});
		
		// Acordeón
		$('.collapsible').collapsible({
      accordion : false 
    });

    $(".submenu_mobileQueNecesitas").click(function(){
			$(this)
				.parent()
				.addClass("menu__mobile--left");

			$(this)
				.parent()
				.siblings(".submenu_mobileSubcat")
				.addClass("menu__mobile--right")


    })
    	
  

	});


	//INCLUIR HEADER Y FUNCIONES MENU ACTIVO
	$(".header").load(varURL + "/Content/html/header.html", function () {

		    $(".icon-clave-ojo").on("click", function(){
		    	$(this).hide();
		    	$(".icon-clave-ojo2").fadeIn();
		    	$(".teclado").attr("type", "text");
		    	setTimeout(function() {
		    		$(".teclado").attr("type", "password");
		    		$(".icon-clave-ojo").fadeIn();
		    		$(".icon-clave-ojo2").hide();
		    	}, 3000);
		    });

		    $(window).resize(function(){
		    	if( $(window).width() <= 992 ){
		    		$(".teclado").removeAttr("readonly");
		    	}
		    	else{
		    	    $(".teclado").attr("readonly", true);
		    	    $(".header").removeClass("header__hide");
		    	}
		    })


		    if( $(window).width() <= 992 ){
		    		$(".teclado").removeAttr("readonly");
		    	}
		

		// $(".bancaInternet__input").numeric();
		    $("#headerBanca__form").validate({
		        rules:{
		            Username: {
		                required: true,
		                minlength: 6
		            }
		        },
				messages: {
				    Username: {
				        required: "Ingresa tu usuario",
				        minlength: "Ingrese minimo 6 caracteres"
				    },
				    Password: "Ingresa tu clave digital"
			    },
				highlight: function ( element, errorClass, validClass ) {
					$(element).addClass('error_form');
				},
				unhighlight: function (element, errorClass, validClass) {
					$(element).removeClass('error_form');
				}
			});
	   	



	// FUNCION DEL MENU ACTIVE, ACCION DEL MENU ANIMACION
	 
		if ($(window).width() > 992 ) {
				setTimeout(function() {
				  $("#example-one").append("<li id='magic-line'></li>");
			   /* Cache it */
			   var $magicLine = $("#magic-line");
			 	 $el = $(".current_page_item a");
			   var $magicLine = $("#magic-line");
			   $magicLine
		       .width($el.parent().width())
		       .css("left", $el.position().left + ( $el.parent().width() /2 ) -3)
		       .data("origLeft", $magicLine.position().left)
		       .data("origWidth", $magicLine.width());
			       
			   $("#example-one li").find("a").hover(function() {
			       $el = $(this);
			       leftPos = $el.position().left + ( $el.parent().width() /2 ) -3;
			       newWidth = $el.parent().width();
			       
			       $magicLine.stop().animate({
		           left: leftPos,
		           width: newWidth
			       });
			   }, function() {
			       $magicLine.stop().animate({
		           left: $magicLine.data("origLeft"),
		           width: $magicLine.data("origWidth")
			       });    
			   }); 
			 }, 200);
			}


		//PELOTA MAGICA DEL MENÚ EN QUE NECESITAS
		var $menuNav = $(".menu__Open");
		if ($("body").hasClass("queNecesitas")) {
			$menuNav.children().removeClass("current_page_item");
			$menuNav.find(".cuenta").addClass("current_page_item");
		}



	    //Funciones del teclado digital
		$(".modal-ayuda").on("click", function () {
		    $('#modal-ayuda').modal({});
		});
		

		$(".teclado").on("click", function () {
		    $(".container-teclado").addClass("teclado-visible");
		    $(".teclado-visible-input").addClass("fondo__clave");
		});

		$(".teclado2").on("click", function () {
		    $(".container-teclado2").addClass("teclado-visible");
		    $(".teclado-visible-input2").addClass("fondo__clave");
		});

		$('[data-toggle="tooltip"]').tooltip();

	});





	//INCLUIR FOOTER
	$("#footerPie").load(varURL + "Content/html/footer.html");




	// SCROLL AMIMADO HACIA ARRRIBA
	function toBottom(){
		$('html, body')
		.animate({ scrollTop: $(document).height() }, 300);
		return false;
	}


  //BANCA INTERNET CLICK BOTÓN EN EL MENU
  $("body").on("click", ".bancaInternet", function(){
  	if ($("body").hasClass("home__b")) {
  		
  	}else{
	  	$(this).hide();
	  	$(".bancaInternet__open").fadeIn("fast");
	  	$(".bancaInternet__contenedor").fadeIn("fast").find(".input__focus").focus();
	  	$(".container__subMenu").removeClass("Visible_submenu");
	  	$(".menu__Open li a").removeClass('active__classMenu');
	  	$(".tuty").fadeIn("fast");
  	}
  })

  $("body").on("click", ".bancaInternet__open", function(){
  	$(this).hide();
  	$(".bancaInternet").fadeIn("fast");
  	$(".bancaInternet__contenedor").fadeOut("fast");
  	$(".tuty").fadeOut("fast");
  })



	//FUNCION ACTIVE MENU
	$("body").on("click", ".menu__Open li a", function(){
		// $(".menu__Open li a").removeClass('active__classMenu');
		$(this).toggleClass('active__classMenu');
		$(".bancaInternet__contenedor").fadeOut("fast");
		$(".bancaInternet__open").hide();
		$(".bancaInternet").show();
		$(".tuty").fadeOut("fast");
	});



	//FOOTER CLICK ICON MORE (+)
	$("body").on("click", ".footer__more", function(){
		$(this).toggleClass("footer__moreOpen");
		$(".footer__moreContainer").slideToggle("fast");
		toBottom();
	});

	//ACCORDEÓN
	function toggleChevron(e) {
  $(e.target)
	  .prev('.panel-heading')
	  .find(".icon-cruz")
	  .toggleClass('ratated__icon');


	}
	$('#accordion').on('hidden.bs.collapse', toggleChevron);
	$('#accordion').on('shown.bs.collapse', toggleChevron);
	$('#accordionFaq').on('hidden.bs.collapse', toggleChevron);
	$('#accordionFaq').on('shown.bs.collapse', toggleChevron);
	$('#accordionCob').on('hidden.bs.collapse', toggleChevron);
	$('#accordionCob').on('shown.bs.collapse', toggleChevron);
	$('#accordionBim').on('hidden.bs.collapse', toggleChevron);
	$('#accordionBim').on('shown.bs.collapse', toggleChevron);




	//CLICK EN OVERLAY DEL LOS SUBMENUS BOTONERA
	$("body").on("click", ".tuty", function(){
		if ($(window).width() > 992 ) {
			$(this).fadeOut("fast");
			$(".bancaInternet__contenedor").fadeOut("fast");
			$(".bancaInternet__open").hide();
			$(".bancaInternet").show();
			$(".container__subMenu").removeClass("Visible_submenu");
			$(".menu__Open li a").removeClass('active__classMenu');
		}else{
			$(this).fadeOut("fast");
	  	$(".header").removeClass("header__hide");
	   	$(".container__deplegable").removeClass("menu__mobile--active");
		}
	})



	//FUNCION MENU DESPLEGAR SUBMENU
	$("body").on("click", ".inicio__menu", function(){
		$(".menu_inicio").removeClass('Visible_submenu');
		$(".menu__tarjetas").removeClass('Visible_submenu');
		$(".menu__prestamos").removeClass('Visible_submenu');
		$(".menu_transferencias").removeClass('Visible_submenu');
		$(".menu__seguros").removeClass('Visible_submenu');
		$(".inicio__menu a").removeClass('active__classMenu');
		$(".tuty").hide();
	});
	$("body").on("click", ".cuenta__menu", function(){
		$(".menu_inicio").toggleClass('Visible_submenu');
		$(".menu__prestamos").removeClass('Visible_submenu');
		$(".menu_transferencias").removeClass('Visible_submenu');
		$(".menu__seguros").removeClass('Visible_submenu');
		$(".menu__tarjetas").removeClass('Visible_submenu');
		$(".tuty").fadeIn("fast");
	});
	$("body").on("click", ".tarjetas__menu", function(){
		$(".menu_inicio").removeClass('Visible_submenu');
		$(".menu__prestamos").removeClass('Visible_submenu');
		// $(".menu__tarjetas").addClass('Visible_submenu');
		$(".menu__seguros").removeClass('Visible_submenu');
		$(".menu_transferencias").removeClass('Visible_submenu');
		$(this).removeClass('active__classMenu');
		$(".menu__Open li a").removeClass('active__classMenu');
		$(".tuty").hide();
	});
	$("body").on("click", ".prestamos__menu", function(){
		$(".menu_inicio").removeClass('Visible_submenu');
		$(".menu__tarjetas").removeClass('Visible_submenu');
		$(".menu_transferencias").removeClass('Visible_submenu');
		$(".menu__seguros").removeClass('Visible_submenu');
		$(this).removeClass('active__classMenu');
		$(".menu__Open li a").removeClass('active__classMenu');
		$(".tuty").hide();
		// $(".menu__prestamos").addClass('Visible_submenu');
	});
	$("body").on("click", ".transferencias__menu", function(){
		$(".menu_inicio").removeClass('Visible_submenu');
		$(".menu__tarjetas").removeClass('Visible_submenu');
		$(".menu__prestamos").removeClass('Visible_submenu');
		$(".menu__seguros").removeClass('Visible_submenu');
		$(this).removeClass('active__classMenu');
		$(".menu__Open li a").removeClass('active__classMenu');
		$(".tuty").hide();
		// $(".menu_transferencias").addClass('Visible_submenu');
	});
	$("body").on("click", ".seguros__menu", function(){
		$(".menu_inicio").removeClass('Visible_submenu');
		$(".menu__tarjetas").removeClass('Visible_submenu');
		$(".menu__prestamos").removeClass('Visible_submenu');
		$(".menu_transferencias").removeClass('Visible_submenu');
		$(this).removeClass('active__classMenu');
		$(".menu__Open li a").removeClass('active__classMenu');
		$(".tuty").hide();
		// $(".menu__seguros").addClass('Visible_submenu');
	});

	//CLICK VER TODO CARACTERISTICA TARJETAS DECRËDITO
	$(".vertodo").click(function(){
		$(this).hide();
		$(".oculto").fadeIn("fast");
		$(".vermenos").show();
	})

	$(".vermenos").click(function(){
		$(this).hide();
		$(".oculto").fadeOut("fast");
		$(".vertodo").show();
	})


	//SELECT MATERIALIZE
  $('select').material_select();



	$(".container_items").on("click", function(){
		
		$(this)
			.next()
			.slideToggle("fast");
		
		$(this)
			.find('i.icono-right')
			.toggleClass('giro__accordion');
		
		$(this)
			.siblings(".container_items")
			.next(".container_detalle:visible")
			.fadeOut("fast")
			.prev()
			.children('.icono-right')
			.toggleClass('giro__accordion');

	});



  //BANCA INTERNET CLICK BOTÓN EN EL MENU MOBILE
  $("body").on("click", ".ingresoBanca_mobile", function(){
  	$(".header").addClass("header__hide")
  	.find("#dni_login").focus();
  	$(".tuty").fadeIn("fast");
  })

  $("body").on("click", ".close__banca", function(){
  	$(".header").removeClass("header__hide");
  	$(".tuty").fadeOut("fast");
  })


	//validacion RUC DNI
	$("#select_validacion").change(function () {	 
		if( $(this).val() == 1 ){
			$(".boton_dni").show();
			$(".boton_ruc").hide();
			$(".dni").show().focus();
			$(".ruc").hide();
			$("#ruc__home-error").hide();
		}
		else{
			$(".boton_ruc").show();
			$(".boton_dni").hide();
			$(".dni").hide();
			$(".ruc").show().focus();
			$("#dni__home-error").hide();
		}
	});

	//VALIDACION FORMULARIO HOME
	$( "#homeForm" ).validate( {
		messages: {
	    dni__home: "Ingresa un DNI válido",
	    ruc__home: "Ingresa un RUC válido"
	  },
		highlight: function ( element, errorClass, validClass ) {
			$(element).addClass('error_form');
		},
		unhighlight: function (element, errorClass, validClass) {
			$(element).removeClass('error_form');
		}
	});


	//validacion de formulario contacto
	$( "#contactoFormulario" ).validate( {
		rules: {
            select1: {
                selectcheck: true
            },
            select2: {
                selectcheck: true
            },
            select3: {
                selectcheck: true
            },
            select4: {
                selectcheck: true
            },
            select5: {
                selectcheck: true
            },
            select6: {
                selectcheck: true
            },
            select7: {
                selectcheck: true
            },
            select8: {
                selectcheck: true
            },
            select9: {
                selectcheck: true
            }
        },
		highlight: function ( element, errorClass, validClass ) {
			$(element).addClass('error_form');
		},
		unhighlight: function (element, errorClass, validClass) {
			$(element).removeClass('error_form');
		}
	});

	jQuery.validator.addMethod('selectcheck', function (value) {
        return (value != '0');
    }, "year required");
	


	$(".dni").focus();
	$(".ruc, .dni").numeric();


	///////// SWIPE TABLAS EN MOBILE //////////
	$("body").on("click", ".swipe", function(){
		$(this).fadeOut("fast").parent(".tableContenedor").css("overflow", "auto");
	})


	//SLIDER INMOBILIARIO
	$('#Inmobiliario').find('.slider').slider("pause");


});
    //validacion de formularios solo caracteres espesificos
	//$('.numeros').validCampoFranz('1234567890');
	//$('.letras').validCampoFranz('qwertyuiopasdfghjklñzxcvbnmáéíóú');
