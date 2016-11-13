
const model = require('./renglon.model');
const response = require('../../components/utils/response.js');
const { estados } = require('../../config/environment');

exports.getAll = function (req, res) {
  response.common(
    res,
    model.getAll
  )
};
exports.getOne = function (req, res) {

};
exports.post = function (req, res) {
  let {nombre, articulos} = req.body;
  let data = [
    nombre,
    req.user.id_usuario,
    estados.renglon.activo
  ];

  if (!Array.isArray(articulos) || articulos.length === 0) {
    return response.commonData(res, model.post, data);
  }
  model.post(data, onPost);

  function onPost(result) {
    if (result.code !== 0) {
      return res.json(result);
    }
    var numArticulos = articulos.length;
    for (var index = 0; index < articulos.length; index++) {
      let {nombre, descripcion, barcode, id_categoria, precio} = articulos[index];
      model.postArticulo([result.data, id_categoria, nombre, descripcion, barcode, precio], onPostArticulo);
    }
    function onPostArticulo(resultA) {
      numArticulos--;
      if (numArticulos <= 0) {
        res.json(result);
      }
    }
  }
};
exports.postImage = function (req, res) {
  response.commonData(
    res,
    model.postImage,
    ['/public/img/' + req.file.filename, req.body.id_renglon]
  );
};
exports.postArticulo = function (req, res) {

};
exports.deleteImage = function (req, res) {

};
exports.deleteArticulo = function (req, res) {

};
exports.delete = function (req, res) {

};
exports.put = function (req, res) {

};