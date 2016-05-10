'use strict';

angular.module('pickngoApp')
  .controller('LoginModalCtrl', function ($scope,Auth,$state) {
    $scope.login = function (valid) {
      if(valid){
        Auth.login({
          user: $scope.usuario.usuario,
          password: $scope.usuario.clave
        }).then(function(result){
          if(result.data.msg){
            $scope.error = result.data.msg;
          }else{
            $scope.$close();
            $state.go('dashboard');
          }
        }).catch(function(err){
          console.log('error',err);
        })

      }
    }
  });
