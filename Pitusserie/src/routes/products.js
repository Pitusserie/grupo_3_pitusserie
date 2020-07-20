const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require('../controllers/productsController')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads/productos'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
   
var upload = multer({ storage: storage })

router.get('/', productsController.products);

router.get('/carga', productsController.carga);
router.post('/carga', upload.any(), productsController.store);

router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', upload.any(), productsController.update);
router.delete('/edit/:id', productsController.destroy);

router.get('/:id', productsController.detail);

module.exports = router;
 