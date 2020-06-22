const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
  
router.get('/', userController.index);

router.get('/register', userController.register);
router.post('/register', function(req, res) {
    res.redirect('/register')
});

router.get('/login', userController.login);
router.post('/login', function(req, res) {
    res.redirect('/login')
});

module.exports = router;