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
        .isLength({min: 1}).withMessage('Este campo es obligatorio')
        .isNumeric().withMessage('Este campo debe ser numerico'),
    check('telefono')
        .isLength({min: 1}).withMessage('Este campo es obligatorio')
        .isNumeric().withMessage('Este campo debe ser numerico'),
    check('email')
        .isEmail().withMessage('Inserte un mail valido.'),
    body('email')
        .custom( function(value) {       
            for(let i = 0; i < usuarios.length; i++){
                if(usuarios[i].email == value) {
                    return false;
                    }
            } 
            return true
         }).withMessage('Este mail ya se encuentra registrado en Pitusserie'),
    check('contrasena1')
        .isLength({min:6,max:16}).withMessage('Tiene que tener minimo 6 caracteres y máximo 16.'),
    // check('contrasena2')
    //     .isLength({min:6,max:16}).withMessage('Tiene que tener minimo 6 caracteres y máximo 16.')
    //     .equals('abc').withMessage('Las contraseñas no coinciden'),
]