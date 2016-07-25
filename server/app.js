/**
 * Main application file
 */

'use strict';

const express = require('express');
const config = require('./config/environment');
const http = require('http');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');

// Setup server
var app = express();
var server = http.createServer(app);


require('./config/express')(app,passport);
require('./routes')(app, passport);
require('./components/auth/passport')(passport)
// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
