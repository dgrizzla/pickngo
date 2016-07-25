/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/usuarios              ->  index
 */

'use strict';

var model = require('./usuario.model');
const utils = require('../../components/utils');
const passport = require('../../components/auth/passport');

exports.login = function (req, res, next) {
  var clave = utils.encryptPassword(req.body.password)
  var usuario = [req.body.user,clave];
  model.login(usuario, function(resp) {
    res.json(resp);
  })
};

exports.getPaises = function (req, res) {
  model.getPaises(function(resp) {
    res.json(resp)
  })
};

exports.registroUsuario = function (req, res) {
  //var data = req.body.usuario
  var clave = utils.encryptPassword(req.body.usuario.clave);
  var data = [req.body.usuario.usuario,
                  req.body.usuario.nombres,
                  req.body.usuario.apellidos,
                  req.body.usuario.sexo,
                  req.body.usuario.fechaNacimiento,
                  req.body.usuario.pais,
                  req.body.usuario.correo,
                  clave,
                  req.body.usuario.telefono];
  console.log('data',data)
  model.registroUsuario(data, function(resp) {
    res.json(resp);
  });
};

exports.validaCorreoExistente = function (req,res){
  var correo = req.params.correo;
  model.validaCorreoExistente(correo,function (resp) {
    res.json(resp);
  });
};

exports.validaUsuarioExistente = function (req,res){
 var usuario = req.params.usuario;
  model.validaUsuarioExistente(usuario,function (resp) {
    res.json(resp);
  });
}