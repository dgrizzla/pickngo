'use strict';

PICKNGO.controller('MainCtrl', function($scope, Modal, $http) {
  $scope.openLogin = function() {
    Modal.login()();
  };

  $scope.openRegistro = function() {
    Modal.registro()();
  };
});