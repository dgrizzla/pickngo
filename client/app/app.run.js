const moment = require('moment');

PICKNGO.config(function($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  console.log('config');
  $locationProvider.html5Mode(true);
  moment.locale("es");
}).run(function($rootScope, $location, pngModals) {
  console.log(pngModals);
  $rootScope.$on('event:auth-loginRequired', function() {
    if ($location.$$path !== '/') {
      if ($rootScope.currentUser && $rootScope.currentUser.usuario)
        $location.path('/dashboard');
      else {
        $location.path('/');
      }
    }
    return false;
  });

  var dias = [];
  for (var i = 1; i < 32; i++) {
    dias.push(i);
  }
  var nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var meses = [];
  for (var j = 0; j < nombreMeses.length; j++) {
    meses.push({
      nombre: nombreMeses[j],
      id: Number(j)
    });
  }
  var anios = [];
  for (var i = 1950; i <= moment().year(); i++) {
    anios.push(i);
  }
  $rootScope.getInputDate = (day, month, year) => {
    let date = moment({day, month, year});
    if (date.isValid()) {
      return date.toString();
    } 
    return undefined;
  };
  $rootScope.isValidDate = date => moment(date).isValid();
  $rootScope.dias = dias;
  $rootScope.meses = meses;
  $rootScope.anios = anios;
});