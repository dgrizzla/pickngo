'use strict';

PICKNGO.controller('ProductoUsuarioCtrl', function($scope, Auth, $state, Notification, $http) {

  Auth.getCurrentUser();
  getProductos();

  function getProductos() {
    $http.get('api/productos/')
      .then(function(result) {
        $scope.productos = result.data.data;
      }).catch(function(err) {
        Notification.error('Hubo un error cargando los productos');
        console.error(err);
      });
  }

  $scope.eliminarProducto = function(id) {
    $http.delete('api/productos/' + id)
      .then(resp => {
        if (resp.data.code === 0) {
          Notification.success('Se eliminó el producto exitosamente.')
          getProductos();
        } else {
          Notification.success('Hubo un problema eliminando el producto.')
        }
      }).catch(err => {
        console.error(err);
        Notification.error('Hubo un error eliminando el producto.')
      });
  }

});