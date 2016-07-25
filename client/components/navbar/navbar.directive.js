'use strict';

angular.module('pickngoApp').directive('navbar', () => ({
  template: require('./navbar.jade')(),
  restrict: 'E',
  controller: 'NavbarCtrl',
  controllerAs: 'nav'
}));
