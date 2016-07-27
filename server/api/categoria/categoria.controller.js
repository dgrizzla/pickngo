/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categorias              ->  index
 */

'use strict';
var model = require('./categoria.model');

// Gets a list of Categorias
exports.index = function (req, res) {
  res.json([]);
}

exports.categoriaSel = function (req, res){
  model.categoriaSel(function(resp){
    res.json(resp);
  });
}

exports.agregarCategoria = function (req, res){
  var data = [req.body.idDepto,req.body.nombreCategoria,req.user.id_usuario];
  model.agregarCategoria(data,function (resp) {
    res.json(resp);
  })
}

exports.editarCategoria = function (req, res){
  var data = [req.body.categoria.departamento,req.body.categoria.nombre,req.body.categoria.id,req.user.id_usuario];
  model.editarCategoria(data,function (resp) {
    res.json(resp);
  })
}

exports.eliminarCategoria = function (req, res){
  var data = [req.params.id];
  model.eliminarCategoria(data,function(resp){
    res.json(resp);
  });
}

exports.categoriasPorDepto = function (req,res){
  model.categoriasPorDepto(function (resp) {
    res.json(resp);
  })
}