//bootstrap
document.addEventListener('DOMContentLoaded', function () {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    const modalElement = document.querySelector('#kompnujPizze');
    modalElement.addEventListener('hidden.bs.modal', function () {
        document.querySelector('#cenaWlasna').textContent = 'Cena: 10 zł';
    });

});
//

const baza = {
    host: 'localhost',
    user: 'root',
    pass: '',
    baza: 'pizzeria',
    sql: ''
};

let koszyk =[]
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
    for (let pizza of listaMenu) {
    pizza.skladniki = pizza.skladniki.split(',');
    lista += `<li class='d-flex gap-2 align-items-center list-group-item'>
                <h2>${pizza.nazwa_pizzy}</h2> - ${pizza.skladniki.map(skladnik => `<span class='fs-5'>${skladnik}</span>`).join(', ')}
                <button type='button' class='btn fs-5 m-2 ms-auto' onclick="dodaj('${pizza.nazwa_pizzy}', '${pizza.cena}')" id="liveToastBtn">${pizza.cena} zł</button>
              </li>`;
}
    lista += `<li class='d-flex gap-2 align-items-center list-group-item'><h2>Stwórz własną pizzę</h2> - <span class="fs-5">Wybierz własne składniki</span>
<button onclick="modal()" type='button' class='btn fs-5 m-2 ms-auto' data-bs-toggle="modal" data-bs-target="#kompnujPizze">Cena zależna od składników</button></li>`;
    dane.innerHTML = lista + "</ul>";
}



function dodaj(nazwa, cena) {
    let cenaPizzy = cena
    let nazwaPizzy = nazwa
    koszyk.push({nazwaPizzy, cenaPizzy})
    document.querySelector('#ilePizz').textContent = koszyk.length
    pokazKoszyk();
}
function usun(nazwa, cena) {
    let index = koszyk.findIndex(pizza => pizza.nazwaPizzy === nazwa && pizza.cenaPizzy === cena);
    if (index !== -1) {
        koszyk.splice(index, 1);
    }
    document.querySelector('#ilePizz').textContent = koszyk.length;
    pokazKoszyk();
}

function pokazKoszyk() {
    let cena = 0
    let lista = "<ul class='lista rounded my-5'>";
    for (let pizza of koszyk) {
        cena += parseFloat(pizza.cenaPizzy)
        lista += `<li class='d-flex gap-2 align-items-center list-group-item'>
                <h3>${pizza.nazwaPizzy} - ${pizza.cenaPizzy} zł</h3>
                <button type='button' class='btn fs-5 m-2 ms-auto' onclick="usun('${pizza.nazwaPizzy}', '${pizza.cenaPizzy}')">Usuń</button>
              </li>`;
    }
    lista += "</ul>";
    zamowienie.innerHTML = lista;
    document.querySelector('#cena').textContent = `Przejdź do złożenia zamówienia: ${cena.toFixed(2)} zł`;
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


    skladniki.innerHTML = listaSkladniki.map(skladnik =>
        `<div class="form-check py-3">
        <input class="form-check-input" type="checkbox" value="${skladnik.nazwa}" id="${skladnik.nazwa}" data-price="${skladnik.cena}">
        <label class="form-check-label" for="${skladnik.nazwa}">
            ${skladnik.nazwa} - ${skladnik.cena} zł
        </label>
    </div>`
    ).join('');

    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', liczCene);
    });
}


function liczCene() {
    const checkboxes = document.querySelectorAll('.form-check-input:checked');
    let totalPrice = 10; // Base price for the pizza

    checkboxes.forEach(checkbox => {
        const price = parseFloat(checkbox.dataset.price);
        totalPrice += price;
    });

    const priceElement = document.getElementById('cenaWlasna');
    priceElement.textContent = `Cena: ${totalPrice.toFixed(2)} zł`;
}