/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/departamentos              ->  index
 */

'use strict';
var model = require('./departamento.model');

// Gets a list of Departamentos
export function index(req, res) {
  res.json([]);
}

export function departamentoSel(req,res){
  model.departamentoSel(function(resp){
    res.json(resp);
  })
}

export function agregarDepartamento(req,res){
  var data = [req.body.nombreDepartamento]
  model.agregarDepartamento(data,function (resp) {
    res.json(resp);
  })
}

export function editarDepartamento(req,res){
  var data = [
    req.body.departamento.id,
    req.body.departamento.nombre
  ]; 
  model.editarDepartamento(data,function (resp) {
    res.json(resp);
  })
}

export function eliminarDepartamento(req,res){
  var data = [req.params.id];
  model.eliminarDepartamento(data,function (resp) {
    res.json(resp);
  })
}