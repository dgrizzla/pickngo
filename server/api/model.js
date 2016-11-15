const response = require('../components/utils/response.js');
const conn = require('../components/connection.js');

exports.getPaises = function (cb) {
  return conn.commonGet('sp_sel_png_pais', cb);
};

exports.getTableCount = (table, cb) => response.then(
  conn.execute(`SELECT COUNT(*) count FROM ${table}`),
  cb,
  data => data[0].count
);
