var poly;
var map;
var circle;
var bool=0;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 48.879, lng: 18.624}  // center on europe
  });

  var makeCircle = map.addListener('click', addLatLng);
  /*
  google.maps.event.addListener(map, 'click', function(event) {
            addLatLng(event.latLng);
  })
  */
  /*
    google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
        });
  */
  //console.log(circle.getCenter());
  //google.maps.Circle.addListener('radius_changed', stableRadius);
  //circle.addListener('radius_changed', stableRadius);
}

//Preventing radius of circle be more than 50k and less than 10  
function stableRadius(event) {
  if (circle.radius>50000) {
	circle.radius = 50000;  
	console.log("radius set to 50000");
  }
  if (circle.radius<10) {
	circle.radius=10;
  }
  document.getElementById("rad").value=circle.radius;
  //console.log(circle.radius);  
}
  
function placeMarker(location) {

    if (marker === undefined){
        marker = new google.maps.Circle({
            position: location,
            map: map, 
            animation: google.maps.Animation.DROP,
        });
    }
    else{
        marker.setPosition(location);
    }
    map.setCenter(location);

        }  
//getting langtitiude and latitude of circle  
function getLatLng(event) {
	//console.log("Lat: "+circle.getCenter().lat());
	//console.log("Lng: "+circle.getCenter().lng());
	document.getElementById("lat").value = circle.getCenter().lat();
	document.getElementById("lng").value = circle.getCenter().lng();
  
}
  
  
// Handle click on a map, adds a circle on map.
function addLatLng(event) {
    
  if(circle !== undefined){
     circle.setMap(null);
     bool = 0;
  }

  if (bool===0) {
   circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: event.latLng,
      radius: 50000,
      draggable: true,
	  editable: true
    });
    bool = 1;
	document.getElementById("rad").value=circle.radius;
	document.getElementById("lat").value=circle.getCenter().lat();
	document.getElementById("lng").value=circle.getCenter().lng();	
	}

  circle.addListener('radius_changed', stableRadius);
  circle.addListener('center_changed', getLatLng);
  circle.addListener('drag', getLatLng);

}

function sendCircleData(lat, lng, rad) {
     
    bool = 1
    circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: {lat: parseFloat(lat), lng: parseFloat(lng)},
      radius: parseFloat(rad),
      draggable: true,
	  editable: true
    });   
    
    document.getElementById("rad").value=circle.radius;
	document.getElementById("lat").value=circle.getCenter().lat();
	document.getElementById("lng").value=circle.getCenter().lng();	
	
    circle.addListener('radius_changed', stableRadius);
    circle.addListener('center_changed', getLatLng);
    circle.addListener('drag', getLatLng);

}