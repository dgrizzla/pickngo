'use strict';

var 	passport = require("passport"),
			utils = require("../utils"),
			connection = require('../../connection.js'),
			LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, config) {
  

	passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password'
  },function(user, password, done) {
    var query  = "call sp_sel_seg_usuario(?)";
    connection(query, user, function (err, rows) {
      if(err){
        return done(err);
      }
      if (!rows || !rows[0] || !rows[0][0]) {
        return done(null, false, { message: 'Usuario incorrecto.' });
      }
      if (!utils.verifyPassword(rows[0][0].clave_acceso, password)) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, rows[0][0]);
    });
  }));



	// passport.use(new FacebookStrategy({
	// 	clientID: config.facebook.clientID,
	// 	clientSecret: config.facebook.clientSecret,
	// 	callbackURL: config.facebook.callbackURL
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //   	profile.authOrigin = 'facebook';
  //   	User.findOrCreateOAuthUser(profile, function (err, user) {
	//       return done(err, user);
	//     });
  //   }));

	// passport.use(new GoogleStrategy({
	//     clientID: config.google.clientID,
	//     clientSecret: config.google.clientSecret,
	//     callbackURL: config.google.callbackURL
	//   },
	//   function(accessToken, refreshToken, profile, done) {
	//   	profile.authOrigin = 'google';
	//     User.findOrCreateOAuthUser(profile, function (err, user) {
	//       return done(err, user);
	//     });
	//   }
	// ))
};