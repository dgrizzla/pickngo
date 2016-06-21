'use strict';

angular.module('pickngoApp')
  .controller('CrearProductoCtrl', function($scope, $http, $state, Auth, $location, Notification) {
    Auth.getCurrentUser();
    $scope.producto = {};
    $scope.fechaVencimiento = {};
    var anioActual = moment().get('year');
    $scope.aniosMax = [anioActual,anioActual + 1];
    
    $http.get('api/categorias/porDepartamento')
      .then(function(result) {
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
        var mesAux = $scope.fechaVencimiento.mes + 1
        var fechaTemporal = moment($scope.fechaVencimiento.anio + ' ' + mesAux + ' ' + $scope.fechaVencimiento.dia, "YYYY MM DD");
        if($scope.producto.nombre && $scope.producto.descripcion && $scope.producto.categoria && $scope.producto.preciodel && $scope.producto.precioal && $scope.fechaVencimiento){

          if(!fechaTemporal.isValid()){
            Notification.warning('Fecha límite inválida.');
            return;
          }
          if($scope.producto.preciodel > $scope.producto.precioal){
            Notification.warning('El precio final debe ser mayor al inicial.')
            return;
          }
          $scope.producto.fechaLimite = fechaTemporal.format("YYYY-MM-DD");
          $http.post('api/productos/',{producto:$scope.producto})
            .then(function(resp){
              console.info(resp);
              if(resp.data.code === 0){
                Notification.success('Se guardó el producto exitosamente.')
                $state.go('productoUsuario');
              }else{
                Notification.error('Hubo un error guardando el producto.')
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