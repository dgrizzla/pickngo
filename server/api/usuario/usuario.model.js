var connection = require('../../connection');

module.exports = {
  getPaises: function(callback){
    var query = "call sp_sel_png_pais";
    connection(query,'',function (err,rows) {
      var resp = {};
      if (err) {
        resp.data = undefined;
        resp.msg = err;
        resp.code = 1;
      }else{
        resp.data = rows[0];
        resp.code = 0;
      }
      callback(resp);
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
    var usuario = [data.usuario,
                  data.nombres,
                  data.apellidos,
                  data.sexo,
                  data.fechaNacimiento,
                  data.pais,
                  data.correo,
                  data.clave,
                  data.telefono];
    connection(query,usuario,function (err,rows) {
      var resp = {};
      if(err){
        resp.code = 1;
        resp.err = err;
        resp.data = undefined;
      }else{
        resp.code = 0;
        resp.data = rows[0];
      }
      callback(resp);
    })
  }
};
