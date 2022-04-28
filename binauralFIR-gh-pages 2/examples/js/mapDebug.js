function initMap(pos, lat, lon, zoom = 20) {
    lat = pos.coords.latitude
    lon = pos.coords.longitude
    console.log(pos);
    let MAP = L.map('map').setView([lat, lon], 20);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYW50b2luZTk4IiwiYSI6ImNsMGprazdncDAxYzYzZWxhbzRlcWk2NDkifQ.JM4Xgke091LLntRvk9UbrA'
    }).addTo(MAP);


    return MAP
}

function panMap(pos, myMap, lat, lon, zoom = 20) {
    lat = pos.coords.latitude
    lon = pos.coords.longitude
    myMap.panTo(new L.LatLng(lat, lon));

    document.getElementById("location").innerHTML = "lat : " + lat;
}
function error(err) {
    console.warn(`ANTOINE --- ERREUR (${err.code}): ${err.message}`);
}


//  -------------- INTERCTION ---------------
function initInteractionMap(map) {
    map.on('click', posClic => {
        addPin(posClic.latlng, map);
        createData(posClic.latlng);
    })
}
function addPin(coords, map) {
    L.marker(coords).addTo(map);
}
function createData(coords) {
    const bubbleElement = {
        type: "parc",
        instrument: "bass",
        coords: coords,
    }
    PARAMS.bubble.push(bubbleElement)
    console.log(PARAMS.bubble);
}
//  ------------- /INTERCTION ---------------


// const tempData = [
//     [
//         0 = {
//             coords: { lat: 46.537546230038906, lng: 6.587952153640801 },
//             instrument: "bass",
//             type: "parc",
//         }
//     ],
//     [
//         1 = {
//             coords: { lat: 46.53702186676876, lng: 6.587911920505576 },
//             instrument: "bass",
//             type: "parc",
//         }
//     ],
//     [
//         2 = {
//             coords: { lat: 46.53676337596946, lng: 6.588831918197684 },
//             instrument: "bass",
//             type: "parc",
//         }
//     ],
// ]
