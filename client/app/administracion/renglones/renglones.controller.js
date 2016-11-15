/*@ngInject*/
module.exports = function($scope, Api, NgTableParams, pngModals) {
  Api.count('png_renglon').then(total => {
    console.log(total);
    $scope.table = new NgTableParams({}, {
      total,
      getData: function(params) {
        var page = params.page();
        var count = params.count();
        var sorting = params.sorting();
        var order = Object.keys(sorting)[0] || 'nombre';
        return Api.renglones.getSort(
          order,
          (page * count) - count,
          count,
          sorting[order] === 'asc',
        );
      }
    });
  }).catch(() => Api.toast.error('Ha ocurrido un error al consultar los renglones'));
  $scope.openAdd = () => pngModals
    .renglon.add()
    .result.then(() => $scope.table.reload());
    
  $scope.openEdit = renglon => pngModals
    .renglon.edit(renglon)
    .result.then(() => $scope.table.reload());
};