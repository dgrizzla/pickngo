var response = require('../../components/utils/response.js');
var conn = require('../../components/connection.js');

exports.getAll = function () {

};
exports.getOne = function () {

};

exports.post = function (data, cb) {
  conn.commonPost(
    'fn_ins_png_renglon ( ?, ?, ?)', // (nombre, id_usuario, id_estado)
    cb,
    data
  );
};

exports.postImage = function (data, cb) {
  conn.commonPost(
    'fn_ins_png_imagen_renglon ( ?, ?)', // (url, id_renglon)
    cb,
    data
  );
};
exports.postArticulo = function (data, cb) {
  conn.commonPost(
    'fn_ins_png_articulo_renglon ( ?, ?, ?, ?, ?, ?)', // (id_renglon, id_categoria, nombre, descripcion, barcode, precio)
    cb,
    data
  );
};
exports.deleteImage = function () {

};
exports.deleteArticulo = function () {

};
exports.delete = function () {

};
exports.put = function () {

};