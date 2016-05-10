/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/usuarios              ->  index
 */

'use strict';

var connection = require('../../connection');

// Gets a list of Usuarios
export function index(req, res) {
  res.json([]);
}

export function login(req,res){
  var query = "call sp_sel_seg_usuario(?,?)";
  var data = [req.body.user,req.body.password];
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

    res.json(resp)
  })
};

export function getPaises(req,res){
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
    res.json(resp);
  })
};

export function test(req,res){
  console.log('nigga',model);
  model.modelTest(function (resp) {
    console.log('resp',resp);
  })
};

export function registroUsuario(req,res) {
  var data = req.body.usuario;
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
    res.json(resp);
  })
};
