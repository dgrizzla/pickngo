
/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams, $uibModal) {
  //Api.roles.getRoles
  $scope.table = new NgTableParams({}, {
    getData: function(/*params*/) {
      return Api.roles.getRoles(onGetRoles);
    }
  });
  function onGetRoles(result) {
    if (result.code === 1) {
      return Api.toast.error('Hubo un error');
    }
    return result.data;
  }
  $scope.openEditOpciones = function (rol) {
    let instance = $uibModal.modals.openEditOpcionesRol(rol);
    instance.result.then(function () {
      $scope.table.reload();
    });
  };
  $scope.openAddRol = function () {
    let instance = $uibModal.modals.openAddRol();
    instance.result.then(function () {
      $scope.table.reload();
    });
  };
  $scope.openEditRol = function (rol) {
    let instance = $uibModal.modals.openEditRol(rol);
    instance.result.then(function () {
      $scope.table.reload();
    });
  };
};