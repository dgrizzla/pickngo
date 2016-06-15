var connection = require('../../connection');
var resp = require('../../components/resp');
module.exports = {
  getPaises: function(callback){
    var query = "call sp_sel_png_pais";
    connection(query,'',function (err,rows) {
      var code = 0;
      if (err) {
        code = 1;
        rows = [];
      }
      if(callback) callback(resp.generate(code,err,rows[0]));
    })
  },
  login: function(data,callback){
    var query = "call sp_sel_seg_usuario(?,?)";
    connection(query,data,function(err,rows){
      var code = 0;
      var resp = {};
      if(err){
        code = 1;
        rows = [];
      }
      if(rows[0].length === 0){
        //mensaje de return cuando no se encuentra nada
        var msg = 'Datos incorrectos';
        resp = {data:rows[0],code: code,msg: msg};
      }else{
        resp = {data:rows[0],code: code};
      }
      callback(resp);
    })
  },
  registroUsuario: function (data,callback) {
    //orden parametros usuario, nombres, apellidos, sexo, nacimiento, pais, correo, clave , telefono
    var query = "call sp_ins_png_usuario_estandar(?,?,?,?,?,?,?,?,?)";
    connection(query,data,function (err,rows) {
      var resp = {};
      if(err){
        resp.code = 1;
        resp.err = err;
      }else{
        resp.code = 0;
        resp.data = rows[0];
      }
      callback(resp);
    })
  },
  validaCorreoExistente : function (correo,callback) {
    var query = "call sp_sel_png_correo_existente(?)";
    connection(query,correo,function (err,rows) {
      var code = 0;
      if(err){
        code = 1;
        rows = [];
      };
      if(callback) callback(resp.generate(err,code,rows[0]));
    })
  },
  validaUsuarioExistente : function (usuario,callback) {
    var query = "call sp_sel_png_usuario_existente(?)";
    connection(query,usuario,function (err,rows) {
      var code = 0;
      if(err){
        code = 1;
        rows = [];
      }
      if(callback) callback(resp.generate(err,code,rows[0]))
    })
  }
};
