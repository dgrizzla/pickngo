/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/usuarios              ->  index
 */

'use strict';

var model = require('./usuario.model');
import utils from '../../components/utils';
import passport from '../../components/auth/passport';

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