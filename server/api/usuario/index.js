'use strict';

var express = require('express');
var controller = require('./usuario.controller');

var router = express.Router();


router.get('/paises',controller.getPaises);
router.get('/validaCorreoExistente/:correo', controller.validaCorreoExistente);
router.get('/validaUsuarioExistente/:usuario', controller.validaUsuarioExistente);
router.post('/registroUsuario', controller.registroUsuario);
module.exports = router;
