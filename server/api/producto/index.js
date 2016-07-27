'use strict';

var express = require('express');
var controller = require('./producto.controller');
const auth = require('../../components/auth/auth');

var router = express.Router();

//trae los productos del usuario que hace el request
router.get('/', auth.loggedIn, controller.productosUsuario);

//agregar un producto nuevo
router.post('/', auth.loggedIn, controller.agregarProducto);

//editar un producto
router.put('/', auth.loggedIn, controller.editarProducto);

//eliminar un producto 
router.delete('/:id', auth.loggedIn, controller.eliminarProducto);

//traer el número de productos del usuario logeado
router.get('/countProductos', auth.loggedIn, controller.getNumProductosUsuario);

//trae las imagenes de un producto específico por id
router.get('/imagenesProducto/:id', auth.loggedIn, controller.getImagenesProducto);
module.exports = router;