'use strict';

angular.module('pickngoApp')
  .controller('MainCtrl',function($scope,Modal){
    $scope.test = 'variable scope';
    $scope.openLogin = function () {
      console.log('HUAAAAAAAAA');
      Modal.login()();
    }
  });
