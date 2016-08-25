'use strict';

var express = require('express');
var controller = require('./mensaje.controller');
const auth = require('../../components/auth/auth');

var router = express.Router();



//ruta para traer todas las conversaciones de un usuario
router.get('/conversaciones', auth.loggedIn, controller.conversaciones);

//ruta para verificar si ya existe una conversación con el usuario
router.get('/usuarioConversacion/:idUsuario', auth.loggedIn, controller.usuarioConversacion);

//ruta para traer el numero de conversaciones de un usuario
router.get('/countConversaciones', auth.loggedIn, controller.countConversaciones);

//ruta para traer los mensajes de una conversacion, recibe el id de la conversacion
router.get('/:idConversacion', auth.loggedIn,controller.conversacion)

//ruta para enviar un mensaje
router.post('/', auth.loggedIn, controller.enviarMensaje);

//ruta para iniciar nueva conversacion
router.post('/nuevaConversacion', auth.loggedIn, controller.nuevaConversacion)

module.exports = router;
