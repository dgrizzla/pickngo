'use strict';
var config = require('../../config/environment'),
    fs = require('fs');

export function imgProducto(req, res) {
    fs.readFile(req.files.displayImage.path, function(err, data) {
        var newPath = __dirname + "/uploads/uploadedFileName";
        fs.writeFile(newPath, data, function(err) {
            res.redirect("back");
        });
    });
};