const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
  
router.get('/', indexController.index);

router.get('/error', indexController.error);

router.get('/grupo', function(req, res) {
    res.render('borrar');
})

module.exports = router;