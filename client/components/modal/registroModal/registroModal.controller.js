const moment = require('moment');

PICKNGO.controller('RegistroModalCtrl', function ($scope, $rootScope, Api) {
  Api.get('/api/usuarios/paises')
    .then(result => {
      $scope.paises = result.data.data;
    }, err => {
      Api.toast.error('Hubo un error procesando tu solicitud.');
      console.error('api/usuarios/paises', err);
    });

  $scope.cerrar = function () {
    $scope.$close('cerrar');
  };

  $scope.validarRegistro = function (valid) {
    var numcorreo;
    var numusuario;
    if (!valid) {
      Api.toast.warning('Verifica que tu información esté completa y sea correcta.');
      return;
    }
    var mesAux = $scope.fechaNacimiento.mes + 1;
    var fechaNacTemporal = $scope.fechaNacimiento.anio + '-' + mesAux + '-' + $scope.fechaNacimiento.dia;
    var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!moment(fechaNacTemporal, 'YYYY-MM-DD').isValid()) {
      Api.toast.warning('La fecha de nacimiento es inválida.');
      return;
    }

    if (!regexEmail.test($scope.usuario.correo)) {
      Api.toast.warning('La dirección de correo es inválida.');
      return;
    }
    $scope.usuario.fechaNacimiento = moment(fechaNacTemporal, "YYYY-MM-DD").format();

    Api.get('/api/usuarios/validaCorreoExistente/' + $scope.usuario.correo)
      .then(result => {
        numcorreo = result.data.data[0].numcorreo;
        if (numcorreo === 0) {
          Api.get('/api/usuarios/validaUsuarioExistente/' + $scope.usuario.usuario)
            .then(function (result) {
              numusuario = result.data.data[0].numusuario;
              if (numusuario === 0) {
                registrar();
              } else {
                Api.toast.warning('El usuario ' + $scope.usuario.usuario + ' ya está en uso.');
              }
            }, function (err) {
              Api.toast.error('Hubo un error procesando tu solicitud.');
              console.error('api/usuarios/validaUsuarioExistente', err);
            });
        } else {
          Api.toast.warning('La dirección de correo ' + $scope.usuario.correo + ' ya está en uso.');
          return;
        }
      }, err => {
        Api.toast.error('Hubo un error procesando tu solicitud.');
        console.error('/api/usuarios/validaCorreoExistente', err);
      });
  };

  function registrar() {
    Api.registro($scope.usuario).then(function (result) {
      if (result.data.err) {
        Api.toast.error('Hubo un error al registrarse.');
        console.error('Error al registrarse', result.data.err);
        return;
      }
      Api.toast.success('¡Te has registrado con éxito! Ahora puedes iniciar sesión.');
      $scope.$close('cerrar');
    }).catch(function (err) {
      Api.toast.error('Hubo un error al registrarse.');
      console.error('error Api registro', err);
    });
  }
});
