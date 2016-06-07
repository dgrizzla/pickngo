'use strict';

var express = require('express');
var controller = require('./departamento.controller');
import auth from '../../components/auth/auth'

var router = express.Router();

router.get('/', auth.loggedIn, controller.departamentoSel);
router.post('/', auth.loggedIn, controller.agregarDepartamento);
router.put('/', auth.loggedIn, controller.editarDepartamento);
router.delete('/:id', auth.loggedIn, controller.eliminarDepartamento);
module.exports = router;
