function qs (elemento) {
    return document.querySelector(elemento);
}

let headerMovil = document.querySelector('#headerMovil');

window.addEventListener('scroll', function() {
    const scroll = window.scrollY
    if (scroll > 50) {
        headerMovil.classList.add('visible');
    } else {
        headerMovil.classList.remove('visible');
    }
});

let buttonHamburguesa = document.querySelector('#buttonHamburguesa');
let buttonCruz = document.querySelector('#buttonCruz');
let menuBar = document.querySelector('#menuBar');
let divCierreMenuBar = document.querySelector('#divCierreMenuBar');

let condicion = true

function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
function enableScroll() { 
    window.onscroll = function() {}; 
}

function bloquearScrollMovil(){
    if (condicion) {
        disableScroll()
        condicion = false;
        console.log(condicion)
    } else {
        enableScroll() 
        condicion = true;
        console.log(condicion)
    }
}

function bloquearScroll() {
    if (condicion) {
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
        condicion = false;
        console.log(condicion)
    } else {
        document.body.style.position = '';
        document.body.style.top = '';
        condicion = true;
        console.log(condicion)
    }
}

buttonHamburguesa.addEventListener("click", function() {
    menuBar.classList.toggle('widthMenuBar');
    divCierreMenuBar.classList.toggle('conBarAbierto');
    bloquearScroll();
});
buttonCruz.addEventListener("click", function() {
    menuBar.classList.toggle('widthMenuBar');
    divCierreMenuBar.classList.toggle('conBarAbierto');
    bloquearScroll();
});
divCierreMenuBar.addEventListener("click", function() {
    menuBar.classList.toggle('widthMenuBar');
    divCierreMenuBar.classList.toggle('conBarAbierto');
    bloquearScroll();
});

let buttonHamburguesaMovil = document.querySelector('#buttonHamburguesaMovil');
let cruzCollapseMovil = document.querySelector('#buttonCruzMovil');
let collapseMovil = document.querySelector('#menuBarMovil');
let divCierreMenuBarMovil = document.querySelector('#divCierreMenuBarMovil');

buttonHamburguesaMovil.addEventListener("click", function() {
    menuBarMovil.classList.toggle('widthMenuBarMovil');
    divCierreMenuBarMovil.classList.toggle('conBarAbiertoMovil');
    bloquearScrollMovil();
});
buttonCruzMovil.addEventListener("click", function() {
    menuBarMovil.classList.toggle('widthMenuBarMovil');
    divCierreMenuBarMovil.classList.toggle('conBarAbiertoMovil');
    bloquearScrollMovil();
});
divCierreMenuBarMovil.addEventListener("click", function() {
    menuBarMovil.classList.toggle('widthMenuBarMovil');
    divCierreMenuBarMovil.classList.toggle('conBarAbiertoMovil');
    bloquearScrollMovil();
});

fetch('http://localhost:3000/users/cart/cCart')
.then(function(response) {
    return response.json()
})
.then(function(cCart) {
    if(cCart != 0) {
        if(qs('.cCartIndex')) {
            qs('.cCartIndex').innerText = cCart
        }
        if(qs('.cCartHeader')) {
            qs('.cCartHeader').innerText = cCart
        }
        qs('.cCartHeaderMovil').innerText = cCart
    }
})

if(qs('.botonCarrito')) {
    qs('.botonCarrito').addEventListener("click", function () {
        fetch('http://localhost:3000/users/cart/cCart')
            .then(function (response) {
                return response.json()
            })
            .then(function (cCart) {
                if (cCart != 0) {
                    if (qs('.cCartIndex')) {
                        qs('.cCartIndex').innerText = cCart
                    }
                    if (qs('.cCartHeader')) {
                        qs('.cCartHeader').innerText = cCart
                    }
                    qs('.cCartHeaderMovil').innerText = cCart
                }
            })
    })
}