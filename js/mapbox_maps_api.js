"use strict";

// (() => {

mapboxgl.accessToken = MAP_KEY;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: `mapbox://styles/mapbox/dark-v11`, // style URL
    center: [-114.0260845, 34.4196947], // starting position [lng, lat]
    zoom: 8, // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// create and animate a marker variable with zoom
let userMarker = new mapboxgl.Marker();
let bouncing
let count

function animateMarker(timestamp) {
    count++

    let radius = (0.0000003 * Math.pow(map.getZoom(), 2));

    userMarker.setLngLat([
        bouncing.lng,
        (Math.abs(Math.sin(timestamp / 240) * radius)) + bouncing.lat
    ]);

    if (count < 200) {
        requestAnimationFrame(animateMarker);
    } else {
        userMarker.setLngLat(bouncing).addTo(map);
    }

}


const currentMarkers = []
const restaurants = [
    {
        name: "Abuelo's Mexican Restaurant",
        address: "16092 N Arrowhead Fountains Center Dr, Peoria, AZ 85382",
        foodType: "TexMex",
        review: "Best Tex Mex in Phoenix",
        img: "../img/abuelos.jpg"
    },
    {
        name: "The 5 Point Cafe",
        address: "415 Cedar St, Seattle, WA 98121",
        foodType: "American Fare",
        review: "Mens restroom has a parascope over the urinal to view the space needle",
        img: "../img/5point.jpg"
    },
    {
        name: "I Don't Care",
        address: "11015 E 590 Rd, Catoosa, OK 74015",
        foodType: "American Fare",
        review: "just the name, the food was average",
        img: "../img/IDC.png"
    }
]
//place markers with custom marker for 3 restaurants
restaurants.forEach((item, i) => {

    let el = document.createElement("div");
    el.className = "marker";


    let restaurantMarker = new mapboxgl.Marker(el);
    currentMarkers.push(restaurantMarker);

    let restaurantPopup = new mapboxgl.Popup().setHTML(`
                    <h3 class="popup">${item.name}</h3>
                    <p class="popup">${item.address}</p>
                    <p class="popup">${item.foodType} Food</p>
                    <p class="popup">${item.review}</p>
                    <img src="${item.img}" class="img">
                `);

    geocode(item.address, MAP_KEY).then(result => {
        restaurantMarker.setLngLat(result).addTo(map).setPopup(restaurantPopup);
        map.setZoom(11);
        i === 0 ? map.setCenter(result) : false;
    });
});

// create a zoom selector
let zoom = document.querySelector('#zoom-level')
zoom.addEventListener('change', () => {
    let zoomLevel = zoom.value
    map.setZoom(zoomLevel);
})
// Add a text box for the user to enter an address that will use geocoding to center the map and place a marker on that location.
let address = document.querySelector('#address')
let addressButton = document.querySelector('#submit')

addressButton.addEventListener('click', () => {
    let userAddress = address.value
    geocode(userAddress, MAP_KEY).then(result => {
        currentMarkers.push(userMarker);
        userMarker.setLngLat(result).addTo(map);
        map.setCenter(result);
        map.setZoom(17);
        count = 0;
        bouncing = map.getCenter();
        requestAnimationFrame(animateMarker);

    })
})
//Add button to hide all markers

document.querySelector('#hide').addEventListener('click', () => {
    currentMarkers.forEach(point => {
        point.remove();
    });
})
// })()