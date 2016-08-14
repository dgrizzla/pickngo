

const model = require('./rol.model');
const modelTipo = require('../tipo/tipo.model');
const response = require('../../components/utils/response.js');

exports.getOpcionesMenuRol = function (req, res) {
  response.commonData(res, model.getOpcionesTipo, [
    req.params.id,
    1
  ]);
}

exports.getOpciones = function (req, res) {
  response.commonData(res,model.getOpciones, [
    req.params.id,
    req.params.order,
    Number(req.params.offset),
    Number(req.params.limit),
    Boolean(req.params.asc == 'true')
  ]);
};

exports.getOpcionesDesc = function (req, res) {
  response.commonData(res,model.getOpciones, [
    req.params.id,
    req.params.order,
    Number(req.params.offset),
    Number(req.params.limit),
    false
  ]);
};

exports.putRol = function (req, res) {
  response.commonData(res, modelTipo.putTipo, [
    req.params.id,
    req.body.nombre,
    req.body.descripcion,
    'png_usuario'
  ]);
};

exports.postRol = function (req, res) {
  response.commonData(res, modelTipo.postTipo, [
    req.body.nombre,
    req.body.descripcion,
    'png_usuario'
  ]);
};

exports.postRolOpcion = function (req, res) {
  response.commonData(res, model.postRolOpcion, [
    req.body.id_rol,
    req.body.id_opcion
  ]);
};

exports.deleteRolOpcion = function (req, res) {
  response.commonData(res, model.deleteRolOpcion, req.params.id);
}