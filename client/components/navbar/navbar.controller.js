'use strict';

PICKNGO.controller('NavbarCtrl', function($scope, Auth, $rootScope, Modal, Notification, $uibModal, $http, $state, $location) {
  Auth.getCurrentUser();
  $rootScope.$watch('currentUser', function(currentUser) {
    $scope.showItems = (currentUser && currentUser.id_usuario >= 0) ? true : false;
  });

  $scope.openLogin = function() {
    Modal.login()();
  };

  $scope.logout = function() {
    Auth.logout(function(resp) {
      if (resp.err) {
        Notification.error('Hubo un error cerrando la sesión.')
        console.err('error', err)
      } else {
        Notification.success('Has cerrado sesión con éxito.')
        $location.path('/')
      }
    });
  }
  $scope.openChat = function() {
    var modalChat = $uibModal.open({
      template: require('../modal/chat/chat.jade')(),
      controller: 'ChatCtrl',
      size: 'md'
    });
  }

  $scope.openRegistro = function() {
    Modal.registro()();
  };
});