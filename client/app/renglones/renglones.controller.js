
/*@ngInject*/
module.exports = function ($scope, Api, pngModals) {
  $scope.openVisor = function (id_renglon, id_imagen) {
    pngModals.renglon.visor(id_renglon, id_imagen);
  };

  Api.renglones.getAllImagenes().then(imagenes => {
    $scope.imagenes = imagenes;
  }).catch(Api.catch('Hubo un error con las imagenes'));

  Api.renglones.getImagen().then(renglones => {
    $scope.renglones = renglones;
  }).catch(Api.catch('Hubo un error con los renglones'));
};