const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {check, validationResult, body, cookie} = require('express-validator'); 
const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = {
    login: function(req, res) {
        res.render('login')
    },
    register: function(req, res) {
        res.render('register');
    },
    perfil: function(req, res) {
        for(let i = 0; i < users.length; i++) {
			if(users[i].id == req.params.id) {
				res.render('perfil', {
					usuario: users[i]
				})
			}
		}
    },
    cart: function(req, res) {
        res.render('cart', {
            productos:productos,
            id:req.params.id
        });
    },
    verify: function(req, res) {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            for(let i = 0; i < users.length; i++) {
                if(users[i].email == req.body.email && bcrypt.compareSync(req.body.contrasena, users[i].contrasena)) {
                    req.session.idUsuario = users[i].id
                    // la session se puede pedir en cualquier lado escribiendo req.session.idUsuario
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
                old: req.body
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
        res.redirect('/');  
        } else{
        res.render('register', {
            errors: errors.mapped(),
            old: req.body
        })
        }
    },
    edit: (req, res) => {
		for(let i = 0; i < users.length; i++) {
			if(users[i].id == req.params.id) {
				res.render('editUsers', {
					usuario: users[i]
				})
			}
		}
    },
    update: function(req, res) {
		let usersActualizado = {
			id: Number(req.params.id),
			nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            telefono: req.body.telefono,
            email: req.body.email,
            contrasena: req.body.contrasena1
        }
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
        res.redirect('/');  
        } else{
        res.render('register', {
            errors: errors.mapped(),
            old: req.body
        })
        }
    },
    edit: (req, res) => {
		for(let i = 0; i < users.length; i++) {
			if(users[i].id == req.params.id) {
				res.render('editUsers', {
					usuario: users[i]
				})
			}
		}
    },
    update: function(req, res) {
		let usersActualizado = {
			id: Number(req.params.id),
			nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            telefono: req.body.telefono,
            email: req.body.email,
            contrasena: req.body.contrasena1,
		}
		for(let i = 0; i < users.length; i++) {
			if(users[i].id == usersActualizado.id) {
				users[i] = usersActualizado;
				fs.writeFileSync(usersFilePath, JSON.stringify(users));
				res.redirect('/')
			}
		}
    },
    destroy : (req, res) => {
	 	for(let i = 0; i < users.length; i++) {
	 		if(users[i].id == req.params.id) {
	 			let index = users.indexOf(users[i]);
	 			users.splice(index, 1);
	 			fs.writeFileSync(usersFilePath, JSON.stringify(users));
				res.redirect('/')
			}
		}
	}
}