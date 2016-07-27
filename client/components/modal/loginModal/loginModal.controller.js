'use strict';

PICKNGO.controller('LoginModalCtrl', function($scope, Auth, $state, Notification) {
  $scope.login = function(valid) {
    if (valid) {
      Auth.login({
        user: $scope.usuario.usuario,
        password: $scope.usuario.clave
      }).then(() => {
        $scope.$close();
        //$state.go('dashboard');
      }).catch(err => {
        if (err.message) {
          Notification.warning(err.message);
          return;
        }
        Notification.error('Hubo un error procesando tu solicitud.')
        console.log('error', err);
      })

    }
  }
});