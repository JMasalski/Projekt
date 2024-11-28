//bootstrap
document.addEventListener('DOMContentLoaded', function () {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});
//

const baza = {
    host: 'localhost',
    user: 'root',
    pass: '',
    baza: 'pizzeria',
    sql: ''
};

baseURL = 'http://localhost/Projekt/index.html';

window.onload = () => {
    menu();
};


async function menu() {
    baza.sql = "SELECT `nazwa_pizzy`, `skladniki`, `cena` FROM `menu`;";
    const dataToSend = JSON.stringify(baza);
    let url = new URL('menu.php', baseURL);
    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataToSend
    });
    let listaMenu = await response.json();
    let lista = "<ul class='lista rounded my-5'>";
    for(let pizza of listaMenu) {
        pizza.skladniki = pizza.skladniki.split(', ');
        pizza.skladniki.forEach(skladnik => {
        });
        lista += `<li class='d-flex gap-2 align-items-center list-group-item'><h2>${pizza.nazwa_pizzy}</h2> - ${pizza.skladniki.map(skladnik => `<span class='fs-5'>${skladnik}</span>`).join(' ')}
<button type='button' class='btn fs5 m-2 ms-auto'>${pizza.cena} zł</button></li>`;
    }
    lista += `<li class='d-flex gap-2 align-items-center list-group-item'><h2>Stwórz własną pizzę</h2> - <span class="fs-5">Wybierz własne składniki</span>
<button onclick="modal()" type='button' class='btn fs-5 m-2 ms-auto' data-bs-toggle="modal" data-bs-target="#kompnujPizze">Cena zależna od składników</button></li>`;
    dane.innerHTML = lista + "</ul>";
}

async function modal() {
    baza.sql = "SELECT `nazwa`, `cena` FROM `skladniki`;";
    const dataToSend = JSON.stringify(baza);
    let url = new URL('skladniki.php', baseURL);
    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataToSend
    });
    let listaSkladniki = await response.json();
    let skladnikiHTML = listaSkladniki.map(skladnik =>
        `<div class="form-check py-3">
            <input class="form-check-input " type="checkbox" value="${skladnik.nazwa}" id="${skladnik.nazwa}">
            <label class="form-check-label  " for="${skladnik.nazwa}">
                ${skladnik.nazwa} - ${skladnik.cena} zł
            </label>
        </div>`
    ).join('');
    skladniki.innerHTML = skladnikiHTML;

}