// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

window.onload = function() {
    // TODO:: Do your initialization job
    // Animate loader off screen
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                window.location.href = "../templates/weddingSettings.html";
            } catch (ignore) {}
        }
    });
};

var map;
var marker;
var infoWindow;
var messagewindow;
var next = false;
function initMap() {
    var data = JSON.parse(localStorage.getItem('data'));
    var wedding = data.wedding;
    let name = wedding.placeName;
    let address = wedding.placeAddress;
    let type = wedding.placeType;
    let lat = wedding.placeLat;
    let lng = wedding.placeLng;
    var nameElement = document.getElementById('name');
    var addressElement = document.getElementById('address');
    var typeElement = document.getElementById('type');
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 10
    });

    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('form')
    });

    messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });

    google.maps.event.addListener(map, 'click', function(event) {

        marker.setPosition(event.latLng);
        marker.setMap(map);
        infoWindow.open(map, marker);
        messagewindow.close();
        if (event.placeId) {
            var service = new google.maps.places.PlacesService(map);
            service.getDetails({
                placeId: event.placeId
            }, function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log(place.name);
                    console.log(place.formatted_address);
                    console.log(place.types[0]);
                }
            });
        }
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
            messagewindow.close();
        });
    });
    if (name && address && type && lat && lng){
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        var center =new google.maps.LatLng({lat ,lng });
        infoWindow.setPosition(center);
        marker = new google.maps.Marker({
            position: center,
            map: map
        });
        infoWindow.open(map, marker);
        messagewindow.close();
        map.setCenter(center);
        nameElement.value = name;
        typeElement.value = type;
        addressElement.value = address;
    } else {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infoWindow.setPosition(pos);
                marker = new google.maps.Marker({
                    position: pos,
                    map: map
                });
                infoWindow.open(map, marker);
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    marker = new google.maps.Marker({
        position: pos,
        map: map
    });
    infoWindow.open(map,marker);
}

function saveData() {
    var errorname = document.getElementById('errorname');
    var erroraddress = document.getElementById('erroraddress');
    var errorsaved = document.getElementById('errorsaved');
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var type = document.getElementById('type').value;
    var latlng = marker.getPosition();
    if (name === "" && address ===""){
        errorname.style.display = 'block';
        erroraddress.style.display = 'block';
    }
    else   if (name === ""){
        errorname.style.display = 'block';
        erroraddress.style.display = 'none';
    }
    else if ( address ==="") {
        erroraddress.style.display = 'block';
        errorname.style.display = 'none';
    } else {
        next = true;
        errorsaved.style.display = 'none';
        erroraddress.style.display = 'none';
        errorname.style.display = 'none';
        var data = JSON.parse(localStorage.getItem('data'));
        var wedding = data.wedding;
        wedding.placeName = name;
        wedding.placeAddress = address;
        wedding.placeType = type;
        wedding.placeLat = latlng.lat();
        wedding.placeLng = latlng.lng();
        localStorage.setItem("data", JSON.stringify(data));
        infoWindow.close();
        messagewindow.open(map, marker);
    }

}
function goUpdate() {
    next = false;
    infoWindow.open(map, marker);
    messagewindow.close();
}
function goNext() {
    var errorsaved = document.getElementById('errorsaved');
    if (!next) {
        errorsaved.style.display = 'block';
    }else {
        window.location.href = "../templates/weddingSettings.html";
    }
}

