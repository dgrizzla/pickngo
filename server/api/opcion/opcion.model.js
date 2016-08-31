var connection = require('../../connection');
var response = require('../../components/utils/response.js');
var conn = require('../../components/connection.js');

exports.getOpciones = function (data, cb) {
  var asc = data.pop() ? 'ASC' : 'DESC'
  const query = `SELECT a.id, a.nombre, a.descripcion, b.id_tipo, b.descripcion nombre_tipo
    FROM png_opcion a
    JOIN png_tipo b ON b.id = a.id_tipo
    ORDER BY a.${data[0]} ${asc}
    LIMIT ${data[1]},${data[2]}`;
  conn.execute(query, data, function (err, rows) {
    cb(response.commonResult( err, rows));
  });
};


exports.post = function (data, cb) {
  conn.commonPost(
    'fn_ins_png_opcion( ?, ?, ? )', // nombre, descripcion, tipo
    cb,
    data
  );
};

exports.put = function (data, cb) {
  conn.commonGet(
    'sp_upd_png_opcion( ?, ?, ?, ?)', // id, nombre, descripcion, tipo
    cb,
    data
  );
};