var response = require('../../components/utils/response.js');
var conn = require('../../components/connection.js');


exports.getSort = function (data, cb) {
  var asc = data.pop() ? 'ASC' : 'DESC';
  var [order, offset, limit] = data;
  var query = `SELECT renglon.id, renglon.nombre, COUNT(articulo.id_renglon) cant_articulos, COUNT(imagen.id_renglon) cant_imagenes
  FROM png_renglon renglon
  LEFT JOIN png_imagen_renglon imagen ON renglon.id = imagen.id_renglon
  LEFT JOIN png_articulo_renglon articulo ON renglon.id = articulo.id_renglon
  GROUP BY renglon.id
  ORDER BY ${order} ${asc}
  LIMIT ${offset},${limit}`;
  conn.execute(query, undefined, function (err, rows) {
    cb(response.commonResult( err, rows));
  });
};

exports.getAll = function (cb) {
  conn.commonGet(
    'sp_sel_png_renglon',
    cb
  );
};

exports.getOne = (id, cb) => conn.getOne('sp_sel_png_renglon_one ( ? )', cb, id);

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
exports.put = (data, cb) => conn.commonGet('sp_upd_png_renglon ( ?, ?)', cb, data);