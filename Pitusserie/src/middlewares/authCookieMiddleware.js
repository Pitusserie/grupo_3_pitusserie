const db = require('../database/models/index.js');

function authCookieMiddleware(req, res, next) {
    db.Usuario.findAll()
    .then(function(usuarios) {
        if(req.cookies.authRemember != undefined && req.session.usuario == undefined) {
            for(let i = 0; i < usuarios.length; i++) {
                if(req.cookies.authRemember == usuarios[i].email) {
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
                }
            }
        }
        next();
    })
}

module.exports = authCookieMiddleware;
