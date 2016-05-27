/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/usuarios              ->  index
 */

'use strict';

var model = require('./usuario.model');
import utils from '../../components/utils';
import passport from '../../components/auth/passport';
// var utils = require('../../components/utils'),
//     passport = require('../../components/passport');

export function login(req, res, next) {
  var clave = utils.encryptPassword(req.body.password)
  var usuario = [req.body.user,clave];
  model.login(usuario, function(resp) {
    res.json(resp);
  })
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

export function validaCorreoExistente(req,res){
  var correo = req.params.correo;
  model.validaCorreoExistente(correo,function (resp) {
    res.json(resp);
  });
};

export function validaUsuarioExistente(req,res){
 var usuario = req.params.usuario;
  model.validaUsuarioExistente(usuario,function (resp) {
    res.json(resp);
  });
}