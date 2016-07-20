var resp = require('../resp');
var files = require('../../utils/files');
var mdlProducto = require('../../api/producto/producto.model')
module.exports = {
    productoImg: function(data, callback) {
        files.productoImg(data.path, data.filename, function(newUrl) {
            var dataPost = [data.idProducto,newUrl,data.orden];
            mdlProducto.agregarImagenProducto(dataPost, function(resp) {
                if(resp.code === 0){
                    mdlProducto.setNuevaImgDestacada(data.idProducto, function(resp){
                    });
                }
                if (callback) callback(resp);
            });
        });
    }
};