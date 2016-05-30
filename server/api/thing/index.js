'use strict';

var express = require('express');
var controller = require('./thing.controller');

import auth from '../../components/auth/auth'

var router = express.Router();

router.get('/', auth.loggedIn, controller.index);

module.exports = router;
