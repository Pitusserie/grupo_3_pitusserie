const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {check, validationResult, body, cookie} = require('express-validator');

const db = require('../database/models/index.js');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

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
    verify: function(req, res) {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            for(let i = 0; i < users.length; i++) {
                if(users[i].email == req.body.email && bcrypt.compareSync(req.body.contrasena, users[i].contrasena)) {
                    req.session.usuario = {
                        id: users[i].id,
                        nombre: users[i].nombre,
                        apellido: users[i].apellido,
                        dni: users[i].dni,
                        telefono: users[i].telefono,
                        email: users[i].email,
                        img: users[i].img
                    }

                    if(req.body.recordarme == 'on') {
                        res.cookie('authRemember', users[i].email, {maxAge: 60000 * 60 * 24 * 90})
                    }
                    
                    return res.redirect('/')
                }
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Credenciales inválidas. Inserta un email registrado y su respectiva contraseña'
                    }
                }
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
            let nuevoUsuario = {
                id: users[users.length - 1].id + 1,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dni: req.body.dni,
                telefono: req.body.telefono,
                email: req.body.email,
                contrasena: bcrypt.hashSync(req.body.contrasena1, 10),
                img: req.files[0].filename
            };
            users.push(nuevoUsuario);
            let listaActualizada = JSON.stringify(users);
            fs.writeFileSync(usersFilePath, listaActualizada);
            res.redirect('/users/login');
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
            for(let i = 0; i < users.length; i++) {
                if(users[i].id == req.session.usuario.id) {
                        users[i].nombre = req.body.nombre
                        users[i].apellido = req.body.apellido
                        users[i].dni = req.body.dni
                        users[i].telefono = req.body.telefono
                        users[i].email = req.body.email

                        fs.writeFileSync(usersFilePath, JSON.stringify(users));
                        req.session.destroy();
                        res.redirect('/users/login');
                }
            }
        } else{
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
    destroy: (req, res) => {
	 	for(let i = 0; i < users.length; i++) {
	 		if(users[i].id == req.session.usuario.id) {
	 			let index = users.indexOf(users[i]);
	 			users.splice(index, 1);
                fs.writeFileSync(usersFilePath, JSON.stringify(users));
                req.session.destroy();
				res.redirect('/');
			}
		}
    },
    cerrarSession: function(req, res) {
        req.session.destroy();
        res.cookie('authRemember', '', {maxAge: -1})
        res.redirect('/');
    }
}