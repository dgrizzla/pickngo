

const model = require('./rol.model');
const response = require('../../components/utils/response.js');

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

exports.postOpcion = function (req, res) {
  response.commonData(res, model.postOpcion, [
    req.body.nombre,
    req.body.descripcion
  ]);
};