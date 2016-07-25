
var express = require('express');

var router = express.Router();

router.use('/productos', require('./producto'));
router.use('/subcategorias', require('./subcategoria'));
router.use('/categorias', require('./categoria'));
router.use('/tipos', require('./tipo'));
router.use('/departamentos', require('./departamento'));
router.use('/usuarios', require('./usuario'));
router.use('/things', require('./thing'));

module.exports = router;