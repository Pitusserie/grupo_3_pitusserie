const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, userController.cart);
router.post('/', authMiddleware, userController.confirmarCompra)
router.get('/add/:id', authMiddleware, userController.cartAdd);
router.get('/destroy/:id', authMiddleware, userController.cartDestroy);
router.get('/cCart', authMiddleware, userController.cantidadCart);
router.get('/addIr/:id', authMiddleware, userController.cartComprar);

module.exports = router;