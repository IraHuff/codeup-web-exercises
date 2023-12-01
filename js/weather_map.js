"use strict";
(() => {

    let lat
    let lng

    //function to get weather data based on lat lon
    function getData(x, y) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&appid=${WE_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                populateData(data)
            })
            .catch((e) => {
                console.error(e);
            });
    }

    //function to populate city and weather cards
    function populateData(parse) {
        let insert = document.querySelector('.cards')
        for (let i = 0; i < parse.list.length; i += 8) {
            let card = document.createElement('div');
            let selection = parse.list[i];
            card.innerHTML = `<p>Date: ${selection.dt_txt.slice(0, 10)}</p>
                           <p>Temp: ${selection.main.temp.toString().slice(0, 2)}℉</p>
                           <img src="http://openweathermap.org/img/w/${selection.weather[0].icon}.png">
                           <p>Weather: ${selection.weather[0].description}</p>`
            card.classList.add("card")
            insert.appendChild(card)
        }
    }

    function locationName(coordinates, apiKey) {
        reverseGeocode(coordinates, apiKey).then(result => {
            let insert = document.querySelector('.cards')
            let location = document.createElement('div')
            location.innerText = result
            location.classList.add("city")
            insert.appendChild(location)
            getData(coordinates.lat, coordinates.lng)
        })
    }

    lng = -92.48253417968736;
    lat = 39.73524785044066;
    const init =
        {lng, lat}
    locationName(init, MAP_KEY)


// draw map
    mapboxgl.accessToken = MAP_KEY;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: `mapbox://styles/mapbox/dark-v11`, // style URL
        center: [-92.51, 39.74], // starting position [lng, lat]
        zoom: 8, // starting zoom
    });

// Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());


    //draw marker
    const marker = new mapboxgl.Marker({draggable: true}).setLngLat([-92.51, 39.74]).addTo(map);

    function onDragEnd() {
        const lngLat = marker.getLngLat();
        lat = lngLat.lat;
        lng = lngLat.lng;
        let coords = {
            lng,
            lat
        }
        let insert = document.querySelector('.cards')
        if (insert.firstElementChild !== null) {
            while (insert.firstChild) {
                insert.removeChild(insert.firstChild)
            }
        }
        locationName(coords, MAP_KEY)
    }

    marker.on('dragend', onDragEnd);

    //search bar
    let address = document.querySelector('#search')
    document.querySelector('.search').addEventListener('click', () => {
    let userAddress = address.value
    geocode(userAddress, MAP_KEY).then(result => {
        marker.setLngLat(result).addTo(map);
        map.setCenter(result);
        map.setZoom(17);
        let lngLat = marker.getLngLat();
        lat = lngLat.lat;
        lng = lngLat.lng;
        let coords = {
            lng,
            lat
        }
        let insert = document.querySelector('.cards')
        if (insert.firstElementChild !== null) {
            while (insert.firstChild) {
                insert.removeChild(insert.firstChild)
            }
        }
        locationName(coords, MAP_KEY)
    })
    })
})()