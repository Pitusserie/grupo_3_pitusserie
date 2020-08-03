const {check,validationResult,body} = require('express-validator');

module.exports= [
    check('email')
        .isEmail().withMessage('Este email no es valido'),
    check('contrasena')
        .isLength({min: 6, max: 16}).withMessage('La contraseña no es valida')
]