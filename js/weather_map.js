"use strict";
(() => {

    let lat
    let lng
    let local
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let dayOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
    let data

    function errorModal() {
        let modal = document.querySelector('#dialog');
        let data = document.querySelector('.modal');
        data.innerHTML = '';
        let error = document.createElement('div');
        error.classList.add('error');
        error.innerHTML = "<h2>Invalid Search Term</h2>" +
            "<p>Please input city, state</p>";
        data.appendChild(error);
        modal.showModal();
    }

    function details(card, detail) {
        let modal = document.querySelector('#dialog')
        let details = document.querySelector('.modal');
        let hourly = document.createElement('div')
        hourly.classList.add('hourly')
        details.innerHTML = '';
        for (card; card <= card + 7; card++) {
            let detailHours = detail.list[card]
            let time = new Date(detailHours.main.dt * 1000);
            hourly.innerHTML = `<p class='time'>${detailHours.getHours()}:${detailHours.getMinutes()}</p>
                                <p>Temp: ${hourly.main.temp.toString().slice(0, 2)}℉</p>
                           <img src="http://openweathermap.org/img/w/${hourly.weather[0].icon}.png">
                           <p>Weather: ${hourly.weather[0].description}</p>`;
            details.appendChild(hourly);
            modal.showModal()


        }
    }

    //function to get weather data based on lat lon
    function getData(x, y) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&appid=${WE_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                local = data;
                console.log(data);
                populateData(data);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    //function to populate city and weather cards
    function populateData(parse) {
        let insert = document.querySelector('.cards');
        for (let i = 0; i < parse.list.length; i += 8) {
            let card = document.createElement('div');
            let selection = parse.list[i];
            let day = new Date(selection.dt * 1000);
            let weatherMonth = months[day.getMonth()];
            let weatherDOW = dayOfWeek[day.getDay()];
            card.innerHTML = `<p>Date: ${weatherDOW} ${weatherMonth} ${day.getDate()}</p>
                           <p>Temp: ${selection.main.temp.toString().slice(0, 2)}℉</p>
                           <img src="http://openweathermap.org/img/w/${selection.weather[0].icon}.png">
                           <p>Weather: ${selection.weather[0].description}</p>`;
            card.classList.add('card');
            card.setAttribute("data-id", i);
            insert.appendChild(card);
        }
    }

    function locationName(coordinates, apiKey) {
        reverseGeocode(coordinates, apiKey).then(result => {
            let insert = document.querySelector('.cards');
            let location = document.createElement('div');
            location.innerText = result;
            location.classList.add("city");
            insert.appendChild(location);
            getData(coordinates.lat, coordinates.lng);
        })
    }

    lng = -92.48253417968736;
    lat = 39.73524785044066;
    const init = {lng, lat};
    locationName(init, MAP_KEY);


// draw map
    mapboxgl.accessToken = MAP_KEY;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/dark-v11',// style URL
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
        };
        let insert = document.querySelector('.cards');
        if (insert.firstElementChild !== null) {
            while (insert.firstChild) {
                insert.removeChild(insert.firstChild);
            }
        }
        locationName(coords, MAP_KEY);
    }

    marker.on('dragend', onDragEnd);

    //search bar
    let address = document.querySelector('#search');
    document.querySelector('#citySearch').addEventListener('submit', (e) => {
        e.preventDefault();
        let userAddress = address.value;
        if (address.value === '') {
            errorModal();
        }
        geocode(userAddress, MAP_KEY).then(result => {
            marker.setLngLat(result).addTo(map);
            // map.setCenter(result);
            // map.setZoom(17);
            let lngLat = marker.getLngLat();
            map.flyTo({
                center: [lngLat.lng, lngLat.lat],
                duration: 3000
            });
            lat = lngLat.lat;
            lng = lngLat.lng;
            let coords = {
                lng,
                lat
            };
            let insert = document.querySelector('.cards');
            if (insert.firstElementChild !== null) {
                while (insert.firstChild) {
                    insert.removeChild(insert.firstChild);
                }
            }
            locationName(coords, MAP_KEY);
        });
    });


    let detailClicks = document.querySelector('.card');
    for (let detailClick of detailClicks) {
        detailClick.addEventListener('click', (e) => {
            data = e.target.dataset.id;
            details(data, local);
        })
    }


})()