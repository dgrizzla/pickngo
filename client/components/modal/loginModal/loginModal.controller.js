
PICKNGO.controller('LoginModalCtrl', function ($scope, Api) {
  $scope.login = function (valid) {
    if (valid) {
      Api.login({
        user: $scope.usuario.usuario,
        password: $scope.usuario.clave
      }).then(() => {
        $scope.$close();
        //$state.go('dashboard');
      }).catch(err => {
        if (err.message) {
          Api.toast.warning(err.message);
          return;
        }
        Api.toast.error('Hubo un error procesando tu solicitud.');
        console.log('error', err);
      });

    }
  };
});
