var connection = require('../../connection');
var conn = require('../../components/connection.js');
var resp = require('../../components/resp');
var response = require('../../components/utils/response.js');

//función para agregar un nuevo proveedor
exports.postProveedor = function(data, callback) {
  //orden parametros nombre, direccion, foto, nit, estado,tipo
  var query = "call sp_ins_png_proveedor(?,?,?,?,?,?)";
  connection(query, data, function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  });
};

//función para traer solo el id y el nombre de los proveedores
exports.getInfoProveedores = function(callback){
  var query = "SELECT id, nombre FROM png_proveedor";
  connection(query, '', function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows));
  });    
};

exports.getProveedores = function(callback){ 
  var query = "call sp_sel_png_proveedor";
  connection(query, '', function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (callback) callback(resp.generate(code, err, rows[0]));
  });
};

exports.addCategoria = function (data, cb) {
  var query = "call sp_ins_png_proveedor_categoria(?,?)";
  connection(query, data, function(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    if (cb) cb(resp.generate(code, err, rows[0]));
  });
};

exports.getCategorias = function (data,cb) {
  conn.commonGet(
    'sp_sel_png_proveedor_categoria(?)', // id, nombre, direccion, nit, estado, tipo
    cb,
    data
  );
};
exports.putProveedor = function (data, cb) {
  conn.commonGet(
    'sp_upd_png_proveedor( ?, ?, ?, ?, ?, ?)', // id, nombre, direccion, nit, estado, tipo
    cb,
    data
  );
};
exports.deleteProveedorCategoria = function (id, cb) {
  const query = 'call sp_del_png_proveedor_categoria ( ? )';
  conn.execute(query, id, function (err, rows) {
    cb(response.commonResult( err, rows));
  });
};

exports.getProductosByCategoria = function (idProveedor,cb) {
  conn.commonGet(
    'sp_sel_filtro_productos_proveedor(?)', // id proveedor
    cb,
    idProveedor
  );
};