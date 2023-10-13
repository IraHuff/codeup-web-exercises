"use strict";
let favoriteColor = 'Green';
console.log(favoriteColor);
console.log(5+4);
let instructorName = 'David';
console.log(instructorName);
const pi = 3.14159;
console.log(pi);

//Alert -- a popup message to the user from javascript
alert('this is a message');
// We can concatinate inside of an alert
alert('howdy from, ' + instructorName);

//confirm -- allows a boolian to be captured ok true cancel false
let confirmed = confirm(`we have lunch at 12:30 today? ${instructorName}`);
console.log(confirmed)
//prompt -- asks for a text value
let userString = prompt('what is your favorite basketball team?')
console.log(`user's favorite team ${userString}`)
