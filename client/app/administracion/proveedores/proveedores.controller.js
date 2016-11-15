/*@ngInject*/
module.exports = function($scope, Api, NgTableParams, $uibModal) {
  $scope.offset = 0;
  $scope.limit = 20;
  $scope.order = 'nombre';
  $scope.asc = true;

  $scope.table = new NgTableParams({}, {
    getData: function(/*params*/) {
      // var sorting = params.sorting();
      // var order = Object.keys(sorting)[0] || 'nombre';
      return Api.proveedores.getProveedores(
        onGetProveedores
      );
    }
  });

  $scope.openAddProveedor = function() {
    let instance = $uibModal.modals.openAddProveedor();
    instance.result.then(function() {
      $scope.table.reload();
    });
  };

  $scope.openEditCategorias = function(idProveedor) {
    let instance = $uibModal.modals.openEditCategoriasProveedor(idProveedor);
    instance.result.then(function() {
      $scope.table.reload();
    });
  };

  $scope.openEditProveedor = function(proveedor) {
    let instance = $uibModal.modals.openEditProveedor(proveedor);
    instance.result.then(function() {
      $scope.table.reload();
    });
  };

  function onGetProveedores(result) {
    if (result.code === 1) {
      return Api.toast.error('Hubo un error');
    }
    return result.data;
  }
};