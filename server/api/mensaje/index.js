'use strict';

var express = require('express');
var controller = require('./mensaje.controller');
const auth = require('../../components/auth/auth');

var router = express.Router();

router.get('/', auth.loggedIn, controller.conversaciones);
router.post('/', auth.loggedIn);

module.exports = router;
