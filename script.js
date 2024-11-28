document.addEventListener('DOMContentLoaded', function () {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

window.onload = () => {
    menu();
};

function menu() {
    const dane = document.querySelector('#dane'); // Define the dane variable

    let lista = "<ul class='lista rounded my-5'>";
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const listaMenu = data;
            listaMenu.forEach(pizza => {
                console.log(`Składniki dla ${pizza.nazwa_pizzy}:`);
                pizza.skladniki.forEach(skladnik => {
                    console.log(`- ${skladnik}`);
                });
                lista += `<li class='d-flex gap-2 align-items-center list-group-item'><h2>${pizza.nazwa_pizzy}</h2> - ${pizza.skladniki.join(', ')} 
<button type='button' class='btn mx-2 ms-auto'>${pizza.cena} zł</button></li>`;
            });
            // Add customizable pizza
            lista += `<li class='d-flex gap-2 align-items-center list-group-item'><h2>Stwórz własną pizzę</h2> - Wybierz własne składniki 
<button type='button' class='btn mx-2 ms-auto' data-bs-toggle="modal" data-bs-target="#kompnujPizze">Cena zależna od składników</button></li>`;
            dane.innerHTML = lista + "</ul>";
        })
        .catch(error => console.error('Błąd podczas wczytywania menu:', error));
}