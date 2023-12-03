"use strict";
(() => {
    // global variables
    let lng = -92.48253417968736;
    let lat = 39.73524785044066;
    let local;
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let dayOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    let data;
    const init = {lng, lat};

    //create error modal
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

    // create 'hourly' detail cards in modal
    function details(card, detail) {
        let modal = document.querySelector('#dialog')
        let details = document.querySelector('.modal');
        let container = document.createElement('section')
        container.classList.add('hourlyCards');
        let detailHours = detail.list[card];
        let time = new Date(detailHours.dt * 1000);
        let detailDate = `${dayOfWeek[time.getDay()]} ${months[time.getMonth()]} ${time.getDate()}`
        container.innerHTML = `<h2 class="detailDate">${detailDate}</h2>`
        details.appendChild(container);
        let cards = card + 8;
        for (card; card < cards; card++) {
            let hourly = document.createElement('div')
            hourly.classList.add('hourly')
            detailHours = detail.list[card];
            time = new Date(detailHours.dt * 1000);
            hourly.innerHTML = `<p class='time'>${time.getHours()}:00</p>
                            <p class=".temp">Temp: ${detailHours.main.temp.toString().slice(0, 2)}℉</p>
                           <img src="http://openweathermap.org/img/w/${detailHours.weather[0].icon}.png">
                           <p class="temp">Weather: ${detailHours.weather[0].description}</p>`;
            container.appendChild(hourly)
        }
        modal.showModal()
    }

    //function to get weather data based on lat lon
    function getData(x, y) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&appid=${WE_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                local = data;
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
        cardDetails()
    }

    //add event listener to each daily card
    function cardDetails() {
        let modual = document.querySelector('.modal');
        let detailClicks = document.querySelectorAll('.card');
        for (let detailClick of detailClicks) {
            detailClick.addEventListener('click', (e) => {
                data = parseInt(e.target.dataset.id);
                modual.innerHTML = '';
                details(data, local);
            })
        }
    }

    //get location from lat/lng
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

    //draw maker
    const marker = new mapboxgl.Marker({draggable: true}).setLngLat([-92.51, 39.74]).addTo(map);

    // get coords when done dragging marker
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

    //listen to marker and call functon
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

    //get current weather
    locationName(init, MAP_KEY);
})()