/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams) {
  $scope.offset = 0;
  $scope.limit = 20;
  $scope.order = 'nombres';
  $scope.asc = true;
  $scope.table = new NgTableParams({}, {
    getData: function(params) {
      var sorting = params.sorting();
      var order = Object.keys(sorting)[0] || 'nombre';
      return Api.opciones.getOpciones(
        order,
        $scope.offset,
        $scope.limit,
        sorting[order] == 'asc',
        onGetOpciones
      );
    }
  });
  function onGetOpciones(result) {
    if (result.code === 1) {
      return Api.toast.error('Hubo un error');
    }
    return result.data;
  }
};