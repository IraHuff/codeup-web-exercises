"use strict";
console.log("Hello from external JavaScript");
alert('Welcome to my Website');
let color = prompt('What is your favorite color?');
alert(color + ' is my favorite color to');
//exorcise 3 part one
let lm = prompt('how many days are you renting little mermaid?');
let bb = prompt('how many days are you renting brother bear?');
let herc = prompt('how many days are you renting hercules?');
let cpd = prompt('what is the cost per day per movie?');
alert('total cost will be ' + ((lm * cpd) + (bb * cpd) + (herc * cpd))+ ' bucks.');
//exorcise 3 part two
let google = prompt('what is your hourly pay at google?');
let amazon = prompt('what is your hourly pay at amazon?');
let facebook = prompt('what is your hourly pay at amazon?')
let googleHours = prompt('how many hours did you work at google?');
let amazonHours = prompt('how many hours did you work at amazon');
let facebookHours = prompt('how many hours did you work at facebook');
alert('your pay will be ' + ((google * googleHours) + (amazon * amazonHours) + (facebook * facebookHours)) + ' bucks');


