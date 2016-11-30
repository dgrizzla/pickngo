
PICKNGO.controller('EditarDeptoCtrl', function($scope, Auth, departamento, Api) {
  Auth.getCurrentUser();
  $scope.departamento = departamento;
  $scope.guardarDepto = function(valid) {
    if (valid) {
      Api.put('api/departamentos/', {
        departamento: $scope.departamento
      })
      .then(() => {
        Api.toast.success('Se editó exitosamente el departamento.');
        $scope.$close();
      }).catch(err => {
        Api.toast.error('Hubo un error editando el departamento.');
        console.error(err);
        $scope.$close();
      });
    } else {
      Api.toast.warning('Completa los datos.');
    }
  };
});