function qs (elemento) {
    return document.querySelector(elemento);
}

let categorieSelect = qs('#categorie');
let subCategorieSelect = qs('#subCategorie');
let categories
let optionsSubCategories = ''

fetch('http://localhost:3000/products/categoriesFront')
.then(function(response) {
    return response.json()
})
.then(function(categorias) {
    categories = categorias
})

categorieSelect.addEventListener('change', function() {
    subCategorieSelect.removeAttribute('disabled')
    optionsSubCategories = ''
    categories.forEach(function(categoria) {
        if(categoria.id == categorieSelect.value) {
            categoria.subCategorie.forEach(function(subCategoria) {
                optionsSubCategories += `<option value=${subCategoria.id}>${subCategoria.sub_categorie}</option>`
            })
        }
    });
    subCategorieSelect.innerHTML = (optionsSubCategories != '') ?  optionsSubCategories : '<option value=0>no tiene sub categorias</option>'
})