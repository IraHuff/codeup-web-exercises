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

const ghLogin = 'IraHuff';
const token = GH_KEY;

const color_cells = [
    "levelNONE",
    "levelFIRST_QUARTILE", "levelSECOND_QUARTILE",
    "levelTHIRD_QUARTILE", "levelFOURTH_QUARTILE"
]

const weekDays = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
}

const monthNames = {
    "Jan": "January",
    "Feb": "Febuary",
    "Mar": "March",
    "Apr": "April",
    "May": "May",
    "Jun": "June",
    "Jul": "July",
    "Aug": "August",
    "Sep": "September",
    "Oct": "October",
    "Nov": "November",
    "Dec": "December",
}

async function fetchData(ghLogin, token) {
    let response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        body: JSON.stringify({
            "query": `query($githubLogin:String!) { 
                user(login: $githubLogin){
                  contributionsCollection {
                    contributionCalendar {
                      colors
                      months {
                        name
                        totalWeeks
                      }
                      totalContributions
                      weeks {
                        contributionDays {
                          contributionCount
                          contributionLevel
                          date
                          weekday
                        } 
                      }
                    }
                  }
                  avatarUrl
                  login
                }
              }`,
            "variables": { "githubLogin": ghLogin }
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`,
        }
    });
    let data = await response.json();
    console.log(data)
    return data['data']['user']
}


function createDayInfoSpan(day, month) {
    let info = document.createElement("span");
    let monthName = monthNames[month['name']];
    let weekday = weekDays[day['weekday']];
    let contributions = day['contributionCount'];
    let date = day['date'];
    date = date.split("-");

    if (contributions == 0) {
        info.innerText = `No contributions on ${weekday}, ${monthName} ${date[2]}, ${date[0]}`;
    } else if ((contributions % 10) == 1) {
        info.innerText = `${contributions} contribution on ${weekday}, ${monthName} ${date[2]}, ${date[0]}`;
    } else {
        info.innerText = `${contributions} contributions on ${weekday}, ${monthName} ${date[2]}, ${date[0]}`;
    };
    return info;
}


function fillCalendar(data) {
    let calendar = document.getElementById("gh-card-calendar");
    let contributions = data['contributionsCollection']['contributionCalendar']
    let months = contributions['months'];
    let weeks = contributions['weeks'];
    let current_week = 0;

    for (let i = 0; i < months.length; i++) {
        let month_elem = document.createElement("div");
        let month_title_elem = document.createElement("div");
        let month_body_elem = document.createElement("div");
        month_elem.className = "gh-card-calendar-month";
        month_title_elem.className = "gh-card-calendar-month-title";
        month_body_elem.className = "gh-card-calendar-month-body";

        for (let j = 0; j < months[i]['totalWeeks']; j++) {
            let days = weeks[current_week]['contributionDays'];
            let week_elem = document.createElement("div");
            week_elem.className = "gh-card-calendar-week";

            for (let k = 0; k < days.length; k++) {
                let day_elem = document.createElement("div");
                let info = createDayInfoSpan(days[k], months[i]);
                day_elem.appendChild(info)
                day_elem.className = `gh-card-calendar-day level${days[k]['contributionLevel']}`;
                week_elem.appendChild(day_elem);
            }
            month_body_elem.appendChild(week_elem);
            current_week += 1;
        }
        month_title_elem.innerHTML = months[i]['name']
        month_elem.appendChild(month_title_elem);
        month_elem.appendChild(month_body_elem);
        calendar.appendChild(month_elem);
    }
}


function fillCardFooter() {
    let footer = document.getElementById("gh-card-footer");
    let sourceLink = document.createElement("a");
    sourceLink.className = "gh-card-calendar-footer-sourceLink";
    sourceLink.innerText = "Module source";
    sourceLink.href = "https://github.com/lengthylyova/gh-contrib-graph"

    let colors = document.createElement("div");
    colors.style.display = "inline-flex";
    colors.style.alignItems = "center";
    let less = document.createElement("span");
    let more = document.createElement("span");
    less.innerText = "Less";
    more.innerText = "More";
    colors.appendChild(less);
    colors.className = "gh-card-calendar-footer-colors";
    for (let i = 0; i < color_cells.length; i++) {
        let color = document.createElement("div");
        color.className = "gh-card-calendar-day " + color_cells[i];
        colors.appendChild(color);
    }
    colors.appendChild(more)
    footer.appendChild(sourceLink);
    footer.appendChild(colors);
}


function fillHeader(data) {
    const title = document.getElementById("gh-title")
    const user = document.getElementById("gh-user")
    let contributions = data['contributionsCollection']['contributionCalendar'];
    title.innerText = contributions['totalContributions'] + " contributions in the last year"
    user.innerHTML = `<a href="#">${data['login']}</a><img src="${data['avatarUrl']}">`
}


function ghCardInit() {
    let ghCard = document.createElement("div");
    let ghCardCalendar = document.createElement("div");
    let ghCardCalendarWeekdays = document.createElement("ul");
    let ghCardFooter = document.createElement("div");
    ghCard.id="gh-card";
    ghCardCalendar.id="gh-card-calendar";
    ghCardCalendarWeekdays.id="gh-card-calendar-weekdays";
    ghCardFooter.id="gh-card-footer";
    ghCardCalendarWeekdays.innerHTML = `<li><br></li>
                                        <li>Mon</li>
                                        <li><br></li>
                                        <li>Wed</li>
                                        <li><br></li>
                                        <li>Fri</li>`
    ghCardCalendar.appendChild(ghCardCalendarWeekdays);
    ghCard.appendChild(ghCardCalendar);
    ghCard.appendChild(ghCardFooter);
    return ghCard;
}


function ghHeaderInit() {
    let ghHeader = document.createElement("div");
    ghHeader.id = "gh-header";
    ghHeader.innerHTML = `<div id="gh-title"></div><div id="gh-user"></div>`;
    return ghHeader;
}


async function init(ghLogin, token) {
    const data = await fetchData(ghLogin, token);
    let ghBlock = document.getElementById("gh");

    if (gh == undefined) {window.alert("#gh block not found")};

    ghBlock.appendChild(ghHeaderInit());
    ghBlock.appendChild(ghCardInit());
    fillHeader(data);
    fillCalendar(data);
    fillCardFooter();
};


function main() {
    if ((ghLogin != null) & (token != null)) {
        init(ghLogin, token);
    } else {
        window.alert("ghLogin or token not provided!");
    }
}


main();