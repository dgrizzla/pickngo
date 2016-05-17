'use strict';

var express = require('express');
var controller = require('./usuario.controller');

var router = express.Router();

//router.get('/', controller.index);
router.post('/login', controller.login)
router.get('/getPaises',controller.getPaises);
router.post('/registroUsuario', controller.registroUsuario);
module.exports = router;
