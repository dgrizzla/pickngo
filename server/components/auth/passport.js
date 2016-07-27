'use strict';

var passport = require("passport"),
  utils = require("../utils"),
  connection = require('../../connection.js'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, config) {


  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password'
  }, function(user, password, done) {
    var query = "call sp_sel_seg_usuario(?)";
    connection(query, user, function(err, rows) {
      if (err) {
        return done(err);
      }
      if (!rows || !rows[0] || !rows[0][0]) {
        return done(null, false, {
          message: 'Usuario incorrecto.'
        });
      }
      if (!utils.verifyPassword(rows[0][0].clave_acceso, password)) {
        return done(null, false, {
          message: 'Contraseña incorrecta.'
        });
      }
      var data = rows[0][0];
      var usuario = {
        id_usuario: data.id,
        usuario: data.usuario,
        nombres: data.nombres,
        apellidos: data.apellidos,
        sexo: data.sexo,
        fecha_nacimiento: data.fecha_nac,
        id_pais: data.id_pais,
        email: data.email,
        id_tipo: data.id_tipo,
        foto: data.foto,
        preferencias: data.preferencias,
        telefono: data.telefono,
        estado: data.estado
      };
      return done(null, usuario);
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