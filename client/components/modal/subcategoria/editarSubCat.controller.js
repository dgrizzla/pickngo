
PICKNGO.controller('EditarSubCatCtrl', function ($scope, Api, subcategoria, categorias) {
  Api.getCurrentUser();
  $scope.categorias = categorias;
  $scope.subcategoria = {
    id: subcategoria.id,
    nombre: subcategoria.nombre_subcategoria,
    categoria: subcategoria.id_scat
  };
  $scope.agregarSubCat = function (valid) {
    if (valid) {
      Api.put('api/subcategorias/', {
        subcategoria: $scope.subcategoria
      })
      .then(resp => {
        console.log('resp', resp);
        Api.toast.success('Se editó exitosamente la subcategoría.');
        $scope.$close();
      }).catch(err => {
        Api.toast.error('Hubo un error editando la subcategoría.');
        console.error(err);
        $scope.$close();
      });
    } else {
      Api.toast.warning('Completa los datos.');
    }
  };
});
