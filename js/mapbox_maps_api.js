"use strict";


mapboxgl.accessToken = MAP_KEY;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-114.0260845, 34.4196947], // starting position [lng, lat]
    zoom: 8, // starting zoom
});


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// copied geocode function. returns longitude and latitude
function geocode(search, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            return res.json();
        }).then(function(data) {
            return data.features[0].center;
        });
}
// function to animate a marker
let userMarker = new mapboxgl.Marker();
let bouncing
let count
const animateMarker = timestamp => {
    count++
    console.log(count);
    bouncing = map.getCenter()
    // change radius based on current zoom level
    let radius = (0.0000342857*Math.pow(map.getZoom(), 2)) - (0.00134229*map.getZoom()) + 0.01317;

    // set marker coords based on radius
        userMarker.setLngLat([
        bouncing.lng,
        (Math.abs(Math.sin(timestamp / 240) * radius)) + bouncing.lat
    ]);
    userMarker.addTo(map);
   // repeat function per frame

    if (count < 201) {
        requestAnimationFrame(animateMarker);
    }
}



const currentMarkers =[]
const resturants = [
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
resturants.forEach((e, i) => {

        // //creating element to add background image and other style to
        let el = document.createElement("div");
        el.className = "marker";


        // creating marker with element as well as image and style
        let restaurantMarker = new mapboxgl.Marker(el);
        currentMarkers.push(restaurantMarker);

        // creating popup with restaurant information
        let restaurantPopup = new mapboxgl.Popup().setHTML(`
                    <h3>${e.name}</h3>
                    <p>${e.address}</p>
                    <p>${e.foodType} Food</p>
                    <p>${e.review}</p>
                    <img src="${e.img}" height="50px" width="50px">
                `);

        // running geocode function to find lng and lat coordinates from address
        geocode(e.address, MAP_KEY).then(result => {
            restaurantMarker.setLngLat(result).addTo(map).setPopup(restaurantPopup);
            map.setZoom(11);
            i === 0 ? map.setCenter(result) : false;
        });
    });

//zoom level selector

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
        requestAnimationFrame(animateMarker);

    })
})
//Add button to hide all markers

document.querySelector('#hide').addEventListener('click', () =>{
    currentMarkers.forEach(point => {
        point.remove();
    });
})