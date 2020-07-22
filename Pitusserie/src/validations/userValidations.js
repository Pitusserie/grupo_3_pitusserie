const fs = require('fs');
const {check,validationResult,body} = require('express-validator');
const path = require('path');
const bcrypt = require('bcrypt');
let usuarios = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf8');
usuarios = JSON.parse(usuarios)

module.exports= [
    check('nombre')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio'),
    check('apellido')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio'),
    check('dni')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio y debe ser numerico')
        .isNumeric()
        .withMessage('Este campo es obligatorio y debe ser numerico'),
    check('telefono')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio y debe ser numerico')
        .isNumeric()
        .withMessage('Este campo es obligatorio y debe ser numerico'),
    check('email')
        .isEmail()
        .withMessage('Inserte un mail valido.'),
]