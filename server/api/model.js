const response = require('../components/utils/response.js');
const conn = require('../components/connection.js');

exports.getPaises = function (cb) {
  conn.commonGet('sp_sel_png_pais', cb);
};