var connection = require('../../connection');
var resp = require('../../components/resp');
module.exports = {
  //función para agregar un producto nuevo
  agregarProducto: function(data, callback) {
    var query = "SELECT fn_ins_png_usuario_busqueda(?,?,?,?,?,?,?,?,?) as lastInsertId";
    connection(query, data, function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    })
  },
  productosUsuario: function(data, callback) {
    var query = "call sp_sel_png_usuario_busqueda(?)";
    connection(query, data, function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    })
  },
  getNumProductosUsuario: function(id_usuario, callback) {
    var query = "SELECT COUNT(id) as countProductos FROM png_usuario_busqueda WHERE id_usuario = " + id_usuario;
    connection(query, "", function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    })
  },
  agregarImagenProducto: function(data, callback) {

    var postData;
    if (data[2] == -1) {
      query = "call sp_upd_png_usuario_imagen(?,?)";
      postData = [data[0], data[1]];
    } else {
      var query = "call sp_ins_png_usuario_imagen(?,?,?);";
      postData = data;
    }

    connection(query, postData, function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    })
  },
  setNuevaImgDestacada: function(data, callback) {
    var query = "call sp_upd_img_destacada_nuevo_producto(?)";
    connection(query, data, function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    })
  },
  //trae toda la info de las imagenes de un producto
  getImagenesProducto: function(data, callback) {
    var query = "call sp_sel_png_usuario_imagen(?)";
    connection(query, data, function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    });
  },
  //trae solamente las urls de las imagenes
  getListImagenesProducto: function(data, callback) {
    var query = "call sp_sel_png_usuario_imagen_list(?)";
    connection(query, data, function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    });
  },
  editarProducto: function(data, callback) {
    var query = "call sp_upd_png_usuario_busqueda(?,?,?,?,?,?,?,?,?);"

    connection(query, data, function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    });
  },
  eliminarProducto: function(data, callback) {
    var query = "call sp_del_png_usuario_busqueda(?)";
    connection(query, data, function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    });
  },
  eliminarImgsProducto: function(data, callback) {
    var query = "call sp_del_png_usuario_imagen(?)";
    connection(query, data, function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    });
  },
  cambiarImagenDestacada: function(data, callback) {
    var query = "sp_upd_png_usuario_imagen(?,?)";
    console.log('data destacada');
    connection(query, data, function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    });
  }
};