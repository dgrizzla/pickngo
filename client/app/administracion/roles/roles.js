
PICKNGO.config(function($stateProvider) {
  $stateProvider.state('administracion.roles', {
    parent: 'administracion',
    url: '/roles',
    template: require('./roles.jade')(),
    controller: require('./roles.controller.js')
  });
});