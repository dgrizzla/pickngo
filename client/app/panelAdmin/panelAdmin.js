'use strict';

PICKNGO.config(function ($stateProvider) {
  $stateProvider.state('panelAdmin', {
    url: '/panelAdmin',
    template: require('./panelAdmin.jade')(),
    controller: 'PanelAdminCtrl'
  });
});