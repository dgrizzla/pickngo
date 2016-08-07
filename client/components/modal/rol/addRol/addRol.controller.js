
/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams, $uibModalInstance, $timeout) {
  $timeout(function () {
    $scope.load = true;
  }, 500);
  $scope.saveRol = function () {
    Api.roles.postRol(
      $scope.rol.nombre,
      $scope.rol.descripcion,
      onPost
    );
  };
  function onPost(result) {
    if (result.code !== 0) {
      return Api.toast.error('Hubo un error, intentelo de nuevo');
    }
    Api.toast.success('Se agrego correctamente');
    return $uibModalInstance.close(true);
  }
};