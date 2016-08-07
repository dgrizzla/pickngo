const response = require('../../components/utils/response.js'); 
const model = require('./tipo.model.js');
// Gets a list of Tipos
exports.index = function (req, res) {
  res.json([]);
}

exports.getTipoUsuario = function (req, res) {
  response.common(res, model.getTipoUsuario);
};

exports.postTipo = function (req, res) {
  response.commonData(res, model.postTipo, [
    req.body.nombre, 
    req.body.descripcion,
    req.body.tabla
  ]);
};

exports.putTipo = function (req, res) {
  response.commonData(res, model.putTipo, [
    req.params.id,
    req.body.nombre,
    req.body.descripcion,
    req.body.tabla
  ]);
}