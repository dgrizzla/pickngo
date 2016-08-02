
/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams) {
  $scope.offset = 0;
  $scope.limit = 20;
  $scope.order = 'nombres';
  $scope.asc = true;

  $scope.tableParams = new NgTableParams({
    filter : false
  }, {
    getData: function(params) {
      console.log(params.url(), params);
      return Api.usuarios.getUsuarios(
        $scope.order,
        $scope.offset,
        $scope.limit,
        $scope.asc,
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
    console.log(result, arguments);
    if (result.code === 1) {
      return Api.toast.error('Hubo un error');
    }
    return result.data;//$scope.usuarios;
    //-$scope.usuarios = result.data;
  }
};