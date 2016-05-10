'use strict';

angular.module('pickngoApp')
  .controller('RegistroModalCtrl', function($scope,$rootScope,$http,Auth) {
    $http.get('/api/users/getPaises').then(result => {
      $scope.paises = result.data.data;
    }).catch(err =>{
      console.error('err',err);
    })
    $scope.dias = $rootScope.dias;
    $scope.meses = $rootScope.meses;
    $scope.registro = function(valid) {
      if (!valid) {
        $scope.error = "Completa toda tu información antes de registarte."
        return
      }
      var mesAux = $scope.fechaNacimiento.mes + 1
      var fechaNacTemporal = $scope.fechaNacimiento.anio + '-' + mesAux + '-' + $scope.fechaNacimiento.dia
      var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!moment(fechaNacTemporal,'YYYY-MM-DD').isValid()) {
        $scope.error = "La fecha de nacimiento es inválida.";
        return;
      }

      if (!regexEmail.test($scope.usuario.correo)) {
        $scope.error = "La dirección de correo es inválida.";
        return
      }
      $scope.usuario.fechaNacimiento = moment(fechaNacTemporal,"YYYY-MM-DD").format();
      Auth.registro($scope.usuario).then(function(result){
        if (result.data.err) {
          $scope.error = 'Hubo un error al registrarse.'
          console.error('Error al registrarse',result.data.err);
          return
        }
        $scope.success = "¡Te has registrado con éxito! Ahora puedes iniciar sesión."
      }).catch(function(err){
        $scope.error = 'Hubo un error al registrarse.'
        console.error('Error en servidor',err);
      });
    }
  });
