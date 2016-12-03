
/*@ngInject*/
module.exports = function ($scope, Api, $uibModalInstance, modalTimer, renglon, imagen) {

  Api.renglones.getDetails(renglon).then(rengloDetalle => {
    modalTimer($scope);
    $scope.renglon = rengloDetalle;
    if (!imagen) {
      $scope.imagenIndex = 0;
      return;
    }
    for (let index = 0; index < rengloDetalle.imagenes.length; index++) {
      var element = rengloDetalle.imagenes[index];
      if (imagen === element.id) {
        $scope.imagenIndex = index;
        return;
      }
    }
  });
  $scope.selectImage = index => $scope.imagenIndex = index;
};