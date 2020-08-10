function qs (elemento) {
    return document.querySelector(elemento);
}

window.addEventListener('load', function() {
    let inputCategorias = qs('#categorias');
    let errorCategorias = qs('#errCategorias');
    let inputTitulo = qs('#titulo');
    let errorTitulo = qs('#errTitulo');
    let inputDesc = qs('#descripcion');
    let errorDesc = qs('#errDescripcion');
    let inputPrecio = qs('#precio');
    let errorPrecio = qs('#errPrecio');
    let inputPorciones = qs('#porciones');
    let errorPorciones = qs('#errPorciones');
    let btnEnviar = qs("button[type='submit']");
    let errorsBack = document.querySelectorAll('.errorsBack');

    btnEnviar.addEventListener('click', function(e) {

        if(errorsBack != undefined) {
            errorsBack.forEach(function(elemento) {
                elemento.innerText = ''
            })
        };
        
        let errores = {};

        if(inputTitulo.value.length <= 2) {
            errores.titulo = 'Como minimo 2 caracteres';
        }
        if(!inputDesc.value.length) {
            errores.desc = 'Este campo es obligatorio';
        }
        if(inputPrecio.value.length == 0) {
            errores.precio = 'Este campo es obligatorio';
        }
        if(inputPorciones.value.length == 0) {
            errores.porciones = 'Este campo es obligatorio';
        }
        if(Object.keys(errores).length != 0) {
            e.preventDefault();
            (errorTitulo.innerText) = (errores.titulo) ? errores.titulo : '';
            (errorDesc.innerText) = (errores.desc) ? errores.desc : '';
            (errorPrecio.innerText) = (errores.precio) ? errores.precio : '';
            (errorPorciones.innerText) = (errores.porciones) ? errores.porciones : '';
        }
    })
})