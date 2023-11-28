"use strict";
(() => {
const users = [
    {
        id: 1,
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript'],
        yearsOfExperience: 5
    },
    {
        id: 2,
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php'],
        yearsOfExperience: 6
    },
    {
        id: 3,
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash'],
        yearsOfExperience: 7
    },
    {
        id: 4,
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql'],
        yearsOfExperience: 8
    },
    {
        id: 5,
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php'],
        yearsOfExperience: 9
    }
];

// problem two
const languages = users.filter(lang => lang.languages.length >= 3)
console.log(languages);

//problem three
const emails = users.map(email => email.email)
console.log(emails);

//problem four
const experience = users.reduce((years, year) => years + year.yearsOfExperience, 0);
console.log(experience);
let average = experience / users.length
console.log(average);

//problem 5
const email = emails.reduce((mail, address) => {
    if (address.length > mail.length) {
       return address
    }else {
       return mail
    }
})
console.log(email);

//problem six
const instructors = users.reduce((instructor, names) => instructor + ', ' + names.name, 'Your instructors are:')
console.log(instructors);

//bonus
const unique = (arrayOfLang, obj) => {
    for(let language of obj.languages){
        if (!arrayOfLang.includes(language)){
            arrayOfLang.push(language);
        }
    }
    return arrayOfLang;
}
const uniqeLang = users.reduce(unique, [])
console.log(uniqeLang);
})()