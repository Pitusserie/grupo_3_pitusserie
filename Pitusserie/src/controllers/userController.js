const bcrypt = require('bcrypt');
const {check, validationResult, body, cookie} = require('express-validator');

const db = require('../database/models/index.js');

module.exports = {
    login: function(req, res) {
        res.render('login', {
            session: req.session.usuario
        })
    },
    register: function(req, res) {
        res.render('register', {
            session: req.session.usuario
        });
    },
    perfil: function(req, res) {
		res.render('perfil', {
            session: req.session.usuario
        });
    },
    cart: function(req, res) {
        db.Producto.findAll()
        .then(function (productos) {
            res.render('cart', {
                productos:productos,
                id:req.params.id,
                session: req.session.usuario
            });
        })
    },
    verify: function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Usuario.findAll()
            .then(function (usuarios) {
                for (let i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].email == req.body.email && bcrypt.compareSync(req.body.contrasena, usuarios[i].contrasena)) {
                        req.session.usuario = {
                            id: usuarios[i].id,
                            nombre: usuarios[i].nombre,
                            apellido: usuarios[i].apellido,
                            dni: usuarios[i].dni,
                            telefono: usuarios[i].telefono,
                            email: usuarios[i].email,
                            img: usuarios[i].img,
                            administrador: usuarios[i].administrador
                        }
                        if (req.body.recordarme == 'on') {
                            res.cookie('authRemember', usuarios[i].email, { maxAge: 60000 * 60 * 24 * 90 })
                        }
                        return res.redirect('/')
                    }
                }
                return res.render('login', {
                    errors: {
                        email: {
                            msg: 'Credenciales inválidas. Inserta un email registrado y su respectiva contraseña'
                        }
                    },
                    session: req.session.usuario
                })
            })
        } else {
            res.render('login', {
                errors: errors.mapped(),
                old: req.body,
                session: req.session.usuario
            })
        }
    },
    store: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            db.Usuario.findAll()
            .then(function(usuarios) {
                for(i = 0; i < usuarios.length; i++) {
                    if(usuarios[i].email == req.body.email) {
                        return res.render('register', {
                            errors: {
                                email: {
                                    msg: 'Este email ya se encuentra registrado en pitusserie'
                                }
                            },
                            old: req.body,
                            session: req.session.usuario
                        })
                    }
                }
                db.Usuario.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    dni: req.body.dni,
                    telefono: req.body.telefono,
                    email: req.body.email,
                    contrasena: bcrypt.hashSync(req.body.contrasena1, 10),
                    img: req.files[0].filename
                })
                res.redirect('/users/login');
            })
        } else{
            res.render('register', {
                errors: errors.mapped(),
                old: req.body,
                session: req.session.usuario
        })
        }
    },
    update: function(req, res) {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            db.Usuario.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dni: req.body.dni,
                telefono: req.body.telefono,
                email: req.body.email
            },
            {
                where: {
                    id: req.session.usuario.id
                }
            })
            req.session.destroy();
            res.cookie('authRemember', '', {maxAge: -1})
            res.redirect('/users/login');
        } else {
            res.render('editUsers', {
                errors: errors.mapped(),
                session: req.session.usuario
            })
        }
    },
    edit: (req, res) => {
		res.render('editUsers', {
			session: req.session.usuario
		});
    },
    destroy: function (req, res) {
        db.Usuario.destroy({
            where: {
                id: req.session.usuario.id
            }
        })
            .then(function (resultado) {
                req.session.destroy();
                res.cookie('authRemember', '', { maxAge: -1 })
                res.redirect('/')
            })
    },
    cerrarSession: function(req, res) {
        req.session.destroy();
        res.cookie('authRemember', '', {maxAge: -1})
        res.redirect('/');
    }
}