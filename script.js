const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');

const distance = (lat1, lon1, lat2, lon2) => {
    let p = Math.PI / 180;
    let a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) / 2;
    return 12742 * Math.asin(Math.sqrt(a));
};

const punjaguttaCoordinates = [78.4505, 17.4254];


if (Notification.permission === "granted") {
    console.log("Notification Permission Granted");

} else {
    Notification.requestPermission().then(permission => {
        console.log(Notification.permission);
    }, error => {
        console.log(error);
    })
}

const showNotification = (msg) => {
    const notification = new Notification("Message from Parking", {
        body: msg,
        icon: "data:image/jpeg;base64,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"
    });
};

axios.get('https://us1.locationiq.com/v1/reverse.php?key=pk.629271cbc64c8b6d80b0f7b849b3caea&lat=' + punjaguttaCoordinates[1] + '&lon=' + punjaguttaCoordinates[0] + '&format=json')
    .then((response) => {
        let addr = response.data.display_name;
        document.getElementById('parkingAddress').innerHTML = addr;
    })
    .catch((error) => {
        console.log(error);
    });

locationiq.key = 'pk.629271cbc64c8b6d80b0f7b849b3caea';

var map = new mapboxgl.Map({
    container: 'map',
    attributionControl: false, //need this to show a compact attribution icon (i) instead of the whole text
    zoom: 12,
    center: punjaguttaCoordinates
});
var marker = new mapboxgl.Marker().setLngLat(punjaguttaCoordinates).addTo(map);

//Define layers you want to add to the layer controls; the first element will be the default layer
var layerStyles = {
    "Streets": "streets/vector",
    "Satellite": "earth/raster"
};


map.addControl(new locationiqLayerControl({
    key: locationiq.key,
    layerStyles: layerStyles
}), 'top-left');

const success = (position) => {
    console.log("location channged");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let area = '';
    status.textContent = '';
    axios.get('https://us1.locationiq.com/v1/reverse.php?key=pk.629271cbc64c8b6d80b0f7b849b3caea&lat=' + latitude + '&lon=' + longitude + '&format=json')
        .then(function (response) {
            area = response.data.address.county;
            mapLink.textContent = `${area} Latitude: ${latitude} °, Longitude: ${longitude} °`;
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    if (distance(punjaguttaCoordinates[1], punjaguttaCoordinates[0], latitude, longitude) <= 3) {
        // alert("Parking Slots available in range at punjagutta");
        document.getElementById('map').style.top = '530px';
        showNotification("Slots available near your area");
        document.getElementById('display').style.display = "none";
        document.getElementById('form').style.display = "block";
    } else {
        showNotification("Parking slots not available in range");
        document.getElementById('display').style.display = "block";
        document.getElementById('form').style.display = "none";
    }

   
    var marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    mapLink.textContent = `${area} Latitude: ${latitude} °, Longitude: ${longitude} °`;
}

const error = () => {
    status.textContent = 'Unable to retrieve your location';
}

const geoFindMe = () => {

    mapLink.href = '';
    mapLink.textContent = '';

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });
    }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
document.getElementById('find-me').click();


var firebaseConfig = {
    apiKey: "AIzaSyAhKHrs5xHLeGOa8gT8tFdEmyfMzdXNfSM",
    authDomain: "parking-tracker-iot.firebaseapp.com",
    databaseURL: "https://parking-tracker-iot-default-rtdb.firebaseio.com",
    projectId: "parking-tracker-iot",
    storageBucket: "parking-tracker-iot.appspot.com",
    messagingSenderId: "348247255039",
    appId: "1:348247255039:web:bf3c05c459d530e446a9ca",
    measurementId: "G-HWJCKG43SM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// mundu mottam fetch chedam soo slots tisedam

let ref = firebase.database().ref();
ref.on("value", (snapshot) => {
    // console.log(snapshot.val());
    let data = snapshot.val();
    let avail_slots = data.slots;
    document.getElementById('avail').innerHTML = avail_slots;
    document.getElementById('filled').innerHTML = 4 - avail_slots;
    if (avail_slots == 0) {
        document.getElementById('full-check').innerHTML = "All slots filled";
    } else {
        document.getElementById('full-check').innerHTML = "";
    }
}, (error) => {
    console.log(error);
});
