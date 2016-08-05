const conn = require('../../components/connection.js');

exports.getTipoUsuario = function (cb) {
  const query = 'sp_sel_png_tipo_tabla(\'png_usuario\')';
  conn.commonGet(query, cb);
};