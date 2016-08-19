var connection = require('../../connection');
var resp = require('../../components/resp');

//trae todas las conversaciones de un usuario
exports.conversaciones = function(idUsuario, callback) {
    //console.log('id modl',idUsuario);
    var query = "call sp_sel_png_conversaciones_usuario(?)";
    connection(query, idUsuario, function(err, rows) {
        var code = 0;
        if (err) {
            code = 1;
            rows = [];
        }
        if (callback) callback(resp.generate(code, err, rows[0]));
    });
};

//trae los mensajes de una conversacion
exports.conversacion = function(idConversacion,callback){
    var query = "call sp_sel_png_mensajes_conversacion(?)";
    connection(query, idConversacion, function(err, rows) {
        var code = 0;
        if (err) {
            code = 1;
            rows = [];
        }
        if (callback) callback(resp.generate(code, err, rows[0]));
    });
};

//verifica si ya existe una conversacion con un usuario
exports.usuarioConversacion = function(data,callback){
    
    //orden parametros usuario1 usuario 2
    var query = "call sp_sel_png_conversacion_id(?,?)";
    connection(query, data, function(err, rows) {
        var code = 0;
        if (err) {
            code = 1;
            rows = [];
        }
        if (callback) callback(resp.generate(code, err, rows[0]));
    });
};

exports.enviarMensaje = function(data,callback){
    console.log('mensaje mdl',data);
    //orden params mensaje, idusuario,idconversacion
    var query = "call sp_ins_png_mensaje(?,?,?)"
    connection(query, data, function(err, rows) {
        var code = 0;
        if (err) {
            code = 1;
            rows = [];
        }
        if (callback) callback(resp.generate(code, err, rows[0]));
    });    
};

exports.nuevaConversacion = function(data,callback){
    //console.log('nueva conversacion',data);
    var query = "select fn_ins_png_conversacion(?,?) as idConversacion;"
    connection(query, data, function(err, rows) {
        var code = 0;
        if (err) {
            code = 1;
            rows = [];
        }
        if (callback) callback(resp.generate(code, err, rows[0]));
    });
}