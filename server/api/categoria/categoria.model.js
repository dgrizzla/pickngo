var connection = require('../../connection');
var resp = require('../../components/resp');

//función para traer los departamentos
exports.categoriaSel = function(callback) {
  var query = "call sp_sel_png_subcat_articulo";
  connection(query, '', function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  });
};
exports.agregarCategoria = function(data, callback) {
  //idDepto y nombre
  var query = "call sp_ins_png_subcat_articulo(?,?,?)";
  connection(query, data, function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  });
};
exports.editarCategoria = function(data, callback) {
  //id depto, nombre, id categoria
  var query = "call sp_upd_png_subcat_articulo(?,?,?,?)";
  connection(query, data, function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  });
};
exports.eliminarCategoria = function(data, callback) {
  var query = "call sp_del_png_subcat_articulo(?)";
  connection(query, data, function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  });
};
//trae las categorias con el nombre del departamento al que pertenecen
exports.categoriasPorDepto = function(callback) {
  var query = "call sp_sel_png_categoria_departamento";
  connection(query, '', function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  });
};