const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const productsController = require('../controllers/productsController')
  
router.get('/', productsController.index);

router.get('/login', userController.login);
router.post('/login', function(req, res) {
    res.redirect('/login')
});

router.get('/register', userController.register);
router.post('/register', function(req, res) {
    res.redirect('/register')
});

router.get('/products', productsController.products)

router.get('/detailProducts', productsController.detail);

router.get('/error', function(req, res) {
    res.render('error')
})

module.exports = router;