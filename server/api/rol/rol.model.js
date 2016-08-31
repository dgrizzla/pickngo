var response = require('../../components/utils/response.js');
var conn = require('../../components/connection.js');

exports.getOpciones = function (data, cb) {
  var asc = data.pop() ? 'ASC' : 'DESC'
  var [id, order, offset, limit] = data;
  var table = order == 'nombre_tipo'? 'c' : 'a';
  order = order == 'nombre_tipo' ? 'nombre' : order;
  const query = `SELECT a.id, a.nombre, a.descripcion, a.id_tipo, b.id id_rol_opcion, c.nombre nombre_tipo
    FROM png_opcion a
    LEFT JOIN png_rol_opcion b ON b.id_opcion = a.id
                          and b.id_rol = ${id}
    JOIN png_tipo c ON a.id_tipo = c.id
    ORDER BY ${table}.${order} ${asc}
    LIMIT ${offset},${limit}`;
  conn.execute(query, data, function (err, rows) {
    cb(response.commonResult( err, rows));
  });
};

exports.postRolOpcion = function (data, cb) {
  const query = 'fn_ins_png_rol_opcion( ?, ? )';
  conn.commonPost(query, cb, data);
};

exports.deleteRolOpcion = function (id, cb) {
  const query = 'CALL sp_del_png_rol_opcion ( ? )';
  conn.execute(query, id, function (err, rows) {
    cb(response.commonResult( err, rows));
  });
};

exports.getOpcionesTipo = function (data, cb) {
  const query = 'sp_sel_png_rol_opcion_tipo ( ?, ? )';
  conn.commonGet(query, cb, data);
};