'use strict';

angular.module('pickngoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('crearProducto', {
        url: '/crearProducto',
        templateUrl: 'app/crearProducto/crearProducto.html',
        controller: 'CrearProductoCtrl'
      });
  });
