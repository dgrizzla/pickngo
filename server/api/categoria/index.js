'use strict';

var express = require('express');
var controller = require('./categoria.controller');
import auth from '../../components/auth/auth'

var router = express.Router();

router.get('/', auth.loggedIn, controller.categoriaSel);
router.post('/', auth.loggedIn, controller.agregarCategoria);
router.put('/', auth.loggedIn, controller.editarCategoria);
router.delete('/:id', auth.loggedIn, controller.eliminarCategoria);
module.exports = router;
