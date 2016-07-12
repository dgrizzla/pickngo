'use strict';

angular.module('pickngoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('editarProducto', {
        params: {producto:null},
        url: '/editarProducto',
        templateUrl: 'app/producto/editarProducto/editarProducto.html',
        controller: 'EditarProductoCtrl',
      });
  });