
function SaveMessageRead() {
    var data = $("#frmMessageRead").serialize();
    var page = 0;
    $.get(UrlMessageRead, data, function (status) {
        page = status.PageNumber;
        $("#ContMsg").html(status.ContMsg);

        //session
        sessionStorage.setItem("iMessages_Count", status.ContMsg);
        var Item = sessionStorage.getItem("iMessages_Count");

        $("#ContMsg").html(Item);

        showMessageCount(Item);

    }).done(
        function () {
            Paginacion(page);
            $(".bottom_tools").hide();
        });
}

function showMessageCount(ContMsg) {
    if (parseFloat(ContMsg) == 0) {
        $("#ContMsg").css("display", "none");
    } else if (parseFloat(ContMsg) > 0) {
        $("#ContMsg").css("display", "block");
    }
}

function ShowDeleteMessageRead() {
    var data = $("#frmMessageRead").serialize();
    var page = 0;
    $('#myModalAlert_2').modal({ show: 'true' });
    $("#idBodyA_2").html('');
    var html = '';
    //html = html + "<h5>" + 'titulo' + "</h5>";
    html = html + "<p>" + 'Se eliminará el o los registro(s) seleccinado(s)' + " </p>";
    html = html + "<div class=\"center_btn\">";
    // html = html + "<a href='javascript:DeleteMessageModal(\"" + messageId + "\");' data-dismiss=\"modal\" class=\"boton-foto-edit boton_edit waves-effect\">Aceptar</a>";
    html = html + "<a href='#' onclick='javascript:DeleteMessageRead();' data-dismiss=\"modal\" class=\"boton-general boton_edit waves-effect\">Aceptar</a>";
    html = html + "</div>";
    $("#idBodyA_2").append(html);
}

function DeleteMessageRead() {
    var data = $("#frmMessageRead").serialize();
    var page = 0;   
    $.get(UrlMessageDelete, data, function (status) {
        page = status.PageNumber;
        $("#ContMsg").html(status.ContMsg);
    }).done(
        function () {
            Paginacion(page);
            $(".bottom_tools").hide();
        });
}


function DeleteMessageModal(messageId) {    
    var data = { idMessage: messageId };
    var page = 1;
    $.get(UrlMessageDelete, data, function (status) {
        page = status.PageNumber;        
        $("#ContMsg").html(status.ContMsg);
    }).done(
        function () {
            $('#btnVer').click();
            Paginacion(page);
        });
}

function checkedmessage() {
    if ($('.tabla_mensaje input[type=checkbox].one:checked').length > 0) {
        $(".bottom_tools").show();
    }
    else {
        $(".bottom_tools").hide()
    }

    var totalSeleccionados = $('.messagebody input[type=checkbox].one:checked').length;
    var total = $('.messagebody input[type=checkbox].one').length;
    if(totalSeleccionados == 0 ){
        $(".bottom_tools").hide();
    } else if (totalSeleccionados < total) {
        $('#filled-in-box').prop('checked', false);
    }
}

function ShowModalDelete(messageId, Page) {
    $.ajax({
        type: "POST",
        cache: false,
        url: UrlMessageList,
        data: { MessageId: messageId, Pagenumber: Page },
        //data: { idMessage: messageId },
        dataType: "JSON",
        success: function (response) {
            var _json = { "d": response };
            var parsedData = _json.d;
            var cantR = parsedData.cantR;
            $('#myModalAlert').modal({ show: 'true' });
            var title = String(parsedData.oListMes.messageTitle);
            var messaDet = String(parsedData.oListMes.messageTextDet);

            $("#idBodyA").html('');
            var html = '';

            html = html + "<h5>" + title + "</h5>";
            html = html + "<p>" + messaDet + " </p>";
            html = html + "<div class=\"center_btn\">";
            // html = html + "<a href='javascript:DeleteMessageModal(\"" + messageId + "\");' data-dismiss=\"modal\" class=\"boton-foto-edit boton_edit waves-effect\">Aceptar</a>";
            html = html + "<a href='#' onclick='javascript:DeleteMessageModal(\"" + messageId + "\");' data-dismiss=\"modal\" class=\"boton-general boton_edit waves-effect\">Aceptar</a>";
            html = html + "</div>";

            $("#idBodyA").append(html);
        },
        error: function (error) { console.log(error); }
    })
}

function ShowModalMessageSee(messageId, Page) {

    $.ajax({
        type: "POST",
        cache: false,
        url: UrlMessageList,
        data: { MessageId: messageId, Pagenumber: Page },
        dataType: "JSON",
        success: function (response) {
            var _json = { "d": response };
            var parsedData = _json.d;
            var cantR = parsedData.cantR;
            $("#ContMsg").html(parsedData.ContMsg);

            showMessageCount(parsedData.ContMsg);

            //session
            sessionStorage.setItem("iMessages_Count", parsedData.ContMsg);
            var Item = sessionStorage.getItem("iMessages_Count");
            console.log("sin leer: " + Item);

            $('#myModal').modal({ show: 'true' });
            var title = String(parsedData.oListMes.messageTitle);
            var messaDet = String(parsedData.oListMes.messageTextDet);

            $("#tblMessage tbody tr:eq(" + (Page - 1) + ")").removeClass("bgcolor_msg_noviewed").addClass("active-tr");

            $("#idBodyV").html('');

            var html = '';
            html = html + "<h5>" + title + "</h5>";
            html = html + "<p>" + messaDet + "</p>";
            html = html + " <div class=\"container-nav\">"
            html = html + "<ul>";
            html = html + "<li style=\"float: right;\">";
            html = html + "    <a href='javascript:ShowModalMessageSee(\"" + messageId + "\"," + ((Page + 1 > cantR) ? cantR : (Page + 1)) + ");'>Mensaje siguiente<i class=\"icon-flecha-right flecha-d\"></i></a>";
            html = html + "</li>";
            html = html + "<li style=\"float: left;\">";
            html = html + "    <a href='javascript:ShowModalMessageSee(\"" + messageId + "\"," + ((Page - 1 < 1) ? 1 : (Page - 1)) + ");'><i class=\"icon-flecha-right left-a  flecha-i\"></i>Mensaje anterior</a>";
            html = html + "</li>  </ul>  </div>";
            //html = html + "  <div class=\"pull-right btn-eliminar\"><a href='javascript:DeleteMessageModal(\"" + messageId + "\");' ><i class=\"icon-basura\"></i><span>Eliminar</span></a></div>";
            html = html + "  <div class=\"pull-right btn-eliminar\"><a href='#' onclick='javascript:DeleteMessageModal(\"" + messageId + "\");' ><i class=\"icon-basura\"></i><span>Eliminar</span></a></div>";
          
            $("#idBodyV").append(html);
           
        },
        error: function (error) { console.log(error); }
    });

   // return false;
}


function LimitarTexto(texto, limite) {
    return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
}


function Paginacion(iPagina) {

    $.ajax({
        type: "POST",
        cache: false,
        url: UrlMessageGet,
        data: { PageSize: 8, PageNumber: iPagina },
        dataType: "JSON",
        success: function (response) {
            var _json = { "d": response };
            var parsedData = _json.d;
            var i = 1;
            var html = '';
            $("#tblMessage").find("tbody").find("tr").remove();
            $("#divPaginacion").html('');

            if (parsedData.oMessagePerson.length > 0) {
                $.each(parsedData.oMessagePerson, function (index, item) {
                    if (this.isRead == false) {
                        html = html + "<tr class='bgcolor_msg_noviewed'>";

                    } else {
                        html = html + "<tr class='active-tr'>";
                    }
                    html = html + "<td class='table_center'  style='padding: 10px 10px !important;'><div class='check-caja'>" +
                        "<input type='checkbox' class='filled-in checkbox1 one' name='idMessage' id='filled-in-box" + i + "' value='" + this.messageId + "' onclick='javascript:checkedmessage();'>" +
                        "<label for='filled-in-box" + i + "'></label></div></td>" +
                        "<td class='table_left'>" + this.dateRegister + "</td>" +
                        "<td class='table_left'><strong>" + this.hour + "</strong></td>" +
                        "<td class='table_left'>" + LimitarTexto(this.messageTitle, 50) + "  </td>" +
                        "<td class='table_left'>" +
                        //"<a class='btn_ver' href='javascript:ShowModalMessageSee(\"" + this.messageId + "\"," + i + ");' data-toggle='modal'>Ver mensaje </a>" +
                        "<a class='btn_ver' href='#' onclick='javascript:ShowModalMessageSee(\"" + this.messageId + "\"," + i + ");' data-toggle='modal'>Ver mensaje </a>" +
                        "<a class='btn_basura' href='javascript:ShowModalDelete(\"" + this.messageId + "\"," + i + ");' data-toggle='modal'>" +
                        "<i class='icon-basura'></i>" +
                        "</a>" +
                        "</td></tr>"
                    i++;

                });

                $("#tblMessage").find("tbody").append(html);
                if (parsedData.oMessagePerson.length > 0) {
                    html = '';
                    html = html + "<div class='contador_pagina'>";
                    html = html + "<p><strong>Página " + iPagina + " de " + parsedData.oMessagePerson[0].totalpage + "</strong></p></div>";
                    if (parsedData.oMessagePerson[0].totalpage > 1) {
                        html = html + "<div class='container_paginador_contador'>";
                        html = html + "<ul>";
                        html = html + "<li><a href='javascript:Paginacion(" + (parsedData.CurrentPage - iPagina + 1) + ");' class='text_paginador'>primera</a></li>";
                        html = html + "<li><a href='javascript:Paginacion(" + ((iPagina - 1 < 1) ? 1 : (iPagina - 1)) + ");' class=' text_paginador'>anterior</a></li>";

     

                        for (var page = parsedData.Starpage; page <= parsedData.EndPage; page++) {
                            if (page == iPagina) {
                                html = html + "<li>";
                                html = html + "<a href='javascript:Paginacion(" + page + ");'  class='numeros_paginador waves-effect'>" + page + "</a>";
                                html = html + "<input type='hidden' value='" + page + "' id='hdpage' />";
                            }
                            else {
                                html = html + "<li>";
                                html = html + "<a href='javascript:Paginacion(" + page + ");'  class='waves-effect'>" + page + "</a>";
                                html = html + "<input type='hidden' value='" + page + "' id='hdpage' />";
                            }
                            html = html + "</li>";
                            html = html + "<li>";
                            html = html + "<a href='javascript:;' class='separador_paginador hidden-xs'>·</a>";
                            html = html + "</li>";
                        }
                        if (parsedData.CurrentPage <= parsedData.oMessagePerson[0].totalpage) {
                            
                            html = html + "<li>";
                            html = html + "<a href='javascript:Paginacion(" + (parsedData.CurrentPage + 1) + ");' class='waves-effect hidden-xs'>...</a>";
                            html = html + "</li>";
                            html = html + "<li>";
                            html = html + "<a href='javascript:Paginacion(" + (parsedData.CurrentPage +     1) + ");' class='text_paginador'>siguiente</a>";
                            html = html + "</li>";
                            html = html + "<li>";
                            html = html + "<a href='javascript:Paginacion(" + parsedData.oMessagePerson[0].totalpage + ");' class='text_paginador'>última</a>";
                            html = html + "</li>     </ul>";
                        }
                    }
                    $("#divPaginacion").append(html);
                }

            }
            else {
                var html = '';

                $("#chk-container").show();
                $(".messageheader").css("pointer-events", "none");
                $("#divPaginacion").css("display", "none");
                html = html + "";          
                html = html + "<div class='container_box ofertas ofertas-first'>";
                html = html + "<p class='ofertas__monto'>&nbsp;</p>";
                html = html + "<p class='ofertas__valida'>&nbsp;</p>";
                /**html = html + "<p class='ofertas__valida' style='margin- left: 25 %; margin - top: 5 %;'><h3>Lo sentimos <strong>" + parsedData.Alias, +"</strong></h3></p>";*/
                html = html + "<p class='ofertas__valida' ><h4>&nbsp;Por el momento no tiene mensajes.</h4></p>";
                html = html + "<p class='ofertas__valida'>&nbsp;</p>";
                html = html + " </div>";
                $("#divNomensaje").append(html);
                $("#divNomensaje").show();



            }

           
        },
        error: function (error) { console.log(error); }
    })
}

function ListarMensajes() {

    $.ajax({
        type: "POST",
        cache: false,
        url: UrlMessageGet,
        data: { PageSize: 8, PageNumber: 1 },
        dataType: "JSON",
        success: function (response) {
            var _json = { "d": response };
            var parsedData = _json.d;
            var i = 1;
            var html = '';
            $("#tblMessage").find("tbody").find("tr").remove();
            $("#divPaginacion").html('');
            if (parsedData.oMessagePerson.length > 0) {
                $.each(parsedData.oMessagePerson, function (index, item) {

                    if (this.isRead == false) {
                        html = html + "<tr class='bgcolor_msg_noviewed'>";

                    } else {
                        html = html + "<tr class='active-tr'>";
                    }
                    html = html + "<td class='table_center' style='padding: 10px 10px !important;'><div class='check-caja'>" +
                        "<input type='checkbox' class='filled-in checkbox1 one' name='idMessage' id='filled-in-box" + i + "' value='" + this.messageId + "' onclick='javascript:checkedmessage();'>" +
                        "<label for='filled-in-box" + i + "'></label></div></td>" +
                        "<td class='table_left'>" + this.dateRegister + "</td>" +
                        "<td class='table_left'><strong>" + this.hour + "</strong></td>" +
                        "<td class='table_left'>" + LimitarTexto(this.messageTitle, 50) + "  </td>" +
                        "<td class='table_left'>" +
                        //"<a class='btn_ver' href='#' onclick='javascript:ShowModalMessageSee(\"" + this.messageId + "\"," + i + ");' data-toggle='modal' return false; >Ver mensaje </a>" +
                        //"<a class='btn_basura' href='#' onclick='javascript:ShowModalDelete(\"" + this.messageId + "\"," + i + ");' data-toggle='modal' return false;> " +
                        "<a class='btn_ver' href='#' onclick='javascript:ShowModalMessageSee(\"" + this.messageId + "\"," + i + ");' data-toggle='modal'>Ver mensaje </a>" +
                        "<a class='btn_basura' href='#' onclick='javascript:ShowModalDelete(\"" + this.messageId + "\"," + i + ");' data-toggle='modal'> " +
                        "<i class='icon-basura'></i>" +
                        "</a>" +
                        "</td></tr>"
                    i++;

                });

                $("#tblMessage").find("tbody").append(html);
                if (parsedData.oMessagePerson.length > 0) {
                    html = '';
                    html = html + "<div class='contador_pagina'>";
                    html = html + "<p><strong>Página " + Index + " de " + parsedData.oMessagePerson[0].totalpage + "</strong></p></div>";

                    if (parsedData.oMessagePerson[0].totalpage > 1) {
                        html = html + "<div class='container_paginador_contador'>";
                        html = html + "<ul>";
                        html = html + "<li><a href='javascript:Paginacion(" + (parsedData.CurrentPage - Index + 1) + ");' class='text_paginador'>primera</a></li>";
                        html = html + "<li><a href='javascript:Paginacion(" + ((Index - 1 < 1) ? 1 : (Index - 1)) + ");' class='disabled_paginador text_paginador'>anterior</a></li>";
                        for (var page = parsedData.Starpage; page <= parsedData.EndPage; page++) {
                            if (page == 1) {
                                html = html + "<li>";
                                html = html + "<a href='javascript:Paginacion(" + page + ");'  class='numeros_paginador waves-effect'>" + page + "</a>";
                                html = html + "<input type='hidden' value='" + page + "' id='hdpage' />";
                            } 
                            else {
                                html = html + "<li>";
                                html = html + "<a href='javascript:Paginacion(" + page + ");'  class='waves-effect'>" + page + "</a>";
                                html = html + "<input type='hidden' value='" + page + "' id='hdpage' />";
                            }
                            html = html + "</li>";
                            html = html + "<li>";
                            html = html + "<a href='javascript:;' class='separador_paginador hidden-xs'>·</a>";
                            html = html + "</li>";
                        }
                        if (parsedData.CurrentPage < parsedData.oMessagePerson[0].totalpage) {

                            html = html + "<li>";
                            html = html + "<a href='javascript:Paginacion(" + (parsedData.CurrentPage + 1) + ");' class='waves-effect hidden-xs'>...</a>";
                            html = html + "</li>";
                            html = html + "<li>";
                            html = html + "<a href='javascript:Paginacion(" + (parsedData.CurrentPage + 1) + ");' class='text_paginador'>siguiente</a>";
                            html = html + "</li>";
                            html = html + "<li>";
                            html = html + "<a href='javascript:Paginacion(" + parsedData.oMessagePerson[0].totalpage + ");' class='text_paginador'>última</a>";
                            html = html + "</li>     </ul>";
                        }
                        
                }

                    $("#divPaginacion").append(html);
                }
            }
            else {
                var html = '';
                $(".messagebody").hide();
                //$("#divMessage").html('');
                $("#divPaginacion").hide();
                $(".messageheader").css("pointer-events", "none");
                html = html + "<div class='container_box ofertas ofertas-first'>";
                html = html + "<p class='ofertas__monto'>&nbsp;</p>";
                html = html + "<p class='ofertas__valida'>&nbsp;</p>";
                /**html = html + "<p class='ofertas__valida' style='margin- left: 25 %; margin - top: 5 %;'><h3>Lo sentimos <strong>"+parsedData.Alias,+"</strong></h3></p>";*/
                html = html + "<p class='ofertas__valida' ><h4>&nbsp;Por el momento no tiene mensajes.</h4></p>";
                html = html + "<p class='ofertas__valida'>&nbsp;</p>";
                html = html + " </div>";
                $("#divNomensaje").append(html);
                $("#divNomensaje").show();



            }
        },
        error: function (error) { console.log(error); }
    });
}


/// Función Principal --- Listar mensajes

$(document).ready(function () {
    ListarMensajes();
});