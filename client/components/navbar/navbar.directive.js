'use strict';

angular.module('pickngoApp')
  .directive('navbar', () => ({
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarCtrl',
    controllerAs: 'nav'
  }));
