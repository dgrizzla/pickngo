'use strict';

angular.module('pickngoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('crearProducto', {
        url: '/crearProducto',
        templateUrl: 'app/producto/crearProducto/crearProducto.html',
        controller: 'CrearProductoCtrl'
      });
  });
