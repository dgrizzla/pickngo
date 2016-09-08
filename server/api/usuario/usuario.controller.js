/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/usuarios              ->  index
 */

'use strict';

var model = require('./usuario.model');
const utils = require('../../components/utils');
const response = require('../../components/utils/response.js');
const passport = require('../../components/auth/passport');

exports.login = function(req, res, next) {
  var clave = utils.encryptPassword(req.body.password)
  var usuario = [req.body.user, clave];
  model.login(usuario, function(resp) {
    res.json(resp);
  })
};
exports.getUsuario = function (req, res) {
  response.commonData(res, model.getUsuario, req.params.id);
};

exports.putUsuario = function (req, res) {
  response.commonData(res, model.putUsuario, [
    req.params.id,
    req.body.usuario,
    req.body.nombres,
    req.body.apellidos,
    new Date(req.body.fecha_nac),
    req.body.sexo,
    req.body.email,
    req.body.id_pais,
    req.body.id_tipo,
    req.body.telefono,
    req.body.estado,
    req.body.id_proveedor
  ]);
}
 
exports.getPaises = function(req, res) {
  model.getPaises(function(resp) {
    res.json(resp)
  })
};

exports.registroUsuario = function(req, res) {
  //var data = req.body.usuario
  var clave = utils.encryptPassword(req.body.usuario.clave);
  var data = [
    req.body.usuario.usuario,
    req.body.usuario.nombres,
    req.body.usuario.apellidos,
    req.body.usuario.sexo,
    req.body.usuario.fechaNacimiento,
    req.body.usuario.pais,
    req.body.usuario.correo,
    clave,
    req.body.usuario.telefono
  ];
  model.registroUsuario(data, function(resp) {
    res.json(resp);
  });
};

exports.validaCorreoExistente = function(req, res) {
  var correo = req.params.correo;
  model.validaCorreoExistente(correo, function(resp) {
    res.json(resp);
  });
};

exports.validaUsuarioExistente = function(req, res) {
  var usuario = req.params.usuario;
  model.validaUsuarioExistente(usuario, function(resp) {
    res.json(resp);
  });
}

exports.getUsuarios = function (req, res) {
  response.commonData(res,model.getUsuarios, [
    req.params.order,
    Number(req.params.offset),
    Number(req.params.limit),
    Boolean(req.params.asc == 'true')
  ]);
};
exports.getUsuariosDesc = function (req, res) {
  response.commonData(res,model.getUsuarios, [
    req.params.order,
    Number(req.params.offset),
    Number(req.params.limit),
    false
  ]);
};

exports.busquedaUsuarioChat = function(req, res){
  var usuario = [req.params.usuario];
  model.busquedaUsuarioChat(usuario,function(resp){
    res.json(resp);
  });
}

exports.countUsuarios = function (req,res) {
  model.countUsuarios(function (resp) {
    res.json(resp);
  });
}