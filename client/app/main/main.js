'use strict';

angular.module('pickngoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controllerAs: "MainCtrl"
      });
  });
