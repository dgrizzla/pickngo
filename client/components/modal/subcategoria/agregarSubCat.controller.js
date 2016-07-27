'use strict';

PICKNGO.controller('AgregarSubCatCtrl', function($scope, Auth, categorias, $http, Notification) {
  Auth.getCurrentUser();
  $scope.categorias = categorias;
  $scope.agregarSubCat = function(valid) {
    if (valid) {
      $http.post('api/subcategorias/', {
          idCat: $scope.subcategoria.categoria,
          nombre: $scope.subcategoria.nombre
        })
        .then(resp => {
          console.log('resp', resp);
          Notification.success('Se agregó exitosamente la subcategoría.')
          $scope.$close();
        }).catch(err => {
          Notification.error('Hubo un error agregando la subcategoría.')
          console.error(err)
          $scope.$close();
        })
    } else {
      Notification.warning('Completa los datos.')
    }
  }
});