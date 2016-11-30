
PICKNGO.controller('AgregarDeptoCtrl', function ($scope, Api) {
  Api.getCurrentUser();
  $scope.guardarDepto = function (valid) {
    if (valid) {
      Api.post('api/departamentos/', {
        nombreDepartamento: $scope.departamento.nombre
      })
      .then(() => {
        Api.toast.success('Se agregó exitosamente el departamento.');
        $scope.$close();
      }).catch(err => {
        Api.toast.error('Hubo un error agregando el departamento.');
        console.error(err);
        $scope.$close();
      });
    } else {
      Api.toast.warning('Completa los datos.');
    }
  };
});
