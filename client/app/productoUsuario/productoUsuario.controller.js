'use strict';

angular.module('pickngoApp')
  .controller('ProductoUsuarioCtrl', function($scope, Auth, Notification, $http) {
  
    Auth.getCurrentUser();

    $http.get('api/productos/')
      .then(function(result){
        $scope.productos = result.data.data;
        console.info(result);
      }).catch(function(err){
        Notification.error('Hubo un error cargando los productos');
        console.error(err);
      });
      
  });