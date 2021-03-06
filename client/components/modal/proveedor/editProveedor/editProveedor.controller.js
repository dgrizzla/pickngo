/*@ngInject*/
module.exports = function ($scope, Api, $uibModalInstance, proveedor, modalTimer) {
  Api.proveedores.getTipos(onGetTipos);
  Api.proveedores.getEstados(onGetEstados);

  $scope.proveedor = angular.copy(proveedor);

  $scope.save = function () {
    Api.proveedores.put(
      $scope.proveedor,
      onPut
    );
  };
  $scope.close = function () {
    $uibModalInstance.dismiss();
  };

  function onGetTipos(result) {
    if (result.code !== 0) {
      return Api.toast.error('Hubo un error, intentelo de nuevo');
    }
    $scope.tipos = result.data;
    modalTimer($scope);
  }

  function onGetEstados(result) {
    if (result.code !== 0) {
      return Api.toast.error('Hubo un error, intentelo de nuevo');
    }
    $scope.estados = result.data;
  }

  function onPut(result) {
    if (result.code !== 0) {
      return Api.toast.error('Hubo un error, intentelo de nuevo');
    }
    Api.toast.success('Se guardo correctamente');
    return $uibModalInstance.close(true);
  }
};
