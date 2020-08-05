const { validationResult } = require('express-validator');
const db = require('../database/models/index.js');

module.exports = {
    products: function (req, res) {
        db.Product.findAll()
        .then(function (productos) {
            res.render('products', {
                productos: productos,
                id: req.params.id,
                session: req.session.usuario
            });
        })
    },
    detail: function(req, res) {
        db.Product.findByPk(req.params.id)
        .then(function(productos) {
            res.render('detailProducts',{
                producto: productos,
                id:req.params.id,
                session: req.session.usuario
            });
        })
    },
    carga: function(req, res) {
        res.render('cargaProducts', {
            session: req.session.usuario
        });
    },
    store: function(req, res) {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            db.Product.create({
                categorie_id: req.body.categorias,
                title: req.body.titulo,
                description: req.body.descripcion,
                price: req.body.precio,
                img: req.files[0].filename,
                slices: req.body.porciones
            })
            res.redirect('/products');
        } else {
            res.render('cargaProducts', {
                errors: errors.mapped(),
                old: req.body,
                session: req.session.usuario
            })
        }
    },
    edit: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(function(producto) {
            res.render('editProducts', {
                producto: producto,
                session: req.session.usuario
            })
        })
    },
    update: function(req, res) {
		db.Product.update({
			categorie_id: req.body.categorias,
            title: req.body.titulo,
            description: req.body.descripcion,
            price: req.body.precio,
            slices: req.body.porciones
        },
        {
            where: {
                id: req.params.id
            }
        }) 
        .then(function(resultado) {
            res.redirect('/products');
        })
    },
    destroy: function (req, res) {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (resultado) {
                res.redirect('/products')
            })
    }
}