'use strict';

angular.module('pickngoApp')
  .controller('CrearProductoCtrl', function($scope, $http, $state, Auth, $location, Notification) {
    Auth.getCurrentUser();
    $scope.producto = {};
    $http.get('api/categorias/porDepartamento')
      .then(function(result) {
        console.log('resulta',result)
        $scope.categorias = result.data.data;
      }).catch(function(err) {
        Notification.error('Hubo un error cargando las categorías.');
        console.erro(err);
      })

    $http.get('api/subcategorias/')
      .then(function(result) {
        $scope.subcategorias = result.data.data
      }).catch(function(err) {
        Notification.error('Hubo un error cargando las subcategorias.');
        console.error(err)
      });

      $scope.guardarProducto = function() {
        if($scope.producto.nombre && $scope.producto.descripcion && $scope.producto.categoria && $scope.producto.preciodel && $scope.producto.precioal){
          $http.post('api/productos/',{producto:$scope.producto})
            .then(function(resp){
              console.info(resp);
              if(resp.data.code === 0){
                Notification.success('Se guardó el producto exitosamente.')
                $state.go('productoUsuario');
              }
            }).catch(function(err){
              console.error(err)
              Notification.error('Hubo un error guardando el producto.')
            })
        }else{
          Notification.warning('Completa la información necesaria del producto.')
        }
      }

  });