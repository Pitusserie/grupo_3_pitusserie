const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function authCookieMiddleware(req, res, next) {
    if(req.cookies.authRemember != undefined && req.session.usuario == undefined) {
        for(let i = 0; i < users.length; i++) {
            if(req.cookies.authRemember == users[i].email) {
                req.session.usuario = {
                    id: users[i].id,
                    nombre: users[i].nombre,
                    apellido: users[i].apellido,
                    dni: users[i].dni,
                    telefono: users[i].telefono,
                    email: users[i].email,
                    img: users[i].img
                }
            }
        }
    }
    next();
}

module.exports = authCookieMiddleware;
