'use strict';

angular.module('pickngoApp')
  .controller('DashboardCtrl',function($scope,$http,Auth,$location,Notification){
    Auth.getCurrentUser();
    //console.log('dashboardctrl');
    //cope.test = 'testin';
    
    $http.get('api/things/')
    .then(function(a){
    },function(b){
    })
  });
