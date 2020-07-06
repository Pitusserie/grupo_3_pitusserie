const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');
const productsController = require('../controllers/productsController');
const path= require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads/avatars'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
   
var upload = multer({ storage: storage })
  
router.get('/', productsController.index);

router.get('/login', userController.login);
router.post('/login', function(req, res) {
    res.redirect('/login')
});

router.get('/register', userController.register);
router.post('/register', function(req, res) {
    res.redirect('/register')
});

router.get('/cart', productsController.cart);

router.get('/error', function(req, res) {
    res.render('error')
})

module.exports = router;