const conn = require('../../components/connection.js');


exports.getTipoTabla = function (tabla, cb) {
  conn.commonGet(
    'sp_sel_png_tipo_tabla( ? )',
    cb,
    tabla
  );
};

exports.getTipoUsuario = function (cb) {
  const query = 'sp_sel_png_tipo_tabla(\'png_usuario\')';
  conn.commonGet(query, cb);
};

exports.postTipo = function (data, cb) {
  const query = 'fn_ins_png_tipo( ?, ?, ? )';
  conn.commonPost(query, cb, data);
};

exports.putTipo = function (data, cb) {
  const query = 'sp_upd_png_tipo( ?, ?, ?, ?)';
  conn.commonGet(query, cb, data);
};