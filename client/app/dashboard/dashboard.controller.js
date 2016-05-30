'use strict';

angular.module('pickngoApp')
  .controller('DashboardCtrl',function($scope,$http,Auth,$location,Notification){
    Auth.getCurrentUser();
    //console.log('dashboardctrl');
    //cope.test = 'testin';
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
    $http.get('api/things/')
    .then(function(a){
    },function(b){
    })
  });
