"use strict";

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.52792182615209, lng: 127.03320936242041 },
    zoom: 7,
    streetViewControl: false,
  });

  let markers = stores.properties;

  for (var x = 0; x < markers.length; x++) {
    let storeInfo = markers[x].info;
    let longitude = markers[x].coordinates.longitude;
    let latitude = markers[x].coordinates.latitude;

    dropMarker(latitude, longitude, storeInfo);
  }
}

function dropMarker(lat, lng, info) {
  var { name, address, schedule, storeNumber } = info;
  var location = { lat: lat, lng: lng };
  var contentString = `
  <h4>${name}<h4>
  <p>Address : ${address}</p>
  <p>${schedule.dayName} ${schedule.hours}</p>
  <p>${storeNumber}</p>
  `;
  var infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: info.name,
  });
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}
