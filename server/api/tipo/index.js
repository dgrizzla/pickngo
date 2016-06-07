'use strict';

var express = require('express');
var controller = require('./tipo.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;
