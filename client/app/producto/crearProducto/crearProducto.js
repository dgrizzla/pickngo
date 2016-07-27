'use strict';

PICKNGO.config(function ($stateProvider) {
  $stateProvider.state('crearProducto', {
    url: '/crearProducto',
    template: require('./crearProducto.jade')(),
    controller: 'CrearProductoCtrl'
  });
});
