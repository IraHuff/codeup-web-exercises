(()=>{
    // setTimeout(function(){
    //     document.getElementById('profile-pic').src = '../img/calvin.gif'
    // }, 2000)
    //
    // setTimeout(function(){
    //     document.getElementById('profile-name').innerHTML = "Not Hobbes"
    // }, 4000)
    //
    // setTimeout(function(){
    //     document.getElementById('profile-desc').classList.add("colorAndFont")
    // }, 6000)
    let count = 0
    let card = document.getElementById('profile-card')
    // setInterval(function(){
    //     count++
    //     let color = (count % 2 == 0) ? card.classList.add('cardColor') : card.classList.remove('cardColor')
    // }, 2000)
    let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    function allInOne(){
        let color = colors[Math.floor(Math.random()*colors.length)];
        if (count == 2){
            card.style.backgroundColor = color
            document.getElementById('profile-pic').src = '../img/calvin.gif'
            count++
        }else if (count == 4){
            card.style.backgroundColor = color
            document.getElementById('profile-name').innerHTML = "Not Hobbes"
            count++
        }else if (count == 6){
            card.style.backgroundColor = color
            document.getElementById('profile-desc').classList.add("colorAndFont")
            count++
        }else if (count % 2 == 0 && count > 0){
            card.style.backgroundColor= color
            count++
        }else count++
    }
    setInterval(allInOne, 1000)
})()