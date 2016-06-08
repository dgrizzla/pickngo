/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/subcategorias              ->  index
 */

'use strict';
var model = require('./subcategoria.model');

// Gets a list of Subcategorias
export function index(req, res) {
  res.json([]);
}

export function subCategoriaSel(req,res){
  model.subCategoriaSel(function (resp) {
    res.json(resp);
  })
}

export function agregarSubCategoria(req,res){
  var data = [req.body.idCat,req.body.nombre,req.user.id_usuario];
  model.agregarSubCategoria(data,function(resp) {
    res.json(resp);
  })
}

export function editarSubCategoria(req,res){
  var data = [req.body.subcategoria.id, req.body.subcategoria.nombre, req.body.subcategoria.categoria,req.user.id_usuario];
  model.editarSubCategoria(data,function(resp) {
    res.json(resp);
  })
}

export function eliminarSubCategoria(req,res){
  var data = [req.params.id];
  model.eliminarSubCategoria(data,function(resp) {
    res.json(resp);
  })
}