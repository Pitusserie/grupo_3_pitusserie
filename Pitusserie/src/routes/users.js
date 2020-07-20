const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');
const registerValidations = require('../validations/registerValidations');
const loginValidations = require('../validations/loginValidations');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads/avatars'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

router.get('/login', userController.login);
router.post('/login', loginValidations, userController.verify);

router.get('/register', userController.register);
router.post('/register', upload.any(), registerValidations, userController.store);

router.get('/edit/:id', userController.edit);
router.put('/edit/:id', upload.any(), userController.update);
router.delete('/edit/:id', userController.destroy);

router.get('/cart', userController.cart);

router.get('/:id', userController.perfil);

module.exports = router;