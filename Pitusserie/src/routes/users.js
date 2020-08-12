const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');
const registerValidations = require('../validations/registerValidations');
const loginValidations = require('../validations/loginValidations');
const userValidations = require('../validations/userValidations');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads/avatars'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

router.get('/edit', authMiddleware, userController.edit);
router.put('/edit', userValidations, userController.update);
router.delete('/edit', userController.destroy);

router.get('/login', userController.login);
router.post('/login', loginValidations, userController.verify);

router.get('/register', userController.register);
router.post('/register', upload.any(), registerValidations, userController.store);

router.get('/cart', userController.cart);
router.get('/cart/add/:id', userController.cartAdd);
router.get('/cart/destroy/:id', userController.cartDestroy);

router.get('/user', authMiddleware, userController.perfil);

router.get('/cerrarSession', userController.cerrarSession);

module.exports = router;