'use strict';

var express = require('express');
var controller = require('./subcategoria.controller');
import auth from '../../components/auth/auth'

var router = express.Router();

router.get('/', auth.loggedIn, controller.subCategoriaSel);
router.post('/', auth.loggedIn, controller.agregarSubCategoria);
router.put('/', auth.loggedIn, controller.editarSubCategoria);
router.delete('/:id', auth.loggedIn, controller.eliminarSubCategoria);
module.exports = router;
