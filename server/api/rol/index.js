'use strict';

var express = require('express');
var controller = require('./rol.controller');

var router = express.Router();

router.get('/:id/:order/:offset/:limit/', controller.getOpcionesDesc);
router.get('/:id/:order/:offset/:limit/:asc', controller.getOpciones);


router.post('/', controller.postRol);
router.post('/opcion', controller.postRolOpcion);

router.delete('/opcion/:id', controller.deleteRolOpcion);

router.put('/:id', controller.putRol);
module.exports = router;
