'use strict';

var express = require('express');
var controller = require('./opcion.controller');

var router = express.Router();


router.get('/:order/:offset/:limit/', controller.getOpcionesDesc);
router.get('/:order/:offset/:limit/:asc', controller.getOpciones);
router.get('/tipos', controller.getTipos);

router.put('/:id', controller.put);

router.post('/', controller.post);

module.exports = router;
