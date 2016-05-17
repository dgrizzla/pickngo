/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/usuarios              ->  index
 */

'use strict';

var model = require('./usuario.model');
var utils = require('../../components/utils'),
    passport = require('../../passport.js');

export function login(req, res, next) {
  //var usuario = {usuario:req.body.user, clave:req.body.password};
  //usuario.clave = utils.encryptPassword(req.body.password)
  //var aux = utils.encryptPassword('dgiron');
  var clave = utils.encryptPassword(req.body.password)
  var usuario = [req.body.user,clave];
  model.login(usuario, function(resp) {
    res.json(resp);
  })
  // passport.authenticate('local',function (err,user,info) {
  //   if(err || !user){
  //
  //   }
  // })

};

export function getPaises(req, res) {
  model.getPaises(function(resp) {
    res.json(resp)
  })
};

export function registroUsuario(req, res) {
  var data = req.body.usuario;
  data.clave = utils.encryptPassword(req.body.usuario.clave)
  model.registroUsuario(data, function(resp) {
    res.json(resp);
  });
};
