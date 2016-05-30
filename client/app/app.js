'use strict';

angular.module('pickngoApp', [
  'pickngoApp.constants',
  'ngCookies',
  'ngResource',
  'http-auth-interceptor',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui-notification'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope){
    var dias = [];
    for (var i = 1; i < 32; i++) {
      dias.push(i)
    }
    var nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var meses = [];
    for (var b = 0; b < nombreMeses.length; b++) {
      meses.push({
        nombre: nombreMeses[b],
        id: Number(b)
      });
    }
    var anios = [];
    for (var a = 1950; a <= moment().year(); a++) {
      anios.push(a)
    }
    $rootScope.dias = dias;
    $rootScope.meses = meses;
    $rootScope.anios = anios;
  });
