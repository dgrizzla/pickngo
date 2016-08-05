'use strict';

PICKNGO.controller('DashboardCtrl', function($scope, $http, Auth, $location, Notification) {
  Auth.getCurrentUser();

  $http.get('api/departamentos/countDeptos')
    .then(result => {
      $scope.countDeptos = result.data.data.numDeptos;
    }).catch(err => {
      Notification.error('Hubo un cargando los departamentos.');
      console.error(err);
    });

  $http.get('api/productos/countProductos')
    .then(function(result) {
      $scope.countProductos = result.data.data.countProductos;
    }).catch(function(err) {
      Notification.error('Hubo un error cargando tus productos');
      console.error(err);
    })
  $http.get('api/mensajes/')
    .then(result=>{
      console.info('mensajes',result);
    }).catch(err=>{
      Notification.error('Hubo un error cargando tus mensajes.');
      console.error(err);
    })  
});