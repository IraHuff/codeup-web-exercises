"use strict";
import {greeting} from "./greeting-logic.js";

(() => {
    let input = document.querySelector('.form');
    let name = document.querySelector('#greetings');
    input.addEventListener('submit', (e) => {
        e.preventDefault()
        let greet = greeting();
        let insert = document.querySelector('#hello');
        insert.innerHTML = ''
        insert.innerHTML = `<h2>${greet}  ${name.value}</h2>`
    })
})()