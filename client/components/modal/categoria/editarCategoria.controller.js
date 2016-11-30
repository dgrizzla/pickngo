
PICKNGO.controller('EditarCategoriaCtrl', function($scope, Auth, departamentos, categoria, Api) {
  Auth.getCurrentUser();
  $scope.categoria = {
    id: categoria.id_categoria,
    nombre: categoria.nombre_categoria,
    departamento: categoria.id_cat
  };
  $scope.departamentos = departamentos;
  $scope.guardarCategoria = function(valid) {
    if (valid) {
      Api.put('api/categorias/', {
        categoria: $scope.categoria
      })
      .then(() => {
        Notification.success('Se editó exitosamente la categoría.');
        $scope.$close();
      }).catch(err => {
        Notification.error('Hubo un error editando la categoría.');
        console.error(err);
        $scope.$close();
      });
    } else {
      Notification.warning('Completa los datos.');
    }
  };
});