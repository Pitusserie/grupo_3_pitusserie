const {check,validationResult,body} = require('express-validator');

module.exports= [
    check('titulo')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio'),
    check('descripcion')
        .isLength({min: 1})
        .withMessage('Este campo es obligatorio'),
    check('precio')
        .isLength({min: 1}).withMessage('Este campo es obligatorio')
        .isNumeric().withMessage('Este campo debe ser numerico'),
    check('categorie')
        .custom(function(value) {
            if (value == 0) {
                return false
            } else {
                return true
            }
        })
        .withMessage('Este campo es obligatorio')
]