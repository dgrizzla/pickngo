var connection = require('../../connection');
var resp = require('../../components/resp');
module.exports = {
  //función para traer las subcategoria
  subCategoriaSel: function(callback) {
    var query = "call sp_sel_png_ssubcat_articulo";
    connection(query, '', function(err, rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if (callback) callback(resp.generate(code, err, rows[0]));
    })
  },
  agregarSubCategoria : function(data,callback){
    //id categoria y nombre subcategoria
    var query = "call sp_ins_png_ssubcat_articulo(?,?,?)"
    connection(query,data,function (err,rows) {
      var code = 0;
      if(err){
        code = 1;
        rows = [];
      }
      if(callback) callback(resp.generate(code,err,rows[0]))
    })
  },
  editarSubCategoria : function(data,callback){
    //id subcat, nombre y id categoria
    var query = "call sp_upd_png_ssubcat_articulo(?,?,?,?)"
    connection(query,data,function (err,rows) {
      var code = 0;
      if(err){
        code = 1;
        rows = [];
      }
      if(callback) callback(resp.generate(code,err,rows[0]))
    })
  },
  eliminarSubCategoria : function(data, callback){
    var query = "call sp_del_png_ssubcat_articulo(?)"
    connection(query,data,function (err,rows) {
      var code = 0;
      if(err){
        code = 1;
        rows = [];
      }
      if(callback) callback(resp.generate(code,err,rows[0]))
    })
  }
};