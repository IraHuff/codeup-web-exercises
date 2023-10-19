"use strict"
function showMultiplicationTable(x){
    for (let i = 1; i < 11; i++) {
        let output = x * i
        console.log(`${x} * ${i} = ${output}`)

    }
}
//showMultiplicationTable(7)
function randomOddOrEven(){
    for (let i = 1; i < 11; i++){
let random = Math.floor(Math.random() * 180) + 20;
let oddOrEven = (random % 2 === 0) ? 'is even' : 'is odd';
console.log(`${random} ${oddOrEven}`)
}
}
//randomOddOrEven()

function pyramid(){
    for(let i=1;i<10;i++){
        let repeat = i.toString()
        console.log(repeat.repeat(i))

    }
}
//pyramid()

function countdown(){
    for (let i = 100; i > 0; i -= 5){
        console.log(i)
    }
}
//countdown()


