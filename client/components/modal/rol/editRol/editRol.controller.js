
/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams, $uibModalInstance, $timeout, rol) {
  console.log(rol);
  $scope.rol = angular.copy(rol);
  $timeout(function () {
    $scope.load = true;
  }, 500);
  $scope.saveRol = function () {
    Api.roles.putRol(
      $scope.rol.id,
      $scope.rol.nombre,
      $scope.rol.descripcion,
      onPut
    );
  };
  function onPut(result) {
    if (result.code !== 0) {
      return Api.toast.error('Hubo un error, intentelo de nuevo');
    }
    Api.toast.success('Se editor correctamente');
    return  $uibModalInstance.close(true);
  }
};