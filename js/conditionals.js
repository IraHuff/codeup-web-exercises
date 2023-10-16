"use strict";

/* ########################################################################## */

/**
 * TODO:
 * Create a function named `analyzeColor` that accepts a string that is a color
 * name as input. This function should return a message which relates to the
 * color stated in the argument of the function. For colors you do not have
 * responses written for, return a string stating so
 *
 * Example:
 *  > analyzeColor('blue') // returns "blue is the color of the sky"
 *  > analyzeColor('red') // returns "Strawberries are red"
 *
 *
 *  > analyzeColor('cyan') // returns "I don't know anything about cyan"
 *
 * You should use an if-else-if-else block to return different messages.
 *
 * Test your function by passing various string literals to it and
 * console.logging the function's return value
 */
/**function analyzeColor(color){
    if (color === 'red')  {return( console.log(color +" the color of fire"));
    }else if (color === 'orange') {return( console.log(color + " the color of the fall"));
    }else if (color === 'yellow') {return( console.log(color + " the color of the sun"));
    }else if (color === 'green') {return(console.log(color + " the color of grass"));
    }else if (color === 'blue'){ return(console.log(color + " the least seen in nature"));
    }else { return(console.log(color + " I do not know anything by that color"));
    }
}
    */
// Don't change the next two lines!
// These lines create two variables for you:
// - `colors`: a list of the colors of the rainbow
// - `randomColor`: contains a single random color value from the list (this
//                  will contain a different color every time the page loads)
//const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
//const randomColor = colors[Math.floor(Math.random() * colors.length)];
/**
 * TODO:
 * Pass the `randomColor` variable to your 'analyzeColor' function and console.log the results.
 * You should see a different message every time you refresh the page
 */
//analyzeColor(randomColor)
/**
 * TODO:
 * Comment out the code above, and refactor your function to use a switch-case statement
 */
function analyzeColor(userInput){
    switch (userInput) {
        case "red":
            alert('Red is the color of fire.');
            break;
        case "orange":
            alert('Orange is the color of the fall.');
            break;
        case "yellow":
            alert('Yellow is the color of the sun.');
            break;
        case "green":
            alert('Green is the color of grass.');
            break;
        case "blue":
            alert('Blue is the least seen color in nature.');
            break;
        default:
            alert(`I know nothing about ${userInput}`);
            break;
    }
}
/**
 * TODO:
 * Prompt the user for a color when the page loads, and pass the input from the
 * user to your `analyzeColor` function. Alert the return value from your
 * function to show it to the user.
 */
let sillyness = prompt('What is your favorite color?');
analyzeColor(sillyness);
/* ########################################################################## */

/**
 * TODO:
 * Suppose there's a promotion in Walmart, each customer is given a randomly
 * generated "lucky number" between 0 and 5. If your lucky number is 0 you have
 * no discount, if your lucky number is 1 you'll get a 10% discount, if it's 2,
 * the discount is 25%, if it's 3, 35%, if it's 4, 50%, and if it's 5 you'll get
 * everything for free!.
 *
 * Write a function named `calculateTotal` which accepts a lucky number and total
 * amount, and returns the discounted price.
 *
 * Example:
 * calculateTotal(0, 100) // returns 100
 * calculateTotal(4, 100) // returns 50
 * calculateTotal(5, 100) // returns 0
 *
 * Test your function by passing it various values and checking for the expected
 * return value.
 */
function calculateTotal(number, total){
    if (number===0) {
        return (parseFloat(total)).toFixed(2)
    }
    else if (number === 1){
        return (parseFloat(total) - (parseFloat(total) * .1)).toFixed(2)
    }
    else if (number === 2){
        return (parseFloat(total) - (parseFloat(total) * .25)).toFixed(2)
    }
    else if (number === 3){
        return (parseFloat(total) - (parseFloat(total) * .35)).toFixed(2)
    }
    else if (number === 4){
        return (parseFloat(total) - (parseFloat(total) * .5)).toFixed(2)
    }
    else return "0.00 Congratulations it is all free today!!!"
}
/**
 * TODO:
 * Uncomment the line below to generate a random number between 0 and 5.
 * (In this line of code, 0 is inclusive, and 6 is exclusive)
 * Prompt the user for their total bill, then use your `calculateTotal` function
 * and alerts to display to the user what their lucky number was, what their
 * price before the discount was, and what their price after the discount is.
 */
//Generate a random number between 0 and 6
const luckyNumber = Math.floor(Math.random() * 6);

let lottary = prompt('How much was your bill today?')
alert(`Your lucky number today was ${luckyNumber}.\nYour bill today was $${parseFloat(lottary).toFixed(2)}.\nYour total to day will be $${calculateTotal(luckyNumber, lottary)}.`);
/**
 * TODO:
 * Write some JavaScript that uses a `confirm` dialog to ask the user if they
 * would like to enter a number. If they click 'Ok', prompt the user for a
 * number, then use 3 separate alerts to tell the user:
 *
 * - whether the number is even or odd
 * - what the number plus 100 is
 * - if the number is negative or positive
 *
 * Do *NOT* display any of the above information
 * if the user enters a value that is not of the number data type.
 * Instead, use an alert to inform them of the incorrect input data type.
 *
 *
 * Can you refactor your code to use functions?
 * HINT: The way we prompt for a value could be improved
 */
    (function(){
        if (confirm("Would you like to enter a number?")){
            let n1 = parseFloat(prompt('Please enter a number'));
                let oddOrEven = n1 % 2 === 0 ? 'even' : 'odd';
                let plus100 = n1 + 100;
                let sign = n1 < 0 ? 'negative' : 'positive';
                if (isNaN(n1) === true){
                    return alert(`${n1} is not a number try again`)}
                else{
                    alert(`${n1} is ${oddOrEven}`)
                    alert(`${n1} plus 100 is ${plus100}`)
                    alert(`${n1} is ${sign}`)
                }
            }
        else{
            return alert('ok then')
            }
    })();