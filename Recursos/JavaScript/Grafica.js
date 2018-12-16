function GetNumeroAlertasRecientes(contenedor,id_paciente){

    var ruta = "";
    var codigo = "";
	var total_alertas = $("#numero").text();
	
   
	$.getJSON("Recursos/Json/Alertas.json", function(datos) {
		var total_alertas_json = Object.keys(datos["alertas"]).length;
		if(total_alertas != total_alertas_json){
	    codigo +="<a class='dropdown-toggle' data-toggle='dropdown' href='#'>";
                        codigo +="<span class='glyphicon glyphicon-comment'>";
						codigo +="<span class='badge' id='numero'>"+total_alertas_json+"</span>";
                       codigo +="</a>";
                       codigo +="<ul class='dropdown-menu'>";
                        codigo +="<li onclick='CargarAlertas();'><a  href='#'><div id='btn_entrante'><span class='glyphicon glyphicon-inbox' id='numero_entrante'></span>&nbspEntrantes&nbsp<span class='badge'>"+total_alertas_json+"</span></div></a></li>";
                        codigo +="<li><a href='#' ><span class='glyphicon glyphicon-inbox'></span>&nbspLeidos&nbsp<span class='badge'>100</span></a></li>";
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
					   codigo +="<span class='badge' id='numero'>"+total_alertas_json+"</span>";
                       codigo +="</a>";
                       codigo +="<ul class='dropdown-menu'>";
                       codigo +="<li onclick='CargarAlertas();'><a  href='#'><div id='btn_entrante'><span class='glyphicon glyphicon-inbox' id='numero_entrante'></span>&nbspEntrantes&nbsp<span class='badge'>"+total_alertas_json+"</span></div></a></li>";
                       codigo +="<li><a href='#' ><span class='glyphicon glyphicon-inbox'></span>&nbspLeidos&nbsp<span class='badge'>100</span></a></li>";
                       codigo +="</ul>";
                       $("#"+contenedor).html(codigo);
					   console.log('no es distintos');
		}
	});
}

function CargarAlertas(){
   h ="";
   h+= "<div class='page-header'>";
   h+= "<h1><span class='glyphicon glyphicon-inbox'></span> Alertas Entrantes</h1> ";
   h+= "</div>";
   $.getJSON("Recursos/Json/Alertas.json", function(datos) {
    var total_alertas_json = Object.keys(datos["alertas"]).length;
    for(var i =0; i<total_alertas_json; i++){
   h +="<div class='panel panel-default'>";
   h +="<div class='panel-heading'>";
   h +="<h4 class='panel-title'>";
   h +="<a data-toggle='collapse' data-parent='#accordion' href='#collapse"+i+"'> <span class='glyphicon glyphicon-comment'> </span>   "+datos["alertas"][i].asunto+"</a>";
   h +="</h4>";
   h +="</div>";
   h +="<div id='collapse"+i+"' class='panel-collapse collapse'>";
   h +="<div class='panel-body'>";
   h +="<div class='media'>";
   h +="<div class='media-left'>";
   h +="<img src='Recursos/Imagen/img_avatar3.png' class='media-object' style='width:60px'>";
   h +="</div>";
   h +="<div class='media-body'>";
   h +="<h4 class='media-heading'>Bot</h4>";
   h +=datos["alertas"][i].mensaje;
   h +="</div>";
   h +="</div>";
   h +="</div></div></div>";
   $('#accordion').html(h);
    }
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
	
  function sonar(){
    $('audio')[0].play();
  }
  
  $( "#btn_acceso" ).click(function() {
    var user = $("#txtuser").val();
    var pass = $("#txtpass").val(); 
   // var acceso = ValidaAcceso(user,pass);
	
	$.getJSON("Recursos/Json/usuario.json", function(datos) {
		var confirm_usuario =datos["usuario"][0].usuario;
		var confirm_password =datos["usuario"][0].password;
		 if(user ==confirm_usuario){
		 if(pass ==confirm_password){
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
	  });
  });

function CrearHome(){
 var codigo = "";
 codigo += "<div id='myCarousel' class='carousel slide' data-ride='carousel'>";
 codigo += "<ol class='carousel-indicators'>";  
 codigo += "<li data-target='#myCarousel' data-slide-to='0' class='active'></li>";   
 codigo += "<li data-target='#myCarousel' data-slide-to='1'></li>";  
 codigo += "<li data-target='#myCarousel' data-slide-to='2'></li>";    
 codigo += "</ol>";   
 codigo += "<div class='carousel-inner'>";     

    

      <div class="item active">
        <img src="Recursos/Imagen/001.jpg" alt="Los Angeles" style="width:100%;">
        <div class="carousel-caption">
         <!-- <h3>Los Angeles</h3>-->
          <p>La enfermedad de Alzheimer es una enfermedad 
		     neurodegenerativa que se manifiesta como deterioro 
			 cognitivo y trastornos conductuales. 
			 Se caracteriza en su forma típica por una pérdida 
			 de la memoria inmediata y de otras capacidades mentales</p>
        </div>
      </div>

      <div class="item">
        <img src="Recursos/Imagen/002.jpg" alt="Chicago" style="width:100%;">
        <div class="carousel-caption">
          <!--<h3>Chicago</h3>-->
          <p>La enfermedad de Alzheimer es la forma más común de demencia,
		  es incurable y terminal, y aparece con mayor frecuencia en personas mayores de 65 años de edad
		  aunque también en raros casos puede desarrollarse a partir de los 40 años
		  </p>
        </div>
      </div>
    
      <div class="item">
        <img src="Recursos/Imagen/003.jpg" alt="New York" style="width:100%;">
        <div class="carousel-caption">
          <!--<h3>New York</h3>-->
          <p>Por lo general, el síntoma inicial es la inhabilidad de adquirir nuevos recuerdos, 
		  pero suele confundirse con actitudes relacionadas con la vejez o el estrés</p>
        </div>
      </div>
  
    </div>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
}
function DesaparecerAlerta(id){
$("#"+id).html("");
$("#"+id).hide();
}
function aparecerAlerta(id,texto){
$("#"+id).html(texto);
$("#"+id).show();
}
