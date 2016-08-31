
const model = require('./opcion.model');
const modelTipos = require('../tipo/tipo.model.js');
const response = require('../../components/utils/response.js');

exports.getOpciones = function (req, res) {
  response.commonData(res,model.getOpciones, [
    req.params.order,
    Number(req.params.offset),
    Number(req.params.limit),
    Boolean(req.params.asc == 'true')
  ]);
};

exports.getOpcionesDesc = function (req, res) {
  response.commonData(res,model.getOpciones, [
    req.params.order,
    Number(req.params.offset),
    Number(req.params.limit),
    false
  ]);
};

exports.post = function (req, res) {
  response.commonData(res, model.post, [
    req.body.nombre,
    req.body.descripcion,
    req.body.id_tipo
  ]);
};

exports.put = function (req, res) {
  response.commonData(res, model.put, [
    req.params.id,
    req.body.nombre,
    req.body.descripcion,
    req.body.id_tipo
  ]);
};

exports.getTipos = function (req, res) {
  response.commonData(
    res,
    modelTipos.getTipoTabla,
    'png_opcion'
  );
};