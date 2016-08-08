'use strict';

var express = require('express');
var controller = require('./usuario.controller');

var router = express.Router();


router.get('/paises',controller.getPaises);
router.get('/:id',controller.getUsuario);
router.get('/validaCorreoExistente/:correo', controller.validaCorreoExistente);
router.get('/validaUsuarioExistente/:usuario', controller.validaUsuarioExistente);
router.get('/:order/:offset/:limit/', controller.getUsuariosDesc);
router.get('/:order/:offset/:limit/:asc', controller.getUsuarios);
router.post('/registroUsuario', controller.registroUsuario);

router.put('/:id', controller.putUsuario);

module.exports = router;
