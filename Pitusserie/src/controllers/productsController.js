const { validationResult } = require('express-validator');
const db = require('../database/models/index.js');

module.exports = {
    products: function (req, res) {
        // let condiciones
        // if(req.query == {}) {
        //     condiciones = {}
        // } else if( typeof(req.query.filtro) == 'number') {
        //     condiciones = {
        //         where: {
        //             categorie_id: req.query.filtro
        //         }
        //     }
        // }
        let stringBusqueda = ''
        if(typeof(req.query.busqueda) == 'undefined' || req.query.busqueda == '') {
            stringBusqueda = '%%'
        } else {
            for(let i = 0; i < req.query.busqueda.length; i++) {
                    stringBusqueda += `%${req.query.busqueda[i]}%`
            }
        }
        db.Product.findAll({
            where: {
                title: {
                  [db.Sequelize.Op.like]: stringBusqueda
                }      
              }
        })
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
        db.Categorie.findAll({
            include: [{association: 'subCategorie'}]
        })
        .then(function(categorias) {
            res.render('cargaProducts', {
                session: req.session.usuario,
                categorias: categorias
            });
        })
    },
    categoriesFront: function(req, res) {
        db.Categorie.findAll({
            include: [{association: 'subCategorie'}]
        })
        .then(function(categorias) {
            res.json(categorias);
        })
    },
    store: function(req, res) {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            db.Product.create({
                categorie_id: req.body.categorie,
                sub_categorie_id: req.body.subCategorie,
                title: req.body.titulo,
                description: req.body.descripcion,
                price: req.body.precio,
                img: req.files[0].filename,
                slices: req.body.porciones
            })
            .then(function() {
                res.redirect('/products');
            })
        } else {
            db.Categorie.findAll()
            .then(function(categorias) {
                res.render('cargaProducts', {
                    errors: errors.mapped(),
                    old: req.body,
                    session: req.session.usuario,
                    categorias: categorias
                })
            })
        }
    },
    edit: (req, res) => {
        db.Categorie.findAll({
            include: [{association: 'subCategorie'}]
        })
        .then(function(categorias) {
            db.Product.findByPk(req.params.id, {
                include: [{association: 'subCategorie'}, {association: 'categorie'}]
            })
            .then(function(producto) {
            res.render('editProducts', {
                producto: producto,
                session: req.session.usuario,
                categorias: categorias
            })
        })
        })
    },
    update: function(req, res) {
		db.Product.update({
            categorie_id: req.body.categorie,
            sub_categorie_id: req.body.subCategorie,
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