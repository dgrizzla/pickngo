'use strict';

angular.module('pickngoApp')
  .controller('DashboardCtrl',function($scope,$http,Auth,$location,Notification){
    Auth.getCurrentUser();
    
    $http.get('api/departamentos/countDeptos')  
      .then(result=>{
        $scope.countDeptos = result.data.data.num;
        console.info('result count',result.data.data)  
      }).catch(err=>{
        Notification.error('Hubo un error en el servidor.');
        console.error(err);
      });
  });
