/*@ngInject*/
module.exports = function ($scope, $state, Api, NgTableParams, $uibModal) {
  //Api.proveedores.getProductosCategoria(onGetProductos);

  $scope.table = new NgTableParams({}, {
    getData: function (/*params*/) {
      /*var sorting = params.sorting();
      var order = Object.keys(sorting)[0] || 'producto';*/
      return Api.proveedores.getProductosCategoria(onGetProductos);
    }
  });

  function onGetProductos(result) {
    if (result.code !== 0) {
      return Api.toast.error('Hubo un error, intentelo de nuevo');
    }
    return result.data;
  }

  $scope.abrirConversacion = function (producto) {
    var dataConversacion = {
      isProducto: -1,
      nombres: producto.nombres,
      apellidos: producto.apellidos,
      id: producto.id_usuario
    };
    $uibModal.open({
      template: require('../../components/modal/chat/chat.jade')(),
      controller: 'ChatCtrl',
      resolve: {
        conversacionData: function () {
          return dataConversacion;
        }
      },
      size: 'md'
    });
  };

};
