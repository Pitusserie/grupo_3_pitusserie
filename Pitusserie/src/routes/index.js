const express = require('express');
const router = express.Router();
const multer = require('multer');
const indexController = require('../controllers/indexController');
const path= require('path');
const db = require('../database/models/index.js');

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

router.get('/error', indexController.error)

module.exports = router;