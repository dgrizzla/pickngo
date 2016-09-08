const model = require('./proveedor.model');
const modelTipos = require('../tipo/tipo.model.js');
const modelEstados = require('../estado/estado.model.js')
const response = require('../../components/utils/response.js');

exports.postProveedor = function(req, res) {
  //console.log('data post proveedor',req.body);
  //orden parametros nombre, direccion, foto, nit, estado,tipo
  var urlFoto = req.body.foto || 'public/img/usuarios/default.jpg'
  var data = [
    req.body.nombre,
    req.body.direccion,
    urlFoto,
    req.body.nit,
    req.body.id_estado,
    req.body.id_tipo
  ];

  model.postProveedor(data, function(resp) {
    res.json(resp);
  });
};

exports.getProveedores = function(req,res){
  model.getProveedores(function(resp){
    res.json(resp);
  });
};

exports.getTipos = function (req, res) {
  response.commonData(
    res,
    modelTipos.getTipoTabla,
    'png_proveedor'
  );
};

exports.getEstados = function(req,res){
  response.commonData(
    res,
    modelEstados.getEstadoTabla,
    'png_proveedor'
  );
};

exports.addCategoria = function(req,res){
  response.commonData(res, model.addCategoria, [
    req.body.id_proveedor,
    req.body.id_categoria
  ]);
};

exports.getCategorias = function (req, res) {
  response.commonData(res,model.getCategorias, [req.params.id]);
};

exports.putProveedor = function (req, res) {
  response.commonData(res, model.putProveedor, [
    req.body.id,
    req.body.nombre,
    req.body.direccion,
    req.body.nit,
    req.body.id_estado,
    req.body.id_tipo
  ]);
};

exports.deleteProveedorCategoria = function (req, res) {
  response.commonData(res, model.deleteProveedorCategoria, req.params.id);
};