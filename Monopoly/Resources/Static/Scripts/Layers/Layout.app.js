/// Disabled Reload

function disableF5(e) { if ((e.which || e.keyCode) == 154 || (e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 123) e.preventDefault(); };
var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (r) { var t, e, o, n, a, i, c, h = "", f = 0; for (r = Base64._utf8_encode(r) ; f < r.length;) t = r.charCodeAt(f++), e = r.charCodeAt(f++), o = r.charCodeAt(f++), n = t >> 2, a = (3 & t) << 4 | e >> 4, i = (15 & e) << 2 | o >> 6, c = 63 & o, isNaN(e) ? i = c = 64 : isNaN(o) && (c = 64), h = h + this._keyStr.charAt(n) + this._keyStr.charAt(a) + this._keyStr.charAt(i) + this._keyStr.charAt(c); return h }, decode: function (r) { var t, e, o, n, a, i, c, h = "", f = 0; for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, "") ; f < r.length;) n = this._keyStr.indexOf(r.charAt(f++)), a = this._keyStr.indexOf(r.charAt(f++)), i = this._keyStr.indexOf(r.charAt(f++)), c = this._keyStr.indexOf(r.charAt(f++)), t = n << 2 | a >> 4, e = (15 & a) << 4 | i >> 2, o = (3 & i) << 6 | c, h += String.fromCharCode(t), 64 != i && (h += String.fromCharCode(e)), 64 != c && (h += String.fromCharCode(o)); return h = Base64._utf8_decode(h) }, _utf8_encode: function (r) { r = r.replace(/\r\n/g, "\n"); for (var t = "", e = 0; e < r.length; e++) { var o = r.charCodeAt(e); 128 > o ? t += String.fromCharCode(o) : o > 127 && 2048 > o ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128)) } return t }, _utf8_decode: function (r) { for (var t = "", e = 0, o = c1 = c2 = 0; e < r.length;) o = r.charCodeAt(e), 128 > o ? (t += String.fromCharCode(o), e++) : o > 191 && 224 > o ? (c2 = r.charCodeAt(e + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), e += 2) : (c2 = r.charCodeAt(e + 1), c3 = r.charCodeAt(e + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), e += 3); return t } }, JSON = JSON || {}; JSON.stringify = JSON.stringify || function (r) { var t = typeof r; if ("object" != t || null === r) return "string" == t && (r = '"' + r + '"'), String(r); var e, o, n = [], a = r && r.constructor == Array; for (e in r) o = r[e], t = typeof o, "string" == t ? o = '"' + o + '"' : "object" == t && null !== o && (o = JSON.stringify(o)), n.push((a ? "" : '"' + e + '":') + String(o)); return (a ? "[" : "{") + String(n) + (a ? "]" : "}") };

function _desconectLogin(click) {
    // window.location = UrlRoot;
    if (click === 2) {
        console.log('click log out');
    }

    window.parent.location = UrlRoot;
}

function _desconect() {
    $('#desconectar').modal();
    $('#desconectar').modal('show');
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

function _Closedesconect() {
    __StayConnect();
    $('#desconectar').modal('hide');
}

function _closeTeclado(li) {
    var teclado;
    teclado = li.closest(".teclado-numerico");

    if (teclado.length == 1) {
        teclado.removeClass("resaltado");
        $(".container-teclado").removeClass("teclado-visible");
        $(".teclado-visible-input").removeClass("fondo__clave");
        $("#sombreado").hide();
    }

}
//DESPLAZAR PAGINA
function desplazarA(idElemento, velocidad) {
    $("body, html").animate({
        scrollTop: eval($('#' + idElemento).offset().top - 50)
    }, velocidad);
}

// SAVE
$("#txtAlias").keyup(function () {
    if ($(this).val().length > 2) {
        $(this).removeClass("ErrorFormulario-transferencias");
    }
});

function __OnSaveAlias() {
    var aliasValue = $("#txtAlias").val();
    if (aliasValue != "") {
        var datos = [];
        datos = {
            alias: aliasValue
        }
        var actionUrl = UrlActionSaveAlias;
        var data = JSON.stringify(datos);
        $.ajax({
            type: 'POST',
            url: actionUrl,
            data: data,
            contentType: "application/json",
            dataType: 'json',
            success: function (response) {
                $(".modificar__alias").fadeOut();
                $(".container_overlight").fadeOut();
                $(".container_overlight_menu").fadeOut();
                $(".container-buenasTardes .texto_toolt").attr("data-name", aliasValue);
            },
            error: function () {

            }
        });
    } else {
        $("#txtAlias").addClass("ErrorFormulario-transferencias");
    }
}



function __OnSaveImage(idSelect, idModal) {
    var image = $('#' + idSelect).val();

    if (image.length) {
        openLoading("Actualizando...");
        var datos = {
            strimage: image
        }
        var actionUrl = UrlSaveImage;
        var data = JSON.stringify(datos);
        $.ajax({
            type: 'POST',
            url: actionUrl,
            data: data,
            contentType: "application/json",
            dataType: 'json',
            success: function (response) {
                var _json = { "d": response };
                var parsedData = _json.d;
                if (parsedData.logErrorNumber == "0000") {
                    $('#idLogoUsuario').attr('src', urlImage + parsedData.IMAGE);
                    if (idModal) {
                        $('#' + idModal).modal('hide');
                        AfiliarOTP();
                    }
                }
            },
            error: function () {
            },
            complete: function () {
                closeLoading();
            }
        });
    }

    else {
        if (idModal) {
            $('#' + idModal).find('.errorInputs').text('Elige una imagen');
        }
    }
}

// Open CHAT

function openChatWindow() {
    var dataArr = {};
    var e = NumDoc;
    if (e !== "") {
        dataArr['Dni'] = e;
    }

    var e = UserName;

    if (e !== "") {
        dataArr['Nombre'] = e;
        dataArr['name'] = e;
    }

    dataArr['Origen'] = location.pathname;
    var chatUrl = 'https://atentoperu.s1gateway.com/webchat/s1chat.php?autosubmit=1&cpgid=8321080&fdata=' + Base64.encode(encodeURIComponent(JSON.stringify(dataArr)));

    window.open(chatUrl);
}

/// Funciones 
// Inicialización de funciones imagen de Perfil

$(document).ready(function () {
    $(document).on("keydown", disableF5);

    $(".editar__fotoPerfil select.image-picker").imagepicker({
        hide_select: true,
        initialized: function (imagePicker) {
            var ruta = $('#idLogoUsuario').attr('src');
            $('.image_picker_selector img[src="' + ruta + '"]').parent().addClass('selected');
        }
    });
});


// Contador de Sesion


function __StayConnect() {
    start_cuntdown();
}



$(document).ready(function () {

    //clock = $('.clock').FlipClock(TimeOut, {
    //    clockFace: 'MinuteCounter',
    //    countdown: true,
    //    autoStart: true,
    //    callbacks: {
    //        stop: function () {
    //            _desconectLogin();
    //        }
    //    }
    //});
    //clock.start();
});


/// Efectos de la Barra Lateral


//SELECT MATERIALIZE
$('#select_validacion').material_select();

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
    .mouseenter(function () {
        if ($helpCaja.is(":visible")) {
        } else {
            $helpCajaTextos.fadeIn("fast")
        }
    })
    .mouseleave(function () {
        $helpCajaTextos.fadeOut("fast")
    });

//HOVER Y CLICK EN ÍCONO BANCA
$helpIconBanca
    .mouseenter(function () {
        $helpItemBanca.addClass("help__hoverItemMove")
    })

    .mouseleave(function () {
        $helpItemBanca.removeClass("help__hoverItemMove")
    })

    .click(function () {
        $(".bancaInternet__contenedor").fadeOut("fast");
        $(".bancaInternet__open").hide();
        $(".bancaInternet").show();
        $(".tuty").fadeOut("fast");
        $helpOverlay.show();
        $helpCajaTextos.fadeOut("fast");
        $helpCajaBanca.fadeIn("fast", function () {
            var $that = $(this);
            $that.find($helpDni).focus();
            $that.siblings(".help__caja").fadeOut("fast");
            $helpClose.click(function () {
                $that.fadeOut("fast");
                $helpOverlay.hide();
            });
        });
    });

//HOVER Y CLICK EN ÍCONO HABLEMOS
$helpIconHablemos
    .mouseenter(function () {
        $helpItemHablemos.addClass("help__hoverItemMove")
    })
    .mouseleave(function () {
        $helpItemHablemos.removeClass("help__hoverItemMove")
    })
    .click(function () {
        $(".bancaInternet__contenedor").fadeOut("fast");
        $(".bancaInternet__open").hide();
        $(".bancaInternet").show();
        $(".tuty").fadeOut("fast");
        $helpOverlay.show();
        $helpCajaTextos.fadeOut("fast");
        $helpCajaHablemos.fadeIn("fast", function () {
            var $that = $(this);
            console.log($that);
            $that.siblings(".help__caja").fadeOut("fast");
            $helpClose.click(function () {
                $that.fadeOut("fast");
                $helpOverlay.hide();
            });
        });
    });

//HOVER Y CLICK EN ÍCONO CHAT
$helpIconChat
    .mouseenter(function () {
        $helpItemChat.addClass("help__hoverItemMove")
    })
    .mouseleave(function () {
        $helpItemChat.removeClass("help__hoverItemMove")
    })
    .click(function () {
        $(".bancaInternet__contenedor").fadeOut("fast");
        $(".bancaInternet__open").hide();
        $(".bancaInternet").show();
        $(".tuty").fadeOut("fast");
        $helpOverlay.show();
        $helpCajaTextos.fadeOut("fast");
        $helpCajaChat.fadeIn("fast", function () {
            var $that = $(this);
            $that.find($helpDni).focus();
            $that.siblings(".help__caja").fadeOut("fast");
            $helpClose.click(function () {
                $that.fadeOut("fast");
                $helpOverlay.hide();
            });
        });
    });


$(".help__telefono").numeric();


//VALIDACIONES SIDEBAR
$("#MiBancaForm").validate({
    messages: {
        help__dni: "Ingresa unUsuario válido",
        help__password: "Ingresa una Clave válida"
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('error_form');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('error_form');
    }
});

$("#HablemosForm").validate({
    messages: {
        help__telefono: "Ingresa un Nº de teléfono válido"
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('error_form');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('error_form');
    }
});

$("#ChatForm").validate({
    messages: {
        help__dni: "Ingresa un DNI válido",
        help__name: "Debes ingresar un nombre"
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('error_form');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('error_form');
    }
});

/// Manejo de Timer


$('.help__close').one('click', function (e) {
    setTimeout(function () {
        $($helpCajaBanca).addClass("timeout");
        $(".help__bancaInternet-timeOut").fadeIn("fast");
    }, 500);
});

$(".seguirConectado").click(function () {
    $helpCajaBanca.fadeOut("fast");
    $helpOverlay.hide();
    $($helpCajaBanca).removeClass("timeout");

    $(".help__bancaInternet-timeOut").fadeIn("fast");

    $('.help__close').one('click', function (e) {
        setTimeout(function () {
            $($helpCajaBanca).addClass("timeout");
            $(".help__bancaInternet-timeOut").fadeIn("fast");
        }, 500);
    });

})


function __OnGo(url) {
    window.location.href = url;
}

function openLoading(content) {
    $("body").addClass("loading"); // para mostrar la imagen de carga (loading...)
    $(".mLoadingContent .text").text(content); // se cambia el texto a mostrar (loading ...)
}

function closeLoading() {
    $("body").removeClass("loading");
}

function decodeEntities(str) {
    var element = document.createElement('div');
    if (str && typeof str === 'string') {
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
    }
    return str;
}

function closePrint() {
    try {
        var elementDOM = document.getElementById('iframeHTMLExport');
        elementDOM.parentNode.removeChild(elementDOM);
    }
    catch (err) {
        console.log(err);
    }
}

function setPrint(self) {
    self.contentWindow.onbeforeunload = closePrint;
    self.contentWindow.onafterprint = closePrint;
    self.contentWindow.focus(); // Required for IE
    self.contentWindow.print();
}

function printHTML(html) {

    //var myWindow = window.open('', 'Print-Window');
    //myWindow.document.write(html);
    //myWindow.document.close();

    //if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode) { // ie
    //    myWindow.document.execCommand('print', false, null);
    //    myWindow.close();
    //}

    //else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) { // Safari
    //    setTimeout(function () {    
    //        myWindow.focus();
    //        myWindow.print();
    //	    myWindow.close();
    //    }, 200);
    //}

    //else {
    //    myWindow.onload = function () {
    //        myWindow.focus();
    //        myWindow.print();
    //        myWindow.close();
    //    };
    //}

    var oHiddFrame = document.createElement("iframe");
    oHiddFrame.setAttribute("id", "iframeHTMLExport");
    oHiddFrame.style.visibility = "hidden";
    oHiddFrame.style.position = "fixed";
    oHiddFrame.style.right = "0";
    oHiddFrame.style.bottom = "0";

    document.body.appendChild(oHiddFrame);

    oHiddFrame.contentWindow.document.open();
    oHiddFrame.contentWindow.document.write(html);
    oHiddFrame.contentWindow.document.close();

    if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode) { // ie
        //setPrint(oHiddFrame);

        oHiddFrame.contentWindow.document.execCommand('print', false, null);
    }

    else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) { // Safari
        setTimeout(function () {
            setPrint(oHiddFrame);

        }, 200);
    }

    else {
        oHiddFrame.onload = function () {
            if (isFromAndroidChrome === '1') {
                oHiddFrame.contentWindow.document.execCommand('print', false, null);
            } else {
                setPrint(this);
            }
        };
    }
}

function downloadPDF(self, urlService, html, namefile) {
    var isDisabled = self.data('disabled');
    if (!isDisabled) {
        var data = { html: html };
        self.addClass('disabledLink');
        self.data('disabled', true);

        $.ajax({
            url: urlService,
            data: data,
            type: 'POST',
            error: function () {
                __ShowError('Ocurrió un error...');
            },
            success: function (result) {
                if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
                    var byteCharacters = atob(result);
                    var byteNumbers = new Array(byteCharacters.length);
                    for (var i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    var byteArray = new Uint8Array(byteNumbers);
                    var blob = new Blob([byteArray], { type: 'application/octet-stream' });
                    window.navigator.msSaveOrOpenBlob(blob, namefile + '.pdf');
                }
                else { // much easier if not IE
                    var pdf = 'data:application/octet-stream;base64,' + result;
                    var dlink = document.createElement("a");
                    dlink.setAttribute('href', pdf);
                    dlink.setAttribute('download', namefile + '.pdf');
                    dlink.click();
                }
            },
            complete: function () {
                self.removeClass('disabledLink');
                self.data('disabled', false);
            }
        });
    }
}

function downloadExcelFromServer(self, urlService, html, namefile) {
    var isDisabled = self.data('disabled');
    if (!isDisabled) {
        var data = { html: html };
        self.addClass('disabledLink');
        self.data('disabled', true);

        $.ajax({
            url: urlService,
            data: data,
            type: 'POST',
            error: function () {
                __ShowError('Ocurrió un error...');
            },
            success: function (result) {
                if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
                    var byteCharacters = atob(result);
                    var byteNumbers = new Array(byteCharacters.length);
                    for (var i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    var byteArray = new Uint8Array(byteNumbers);
                    var blob = new Blob([byteArray], { type: 'application/octet-stream' });
                    window.navigator.msSaveOrOpenBlob(blob, namefile + '.xlsx');
                }
                else { // much easier if not IE
                    var pdf = 'data:application/octet-stream;base64,' + result;
                    var dlink = document.createElement("a");
                    dlink.setAttribute('href', pdf);
                    dlink.setAttribute('download', namefile + '.xlsx');
                    dlink.click();
                }
            },
            complete: function () {
                self.removeClass('disabledLink');
                self.data('disabled', false);
            }
        });
    }
}

function downloadExcel(html, namefile) {
    if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        table_html = html;

        while (table_html.indexOf('á') != -1) table_html = table_html.replace('á', '&aacute;');
        while (table_html.indexOf('é') != -1) table_html = table_html.replace('é', '&eacute;');
        while (table_html.indexOf('í') != -1) table_html = table_html.replace('í', '&iacute;');
        while (table_html.indexOf('ó') != -1) table_html = table_html.replace('ó', '&oacute;');
        while (table_html.indexOf('ú') != -1) table_html = table_html.replace('ú', '&uacute;');
        while (table_html.indexOf('º') != -1) table_html = table_html.replace('º', '&ordm;');

        if (window.navigator.msSaveBlob) {
            var blob = new Blob([table_html], {
                type: "text/html"
            });
            navigator.msSaveBlob(blob, namefile + '.xls');
        }
    }

    else {
        var table_html = html.replace(/ /g, '%20');

        while (table_html.indexOf('á') != -1) table_html = table_html.replace('á', '&aacute;');
        while (table_html.indexOf('é') != -1) table_html = table_html.replace('é', '&eacute;');
        while (table_html.indexOf('í') != -1) table_html = table_html.replace('í', '&iacute;');
        while (table_html.indexOf('ó') != -1) table_html = table_html.replace('ó', '&oacute;');
        while (table_html.indexOf('ú') != -1) table_html = table_html.replace('ú', '&uacute;');
        while (table_html.indexOf('º') != -1) table_html = table_html.replace('º', '&ordm;');

        var data_type = 'data:application/vnd.ms-excel,';
        var excel = data_type + table_html;
        var dlink = document.createElement('a');
        dlink.setAttribute('href', excel);
        dlink.setAttribute('download', namefile + '.xls');
        dlink.click();
    }
}

function sendEmail(options) {
    var email = $("#" + options.emailID);
    var emailValue = email.val();

    if (emailValue.trim() != '' && re_email.test(emailValue)) {
        email.removeClass('error_campo');
        openLoading("Enviando...");

        var data = {
            toEmail: emailValue.trim(),
            operationid: options.operationID
        };

        $.post(options.urlService, data)
            .done(function () {
                __ShowInformation('Se ha enviado el correo a la dirección: ' + emailValue.trim());
                closeLoading();
            })
            .fail(function () {
                closeLoading();
            });
    }

    else {
        email.addClass('error_campo');
    }
}

function getCompleteDocumentHTMLExport(html, style) {
    var structureHTML = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'> \
                         <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'> \
                         <head> \
                            <title>Banco Pichincha</title> \
                            <meta http-equiv='Content-Type' content='text/html; charset=utf-8' /> \
                            <style type='text/css'>" + style + "</style> \
                         </head> \
                         <body>" + html + "</body> \
                         </html>";
    return structureHTML;
}

function replaceConverting_amount(monto, replace) {
    var amount = monto.replace(replace, '');
    return amount;
}

function saveShortcutOperation(self, options) {
    var isDisabled = self.data('disabled');
    if (!isDisabled) {
        openLoading("Cargando...");
        self.addClass('disabledLink');
        self.data('disabled', true);

        $.get(options.urlService, options.data, function (result) {
        }).done(function () {
            closeLoading();
            __ShowInformation('Se registró la operación frecuente');
        }).fail(function () {
            closeLoading();
            __ShowError('Ocurrió un error en la transacción');
        });
    }
}


function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

//function formatMoney(total) {
//    var neg = false;
//    if (total < 0) {
//        neg = true;
//        total = Math.abs(total);
//    }
//    return (neg ? "-" : '') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "-1,").toString();
//}

