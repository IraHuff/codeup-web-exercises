"use strict";
(() => {
    //function to get weather data based on lat lon
    function getData(x, y) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&appid=${WE_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                populateData(data)
            })
            .catch((e) => {
                console.error(e);
            });
    }
    //function to populate city and weather cards
 function populateData(parse) {
     let insert = document.querySelector('.cards')
     let location = document.createElement('div')
     location.innerText = parse.city.name
     location.classList.add("city")
     insert.appendChild(location)


     for (let i = 0; i < parse.list.length; i += 8) {
         let card = document.createElement('div');
         let selection = parse.list[i];
         card.innerHTML = `<p>Date: ${selection.dt_txt.slice(0,10)}</p>
                           <p>Temp: ${selection.main.temp}</p>
                           <img src="http://openweathermap.org/img/w/${selection.weather[0].icon}.png">
                           <p>Weather: ${selection.weather[0].description}</p>`
         card.classList.add("card")
         insert.appendChild(card)
     }
 }

 getData(39.74, -92.51)
})()