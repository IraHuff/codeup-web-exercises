(() => {
    let user = document.getElementById('to-do');
    let list = document.getElementById('to-do-list');
    let btn1 = document.querySelector('.add')
    let index = 0
    function remove(){
        this.parentElement.remove();
        index--
    }
    btn1.addEventListener('click', (e) => {
        e.preventDefault()
        let item = document.createElement('li');
        let para = document.createElement('p')
        let done = document.createElement('button')
        let todo = document.createTextNode(user.value);
        let btnDone = document.createTextNode('DONE')
        if (user.value == ''){
            alert('must have an item todo')
        }else if (index >= 10){
            alert('clear some items first')
        }else {
            list.appendChild(item)
            item.setAttribute('class', "to-do-item list-group-item d-flex justify-content-between align-items-center")
            item.appendChild(para)
            para.setAttribute('class', "m=0")
            para.appendChild(todo)
            item.appendChild(done)
            done.setAttribute('class', "btn btn-success")
            done.setAttribute('id', `done-${index}`)
            done.addEventListener('click', remove, {once:true})
            done.appendChild(btnDone)
            user.value = ''
            index++
        }
    })
})()