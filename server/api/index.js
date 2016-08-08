
const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.use('/productos', require('./producto'));
router.use('/subcategorias', require('./subcategoria'));
router.use('/categorias', require('./categoria'));
router.use('/tipos', require('./tipo'));
router.use('/departamentos', require('./departamento'));
router.use('/usuarios', require('./usuario'));
router.use('/things', require('./thing'));
router.use('/roles', require('./rol'));
router.use('/opciones', require('./opcion'));
router.use('/paises', controller.getPaises);

module.exports = router;