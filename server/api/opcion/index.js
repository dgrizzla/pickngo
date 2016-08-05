'use strict';

var express = require('express');
var controller = require('./opcion.controller');

var router = express.Router();


router.get('/:order/:offset/:limit/', controller.getOpcionesDesc);
router.get('/:order/:offset/:limit/:asc', controller.getOpciones);

router.post('/',controller.postOpcion);

module.exports = router;
