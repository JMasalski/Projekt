//BOOTSTRAP
document.addEventListener('DOMContentLoaded', function () {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    const modalElement = document.querySelector('#kompnujPizze');
    if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', function () {
            document.querySelector('#cenaWlasna').textContent = 'Cena: 10 zł';
        });
    }
});

//BAZA DANYCH
const baza = {
    host: 'localhost',
    user: 'root',
    pass: '',
    baza: 'pizzeria',
    sql: ''
};

baseURL = 'http://localhost/Projekt/index.html';

window.onload = () => {
    if (window.location.pathname.endsWith('zamowienie.html')) {
        loadKoszyk();
        listaZamowiona();
    } else {
        menu();
    }
};

//POBIERANIE MENU Z BAZY DADNYCH I WYSWIELTENIE GO NA STRONIE
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
        lista += `<li class='d-flex flex-wrap gap-2 align-items-center list-group-item'>
                    <h2>${pizza.nazwa_pizzy}</h2> - ${pizza.skladniki.map(skladnik => `<span class='fs-5'>${skladnik}</span>`).join(', ')}
                    <button type='button' class='btn fs-5 m-2 ms-auto dodaj' onclick="dodajDoKoszyka('${pizza.nazwa_pizzy}', '${pizza.cena}', '${pizza.skladniki}')" id="liveToastBtn">${pizza.cena} zł</button>
                  </li>`;
    }
    lista += `<li class='d-flex gap-2 align-items-center list-group-item'><h2>Stwórz własną pizzę</h2> - <span class="fs-5">Wybierz własne składniki</span>
    <button onclick="modal()" type='button' class='btn fs-5 m-2 ms-auto dodaj' data-bs-toggle="modal" data-bs-target="#kompnujPizze">Cena zależna od składników</button></li>`;
    dane.innerHTML = lista + "</ul>";
}

function listaZamowiona() {
    let cena = 0;
    let lista = "<ul class='lista rounded my-5'>";
    for (let pizza of koszyk) {
        cena += parseFloat(pizza.cenaPizzy);
        lista += `<li class='d-flex gap-2 align-items-center list-group-item'>
                    <h3>${pizza.nazwaPizzy}  </h3> - 
                    <span class="fs-5">${pizza.skladnikiPizzy}</span>
                    <span class="fs-4 ms-auto">${pizza.cenaPizzy} zł</span>
                    <button class='btn btn-danger fs-5 m-2' onclick="usun('${pizza.nazwaPizzy}', '${pizza.cenaPizzy}')">Usuń</button>
                  </li>`;
    }

    if (koszyk.length === 0) {
        lista += `<h3 class='text-center m-3' >Twój koszyk jest pusty</h3>`;
    }else{
    lista+= `<h3 class='text-end m-3' >W sumie: ${cena.toFixed(2)} zł</h3>`;
    }
    lista += "</ul>";
    skompletowane.innerHTML = lista;
}

//OBSŁUGA KOSZYKA
let koszyk = [];

//ZAPISANIE W LOCAL STORAGE KOSZYKA ABY MOGŁ BYĆ WYŚWIETLANY PO PRZEJŚCIU NA STRONE SKŁADANIA ZAMÓWIENIA
function saveKoszyk() {
    localStorage.setItem('koszyk', JSON.stringify(koszyk));
}

function loadKoszyk() {
    const savedKoszyk = localStorage.getItem('koszyk');
    if (savedKoszyk) {
        koszyk = JSON.parse(savedKoszyk);
    }
}

//DODAWANIE PIZZY DO KOSZYKA
function dodajDoKoszyka(nazwa, cena, skladniki = []) {
    let cenaPizzy = parseFloat(cena).toFixed(2);
    let nazwaPizzy = nazwa;
    let skladnikiPizzy = skladniki.length ? skladniki : Array.from(document.querySelectorAll('.form-check-input:checked')).map(checkbox => checkbox.value);
    if ( skladniki.length === 0) {
        skladnikiPizzy = Array.from(document.querySelectorAll('.form-check-input:checked')).map(checkbox => checkbox.value).join(', ');
    }
    koszyk.push({ nazwaPizzy, cenaPizzy, skladnikiPizzy });
    document.querySelector('#ilePizz').textContent = koszyk.length;
    saveKoszyk();
    pokazKoszyk();
}

//USUWANIE PIZZY Z KOSZYKA
function usun(nazwa, cena) {
    let index = koszyk.findIndex(pizza => pizza.nazwaPizzy === nazwa && parseFloat(pizza.cenaPizzy) === parseFloat(cena));
    if (index !== -1) {
        koszyk.splice(index, 1);
    }
    const ilePizzElement = document.querySelector('#ilePizz');
    if (ilePizzElement) {
        ilePizzElement.textContent = koszyk.length;
    }
    saveKoszyk();
    pokazKoszyk();
    listaZamowiona()
}

//WYŚWIETALNIE KOSZYKA / AKUTALIZOWANIE GO
function pokazKoszyk() {
    let cena = 0;
    let lista = "<ul class='lista rounded my-5'>";
    for (let pizza of koszyk) {
        cena += parseFloat(pizza.cenaPizzy);
        lista += `<li class='d-flex gap-2 align-items-center list-group-item'>
                    <h3>${pizza.nazwaPizzy} - ${pizza.cenaPizzy} zł</h3>
                    <button type='button' class='btn btn-danger fs-5 m-2 ms-auto' onclick="usun('${pizza.nazwaPizzy}', '${pizza.cenaPizzy}')">Usuń</button>
                  </li>`;
    }
    lista += "</ul>";

    const zamowienieElement = document.querySelector('#zamowienie');
    if (zamowienieElement) {
        zamowienieElement.innerHTML = lista;
    }

    const cenaElement = document.querySelector('#cena');
    if (cenaElement) {
        cenaElement.innerHTML = `Przejdź do złożenia zamówienia: ${cena.toFixed(2)} zł<img class="strzalka mx-3" src="assets/right.png" alt="right">`;
    }

}

//WCZYTANIE SKŁADNIKÓW Z BAZY DANYCH DO STWORZENIA WŁASNEJ PIZZY
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


function zlozZamowieni(event){
    event.preventDefault()
    const imieNazwisko = document.querySelector('#imie').value
    const nrTele = document.querySelector('#numer').value
    const ulica = document.querySelector('#ulica').value
    const nrDomu = document.querySelector('#numerDomu').value
    const miasto = document.querySelector('#miasto').value
    const nrMieszkania = document.querySelector('#numerMieszkania').value
    const pietro = document.querySelector('#pietro').value
    const uwagi = document.querySelector('#uwagi').value
    let cena = 0;
    koszyk.forEach(pizza => {
        cena += parseFloat(pizza.cenaPizzy);
        console.log(pizza.nazwaPizzy, pizza.cenaPizzy, pizza.skladnikiPizzy);
    });
    console.log(imieNazwisko, nrTele, ulica, nrDomu, miasto, nrMieszkania, pietro, uwagi, cena.toFixed(2));
}

function liczCene() {
    let totalPrice = 10; //Cena podstawowa pizzy własnej
    const checkboxes = document.querySelectorAll('.form-check-input:checked');

    checkboxes.forEach(checkbox => {
        const price = parseFloat(checkbox.dataset.price);
        totalPrice += price;
    });

    const priceElement = document.getElementById('cenaWlasna');
    priceElement.textContent = `Cena: ${totalPrice.toFixed(2)} zł`;
    return totalPrice;
}