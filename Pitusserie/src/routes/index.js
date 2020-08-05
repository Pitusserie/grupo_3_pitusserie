const express = require('express');
const router = express.Router();
const multer = require('multer');
const indexController = require('../controllers/indexController');
const path = require('path');
const db = require('../database/models/index');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads/avatars'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
   
var upload = multer({ storage: storage })
  
router.get('/', indexController.index);

router.get('/error', indexController.error);

router.get('/probandoProducts', function(req, res) {
  db.Product.findAll({
    include: [{association: 'user'}, {association: 'categorie'}]
  })
    .then(function(resultado) {
      res.send(resultado);
    })
})

router.get('/probandoProducts/:id', function(req, res) {
  db.Product.findByPk(req.params.id, {
    include: [{association: 'user'}, {association: 'categorie'}]
  })
    .then(function(resultado) {
      res.send(resultado);
    })
})

router.get('/probandoUsers', function(req, res) {
  db.User.findAll({
    include: [{association: 'product'}]
  })
    .then(function(resultado) {
      res.send(resultado);
    })
})

router.get('/probandoUsers/:id', function(req, res) {
  db.User.findByPk(req.params.id, {
    include: [{association: 'product'}]
  })
    .then(function(resultado) {
      res.send(resultado);
    })
})

module.exports = router;