var connection = require('../../connection');
var resp = require('../../components/resp');
module.exports = {
    //función para agregar un producto nuevo
    agregarProducto: function(data,callback) {
        var query = "call sp_ins_png_usuario_busqueda(?,?,?,?,?,?,?,?,?)";
        connection(query, data, function(err, rows) {
            var code = 0;
            if (err) {
                code = 1;
                rows = [];
            }
            if (callback) callback(resp.generate(code, err, rows[0]));
        })  
    },
    productosUsuario : function(data,callback){
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
    getNumProductosUsuario : function(id_usuario,callback){
        var query = "SELECT COUNT(id) as countProductos FROM png_usuario_busqueda WHERE id_usuario = " + id_usuario;
        connection(query, "", function(err, rows) {
            var code = 0;
            if (err) {
                code = 1;
                rows = [];
            }
            if (callback) callback(resp.generate(code, err, rows[0]));
        })
    }
};