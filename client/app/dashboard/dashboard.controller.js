'use strict';

PICKNGO.controller('DashboardCtrl', function($scope, $http, Auth, $location, Notification, $uibModal) {
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

  $http.get('api/mensajes/conversaciones')
    .then(result => {
      $scope.chats = result.data.data;
    }).catch(err => {
      Notification.error('Hubo un error cargando los chats.');
      console.error(err);
    })

  $http.get('api/mensajes/countConversaciones')
    .then(result => {
      $scope.numConversaciones = result.data.data[0].numConversaciones;
    }).catch(err => {
      Notification.error('Hubo un error en el servidor');
      console.error(err);
    });

  $scope.openChat = function(conversacion) {
    var modalChat = $uibModal.open({
      template: require('../../components/modal/chat/chat.jade')(),
      controller: 'ChatCtrl',
      resolve: {
        conversacionData: function () {
          return conversacion;
        }
      },
      size: 'md'
    });
  }

  $http.get('api/usuarios/countUsuarios')
    .then(result=>{
      $scope.numUsuarios = result.data.data[0].numUsuarios;
    }).catch(err=>{
      console.error(err)
    });

});