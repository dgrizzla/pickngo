

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

exports.postRolOpcion = function (req, res) {
  response.commonData(res, model.postRolOpcion, [
    req.body.id_rol,
    req.body.id_opcion
  ]);
};

exports.deleteRolOpcion = function (req, res) {
  response.commonData(res, model.deleteRolOpcion, req.params.id);
}