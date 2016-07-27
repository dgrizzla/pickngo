'use strict';

var express = require('express');
var controller = require('./categoria.controller');
const auth = require('../../components/auth/auth');

var router = express.Router();

router.get('/', auth.loggedIn, controller.categoriaSel);
router.post('/', auth.loggedIn, controller.agregarCategoria);
router.put('/', auth.loggedIn, controller.editarCategoria);
router.delete('/:id', auth.loggedIn, controller.eliminarCategoria);
router.get('/porDepartamento',auth.loggedIn, controller.categoriasPorDepto);
module.exports = router;
