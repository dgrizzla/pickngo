'use strict';

angular.module('pickngoApp')
  .controller('NavbarCtrl',function($scope,Auth,$rootScope,Modal,Notification,$http,$state,$location){
    Auth.getCurrentUser();
    $rootScope.$watch('currentUser', function(currentUser) {
      $scope.showItems = (currentUser && currentUser.id_usuario >= 0) ? true : false;    
    });
    
    $scope.openLogin = function () {
      Modal.login()();
    };
    
    $scope.logout = function(){
      Auth.logout(function(resp){
        if(resp.err){
          Notification.error('Hubo un error cerrando la sesión.')
          console.err('error',err)
        }else{
          Notification.success('Has cerrado sesión con éxito.')
          $location.path('/')
        } 
      });
    }

    $scope.openRegistro = function () {
      Modal.registro()();
    };
  });
