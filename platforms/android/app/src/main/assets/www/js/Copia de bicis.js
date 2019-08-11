// delimitar el mapa
//var corner1 = L.latLng(41.416444, 2.117488);//topLeft
var corner1 = L.latLng(41.42921, 2.07461); 
corner2 = L.latLng(41.328847, 2.232844);//bottomRight
bounds = L.latLngBounds(corner1, corner2);

//centrar el mapa
var map = L.map('map', {
    center: [41.4081232,2.17089],
    zoom: 15,
    minZoom: 14,
    maxZoom: 17,
    maxBounds: bounds,
});

//declarar que el mapa es local
var OpenStreetMap_Mapnik = L.tileLayer('tiles/{z}/{x}/{y}.png'//, {
//var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
									  );
OpenStreetMap_Mapnik.addTo(map);


// atributos del puntero de la ubicación
var puntero = L.icon({
    iconUrl: 'miubicacion.png',
   iconSize:     [15, 15], // size of the icon
popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

// icono importantes
var importante = L.icon({
	iconUrl: 'js/images/marker-icon-reed.png',
	shadowUrl: 'js/images/marker-shadow.png',
	iconSize:     [25, 41], // size of the icon
	shadowSize:   [41, 41],
	shadowAnchor: [13, 20],
	popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

//mi ubicacion
marker = L.marker([41.4081232,2.17089], {icon: puntero}).addTo(map).bindPopup("<h1>Usted esta aquí</h1>");

var watchProcess = null;
 
function init_watch_position() {
    //document.getElementById("centrar").innerHTML = "<p>Locating...</p>";
 
    var geo_options = {enableHighAccuracy:true, maximumAge:30000, timeout:27000};
 
    if (navigator.geolocation) {
        // geolocation IS available
        if (watchProcess == null) {  
            watchProcess = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);  
        }  
    } else {
        // geolocation IS NOT available
        geo_is_not_available();  
    }
}


function funcion_remover() {
map.removeLayer(marker);
}
	
function geo_success(position) {	
	funcion_remover();	
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy  = position.coords.accuracy;
	var latlon = latitude + "," + longitude;
	var latlng = ([position.coords.latitude,position.coords.longitude]);

// document.getElementById("centrar").innerHTML = '<p>Latitude: ' + latitude + '&deg;<br>Longitude: ' + longitude + '&deg;<br>Accuracy: ' + accuracy + ' m</p>';
	
	marker = L.marker([position.coords.latitude,position.coords.longitude], {icon: puntero}, {draggable: true}).addTo(map).bindPopup("<h2>Usted esta aquí</h2>");
	marker.openPopup();
	
	setTimeout(function() {
            marker.closePopup();
        }, 3000);

	var cont = bounds.contains(latlng);
		if (cont==false){
			 document.getElementById('mensaje').innerHTML="Su ubicación no se encuentra en el rango del mapa <br />";
			}


	$( "div.centrar" ).on({
    click: function() {
    map.setView([position.coords.latitude,position.coords.longitude]);
  }
});   
}

function geo_error(error) {
    document.getElementById("out").innerHTML = '<p>ERROR(' + error.code + '): ' + error.message + '</p>';
}
 
function geo_is_not_available() {
    document.getElementById("out").innerHTML = "<p>Geolocation is not supported by your browser</p>";
}
