
/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams, $uibModal) {
  //Api.roles.getRoles
  $scope.table = new NgTableParams({}, {
    getData: function(params) {
      return Api.roles.getRoles(onGetRoles);
    }
  });
  function onGetRoles(result) {
    if (result.code === 1) {
      return Api.toast.error('Hubo un error');
    }
    return result.data;
  }
  $scope.openEditarOpciones = function (rol) {
    let instance = $uibModal.modals.openEditarOpcionesRol(rol);
    instance.result.then(function () {
      console.log('result');
    });
  };
};