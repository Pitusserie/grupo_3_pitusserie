const {check,validationResult,body} = require('express-validator');
const db = require('../database/models/index.js');

module.exports= [
    check('nombre')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio'),
    check('apellido')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio'),
    check('dni')
        .isLength({min: 1}).withMessage('Este campo es obligatorio')
        .isNumeric().withMessage('Este campo debe ser numerico'),
    check('telefono')
        .isLength({min: 1}).withMessage('Este campo es obligatorio')
        .isNumeric().withMessage('Este campo debe ser numerico'),
    check('email')
        .isEmail().withMessage('Inserte un mail valido.'),
    check('contrasena1')
        .isLength({min:6,max:16}).withMessage('Tiene que tener minimo 6 caracteres y máximo 16.'),
    // check('contrasena2')
    //     .isLength({min:6,max:16}).withMessage('Tiene que tener minimo 6 caracteres y máximo 16.')
    //     .equals('abc').withMessage('Las contraseñas no coinciden'),
]