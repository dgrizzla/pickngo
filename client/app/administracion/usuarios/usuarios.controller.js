
/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams) {
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
        sorting[order] == 'asc',
        onGetUsuarios
      );
    }
  });
  // Api.usuarios.getUsuarios(
  //   $scope.order,
  //   $scope.offset,
  //   $scope.limit,
  //   $scope.asc,
  //   onGetUsuarios
  // );
  function onGetUsuarios(result) {
    if (result.code === 1) {
      return Api.toast.error('Hubo un error');
    }
    return result.data;//$scope.usuarios;
    //-$scope.usuarios = result.data;
  }
};