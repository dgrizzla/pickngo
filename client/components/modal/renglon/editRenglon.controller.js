
/*@ngInject*/
module.exports = function ($scope, Api, $uibModalInstance, modalTimer, pngModals, renglon) {
  let articulos, imagenesUploader;
  $scope.addImagenes = evt => {
    evt.preventDefault();
    pngModals.renglon
      .imagenes(renglon, imagenesUploader)
      .result.then(uploader => imagenesUploader = uploader);
  };

  $scope.addArticulos = evt => {
    evt.preventDefault();
    pngModals.renglon
      .articulos(renglon, articulos)
      .result.then(arts => articulos = arts);
  };
  $scope.save = () => Api.renglones.put(renglon, {
    nombre: $scope.renglon.nombre
  }).then(() => {
    Api.toast('Se guardo correctamente');
    $scope.close();
  }).catch(Api.catch('Ocurrio un error'));


  Api.renglones
    .getOne(renglon)
    .then(renglon => $scope.renglon = renglon)
    .then(() => modalTimer($scope))
    .catch(Api.catch('Ha ocurrido un error con el renglon'));
};