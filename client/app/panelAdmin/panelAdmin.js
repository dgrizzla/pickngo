'use strict';

angular.module('pickngoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('panelAdmin', {
        url: '/panelAdmin',
        templateUrl: 'app/panelAdmin/panelAdmin.html',
        controller: 'PanelAdminCtrl'
      });
  });
  