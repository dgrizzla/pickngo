var connection = require('../../connection');
var resp = require('../../components/resp');

//función para traer los departamentos
exports.departamentoSel = function(callback) {
  var query = "call sp_sel_png_cat_articulo";
  connection(query, '', function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  })
};
exports.agregarDepartamento = function(data, callback) {
  var query = "call sp_ins_png_cat_articulo(?,?)";
  connection(query, data, function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  })
};
exports.editarDepartamento = function(data, callback) {
  //id y luego nombre
  var query = "call sp_upd_png_cat_articulo(?,?,?)";
  connection(query, data, function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  });
};
exports.eliminarDepartamento = function(data, callback) {
  var query = "call sp_del_png_cat_articulo(?)";
  connection(query, data, function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  });
};
exports.getNumDepartamentos = function(callback) {
  var query = "SELECT COUNT(id) as numDeptos FROM png_cat_articulo";
  connection(query, '', function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  });
};