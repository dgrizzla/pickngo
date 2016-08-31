
/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams, $uibModalInstance, modalTimer) {
  Api.opciones.getTipos(onGetTipos);
  $scope.saveOpcion = function () {
    Api.opciones.post(
      $scope.opcion,
      onPut
    );
  };
  $scope.close  = function () {
    $uibModalInstance.dismiss();
  }
  function onGetTipos(result) {
    if(result.code !== 0){
      return Api.toast.error('Hubo un error, intentelo de nuevo');
    }
    $scope.tipos = result.data;
    modalTimer($scope);
  }
  function onPut(result) {
    if (result.code !== 0) {
      return Api.toast.error('Hubo un error, intentelo de nuevo');
    }
    Api.toast.success('Se guardo correctamente');
    return  $uibModalInstance.close(true);
  }
};