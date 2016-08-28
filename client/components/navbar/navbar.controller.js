'use strict';

PICKNGO.controller('NavbarCtrl', function($scope, Auth, $rootScope, Modal, $uibModal, $location, Api) {
  Auth.getCurrentUser(function (currentUser) {
    console.log(currentUser);
    
  });

  function onGetMenus(result) {
    if (result.code !== 0) {
      Api.toast.error('Hubo un error con los permisos');
    }
    for (let j = 0; j < result.data.length; j++) {
      let element = result.data[j];
      $scope['show' + element.nombre_opcion] = true;
    }
  }

  $rootScope.$watch('currentUser', function(newVal, oldVal) {
    $scope.showItems = (newVal && newVal.id_usuario >= 0) ? true : false;
    if (newVal && newVal.id_usuario >= 0) {
      if (newVal.id_tipo) {
        Api.roles.getOpcionesMenuRol(newVal.id_tipo, onGetMenus);
      }
    }
  });

  $scope.openLogin = function() {
    Modal.login()();
  };

  $scope.logout = function() {
    Auth.logout(function(resp) {
      if (resp.err) {
        Api.toast.error('Hubo un error cerrando la sesión.')
        console.err('error', err)
      } else {
        Api.toast.success('Has cerrado sesión con éxito.')
        $location.path('/')
      }
    });
  }
  $scope.openChat = function() {
    var modalChat = $uibModal.open({
      template: require('../modal/chat/chat.jade')(),
      controller: 'ChatCtrl',
      resolve: {
        conversacionData: function () {
          return 0;
        }
      },
      size: 'md'
    });
  }

  $scope.openRegistro = function() {
    Modal.registro()();
  };
});