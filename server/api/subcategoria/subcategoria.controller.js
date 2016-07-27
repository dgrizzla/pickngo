/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/subcategorias              ->  index
 */

'use strict';
var model = require('./subcategoria.model');

// Gets a list of Subcategorias
exports.index = function (req, res) {
  res.json([]);
}

exports.subCategoriaSel = function (req,res){
  model.subCategoriaSel(function (resp) {
    res.json(resp);
  })
}

exports.agregarSubCategoria = function (req,res){
  var data = [req.body.idCat,req.body.nombre,req.user.id_usuario];
  model.agregarSubCategoria(data,function(resp) {
    res.json(resp);
  })
}

exports.editarSubCategoria = function (req,res){
  var data = [req.body.subcategoria.id, req.body.subcategoria.nombre, req.body.subcategoria.categoria,req.user.id_usuario];
  model.editarSubCategoria(data,function(resp) {
    res.json(resp);
  })
}

exports.eliminarSubCategoria = function (req,res){
  var data = [req.params.id];
  model.eliminarSubCategoria(data,function(resp) {
    res.json(resp);
  })
}