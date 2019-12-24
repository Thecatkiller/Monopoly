	//INCLUIR SIDEBAR
	$(".sidebar__help").load("sidebar__help.html", function(){
		
		
		//SELECT MATERIALIZE
	  $('.help__select').material_select();
		
		var $help = $("div.help__iconsContainer"),
				$helpCajaTextos = $("div.help__hover"),
				$helpClose = $(".help__close"),
				$fotoPerfil = $(".editar__fotoPerfil"),
				$overlay = $(".container_overlight"),

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
				$fotoPerfil.fadeOut("fast");
				$overlay.fadeOut("fast");
				$helpOverlay.show();
				$helpCajaTextos.fadeOut("fast");
				$helpCajaBanca.fadeIn("fast", function(){
					var $that = $(this);
					$that.find($helpDni).focus();
					$that.siblings(".help__caja").fadeOut("fast");
					$helpClose.click(function(){
						$that.fadeOut("fast");
						$helpOverlay.hide();
					});
				});

				setTimeout(function(){
					$($helpCajaBanca).addClass("timeout");

					contador();
				}, 5000)
			});

		$(".seguirConectado").click(function () {
			    $($helpCajaBanca).removeClass("timeout");
			    $(".help__bancaInternet-timeOut").fadeOut("fast", function () {
			        $(".help__bancaInternet-timeOut").fadeIn("fast");
			    });

			})

			$(".help__bancaInternet-timeOut").find(".help__close").click(function(){
				$($helpCajaBanca).removeClass("timeout");
	
			})

		var contador = function(){
			var fiveSeconds = new Date().getTime() + 59000;
			$(".bancaInternet__segundos").countdown(fiveSeconds, {elapse: true})
			 .on('update.countdown', function(event) {
			   var $this = $(this);
			   if (event.elapsed) {
			     $this.html(event.strftime('<span>Sesión expirada</span>'));
			   } else {
			     $this.html(event.strftime('%S'));
			   }
			 });	
		}



		//HOVER Y CLICK EN ÍCONO HABLEMOS	
		$helpIconHablemos
			.mouseenter(function(){
				$helpItemHablemos.addClass("help__hoverItemMove")
			})
			.mouseleave(function(){
				$helpItemHablemos.removeClass("help__hoverItemMove")
			})
			.click(function(){
				$fotoPerfil.fadeOut("fast");
				$overlay.fadeOut("fast");
				$helpOverlay.show();
				$helpCajaTextos.fadeOut("fast");
				$helpCajaHablemos.fadeIn("fast", function(){
					var $that = $(this);
					console.log($that);
					$that.siblings(".help__caja").fadeOut("fast");
					$helpClose.click(function(){
						$that.fadeOut("fast");
						$helpOverlay.hide();
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
				$fotoPerfil.fadeOut("fast");
				$overlay.fadeOut("fast");
				$helpOverlay.show();
				$helpCajaTextos.fadeOut("fast");
				$helpCajaChat.fadeIn("fast", function(){
					var $that = $(this);
					$that.find($helpDni).focus();
					$that.siblings(".help__caja").fadeOut("fast");
					$helpClose.click(function(){
						$that.fadeOut("fast");
						$helpOverlay.hide();
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
				$fotoPerfil.fadeOut("fast");
				$overlay.fadeOut("fast");
				$helpOverlay.show();
				$helpCajaTextos.fadeOut("fast");
				$helpCajaOficinas.fadeIn("fast", function(){
					var $that = $(this);
					console.log($that);
					$that.siblings(".help__caja").fadeOut("fast");
					$helpClose.click(function(){
						$that.fadeOut("fast");
						$helpOverlay.hide();
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
				$fotoPerfil.fadeOut("fast");
				$overlay.fadeOut("fast");
				$helpOverlay.show();
				$helpCajaTextos.fadeOut("fast");
				$helpCajaTarifas.fadeIn("fast", function(){
					var $that = $(this);
					console.log($that);
					$that.siblings(".help__caja").fadeOut("fast");
					$helpClose.click(function(){
						$that.fadeOut("fast");
						$helpOverlay.hide();
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

		

			$(".help__dni, .help__telefono, .numero_noti").numeric();

			

			//VALIDACIONES SIDEBAR
			$( "#MiBancaForm" ).validate( {
				messages: {
			    help__dni: "Ingresa un DNI válido",
			    help__password: "Ingresa una contraseña válida"
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
			
			$( "#NuevoCelularFormulario" ).validate( {
				messages: {
                numberMobile: "Debes ingresar un número celular válido",
			    //alias: "Debes ingresar un alias"
			  },
				highlight: function ( element, errorClass, validClass ) {
					$(element).addClass('error_form');
				},
				unhighlight: function (element, errorClass, validClass) {
					$(element).removeClass('error_form');
				}
			});



			
			// fade in #back-top
			/*$(function () {
				$(window).scroll(function () {
					if ($(this).scrollTop() > 100) {
						$('#back-top').fadeIn();
					} else {
						$('#back-top').fadeOut();
					}
				});
			});*/

	}) 
	//FIN LLAMADA SIDEBAR