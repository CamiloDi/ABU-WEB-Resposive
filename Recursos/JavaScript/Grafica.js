function GetNumeroAlertasRecientes(contenedor,id_paciente){

    var ruta = "";
    var codigo = "";
    var total_alertas = $("#numero").text();
    console.log('inicio total alerta sacada del texto : ' + total_alertas);
    var numalertas =0;
    var numalertasleidas = 0;
    //$.getJSON("Recursos/Json/Alerta.json", function(datos) {
        var ajaxurl = "https://api-rest-beacons.herokuapp.com/alertas/"+id_paciente;
        $.get(ajaxurl, function(datos, status){
    //datos["alertas"][0][0].Descripcion
    var total_alertas_json = Object.keys(datos["alertas"][0]).length;
    for(var i = 0 ; i< total_alertas_json;i++){
        var estado = datos["alertas"][0][i].Estado;
        if(estado =="Nuevo"){
            numalertas = numalertas+1;
        }
        if(estado =="Leído"){
            numalertasleidas = numalertasleidas+1;
        }
    } 
   

		if(total_alertas != numalertas){
	    codigo +="<a class='dropdown-toggle' data-toggle='dropdown' href='#'>";
                        codigo +="<span class='glyphicon glyphicon-comment'>";
                        codigo +="<span class='badge' id='numero'>"+numalertas+"</span>";
                       codigo +="</a>";
                       codigo +="<ul class='dropdown-menu'>";
                        codigo +="<li onclick='CargarAlertas(1);'><a  href='#'><div id='btn_entrante'><span class='glyphicon glyphicon-inbox' id='numero_entrante'></span>&nbspEntrantes&nbsp<span class='badge'>"+numalertas+"</span></div></a></li>";
                        codigo +="<li onclick='CargarAlertasLeidas(1);'><a href='#' ><span class='glyphicon glyphicon-inbox'></span>&nbsp;Leidos&nbsp;<span class='badge'>"+numalertasleidas+"</span></a></li>";
                       codigo +="</ul>"	;			
                       $("#"+contenedor).html(codigo);
					             $("#btn_sonar" ).focusin();
                       $("#btn_sonar" ).click();
						console.log('es distintos');
						console.log(total_alertas);
						console.log(total_alertas_json);
						total_alertas = total_alertas_json;
		}
		else{
			           codigo +="<a class='dropdown-toggle' data-toggle='dropdown' href='#'>";
                       codigo +="<span class='glyphicon glyphicon-comment'>";
					   codigo +="<span class='badge' id='numero'>"+numalertas+"</span>";
                       codigo +="</a>";
                       codigo +="<ul class='dropdown-menu'>";
                       codigo +="<li onclick='CargarAlertas(1);'><a  href='#'><div id='btn_entrante'><span class='glyphicon glyphicon-inbox' id='numero_entrante'></span>&nbsp;Entrantes&nbsp;<span class='badge'>"+total_alertas_json+"</span></div></a></li>";
                       codigo +="<li onclick='CargarAlertasLeidas(1);'><a href='#' ><span class='glyphicon glyphicon-inbox'></span>&nbsp;Leidos&nbsp;<span class='badge'>"+numalertasleidas+"</span></a></li>";
                       codigo +="</ul>";
                       $("#"+contenedor).html(codigo);
					   console.log('no es distintos');
		}
    });
}

function CargarAlertas(id_paciente){

  $("#Contenedor_total").show();
  $("#Contenedor_carrusel").hide();
   h = "";
   h += "<div class='panel-group' id='accordion'>";
   h+= "<div class='page-header'>";
   h+= "<h1><span class='glyphicon glyphicon-inbox'></span> Alertas Entrantes</h1> ";
   h+= "</div>";
  // $.getJSON("Recursos/Json/Alerta.json", function(datos) {Leído
    var ajaxurl = "https://api-rest-beacons.herokuapp.com/alertas/"+id_paciente;
    $.get(ajaxurl, function(datos, status){
    var total_alertas_json = Object.keys(datos["alertas"][0]).length;
    var total_nuevos = 0;
    for(var i =0; i<total_alertas_json; i++){
        var estado = datos["alertas"][0][i].Estado;
        console.log(estado);

if(estado =='Nuevo'){
    total_nuevos = total_nuevos+1;
   h +="<div class='panel panel-default'>";
   h +="<div class='panel-heading'>";
   h +="<h4 class='panel-title'>";
   h +="<a  onclick='MarcarAlerta("+datos["alertas"][0][i].id_Alerta+")' data-toggle='collapse' data-parent='#accordion' href='#collapse"+i+"'> <span class='glyphicon glyphicon-comment'> </span>   "+datos["alertas"][0][i].Tipo+" en "+datos["alertas"][0][i].Lugar+"</a>";
   h +="</h4>";
   var fecha = datos["alertas"][0][i].Fecha.substr(0, 16).replace('T','');
   var fecha1 =fecha.substr(0,10);
   var fecha2 =fecha.substr(10,15); ;
   h +="<div style='text-align:right'>"+fecha1+" "+fecha2+"</div>";//Fecha
   h +="</div>";
   h +="<div id='collapse"+i+"' class='panel-collapse collapse'>";
   h +="<div class='panel-body'>";
   h +="<div class='media'>";
   h +="<div class='media-left'>";
   h +="<img src='Recursos/Imagen/img_avatar3.png' class='media-object' style='width:60px'>";
   h +="</div>";
   h +="<div class='media-body'>";
   h +="<h4 class='media-heading'>Bot</h4>";
   var hora = datos["alertas"][0][i].Fecha.toString().substr(11,5);
   h +=datos["alertas"][0][i].Descripcion +" "+hora;
   h +="</div>";
   h +="</div>";
   h +="</div></div></div></div>";
 
   console.log(total_nuevos);
}
if(total_nuevos == 0){
    h +="<h1>No hay Alertas Disponibles</h1>";
}
    }
$('#Contenedor_total').html(h);
 });
}
function CargarAlertasLeidas(id_paciente){

    $("#Contenedor_total").show();
    $("#Contenedor_carrusel").hide();
     h = "";
     h += "<div class='panel-group' id='accordion'>";
     h+= "<div class='page-header'>";
     h+= "<h1><span class='glyphicon glyphicon-inbox'></span> Alertas Entrantes</h1> ";
     h+= "</div>";
    // $.getJSON("Recursos/Json/Alerta.json", function(datos) {
      var ajaxurl = "https://api-rest-beacons.herokuapp.com/alertas/"+id_paciente;
      $.get(ajaxurl, function(datos, status){
      var total_alertas_json = Object.keys(datos["alertas"][0]).length;
      var total_nuevos = 0;
      for(var i =0; i<total_alertas_json; i++){
          var estado = datos["alertas"][0][i].Estado;
          console.log(estado);
  
  if(estado =='Leído'){
      total_nuevos = total_nuevos+1;
     h +="<div class='panel panel-default'>";
     h +="<div class='panel-heading'>";
     h +="<h4 class='panel-title'>";
     h +="<a data-toggle='collapse' data-parent='#accordion' href='#collapse"+i+"'> <span class='glyphicon glyphicon-comment'> </span>   "+datos["alertas"][0][i].Tipo+" en "+datos["alertas"][0][i].Lugar+"</a>";
     h +="</h4>";
    var fecha = datos["alertas"][0][i].Fecha.substr(0, 16).replace('T','');
    var fecha1 =fecha.substr(0,10);
    var fecha2 =fecha.substr(10,15); ;
    h +="<div style='text-align:right'>"+fecha1+" "+fecha2+"</div>";//Fecha
     h +="</div>";
     h +="<div id='collapse"+i+"' class='panel-collapse collapse'>";
     h +="<div class='panel-body'>";
     h +="<div class='media'>";
     h +="<div class='media-left'>";
     h +="<img src='Recursos/Imagen/img_avatar3.png' class='media-object' style='width:60px'>";
     h +="</div>";
     h +="<div class='media-body'>";
     h +="<h4 class='media-heading'>Bot</h4>";
     var hora = datos["alertas"][0][i].Fecha.toString().substr(11,5);
     h +=datos["alertas"][0][i].Descripcion +" "+hora;
     h +="</div>";
     h +="</div>";
     h +="</div></div></div></div>";
   
     console.log(total_nuevos);
  }
      }
      if(total_nuevos == 0){
        h +="<h1>No hay Alertas Disponibles</h1>";
    }
  $('#Contenedor_total').html(h);
   });
  }

function CrearTablaBeacon(){
    var codigo = "";
    url = 'https://api-rest-beacons.herokuapp.com/beacon';
    datos = {};
    $.ajax({
                crossOrigin: true,
                type: 'GET',
                url: url,            
                data: datos,
                contentType: 'application/json; utf-8',
                dataType: 'json',
                success: function (data) {
                    var total = Object.keys(data.beacons[0.]._id).length
                    for (var i =0;i<total; i++){
                    codigo += "<tr>";
                    codigo += "<td style='display:none;'>"+data.beacons[i]._id+"</td>";
                    alert(data.beacons[i]._id);
                    codigo += "<td class='TextCenter'>"+data.beacons[i].nombre+"</td>";
                    codigo += "<td class='TextCenter'>"+data.beacons[i].usuario+"</td>";
                    codigo += "<td class='TextCenter'>"+data.beacons[i].fecha+"</td>";
                    codigo += "</tr>"; 
                        } 
                    $("#myTable").html(codigo);
                },
                error: function (jqXHR, textStatus, errorThrown) {                
                }
     
            });    
    }
	

function CrearHome(){
 $("#Contenedor_carrusel").show();
 $("#Contenedor_total").hide();
}

function DesaparecerAlerta(id){
$("#"+id).html("");
$("#"+id).hide();
}
function aparecerAlerta(id,texto){
$("#"+id).html(texto);
$("#"+id).show();
}

function sonar(){
  $('audio')[0].play();
}

function salir(){
    location.href ="index.html";
}


function CreaPerfil(){
    $("#Contenedor_carrusel").hide();
    $("#Contenedor_total").show();
     var codigo = "";
     codigo += "<div class='page-header'>";
     codigo +="<h1>Información Usuario</h1>";
     codigo +="</div>";
     codigo +="<div class='form-group' style='width: 50%;''></div>";
     codigo +="<label>Usuario</label>";
     codigo +="<input type='text' class='form-control' id='email' readonly value='rahumada'></input>";
     codigo +="</div>";
     codigo +="<div class='form-group' style='width: 50%;''></div>";
     codigo +="<label>Email</label>";
     codigo +="<input type='text' class='form-control' id='email' readonly value='rahumada@gmail.com'></input>";
     codigo +="</div>";
     codigo +="<div class='form-group' style='width: 50%;''></div>";
     codigo +="<label>Rut</label>"
     codigo +="<input type='text' class='form-control' id='email' readonly value='15.235.345-K'></input>";
     codigo +="</div>";
     codigo +="<div class='form-group' style='width: 50%;''></div>";
     codigo +="<label>Estado</label>";
     codigo +="<input type='text' class='form-control' id='email' readonly value='Vigente'></input>";
     codigo +="</div>";
     codigo +="<div class='form-group' style='width: 50%;''></div>";
     codigo +="<label>Genero</label>";
     codigo +="<input type='text' class='form-control' id='email' readonly value='Masculino'></input>";
     codigo +="</div>";
  $("#Contenedor_total").html(codigo);
}


function entrar(){
    var user = $("#txtuser").val();
    var pass = $("#txtpass").val(); 
   // var acceso = ValidaAcceso(user,pass);
	
	//$.getJSON("Recursos/Json/usuario.json", function(datos) {
	//	var confirm_usuario =datos["usuario"][0].usuario;
	//  var confirm_password =datos["usuario"][0].password;
		 if(user =="rahumada"){
		 if(pass =="rahumada1"){
		 location.href ="tabla.html";
		 }
		 else{
			 var error = "<strong>Error!</strong> clave incorrecta.";
			 aparecerAlerta("alerta_login",error);
		 }
		 }
		 else{
			 var error = "<strong>Error!</strong> usuario incorrecto.";
			 aparecerAlerta("alerta_login",error);
		 }
     //if(acceso == true){
     //   window.location.href = "Paginas/header.html";
     //}
	//  });
}


function MarcarAlerta(id){
console.log('marque el id : '+ id);

var url="https://api-rest-beacons.herokuapp.com/alerta/"+id;
$.post(url, function(data, status){
 console.log(data);
 });
}
