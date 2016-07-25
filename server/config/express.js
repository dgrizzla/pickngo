/**
 * Express configuration
 */

'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const config = require('./environment');
const session = require('express-session');

var RedisStore = require('connect-redis')(session);

module.exports = function(app, passport) {
  var env = app.get('env');

  app.use(session({
    store: new RedisStore(config.redisConfig),
    secret: config.secrets.session,
    resave: false,
    saveUninitialized: false,
  }));

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.set('appPath', path.join(config.root, 'public'));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use("/public/img", express.static(config.appFilesPath() + "/"));
  }

  if ('development' === env) {
    // app.use(require('connect-livereload')({
    //   ignore: [
    //     /^\/api\/(.*)/,
    //     /\.js(\?.*)?$/, /\.css(\?.*)?$/, /\.svg(\?.*)?$/, /\.ico(\?.*)?$/, /\.woff(\?.*)?$/,
    //     /\.png(\?.*)?$/, /\.jpg(\?.*)?$/, /\.jpeg(\?.*)?$/, /\.gif(\?.*)?$/, /\.pdf(\?.*)?$/
    //   ]
    // }));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use("/public/img", express.static(config.appFilesPath() + "/"));
    app.use(errorHandler()); // Error handler - has to be last
  }
}