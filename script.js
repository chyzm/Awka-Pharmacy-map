// Map initialization
var map = L.map('map').setView([6.2220, 7.0821], 13);  // Awka, Anambra

// Base layers
var myMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// Marker icon
var myIcon = L.icon({
    iconUrl: '/img/map-marker.webp',
    iconSize: [40, 40],
});

// Hospital data
var hospitals = {
    "alpha": {
        name: "Alpha Pharmacy & Stores",
        coords: [6.221066941461143, 7.0646222],
        info: "Your one-stop shop for medication and groceries. No 1 Golphins Close, UNIZIK Temp Site, By, Nourisha Fast Food, Awka, Anambra, Nigeria. +234 906 244 0941"
    },
    "wecare": {
        name: "We Care Pharmacy",
        coords: [6.21832575483075, 7.07578011998425],
        info: "Zik Ave, Awka, Anambra, Nigeria"
    },
    "wisdom": {
        name: "Wisdom pharmacy",
        coords: [6.217819617816522, 7.0604277382495955],
        info: "70 by kwata flyover awka, Awka, Anambra, Nigeria.  +234 706 049 5837"
    },
    "right": {
        name: "Righthealth Pharmacy & Stores",
        coords: [6.227160038909047, 7.080244553025684],
        info: "1 Uche ekwunife crescent, kwata flyover, Awka 65 ziks avenue, st mattews catholic church, amawbia Freedom Plaza, Amaku Teaching Hospital, Road, Awka, Anambra, Nigeria.  +234 901 915 0501"
    },
    "joez": {
        name: "Joez pharmacy",
        coords: [6.220193680275222, 7.086069996852828],
        info: "1 Zik Ave, Awka, Anambra, Nigeria. +234 813 749 3033"
    },
    
};

// Create markers and add to map
var markers = {};
var markerGroup = L.layerGroup().addTo(map);

Object.keys(hospitals).forEach(function(key) {
    var hospital = hospitals[key];
    markers[key] = L.marker(hospital.coords, {icon: myIcon})
        .bindPopup(`<b>${hospital.name}</b><br>${hospital.info}`)
        .addTo(markerGroup);
});

// Layer Control
var baseMaps = {
    "OpenStreetMap": myMap,
    "Google Street": googleStreets,
    "Google Satellite": googleSat
};

L.control.layers(baseMaps, null).addTo(map);

// Hospital selection handler
document.getElementById('hospital-select').addEventListener('change', function(e) {
    var selected = e.target.value;
    var infoDiv = document.getElementById('hospital-info');
    
    if (selected && hospitals[selected]) {
        var hospital = hospitals[selected];
        
        // Center map on selected hospital
        map.setView(hospital.coords, 16);
        
        // Open popup
        markers[selected].openPopup();
        
        // Show additional info
        infoDiv.innerHTML = `<h3>${hospital.name}</h3><p>${hospital.info}</p>`;
        infoDiv.style.display = 'block';
    } else {
        infoDiv.style.display = 'none';
    }
});

// Hide preloader when map is ready
map.whenReady(function () {
    document.getElementById('preloader').style.display = 'none';
});