/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams, $uibModalInstance, rol, $timeout) {
  $scope.offset = 0;
  $scope.limit = 20;
  function onGetOpciones(result) {
    $timeout(function () {
      $scope.load = true;
    }, 1000);
    if (result.code === 1) {
      return Api.toast.error('Hubo un error');
    }
    return result.data;
  }

  $scope.table = new NgTableParams({
    paginate: false,
    count: []
  }, {
    getData: function(params) {
      var sorting = params.sorting();
      var order = Object.keys(sorting)[0] || 'nombre';
      return Api.roles.getOpcionesRol(
        rol,
        order,
        $scope.offset,
        $scope.limit,
        sorting[order] === 'asc',
        onGetOpciones
      );
    }
  });
  $scope.toggleRolOpcion = function (opcion) {
    opcion.id_rol_opcion ?
      Api.roles.deleteRolOpcion(opcion.id_rol_opcion, onDelete)
      : Api.roles.postRolOpcion(rol, opcion.id, onPost);

    function onPost(result) {
      console.log(result);
      if (result.code !== 0) {
        return Api.toast.error('Hubo un error, intentelo de nuevo');
      }
      opcion.id_rol_opcion = result.data;
    }
    function onDelete(result) {
      console.log(result);
      if (result.code !== 0) {
        return Api.toast.error('Hubo un error, intentelo de nuevo');
      }
      opcion.id_rol_opcion = undefined;
    }
  };
  console.log($scope.table.data);
};