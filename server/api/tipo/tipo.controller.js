const response = require('../../components/utils/response.js'); 
const model = require('./tipo.model.js');
// Gets a list of Tipos
exports.index = function (req, res) {
  res.json([]);
}

exports.getTipoUsuario = function (req, res) {
  response.common(res, model.getTipoUsuario);
};