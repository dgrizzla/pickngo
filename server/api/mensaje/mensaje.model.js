var connection = require('../../connection');
var resp = require('../../components/resp');

exports.conversaciones = function(idUsuario, callback) {
    console.log('id modl',idUsuario);
    var query = "call sp_sel_usuario_conversaciones(?)";
    connection(query, idUsuario, function(err, rows) {
        var code = 0;
        if (err) {
            code = 1;
            rows = [];
        }
        if (callback) callback(resp.generate(code, err, rows[0]));
    });
};