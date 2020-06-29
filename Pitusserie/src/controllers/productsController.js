const fs = require('fs');
const path = require('path');

let productos = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8');
productos = JSON.parse(productos);

module.exports = {
    index: function(req, res) {
        res.render('index', {
            productos: productos
        });
    },
    products: function(req, res) {
        res.render('products', {
            productos:productos,
            id:req.params.id
        });
    },
    detail: function(req, res) {
        res.render('detailProducts',{
            productos:productos,
            id:req.params.id
        });
    },
    cart: function(req, res) {
        res.render('cart', {
            productos:productos,
            id:req.params.id
        });
    },
    carga: function(req, res) {
        res.render('cargaProducts');
    }
}