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
    register: function(req, res) {
        res.render('register');
    },
    login: function(req, res) {
        res.render('login')
    },
    detail: function(req, res) {
        res.render('detailProducts')
    }
}