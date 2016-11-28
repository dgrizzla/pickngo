
/*@ngInject*/
module.exports = function ($scope, Api, $uibModalInstance, modalTimer, pngModals, renglon) {
  $scope.addImagenes = evt => {
    evt.preventDefault();
    pngModals.renglon
      .imagenes(renglon);
  };

  $scope.addArticulos = evt => {
    evt.preventDefault();
    pngModals.renglon
      .articulos(renglon);
  };
  $scope.save = () => {
    Api.renglones.put(renglon, {
      nombre: $scope.renglon.nombre
    }).then(() => {
      Api.toast('Se guardo correctamente');
      $scope.close();
    }).catch(Api.catch('Ocurrio un error'));
  };

  Api.renglones
    .getOne(renglon)
    .then(renglon => $scope.renglon = renglon)
    .then(() => modalTimer($scope))
    .catch(Api.catch('Ha ocurrido un error con el renglon'));
};