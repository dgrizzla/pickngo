PICKNGO.controller('ConfirmCtrl', function($scope) {
    $scope.cerrar = function(value) {
      $scope.$close(value);
    }
});