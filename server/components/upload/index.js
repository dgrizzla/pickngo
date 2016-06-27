'use strict';

var express = require('express');
var controller = require('./upload.controller');
import auth from '../../components/auth/auth'

var router = express.Router();

//router.post('/imgProducto', auth.loggedIn, controller.imgProducto);

module.exports = router;
