'use strict';
var model = require('./mensaje.model');

exports.iniciaConversacion = function (req, res) {
  
};

exports.conversaciones = function(req,res){
    var idUsuario = req.user.id_usuario;
    console.log('id ctrl',idUsuario)
    model.conversaciones(idUsuario,function(resp){
        res.json(resp);
    });
};
