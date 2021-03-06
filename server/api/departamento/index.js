'use strict';

var express = require('express');
var controller = require('./departamento.controller');
const auth = require('../../components/auth/auth');

var router = express.Router();

router.get('/', auth.loggedIn, controller.departamentoSel);
router.post('/', auth.loggedIn, controller.agregarDepartamento);
router.put('/', auth.loggedIn, controller.editarDepartamento);
router.delete('/:id', auth.loggedIn, controller.eliminarDepartamento);
router.get('/countDeptos',auth.loggedIn,controller.getNumDepartamentos);
module.exports = router;
