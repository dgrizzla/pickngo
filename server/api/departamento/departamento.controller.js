/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/departamentos              ->  index
 */

'use strict';
var model = require('./departamento.model');

// Gets a list of Departamentos
exports.index = function (req, res) {
  res.json([]);
}

exports.departamentoSel = function (req,res){
  model.departamentoSel(function(resp){
    res.json(resp);
  })
}

exports.agregarDepartamento = function (req,res){
  var data = [req.body.nombreDepartamento,req.user.id_usuario];
  model.agregarDepartamento(data,function (resp) {
    res.json(resp);
  })
}

exports.editarDepartamento = function (req,res){
  var data = [
    req.body.departamento.id,
    req.body.departamento.nombre,
    req.user.id_usuario
  ]; 
  model.editarDepartamento(data,function (resp) {
    res.json(resp);
  })
}

exports.eliminarDepartamento = function (req,res){
  var data = [req.params.id];
  model.eliminarDepartamento(data,function (resp) {
    res.json(resp);
  })
}

exports.getNumDepartamentos = function (req,res){
  model.getNumDepartamentos(function (resp) {
    res.json(resp);
  })
}