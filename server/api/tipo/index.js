'use strict';

var express = require('express');
var controller = require('./tipo.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/usuario', controller.getTipoUsuario);

router.post('/', controller.postTipo);

router.put('/:id');
module.exports = router;
