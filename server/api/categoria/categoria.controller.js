/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categorias              ->  index
 */

'use strict';
var model = require('./categoria.model');

// Gets a list of Categorias
export function index(req, res) {
  res.json([]);
}

export function categoriaSel(req, res){
  model.categoriaSel(function(resp){
    res.json(resp);
  });
}

export function agregarCategoria(req, res){
  var data = [req.body.idDepto,req.body.nombreCategoria];
  model.agregarCategoria(data,function (resp) {
    res.json(resp);
  })
}

export function editarCategoria(req, res){
  var data = [req.body.categoria.departamento,req.body.categoria.nombre,req.body.categoria.id];
  model.editarCategoria(data,function (resp) {
    res.json(resp);
  })
}

export function eliminarCategoria(req, res){
  var data = [req.params.id];
  model.eliminarCategoria(data,function(resp){
    res.json(resp);
  });
}