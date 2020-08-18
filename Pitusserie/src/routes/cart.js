const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.cart);
router.post('/', userController.confirmarCompra)
router.get('/add/:id', userController.cartAdd);
router.get('/destroy/:id', userController.cartDestroy);
router.get('/cCart', userController.cantidadCart);
router.get('/addIr/:id', userController.cartComprar);

module.exports = router;