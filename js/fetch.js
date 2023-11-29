const URL = "https://api.github.com/users/";

const setting = {
    headers: {
        'Authorization': 'token ' + GH_KEY
    }
}

const get = () => {
    fetch(URL + "IraHuff/events/public", setting).then(res => res.json()).then(obj => {
        // console.log(obj);
        const main = document.querySelector('ol');
        for (let item of obj) {
            const li = document.createElement('li')
            const h1 = document.createElement('h2');
            const h2 = document.createElement('h3');
            const data = document.createElement('p');
            h1.innerText = 'User ' + item.actor.login;
            h2.innerText = 'Pushed to repo ' + item.repo.name;
            data.innerText = 'On date/time ' + item.created_at;
            main.appendChild(li)
            li.appendChild(h1);
            li.appendChild(h2);
            li.appendChild(data);
        }
    })
}
document.querySelector('.get').addEventListener('click', get)