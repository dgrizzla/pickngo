'use strict';

PICKNGO.controller('AgregarCategoriaCtrl', function($scope, Auth, departamentos, $http, Notification) {
  Auth.getCurrentUser();
  $scope.departamentos = departamentos;
  $scope.guardarCategoria = function(valid) {
    if (valid) {
      $http.post('api/categorias/', {
          idDepto: $scope.categoria.departamento,
          nombreCategoria: $scope.categoria.nombre
        })
        .then(resp => {
          Notification.success('Se agregó exitosamente la categoría.')
          $scope.$close();
        }).catch(err => {
          Notification.error('Hubo un error agregando la categoría.')
          console.error(err)
          $scope.$close();
        })
    } else {
      Notification.warning('Completa los datos.')
    }
  }
});