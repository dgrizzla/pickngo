PICKNGO.controller('AgregarSubCatCtrl', function ($scope, Auth, categorias, Api) {
  Auth.getCurrentUser();
  $scope.categorias = categorias;
  $scope.agregarSubCat = function (valid) {
    if (valid) {
      Api.post('api/subcategorias/', {
        idCat: $scope.subcategoria.categoria,
        nombre: $scope.subcategoria.nombre
      })
      .then(resp => {
        console.log('resp', resp);
        Api.toast.success('Se agregó exitosamente la subcategoría.');
        $scope.$close();
      }).catch(err => {
        Api.toast.error('Hubo un error agregando la subcategoría.');
        console.error(err);
        $scope.$close();
      });
    } else {
      Api.toast.warning('Completa los datos.');
    }
  };
});
