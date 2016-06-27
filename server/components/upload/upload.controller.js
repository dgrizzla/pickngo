/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /components/upload              ->  index
 */

'use strict';
var multer = require('multer'),
    config = require('../../config/environment')
// Gets a list of Uploads
// exports.imgProducto = [
//   multer({
//     dest: config
//   })
// ];


//Código para cargar Imagen de Usuario
// exports.userImg = [
//   multer({
//     dest: config.uploadPath(),
//     onFileUploadComplete: function (file, data, req, res) {
//       extension = file.extension;
//       urlFile = file.path;
//       model = require('./upload.model.js')(undefined, urlFile, extension);
//     },
//     onError: function (err, next) {
//       console.log('error carga imagen usuario');
//     }
//   }),
//   function (req, res) {
//     var cords = req.body;

//     var usuario = req.user.id_usuario;
//     model.userImg(usuario, cords, function (resp) {

//       req.user.foto = resp.data.newUrl;
//       res.json(resp);
//     });

//   }
// ];