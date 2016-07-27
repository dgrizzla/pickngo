var config = require('../config/environment'),
  mv = require('mv'),
  fs = require('fs');    
  

exports.productoImg = function(path, nombreArchivo, callback) {

  var newUrl = config.uploadDirectory() + 'productos/' + nombreArchivo;
  
  mv(path, newUrl, function(err) {
    if(err){
      console.log('Error files',err)
      return err;
    };
    if(callback) callback('public/img/productos/'+nombreArchivo);
    
  });
};

exports.deleteAllImgs = function(arrayArchivos,callback){
  (function next(err, result) {
    if (err) return console.error("error delet imgs", err);
    if (arrayArchivos.length === 0) return;
    var filename = config.uploadDirectory() + 'productos/' + arrayArchivos.splice(0,1)[0];
    fs.unlink(filename, next);
  }());
  if(callback) callback('Exito borrando fotos');
}