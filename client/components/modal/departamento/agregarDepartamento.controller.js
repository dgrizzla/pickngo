'use strict';

PICKNGO.controller('AgregarDeptoCtrl', function($scope, Auth, $http, Notification) {
  Auth.getCurrentUser();
  $scope.guardarDepto = function(valid) {
    if (valid) {
      $http.post('api/departamentos/', {
          nombreDepartamento: $scope.departamento.nombre
        })
        .then(resp => {
          Notification.success('Se agregó exitosamente el departamento.')
          $scope.$close();
        }).catch(err => {
          Notification.error('Hubo un error agregando el departamento.')
          console.error(err)
          $scope.$close();
        })
    } else {
      Notification.warning('Completa los datos.')
    }
  }
});