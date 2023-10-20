"use strict"
function timesTwo() {
    let i = 2;

    while (i < 65537) {
        console.log(i);
        i = i * 2;
    }
}

//timesTwo()


let allCones = Math.floor(Math.random() * 50) + 50;
console.log("starting with " + allCones + ' cones');
do {
    let conesSold = Math.floor(Math.random() * 5) + 1;
    if(allCones > conesSold) {
        allCones -= conesSold;
        console.log(conesSold + " cones sold");
    }else if(allCones < conesSold){
        console.log("I cannot sell you " + conesSold + " I only have " + allCones);
    }else {
        console.log("I sold my last " + conesSold + " cones");
        allCones -= conesSold;
    }

}while (allCones !== 0);