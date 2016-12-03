
const model = require('./renglon.model');
const response = require('../../components/utils/response.js');
const { estados } = require('../../config/environment');

exports.getImagen = function (req, res) {
  response.common(
    res,
    model.getImagen
  );
};

exports.getDetails = function (req, res) {
  let data;
  model.getOne(req.params.id).then(renglon => {
    data = renglon;
    console.log(data.id, data);
    return model.getArticulos(data.id);
  }).then(articulos => {
    data.articulos = articulos;
    return model.getImagenes(data.id);
  }).then(imagenes => {
    data.imagenes = imagenes;
    res.json(response.generate(0, undefined, data));
  }).catch(err => {
    console.error(err);
    res.json(response.generate(1, err));
  });
};

exports.getAllImagenes = function (req, res) {
  response.common(
    res,
    model.getAllImagenes
  );
};

exports.getArticulos = function (req, res) {
  response.commonData(
    res,
    model.getArticulos,
    req.params.id
  );
};

exports.getImagenes = function (req, res) {
  response.commonData(
    res,
    model.getImagenes,
    req.params.id
  );
};

exports.getSort = function (req, res) {
  response.commonData(
    res,
    model.getSort,
    [ req.params.order,
      Number(req.params.offset),
      Number(req.params.limit),
      Boolean(req.params.asc === 'true')
    ]
  );
};

exports.getAll = function (req, res) {
  response.common(
    res,
    model.getAll
  );
};
exports.getOne = function (req, res) {
  response.commonData(
    res,
    model.getOne,
    req.params.id
  );
};
exports.post = function (req, res) {
  let {nombre, articulos} = req.body;
  let data = [
    nombre,
    req.user.id_usuario,
    estados.renglon.activo
  ];

  if (!Array.isArray(articulos) || articulos.length === 0) {
    return response.commonData(res, model.post, data);
  }
  model.post(data, onPost);

  function onPost(result) {
    if (result.code !== 0) {
      return res.json(result);
    }
    var numArticulos = articulos.length;
    for (var index = 0; index < articulos.length; index++) {
      let {nombre, descripcion, barcode, id_categoria, precio} = articulos[index];
      model.postArticulo([result.data, id_categoria, nombre, descripcion, barcode, precio], onPostArticulo);
    }
    function onPostArticulo(/*resultA*/) {
      numArticulos--;
      if (numArticulos <= 0) {
        res.json(result);
      }
    }
  }
};
exports.postImage = function (req, res) {
  response.commonData(
    res,
    model.postImage,
    ['/public/img/' + req.file.filename, req.body.id_renglon]
  );
};

exports.postArticulo = function (req, res) {
  response.commonData(
    res,
    model.postArticulo,
    [
      req.body.id_renglon,
      req.body.id_categoria,
      req.body.nombre,
      req.body.descripcion,
      req.body.barcode,
      req.body.precio
    ]
  );
};
exports.deleteImage = function (req, res) {
  response.commonData(
    res,
    model.deleteImage,
    req.params.id
  );
};
exports.deleteArticulo = function (req, res) {
  response.commonData(
    res,
    model.deleteArticulo,
    req.params.id
  );
};
exports.delete = function (/*req, res*/) {

};
exports.put = function (req, res) {
  response.commonData(
    res,
    model.put,
    [req.params.id, req.body.nombre]
  );
};

exports.putArticulo = function (req, res) {
  response.commonData(
    res,
    model.putArticulo,
    [
      req.params.id,
      req.body.id_categoria,
      req.body.nombre,
      req.body.descripcion,
      req.body.barcode,
      req.body.precio
    ]
  );
};