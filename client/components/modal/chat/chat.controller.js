'use strict';

PICKNGO.controller('ChatCtrl', function($scope, $http, Auth, $location, Notification) {
  
  $scope.modalView =  "menuChat";

  $scope.setView = function(vista){
    $scope.modalView = vista;
  };

  $http.get('api/mensajes/')
    .then(result=>{
      console.info('mensajes',result.data.data);
      $scope.conversaciones = result.data.data;
    }).catch(err=>{
      Notification.error('Hubo un error cargando tus mensajes.');
      console.error(err);
    })  
});