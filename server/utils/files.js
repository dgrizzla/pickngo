var config = require('../config/environment'),
    mv = require('mv');    
    

exports.productoImg = function(path, nombreArchivo, callback) {

    var newUrl = config.uploadDirectory() + 'productos/' + nombreArchivo;

    mv(path, newUrl, function(err) {
        if(err){
            return err;
        };
        if(callback) callback('public/img/productos/'+nombreArchivo);
        
    });
};