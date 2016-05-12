'use strict';

angular.module('pickngoApp')
  .controller('MainCtrl',function($scope,Modal){
    $scope.test = 'variable scope';
    $scope.openLogin = function () {
      Modal.login()();
    }
    $scope.openRegistro = function () {
      Modal.registro()();
    }
  });
