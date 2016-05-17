'use strict';

angular.module('pickngoApp')
  .controller('MainCtrl',function($scope,Modal,$http){
    $scope.openLogin = function () {
      Modal.login()();
    };

    $scope.openRegistro = function () {
      Modal.registro()();
    };
  });
