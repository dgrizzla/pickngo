
/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams, $uibModal) {
  $scope.offset = 0;
  $scope.limit = 20;
  $scope.order = 'nombres';
  $scope.asc = true;
  $scope.table = new NgTableParams({}, {
    getData: function(params) {
      var sorting = params.sorting();
      var order = Object.keys(sorting)[0] || 'nombres';
      console.log(params.url(), params.sorting());
      return Api.usuarios.getUsuarios(
        order,
        $scope.offset,
        $scope.limit,
        sorting[order] === 'asc',
        onGetUsuarios
      );
    }
  });
  function onGetUsuarios(result) {
    if (result.code === 1) {
      return Api.toast.error('Hubo un error');
    }
    return result.data;//$scope.usuarios;
    //-$scope.usuarios = result.data;
  }
  $scope.openEditUsuario = function (usuario) {
    let instance = $uibModal.modals.openEditUsuario(usuario.id);
    instance.result.then(function () {
      $scope.table.reload();
    });
  };
};