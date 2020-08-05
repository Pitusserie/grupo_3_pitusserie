const db = require('../database/models/index.js');

function authCookieMiddleware(req, res, next) {
    db.User.findAll()
    .then(function(users) {
        if(req.cookies.authRemember != undefined && req.session.usuario == undefined) {
            for(let i = 0; i < users.length; i++) {
                if(req.cookies.authRemember == users[i].email) {
                    req.session.usuario = {
                        id: users[i].id,
                        nombre: users[i].name,
                        apellido: users[i].surname,
                        dni: users[i].dni,
                        telefono: users[i].phone,
                        email: users[i].email,
                        img: users[i].img,
                        administrador: users[i].admin
                    }
                }
            }
        }
        next();
    })
}

module.exports = authCookieMiddleware;
