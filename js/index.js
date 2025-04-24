import Toilet_brussels from "./Toilet_brussels.js";
let map; // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
let marker;

const toilets = [];

init();
function init() {

    // initialise de kaart
    map = L.map('map').setView([50.845592037925236, 4.357117854448892], 13);
    // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
    // vergeet openstreetmap attributie niet
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    loadMarkers();
    // gebruik de functie "loadMarkers" om de markers toe te voegen
}

function loadMarkers() {
    const URL = 'https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/urinoirs-publics-vbx/records?limit=60';



    // markers voor kampus kaai:
    marker = L.marker([50.84230664666188, 4.322904538616672]).addTo(map)
    marker.bindPopup("<b>campus Kaai</b><br>interesse in technologie?").openPopup();
    let circle = L.circle([50.84230664666188, 4.322904538616672], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
    }).addTo(map);


    // fetch de data van opendata.brussels.be
    fetch(URL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            console.log('Parsed JSON response:', data);
            data.results.forEach(function (toilet) {
                console.log(toilet)
                const WC = new Toilet_brussels(toilet.geo_point_2d.lat, toilet.geo_point_2d.lon);
                // console.log(toilet.geo_point_2d.lat);
                addMarker(WC._lat, WC._lon)
            })
        })


    // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart

}

function addMarker(lat, lon) {
    // voeg een marker toe op lat, lon
    let markerWc = L.marker([lat, lon]).addTo(map)
    markerWc.bindPopup("I am a toilet").openPopup();
}