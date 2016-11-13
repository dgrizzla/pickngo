
PICKNGO.config(function($stateProvider) {
  $stateProvider.state('administracion.renglones', {
    parent: 'administracion',
    url: '/renglones',
    template: require('./renglones.jade')(),
    controller: require('./renglones.controller.js')
  });
});