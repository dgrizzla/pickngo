'use strict';

PICKNGO.controller('EditarSubCatCtrl', function($scope, Auth, subcategoria, categorias, $http, Notification) {
  Auth.getCurrentUser();
  $scope.categorias = categorias;
  $scope.subcategoria = {
    id: subcategoria.id,
    nombre: subcategoria.nombre_subcategoria,
    categoria: subcategoria.id_scat
  };
  $scope.agregarSubCat = function(valid) {
    if (valid) {
      $http.put('api/subcategorias/', {
          subcategoria: $scope.subcategoria
        })
        .then(resp => {
          console.log('resp', resp);
          Notification.success('Se editó exitosamente la subcategoría.')
          $scope.$close();
        }).catch(err => {
          Notification.error('Hubo un error editando la subcategoría.')
          console.error(err)
          $scope.$close();
        })
    } else {
      Notification.warning('Completa los datos.')
    }
  }
});