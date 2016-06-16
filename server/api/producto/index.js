'use strict';

var express = require('express');
var controller = require('./producto.controller');
import auth from '../../components/auth/auth'

var router = express.Router();

//trae los productos del usuario que hace el request
router.get('/', auth.loggedIn, controller.productosUsuario);

//agregar un producto nuevo
router.post('/', auth.loggedIn, controller.agregarProducto);
module.exports = router;