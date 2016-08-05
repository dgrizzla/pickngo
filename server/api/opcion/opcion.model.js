var connection = require('../../connection');
var response = require('../../components/utils/response.js');
var conn = require('../../components/connection.js');

exports.getOpciones = function (data, cb) {
  var asc = data.pop() ? 'ASC' : 'DESC'
  const query = `SELECT a.id, a.nombre, a.descripcion, a.id_tipo, b.descripcion nombre_tipo
    FROM png_opcion a
    JOIN png_tipo b ON b.id = a.id_tipo
    ORDER BY a.${data[0]} ${asc}
    LIMIT ${data[1]},${data[2]}`;
  conn.execute(query, data, function (err, rows) {
    cb(response.commonResult( err, rows));
  });
};


exports.postOpcion = function (data, cb) {
  const query = 'fn_ins_png_opcion( ?, ?, ? )';
  conn.commonPost(query, cb, data);
};