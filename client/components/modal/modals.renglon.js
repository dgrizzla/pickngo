

module.exports = function (openModal) {
  const obj = {};
  obj.edit = renglon => openModal(
    'md',
    require('./renglon/editRenglon.controller.js'),
    require('./renglon/renglon.jade')({tipo:'Editar'}),
    {
      renglon: () => renglon
    }
  );

  obj.add = () => openModal(
    'md',
    require('./renglon/addRenglon.controller.js'),
    require('./renglon/renglon.jade')({tipo:'Crear'})
  );

  obj.articulos = (renglon, articulos) => openModal(
    'md',
    require('./renglon/articulos/articulos.controller.js'),
    require('./renglon/articulos/articulos.jade')(),
    {
      renglon: () => renglon,
      articulos: () => articulos
    }
  );

  obj.imagenes = (renglon, imagenesUploader) => openModal(
    'md',
    require('./renglon/imagenes/imagenes.controller.js'),
    require('./renglon/imagenes/imagenes.jade')(),
    {
      renglon: () => renglon,
      imagenesUploader: () => imagenesUploader
    }
  );
  return obj;
};
