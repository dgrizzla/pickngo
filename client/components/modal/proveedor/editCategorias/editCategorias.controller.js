/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams, $uibModalInstance, proveedor, $timeout) {
  $scope.offset = 0;
  $scope.limit = 20;
  
  function onGetCategorias(result) {
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
      return Api.proveedores.getCategorias(proveedor,onGetCategorias);
    }
  });
  //la funcion recibe la categoria (opcion), el proveedor(rol) se recibe desde la instancia del controlador
  $scope.toggleCategoriaProveedor = function (categoria) {
    //en el dete se manda la opcion y el id rol opcion
    
    categoria.id_proveedor_categoria? 
      Api.proveedores.deleteProveedorCategoria(categoria.id_proveedor_categoria, onDelete)
      : Api.proveedores.postProveedorCategoria(proveedor, categoria.id_categoria, onPost);

    function onPost(result) {
      if (result.code !== 0) {
        return Api.toast.error('Hubo un error, intentelo de nuevo');
      }
      Api.toast.success('Se agregó la categoría al proveedor.');
      $scope.table.reload();
    }
    function onDelete(result) {
      if (result.code !== 0) {
        return Api.toast.error('Hubo un error, intentelo de nuevo');
      }
      Api.toast.success('Se eliminó la categoría del proveedor.');
      categoria.id_proveedor_categoria = undefined;
    }
  };
};