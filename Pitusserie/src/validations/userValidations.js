const {check,validationResult,body} = require('express-validator');

module.exports= [
    check('nombre')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio'),
    check('apellido')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio'),
    check('dni')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio')
        .isNumeric()
        .withMessage('Este campo debe ser numerico'),
    check('telefono')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio')
        .isNumeric()
        .withMessage('Este campo debe ser numerico'),
    check('email')
        .isEmail()
        .withMessage('Inserte un mail valido.'),
]