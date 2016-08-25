'use strict';
var model = require('./mensaje.model');

exports.nuevaConversacion = function (req, res) {
  var dataConversacion = [req.user.id_usuario,req.body.receptor];
  var dataMensaje = [];
  model.nuevaConversacion(dataConversacion,function(resp){
    if(resp.code === 0){
      dataMensaje = [req.body.mensaje,req.user.id_usuario,resp.data.idConversacion];
      model.enviarMensaje(dataMensaje,function(respuesta){});
    }
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

exports.countConversaciones = function(req,res){
  var data = [req.user.id_usuario];
  model.countConversaciones(data,function(resp){
    res.json(resp);
  });
};