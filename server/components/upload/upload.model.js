var resp = require('../resp');
var files = require('../../utils/files');
var mdlProducto = require('../../api/producto/producto.model')
module.exports = {
    productoImg: function(data, callback) {
        files.productoImg(data.path, data.filename, function(newUrl) {
            var dataPost;
            if(data.c === undefined){
                dataPost = [data.idProducto,newUrl]
            }else{
                dataPost = [data.idProducto,newUrl,data.c]
            }
            mdlProducto.agregarImagenProducto(dataPost, function(resp) {
                if (callback) callback(resp);
            });
        });
    }
};