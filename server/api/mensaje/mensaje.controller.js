'use strict';
var model = require('./mensaje.model');

exports.crearConversacion = function (req, res) {
  //console.log('data controlador',req.body);
  var data = [
    req.body.receptor,
    req.user.id_usuario,
    req.body.mensaje
  ]
  model.crearConversacion(data,function(resp){
    res.json(resp);
  });
};

exports.conversaciones = function(req,res){
  var idUsuario = req.user.id_usuario;
  //console.log('id ctrl',idUsuario)
  model.conversaciones(idUsuario,function(resp){
    res.json(resp);
  });
};

exports.usuarioConversacion = function(req,res){
  var idUsuario = parseInt(req.params.idUsuario);
  var data = [req.user.id_usuario,idUsuario];
  model.usuarioConversacion(data,function(resp){
    res.json(resp);
  });
};

exports.conversacion = function(req,res){
  var idConversacion = req.params.idConversacion;
  model.conversacion(idConversacion,function(resp){
    res.json(resp);
  });
}
exports.enviarMensaje = function(req,res){
      //orden params mensaje, idusuario,idconversacion
  var data = [req.body.mensaje,req.user.id_usuario,req.body.idConversacion];
  model.enviarMensaje(data,function(resp){
    res.json(resp);
  });
}