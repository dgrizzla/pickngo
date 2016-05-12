/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/usuarios              ->  index
 */

'use strict';

var model = require('./usuario.model');

export function login(req,res){
  var usuario = [req.body.user,req.body.password];
  model.login(usuario,function (resp) {
    res.json(resp);
  })
};

export function getPaises(req,res){
  model.getPaises(function (resp) {
    res.json(resp)
  })
};

export function registroUsuario(req,res) {
  var data = req.body.usuario;
  model.registroUsuario(data,function (resp) {
    res.json(resp);
  })
};
