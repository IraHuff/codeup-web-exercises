"use strict";
(() =>{

fetch("data/blog.json").then(resp => resp.json()).then(data => {
 console.log(data)

 const blog = document.querySelector('#posts')
 function renderBlog(data) {
  let html = '<article class="post">'
      html += `<h2 class="blogTitle">${data.title}</h2>`;
      html += `<div class="date">${data.date}</div>`;
      html += `<div class="cat">${data.categories.join(', ')}</div>`;
      html += `<div class="content">${data.content}</div>`;
      html += '</article>';

  return html;
 }
 function parseData(data) {
  let html = '';
  for(let i = data.length - 1; i >= 0; i--) {
   html += renderBlog(data[i]);
  }
  return html;
 }
 blog.innerHTML = parseData(data);



})


})()