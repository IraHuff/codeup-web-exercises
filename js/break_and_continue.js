 let chosen = null
while (chosen === null) {
     chosen = parseFloat(prompt('please input an odd number between 1 and 50'))
    if (isNaN(chosen) == true) chosen = null
    else if (chosen < 0 || chosen > 50) chosen = null
    else if (chosen % 2 !== 0) break;
    else chosen = null
}
console.log(chosen)
for (let i = 1; i < 51; i++) {
    if (i % 2 === 0){
        continue;
    }
    if (i > 49){
        break;
    }
    if (i === chosen) {
        console.log("Yikes! Skipping number " + i);
    }
    else {
        console.log("Here is an odd number " + i);
    }
}
