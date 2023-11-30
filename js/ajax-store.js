"use strict";
// TODO: Create an AJAX GET request for the file under data/inventory.json

// TODO: Take the data from inventory.json and append it to the products table
//       HINT: Your data should come back as a JSON object; use console.log() to inspect
//             its contents and fields
//       HINT: You will want to target #insertProducts for your new HTML elements
fetch("data/inventory.json").then(resp => resp.json()).then(data => {
    console.log(data);
    const table = document.querySelector('#insertProducts')
    function renderTable(data) {
        let html = '<tr class="stock">';
        html += `<td>${data.title}</td>`;
        html += `<td>${data.quantity}</td>`;
        html += `<td>${data.price}</td>`;
        html += `<td class="cat">${data.categories.join(`<br>`)}</td>`;
        html += '</tr>';

        return html;
    }
    function parseData(data) {
        let html = '';
        for(let i = data.length - 1; i >= 0; i--) {
            html += renderTable(data[i]);
        }
        return html;
    }
    table.innerHTML = parseData(data);

})