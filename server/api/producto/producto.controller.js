/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/departamentos              ->  index
 */

'use strict';
var model = require('./producto.model');

// Gets a list of Departamentos
export function index(req, res) {
  res.json([]);
}

export function agregarProducto(req,res){
  if (req.body.subcategoria == undefined) {
    var data  = [
      req.user.id_usuario,
      req.body.producto.nombre,
      req.body.producto.descripcion,
      req.body.producto.categoria.id_departamento,
      req.body.producto.categoria.id,
      null,
      req.body.producto.preciodel,
      req.body.producto.precioal,
      req.body.producto.fechaLimite
    ]
  }else{
    var data  = [
      req.user.id_usuario,
      req.body.producto.nombre,
      req.body.producto.descripcion,
      req.body.producto.categoria.id_departamento,
      req.body.producto.categoria.id,
      req.body.producto.subcategoria.id,
      req.body.producto.preciodel,
      req.body.producto.precioal,
      req.body.producto.fechaLimite
    ]
  }
  model.agregarProducto(data,function(resp){
    res.json(resp);
  })
}

export function productosUsuario(req,res){
  var data = [req.user.id_usuario];
  model.productosUsuario(data,function (resp) {
    res.json(resp);
  });
}
