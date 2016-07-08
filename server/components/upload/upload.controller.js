'use strict';
var config = require('../../config/environment'),
  model = require('./upload.model'),
  fs = require('fs'),
  resp = require('../resp'),
  crypto = require('crypto'),
  mime = require('mime'),
  multer = require('multer');

var storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, config.uploadPath());
  },
  filename: function(request, file, callback) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      callback(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

export function imgProducto(req, res) {
  var upload = multer({storage: storage}).single('file');
  
  upload(req, res, function(err) {

    if (err) {
      console.log('Error subiendo la foto.',err);
      return;
    }

    var data = {idProducto:req.body.idProducto,path:req.file.path,filename:req.file.filename}

    model.productoImg(data,function(resp){
      res.json(resp);
    });
    
  });
};