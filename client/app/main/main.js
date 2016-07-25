'use strict';

PICKNGO.config(function($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    template: require('./main.jade')(),
    controllerAs: "MainCtrl"
  });
});
