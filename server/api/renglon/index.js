
var express = require('express');
var path = require('path');
var multer = require('multer');
var controller = require('./renglon.controller');
var config = require('../../config/environment');

var storage = multer.diskStorage({
  destination: config._uploadDirectory,
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
var uploader = multer({storage});

var router = express.Router();

router.get('/', controller.getAll);
router.get('/imagenes', controller.getAllImagenes);
router.get('/:id', controller.getOne);
router.get('/:id/articulos', controller.getArticulos);
router.get('/:id/imagenes', controller.getImagenes);
router.get('/sort/:order/:offset/:limit/:asc', controller.getSort);


router.post('/', controller.post);
router.post('/imagen', uploader.single('file'), controller.postImage);
router.post('/articulo', controller.postArticulo);


router.delete('/imagen/:id', controller.deleteImage);
router.delete('/articulo/:id', controller.deleteArticulo);
router.delete('/:id', controller.delete);

router.put('/:id', controller.put);
router.put('/articulo/:id', controller.putArticulo);
module.exports = router;