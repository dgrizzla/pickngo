
PICKNGO.config(function($stateProvider) {
  $stateProvider.state('administracion.opciones', {
    parent: 'administracion',
    url: '/opciones',
    template: require('./opciones.jade')(),
    controller: require('./opciones.controller.js')
  });
});