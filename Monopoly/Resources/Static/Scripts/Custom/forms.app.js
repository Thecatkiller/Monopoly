

// -----------------------------------------------------//
//FUNCION DE COMPOENENTES DE FORMULARIOS COMO 
//CHECKBOX
//RADIOS
//VALIDACIONES ETC
// -----------------------------------------------------//


$(document).ready(function() {
	//FILTROS
	//$(".buscar_movimientos").on("click", function(){
	//	$(".container_filtros_tabs_tabs").slideToggle();
	//	$(".tabs_enviar").hide();
	//});

	////$(".enviar_accordion").on("click", function(){
	////	$(".tabs_enviar").slideToggle();
	////	$(".container_filtros_tabs_tabs").hide();
	////});

	//$(".enviar_email").on("click", function(){
	//	$(".tabs_enviar").slideToggle();
	//});

	//$(".enviar__estado-cuenta").on("click", function(){
	//	$(".tabs_enviar--estado-de-cuenta").slideToggle();
	//});

	//$(".volver_click").on("click", function(){
	//	$(".container_filtros_tabs_tabs").slideToggle();
	//});

	//$(".atras_email").on("click", function(){
	//	$(".tabs_enviar").slideToggle();
	//});

    /* Esto ocasiona problemas con las validaciones de campos de texto, ya que el evento responde en la mayoria de vistas.
    $(".boton_edit").on("click", function () {
		if( $(".input_filtros").val() == "" ){
			$(".input_filtros").addClass('error_campo');
		}
		else{
			$(".input_filtros").removeClass('error_campo');
		}
	});
	*/

	/*$(".slide_tr").on("click", function(){
		$(this).next().toggle();
	});*/


	//TOOLTIP 
    $(".tooltip_cuenta").on("click", function () {

		$(".tooltip_numero-cuenta").fadeToggle();
		$(".container_overlight").toggle();
	});

    //SHOW OPTION SELECT 
    var $s1 = $('#select1').change(change);
    var $s2 = $('#select2a').change(change);
    var $s3 = $('#select3').change(change);

    function change(){
    $('.container_box_form').toggle($s1.val() == '1' && $s2.val() == '1' && $s3.val() == '1')
    };

    $('#select1').change(function(){
    	if( $('#select1').val() == 1 ){
    		$(this).parent().parent().removeClass('off_selec');
    		$('#select2a').parent().parent().removeClass('off_selec');

    	}
    	else{
    		$(this).parent().parent().addClass('off_selec');
    			$('#select2a').parent().parent().addClass('off_selec');
    	}
    });
    $('#select2a').change(function(){
    	if( $('#select2a').val() == 1 ){
    		$(this).parent().parent().removeClass('off_selec');
    		$('#select3').parent().parent().removeClass('off_selec');
    	}
    	else{
    		$(this).parent().parent().addClass('off_selec');
    		$('#select3').parent().parent().addClass('off_selec');
    	}
    });
    $('#select3').change(function(){
    	if( $('#select3').val() == 1 ){
    		$(this).parent().parent().removeClass('off_selec');
    	}
    	else{
    		$(this).parent().parent().addClass('off_selec');
    	}
    });


	$( ".tabla_noti .twitterc" ).click(function() {
		if( $( ".tabla_noti .twitterc" ).is(":checked") ){
			$(".btn_abono4").addClass('active-td')
		}
		else{
			$(".btn_abono4").removeClass('active-td')
		}	
	});

	$( ".tabla_noti .facebookc" ).click(function() {
		if( $( ".tabla_noti .facebookc" ).is(":checked") ){
			$(".btn_abono3").addClass('active-td')
		}
		else{
			$(".btn_abono3").removeClass('active-td')
		}	
	});

	$( ".tabla_noti .smsc" ).click(function() {
		if( $( ".tabla_noti .smsc" ).is(":checked") ){
			$(".btn_abono2").addClass('active-td')
		}
		else{
			$(".btn_abono2").removeClass('active-td')
		}	
	});

	$( ".tabla_noti .emailc" ).click(function() {
		if( $( ".tabla_noti .emailc" ).is(":checked") ){
			$(".btn_abono").addClass('active-td')
		}
		else{
			$(".btn_abono").removeClass('active-td')
		}	
	});




	$( ".table_center .check_center input" ).click(function() {
		if( $( ".table_center .check_center input" ).is(":checked") ){
			$(".guarda-gen2")
				.addClass('active_color')
				.click(function(){
					$("html, body").animate({ scrollTop: 0 }, "slow");
  					// return false;
					$(".datos-exito")
						.fadeIn("fast")
						.delay(5000)
						.fadeOut("fast")
				})
		}		
		else{
			$(".guarda-gen2").removeClass('active_color')
		}	
	});



    //MOSTRAR BOTON ELIMINAR MENSAJES
    $(function(){
    $('.tabla_mensaje input[type=checkbox].one').change(function(){
        if($('.tabla_mensaje input[type=checkbox].one:checked').length > 0){
         $(".bottom_tools").show();   
    }
    else {
         $(".bottom_tools").hide()   
    }
    });
    });


    //ACTIVA BOTON ENVIAR CORDENADA
	$("#test").keyup(function(){
		if( $("#test").val().length == 4 ){
			$(".guarda-gen").addClass("active__boton--siguiente")
		}
		else{
			$(".guarda-gen").removeClass("active__boton--siguiente")
		}
	})



    //ACTIVA BOTON ENVIAR CLAVE OTP
	$("#claveOTP").keyup(function () {
	    if ($("#claveOTP").val().length == 6) {
	        $(".guarda-gen").addClass("active__boton--siguiente")
	    }
	    else {
	        $(".guarda-gen").removeClass("active__boton--siguiente")
	    }
	})




	//TOOLTIP 
	$(".tooltip__cuentas--open").on("click", function(){
		$(".tooltip_numero-cuenta_bancario").fadeToggle();
		$(".container_overlight").toggle();
	});


	//slect cuenta
	$(".select_cuentas").on("click", function(){
		$(".container_overlight").toggle();
	})


});

$(".EmpresaIngresada").keyup(function(){
	if( $(this).val().length > 1 ){
		//alert("1")
		$('.select-dropdown').removeAttr('disabled', false);
	}
	else{
		$('[name="servicio"]').attr('disabled', true);
	}
});


$(function  () {
	/** select **/
    $('.selectpicker').material_select();
	// drag an drop

 	if ($(window).width() <= 768) {
 	    //$(".drag").disableSelection();
 	    //$(".drag2").disableSelection();
 	    //$(".drag3").disableSelection();
 	    //$(".drag4").disableSelection();
 	    //$(".drag5").disableSelection();
 	} else {
 	    $('.selectpicker').material_select();
 	    // drag an drop
 	    $(".drag").sortable({
 	        group: '.drag',
 	        serialize: function (parent, children, isContainer) {
 	            return isContainer ? children.join() : parent.text();
 	        },
 	        tolerance: 6,
 	        distance: 10
 	    });
 	    $(".drag2").sortable({
 	        group: '.drag',
 	        serialize: function (parent, children, isContainer) {
 	            return isContainer ? children.join() : parent.text();
 	        },
 	        tolerance: 6,
 	        distance: 10
 	    });
 	    
 	    $(".drag3").sortable({
 	        group: '.drag',
 	        serialize: function (parent, children, isContainer) {
 	            return isContainer ? children.join() : parent.text();
 	        },
 	        tolerance: 6,
 	        distance: 10
 	    });
 	    $(".drag4").sortable({
 	        group: '.drag',
 	        serialize: function (parent, children, isContainer) {
 	            return isContainer ? children.join() : parent.text();
 	        },
 	        tolerance: 6,
 	        distance: 10
 	    });
 	    $(".drag5").sortable({
 	        group: '.drag',
 	        serialize: function (parent, children, isContainer) {
 	            return isContainer ? children.join() : parent.text();
 	        },
 	        tolerance: 6,
 	        distance: 10
 	    });

 	}



});


//accordion
function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".icon-cruz")
        .toggleClass('ratated__icon');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);


//slider home
$('.slider').slider({
	Indicators: true,
	Height: 100,
	Transition: 1000000
});

//VALIDACION FORMULARIO MIS MENSAJES
$( ".formValidate" ).validate( {
	highlight: function ( element, errorClass, validClass ){
		$(element).addClass('ErrorFormulario-transferencias');
	},
	unhighlight: function (element, errorClass, validClass){
		$(element).removeClass('ErrorFormulario-transferencias');
	}
});


//formulario de actualizacion de datos personales
$( "#validateFormDatos" ).validate( {
	rules: {
	    EMAIL: {
			required: true
		},
	    EMAIL_REPEAT: {
			required: true
			//equalTo: "#EMAIL"
	    },
	    PHONE_WORK: {
	        number: true
	    },
	    PHONE_HOME:{
	        number: true
        }

	},
	messages: {
	    PHONE_WORK: "",
	    MOBILE: "",
	    COMMENTS: "",
	    PHONE_HOME: "",
	    EMAIL: ""
	},

	highlight: function ( element, errorClass, validClass ) {
		$(element).addClass('ErrorFormulario-transferencias');
	},
	unhighlight: function (element, errorClass, validClass) {
		$(element).removeClass('ErrorFormulario-transferencias');
	}
});

$(".numero_noti").keyup(function(){
    if ($(".keyCampo").length) {
        if ($(".keyCampo").val().length > 1) {
            $(".siguiente_actualizacion").addClass('continuarActualizarDatos');
            $(".siguiente_actualizacion").attr("disabled", false);
            $(".tecladoActualizarDatos").fadeIn();
        }
        else {
            $(".siguiente_actualizacion").removeClass('continuarActualizarDatos');
            $(".siguiente_actualizacion").attr("disabled", true);
            $(".tecladoActualizarDatos").fadeOut();
        }
    }
});

