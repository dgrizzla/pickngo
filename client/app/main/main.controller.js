
PICKNGO.controller('MainCtrl', function($scope, Modal) {
  $scope.openLogin = function() {
    Modal.login()();
  };

  $scope.openRegistro = function() {
    Modal.registro()();
  };
});