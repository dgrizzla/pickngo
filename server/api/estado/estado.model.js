var conn = require('../../components/connection.js');

exports.getEstadoTabla = function (tabla, cb) {
  conn.commonGet(
    'sp_sel_png_estado_tabla( ? )',
    cb,
    tabla
  );
};
