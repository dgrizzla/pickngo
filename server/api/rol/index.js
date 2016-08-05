'use strict';

var express = require('express');
var controller = require('./rol.controller');

var router = express.Router();

router.get('/:id/:order/:offset/:limit/', controller.getOpcionesDesc);
router.get('/:id/:order/:offset/:limit/:asc', controller.getOpciones);

module.exports = router;
