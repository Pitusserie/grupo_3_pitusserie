const { validationResult } = require('express-validator');
const db = require('../database/models/index.js');

module.exports = {
    products: function (req, res) {
        let categorias
        let subCategorias
        let filtroGeneral
        let filtroClases
        switch (req.query.filtro) {
            case undefined:
            case 'todos':
                filtroGeneral = {}
                break
            case '- a +':
                filtroGeneral = {
                    order: [
                        ['price', 'ASC']
                    ]
                }
                break
            case '+ a -':
                filtroGeneral = {
                    order: [
                        ['price', 'DESC']
                    ]
                }
                break
            default:
                if(req.query.filtro.startsWith('C')) {
                    filtroClases = {
                        categorie_id: req.query.filtro.replace('C', '')
                    }
                } else if(req.query.filtro.startsWith('S')) {
                    filtroClases = {
                        sub_categorie_id: req.query.filtro.replace('S', '')
                    }
                }
        }
        let stringBusqueda = ''
        if(typeof(req.query.busqueda) == 'undefined' || req.query.busqueda == '') {
            stringBusqueda = '%%'
        } else {
            for(let i = 0; i < req.query.busqueda.length; i++) {
                    stringBusqueda += `%${req.query.busqueda[i]}%`
            }
        }
        db.Categorie.findAll()
        .then(function(categories) {
            categorias = categories
            db.SubCategorie.findAll()
            .then(function(subCategories) {
                subCategorias = subCategories
                db.Product.findAll({
                    where: {
                        title: {
                          [db.Sequelize.Op.like]: stringBusqueda
                        },
                        ...filtroClases
                    },
                    ...filtroGeneral 
                })
                .then(function (productos) {
                    res.render('products', {
                        productos: productos,
                        categorias: categorias,
                        subCategorias: subCategorias,
                        id: req.params.id,
                        session: req.session.usuario
                    });
                })
            })
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