var response = require('../../components/utils/response.js');
var conn = require('../../components/connection.js');
var { commonGet: get } = conn;


exports.getImagen = cb => get(
  'sp_sel_png_renglon_imagen',
  cb
);

exports.getAllImagenes = cb => get(
  'sp_sel_png_renglon_imagenes_all',
  cb
);

exports.getArticulos = (id, cb) => conn.commonGet(
  'sp_sel_png_renglon_articulos ( ? )',// id_renglon
  cb,
  id
);

exports.getImagenes = (id, cb) => conn.commonGet(
  'sp_sel_png_renglon_imagenes ( ? )',// id_renglon
  cb,
  id
);

exports.getSort = function (data, cb) {
  var asc = data.pop() ? 'ASC' : 'DESC';
  var [order, offset, limit] = data;
  var query = `SELECT renglon.id, renglon.nombre, articulo.cant cant_articulos, imagen.cant cant_imagenes
  FROM png_renglon renglon
  LEFT JOIN (
		SELECT id_renglon, COUNT(*) cant FROM png_imagen_renglon GROUP BY id_renglon
	) imagen ON renglon.id = imagen.id_renglon
	LEFT JOIN (
		SELECT id_renglon, COUNT(*) cant FROM png_articulo_renglon GROUP BY id_renglon
	) articulo ON renglon.id = articulo.id_renglon
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
    'fn_ins_png_articulo_renglon ( ?, ?, ?, ?, ?, ? )', // (id_renglon, id_categoria, nombre, descripcion, barcode, precio)
    cb,
    data
  );
};
exports.deleteImage = (id, cb) => conn.commonGet(
  'sp_del_png_imagen_renglon ( ? )',
  cb,
  id
);
exports.deleteArticulo = (id, cb) => conn.commonGet(
  'sp_del_png_articulo_renglon ( ? )',
  cb,
  id
);
exports.delete = function () {

};

exports.put = (data, cb) => conn.commonGet('sp_upd_png_renglon ( ?, ?)', cb, data);

exports.putArticulo = (data, cb) => conn.commonGet(
  'sp_upd_png_articulo_renglon ( ?, ?, ?, ?, ?, ? )',
  cb,
  data
);