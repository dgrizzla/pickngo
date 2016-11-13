/*@ngInject*/
module.exports = function($scope, Api, NgTableParams, pngModals) {
  $scope.offset = 0;
  $scope.limit = 20;
  $scope.order = 'nombre';
  $scope.asc = true;

  $scope.table = new NgTableParams({}, {
    getData: function(params) {
      var sorting = params.sorting();
      var order = Object.keys(sorting)[0] || 'nombre';
      return Api.renglones.getAll(onGet);
    }
  });
  $scope.openAdd = () => pngModals
    .renglon.add()
    .result.then(() => $scope.table.reload());
    
  $scope.openEdit = renglon => pngModals
    .renglon.edit(renglon)
    .result.then(() => $scope.table.reload());

  function onGet(result) {
    if (result.code === 1) {
      return Api.toast.error('Hubo un error');
    }
    return result.data;
  }
};