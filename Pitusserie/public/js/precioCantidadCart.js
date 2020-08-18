function qs (elemento) {
    return document.querySelector(elemento);
}

window.addEventListener('load', function() {

    let subTotal = qs('#subTotal');
    let items = qs('#items');
    let cantidadProducts = qs('#cantidadProducts').innerText;
    let cantidadItems = 0;
    let cantidadSubTotal = 0;
    let cantidadDeCadaProduct = [];
    let precioPorProduct = [];
    let continuarCompra = qs('.botonComprar');

    for(let i = 0; i < cantidadProducts; i++) {
        
        precioPorProduct.push(qs(`#select${i}`).value.split('-')[0] * qs(`#precio${i}`).innerText.replace('$ ', ''));
        cantidadDeCadaProduct.push(qs(`#select${i}`).value.split('-')[0]);

        qs(`#select${i}`).addEventListener('change', function() {

            cantidadDeCadaProduct.splice(i, 1, this.value.split('-')[0]);
            cantidadItems = 0;
            cantidadDeCadaProduct.forEach(function(elemento) {
                cantidadItems += Number(elemento)
            })
            items.innerText = `${cantidadItems} Items`

            precioPorProduct.splice(i, 1, this.value.split('-')[0] * qs(`#precio${i}`).innerText.replace('$ ', ''));
            cantidadSubTotal = 0;
            precioPorProduct.forEach(function(elemento) {
                cantidadSubTotal += elemento
            })
            subTotal.innerText = `$ ${cantidadSubTotal}`
        })
    }

    continuarCompra.addEventListener('click', function(e) {
        if(items.innerText.split(' ')[0] == 0) {
            e.preventDefault();
        }
    })

});