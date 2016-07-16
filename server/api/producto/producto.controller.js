/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/departamentos              ->  index
 */

'use strict';
var model = require('./producto.model');
var files = require('../../utils/files')

export function agregarProducto(req,res){
  if (req.body.producto.subcategoria == undefined) {
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
      req.body.producto.subcategoria,
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

export function getNumProductosUsuario(req,res){
  var data = [req.user.id_usuario];
  model.getNumProductosUsuario(data,function(resp) {
    res.json(resp);
  });
}

export function editarProducto(req,res){
  var data = [
    req.body.producto.producto,
    req.body.producto.descripcion,
    req.body.producto.id_cat,
    req.body.producto.id_subcat,
    req.body.producto.id_ssubcat,
    req.body.producto.precio_del,
    req.body.producto.precio_al,
    req.body.producto.fecha_limite,
    req.body.producto.id
  ];
  model.editarProducto(data,function(resp) {
    res.json(resp);
  })
}

export function eliminarProducto(req,res){
  var data = [req.params.id];

  model.eliminarProducto(data,onDeleteProducto);

  function onDeleteProducto(resp){
    res.json(resp);
    if(resp.code === 0){
      //se envia el id del producto que se eliminó
      return getArrayImgs(data);
    }
  }
}

export function getImagenesProducto(req,res){
  var data = [req.params.id];
  model.getImagenesProducto(data,function (resp) {
    res.json(resp);
  })
}

function getArrayImgs(id) {
  model.getListImagenesProducto(id, onGetImagenes);
  function onGetImagenes(resp){
    if(resp.code === 0){
      var imgArray = [];
      var dataResp = resp.data;
      for (var i = 0; i < dataResp.length; i++) {
        var str = dataResp[i].url_img;  
        var n = str.lastIndexOf('/');
        var strPush = str.substring(n + 1);
        imgArray.push(strPush);
      }
      files.deleteAllImgs(imgArray,onDeleteAllImgs);
    }
  }

  function onDeleteAllImgs(params) {
    model.eliminarImgsProducto(id,function(resp){console.log('se hizo el delete imagenes',resp)});
  }

}