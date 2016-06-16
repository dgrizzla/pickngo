'use strict';

angular.module('pickngoApp')
  .controller('RegistroModalCtrl', function($scope,$rootScope,$http,Auth,Notification) {
    $http.get('/api/usuarios/paises')
      .then(result => {
        $scope.paises = result.data.data;
      },err => {
        Notification.error('Hubo un error procesando tu solicitud.')
        console.error('api/usuarios/paises',err); 
      });
    
    $scope.cerrar = function () {
      $scope.$close('cerrar');
    }
    
    $scope.validarRegistro = function(valid) {
      var numcorreo;
      var numusuario;
      if (!valid) {
        Notification.warning('Verifica que tu información esté completa y sea correcta.')
        return
      }
      var mesAux = $scope.fechaNacimiento.mes + 1
      var fechaNacTemporal = $scope.fechaNacimiento.anio + '-' + mesAux + '-' + $scope.fechaNacimiento.dia
      var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!moment(fechaNacTemporal,'YYYY-MM-DD').isValid()) {
        Notification.warning('La fecha de nacimiento es inválida.')
        return;
      }

      if (!regexEmail.test($scope.usuario.correo)) {
        Notification.warning('La dirección de correo es inválida.')
        return;
      }
      $scope.usuario.fechaNacimiento = moment(fechaNacTemporal,"YYYY-MM-DD").format();
      
      $http.get('/api/usuarios/validaCorreoExistente/' + $scope.usuario.correo)
        .then(result=>{
          numcorreo = result.data.data[0].numcorreo;
          if(numcorreo === 0){
            $http.get('/api/usuarios/validaUsuarioExistente/' + $scope.usuario.usuario)
              .then(function(result){
                numusuario = result.data.data[0].numusuario;
                if(numusuario === 0){
                  registrar();
                }else{
                  Notification.warning('El usuario ' + $scope.usuario.usuario + ' ya está en uso.')
                }
              },function(err){
                Notification.error('Hubo un error procesando tu solicitud.')
                console.error('api/usuarios/validaUsuarioExistente',err);      
              });
          }else{
            Notification.warning('La dirección de correo '+ $scope.usuario.correo +' ya está en uso.')
            return;
          }    
        },err =>{
          Notification.error('Hubo un error procesando tu solicitud.')
          console.error('/api/usuarios/validaCorreoExistente',err)
        });
    };
    
    function registrar(){
      Auth.registro($scope.usuario).then(function(result){
        if (result.data.err) {
          Notification.error('Hubo un error al registrarse.')
          console.error('Error al registrarse',result.data.err);
          return;
        }
        Notification.success('¡Te has registrado con éxito! Ahora puedes iniciar sesión.')
        $scope.$close('cerrar');
      }).catch(function(err){
        Notification.error('Hubo un error al registrarse.')
        console.error('error auth registro',err);
      });
    }
  });

