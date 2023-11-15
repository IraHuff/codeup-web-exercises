"use strict"
let unOrdered = document.getElementsByTagName("ul");
let header = document.getElementsByTagName("h3")
let listItem = document.getElementsByTagName("li")
let yellowmouse = document.getElementById('last')
let btn1 = document.getElementById('left')
let btn2 = document.getElementById('middle')
let btn3 = document.getElementById('right')


function yellow(){
    for (let list of unOrdered){
        list.lastElementChild.classList.toggle("yellow");
    }
}

function leftPic(){
    let left = document.querySelector('div');
    let middle = document.querySelector('div').nextElementSibling
    let one = left.classList[1]
    let two = middle.classList[1]
    middle.classList.replace(two, one);
    left.classList.replace(one,two)
}
function rightPic(){
    let middle = document.querySelector('div').nextElementSibling;
    let right = document.querySelector('div').nextElementSibling.nextElementSibling;
    let one = middle.classList[1];
    let two = right.classList[1];
    middle.classList.replace(one,two);
    right.classList.replace(two, one);
}
yellowmouse.addEventListener('click', yellow);

for (let head of header) {
    head.addEventListener("click", () =>{
      head.nextElementSibling.classList.toggle('bold')
    })
}
for (let item of listItem){
    item.addEventListener("click", () =>{
        item.parentElement.classList.toggle("blue")
    })
}
btn1.addEventListener("click", leftPic)
btn3.addEventListener("click", rightPic)
btn2.addEventListener("click", () => {
    let random = Math.floor(Math.random()*2)
    if (random == 0) leftPic();
    else if (random == 1) rightPic();
})