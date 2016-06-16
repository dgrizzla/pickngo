'use strict';

angular.module('pickngoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('productoUsuario', {
        url: '/productoUsuario',
        templateUrl: 'app/productoUsuario/productoUsuario.html',
        controller: "ProductoUsuarioCtrl"
      });
  });
