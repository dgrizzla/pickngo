'use strict';

var express = require('express');
var controller = require('./proveedor.controller');
const auth = require('../../components/auth/auth');

var router = express.Router();

router.get('/', auth.loggedIn, controller.getProveedores);
router.get('/estados', auth.loggedIn,controller.getEstados);
router.get('/tipos', auth.loggedIn, controller.getTipos);
router.get('/categorias/:id', auth.loggedIn, controller.getCategorias);

//ruta para traer solo el nombre y el id de los proveedores
router.get('/info', auth.loggedIn,controller.getInfoProveedores)

router.post('/', auth.loggedIn, controller.postProveedor);
router.post('/categoria', auth.loggedIn, controller.addCategoria);

router.put('/', auth.loggedIn, controller.putProveedor);

router.delete('/categoria/:id', auth.loggedIn,controller.deleteProveedorCategoria);

module.exports = router;
