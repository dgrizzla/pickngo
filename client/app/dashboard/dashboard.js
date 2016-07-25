'use strict';

PICKNGO.config(function ($stateProvider) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    template: require('./dashboard.jade')(),
    controller: 'DashboardCtrl'
  });
});
