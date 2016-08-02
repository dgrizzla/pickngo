
PICKNGO.config(function($stateProvider) {
  $stateProvider.state('administracion', {
    url: '/administracion',
    template: require('./administracion.jade')(),
    controller: require('./administracion.controller.js'),
  });
});