"use strict";
(() => {
    // document.addEventListener("keyup", event => console.log(event.key) );
    //ArrowUP, ArrowDown, ArrowLeft, ArrowRight, b, a, Enter

    let keymap = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        a: 'a',
        b: 'b',
        Enter: 'start'
    };
    let code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
    let codePosition = 0;
    let h1 = document.querySelector('h1');
    document.addEventListener("keyup", function (e) {
        let key = keymap[e.key];
        let nextKey = code[codePosition];
        // console.log(key);
        // console.log(nextKey);
        // console.log(codePosition);
        if (key === nextKey) {
            codePosition++;
        } else if (codePosition == 10 && key == 'start') {
            activateCheats();
            codePosition = 0;
        } else codePosition = 0;
    });
    let audio = new Audio('audio/emotional.mp3')
    function activateCheats() {
        document.body.style.backgroundColor = 'red';
        audio.play();
        h1.innerText = 'Wait, what have you done?';
        setTimeout(round2, 3000)
    };
    function round2() {
        document.body.style.backgroundImage = 'url("../img/crt.jpg")'
        h1.innerText = 'Time to wake up NEO'
        h1.setAttribute('class', 'crt1')
        setTimeout(() => {
        let typed = new Typed('#typed', {
            strings: ['Follow the White Rabbit!'],
            typeSpeed: 99,
    })
            round3()
        }, 2000);
    }
    function round3(){
        setTimeout(() => {
        let alltext = document.getElementsByTagName('h1')
        for (let h1 of alltext){
            h1.innerText = ''
            document.body.removeAttribute('style')
            document.body.style.backgroundColor = "black"
        }}, 4000)
    }
})();