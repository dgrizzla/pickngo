'use strict';

PICKNGO.controller('ChatCtrl', function($scope, $http, Auth, $location, Notification) {
  
  $scope.modalView =  "menuChat";

  $scope.setView = function(vista){
    $scope.modalView = vista;
  };

  $scope.enviarMensaje = function(mensaje){
    console.log('AAAAAHHHHHH',mensaje)
  }

  $http.get('api/mensajes/')
    .then(result=>{
      console.info('mensajes',result.data.data);
      $scope.conversaciones = result.data.data;
    }).catch(err=>{
      Notification.error('Hubo un error cargando tus mensajes.');
      console.error(err);
    })

  $scope.buscarUsuario  = function(busqueda){
    $http.get('api/usuarios/busquedaUsuarioChat/'+busqueda)
      .then(result=>{
        $scope.resultadoUsuarios = result.data.data;
        console.info('result',result.data.data.length)
      }).catch(err=>{
        console.error(err);
      });    
  }  

});